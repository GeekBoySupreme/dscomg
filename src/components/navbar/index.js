import { h, Component } from 'preact';
import { Link, Match } from 'preact-router/match';
import firebase from '../firebase';
import Drawer from 'preact-material-components/Drawer';
import TopAppBar from 'preact-material-components/TopAppBar';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/TopAppBar/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import style from './style';

export default class NavBar extends Component {
	closeDrawer = () => this.setState({ drawerOpened: false });

	openDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened });

	signIn = () => {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
	};

	signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.signoutDig.MDComponent.close();
			});
	};

	toggleSigninDig = () => {
		this.signIn();
	};

	toggleSignoutDig = () => {
		this.signoutDig.MDComponent.show();
	};

	render({ rootPath, user }) {
		return (
			<div>
				<div className={[style.signout_dialog, 'signout_dialog'].join(' ')}>
					<Dialog
						onCancel={this.onClose}
						onAccept={this.onClose}
						ref={signoutDig => {
							this.signoutDig = signoutDig;
						}}
					>
						<div class={style.dialog_body}>
							<h3>Sign out?</h3>
							<p>All saved events remain synced to your account.</p>
						</div>
						<Dialog.Footer>
							<Dialog.FooterButton class={style.cancel_btn} accept>
								Not now
							</Dialog.FooterButton>
							<Dialog.FooterButton
								class={style.signout_btn}
								onClick={this.signOut}
							>
								Sign out
							</Dialog.FooterButton>
						</Dialog.Footer>
					</Dialog>
				</div>
				<div class={style.toolbar}>
					<TopAppBar className="topappbar">
						<TopAppBar.Row>
							<TopAppBar.Section align-start>
								<svg class={style.menu_icon} onClick={this.openDrawer}>
									<g>
										<path d="M4,18h16c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,17.55,3.45,18,4,18z M4,13h16c0.55,0,1-0.45,1-1 v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z" />
									</g>
								</svg>
							</TopAppBar.Section>
							<div class={style.mobile_title}>
								<Match path={rootPath + 'schedule'}>
									{({ path, url }) =>
										path.startsWith(rootPath + 'schedule') && (
											<span>Schedule</span>
										)
									}
								</Match>
								<Match path={rootPath + 'attending'}>
									{({ path, url }) =>
										path.startsWith(rootPath + 'attending') && (
											<span>Attending</span>
										)
									}
								</Match>
								<Match path={rootPath + 'speakers'}>
									{({ path, url }) =>
										path.startsWith(rootPath + 'speakers') && (
											<span>Speakers</span>
										)
									}
								</Match>
							</div>
							<TopAppBar.Section align-end>
								{user ? (
									<img
										crossorigin="anonymous"
										src={user.photoURL}
										onClick={this.toggleSignoutDig}
									/>
								) : (
									<div class={style.signin_btn} onClick={this.toggleSigninDig}>
											Sign In
									</div>
								)}
							</TopAppBar.Section>
						</TopAppBar.Row>
					</TopAppBar>
				</div>
				<Drawer modal open={this.state.drawerOpened} onClose={this.closeDrawer}>
					<Drawer.DrawerContent>
						<div class={style.drawer_toolbar}>

							<img
								style="width: 160px;margin-left:10px;"
								src={rootPath + 'assets/devfest.svg'}
							/>
							<img
								style="width: 20px;"
								src={rootPath + 'assets/x.svg'}
							/>
							<img
								style="width: 200px"
								src={rootPath + 'assets/firebaseext_wrap.svg'}
							/>
							<h2>December 1, 2018</h2>
							<p>Kuala Lumpur, Malaysia</p>
						</div>
						<div class={style.drawer_nav}>
							<Link href={rootPath} onClick={this.closeDrawer}>
								Home
							</Link>
							<Link href={rootPath + 'schedule'} onClick={this.closeDrawer}>
								Schedule
							</Link>
							<Link href={rootPath + 'speakers'} onClick={this.closeDrawer}>
								Speakers
							</Link>
							<Link href={rootPath + 'attending'} onClick={this.closeDrawer}>
								Attending
							</Link>
							<Link href={rootPath + 'registration'} onClick={this.closeDrawer}>
								Registration
							</Link>
							<Link href={rootPath + 'faq'} onClick={this.closeDrawer}>
								FAQ
							</Link>
							<Link
								href={rootPath + 'communityguidelines'}
								onClick={this.closeDrawer}
							>
								Community Guidelines
							</Link>
						</div>
					</Drawer.DrawerContent>
				</Drawer>
				<div class={style.desktop_toolbar}>
					{user ? (
						<img
							crossorigin="anonymous"
							src={user.photoURL}
							onClick={this.toggleSignoutDig}
						/>
					) : (
						<div class={style.signin_btn} onClick={this.toggleSigninDig}>
								Sign In
						</div>
					)}
				</div>
				<div class={style.navbar}>
					<div class={style.hamburger}>
						<svg class={style.menu_icon} onClick={this.openDrawer}>
							<g>
								<path d="M4,18h16c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,17.55,3.45,18,4,18z M4,13h16c0.55,0,1-0.45,1-1 v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z" />
							</g>
						</svg>
					</div>
					<nav>
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath}
						>
							<svg>
								<path fill="none" d="M0 0h24v24H0V0z" />
								<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
							</svg>
							<span>Home</span>
						</Link>
						{/* <Match path="/schedule">
							{({ path, url }) =>
								path.startsWith('/schedule/') ? (
									<Link
										activeClassName={style.active}
										class={style.nav_item}
										href={rootPath + 'schedule'}
										path={url}
									>
										<svg>
											<g>
												<path d="M19,3h-1V2c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1H8V2c0-0.55-0.45-1-1-1h0C6.45,1,6,1.45,6,2v1H5 C3.89,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,19H6c-0.55,0-1-0.45-1-1V8h14v10 C19,18.55,18.55,19,18,19z M8,10h3c0.55,0,1,0.45,1,1v3c0,0.55-0.45,1-1,1H8c-0.55,0-1-0.45-1-1v-3C7,10.45,7.45,10,8,10z" />
											</g>
										</svg>
										<span>Schedule</span>
									</Link>
								) : (
									<Link
										activeClassName={style.active}
										class={style.nav_item}
										href={rootPath + 'schedule'}
									>
										<svg>
											<g>
												<path d="M19,3h-1V2c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1H8V2c0-0.55-0.45-1-1-1h0C6.45,1,6,1.45,6,2v1H5 C3.89,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,19H6c-0.55,0-1-0.45-1-1V8h14v10 C19,18.55,18.55,19,18,19z M8,10h3c0.55,0,1,0.45,1,1v3c0,0.55-0.45,1-1,1H8c-0.55,0-1-0.45-1-1v-3C7,10.45,7.45,10,8,10z" />
											</g>
										</svg>
										<span>Schedule</span>
									</Link>
								)
							}
						</Match> */}
						{/* <Match path="/speakers">
							{({ path, url }) =>
								path.startsWith('/speakers/') ? (
									<Link
										activeClassName={style.active}
										class={style.nav_item}
										href={rootPath + 'speakers'}
										path={url}
									>
										<svg>
											<g>
												<path d="M16,11c1.66,0,2.99-1.34,2.99-3c0-1.66-1.33-3-2.99-3s-3,1.34-3,3C13,9.66,14.34,11,16,11z" />
												<path d="M8,11c1.66,0,2.99-1.34,2.99-3c0-1.66-1.33-3-2.99-3S5,6.34,5,8C5,9.66,6.34,11,8,11z" />
												<path d="M8,13c-2.33,0-7,1.17-7,3.5V18c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1v-1.5C15,14.17,10.33,13,8,13z" />
												<path d="M16,13c-0.29,0-0.62,0.02-0.97,0.05c0.02,0.01,0.03,0.03,0.04,0.04C16.21,13.92,17,15.03,17,16.5V18 c0,0.35-0.07,0.69-0.18,1H22c0.55,0,1-0.45,1-1v-1.5C23,14.17,18.33,13,16,13z" />
											</g>
										</svg>
										<span>Speakers</span>
									</Link>
								) : (
									<Link
										activeClassName={style.active}
										class={style.nav_item}
										href={rootPath + 'speakers'}
									>
										<svg>
											<g>
												<path d="M16,11c1.66,0,2.99-1.34,2.99-3c0-1.66-1.33-3-2.99-3s-3,1.34-3,3C13,9.66,14.34,11,16,11z" />
												<path d="M8,11c1.66,0,2.99-1.34,2.99-3c0-1.66-1.33-3-2.99-3S5,6.34,5,8C5,9.66,6.34,11,8,11z" />
												<path d="M8,13c-2.33,0-7,1.17-7,3.5V18c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1v-1.5C15,14.17,10.33,13,8,13z" />
												<path d="M16,13c-0.29,0-0.62,0.02-0.97,0.05c0.02,0.01,0.03,0.03,0.04,0.04C16.21,13.92,17,15.03,17,16.5V18 c0,0.35-0.07,0.69-0.18,1H22c0.55,0,1-0.45,1-1v-1.5C23,14.17,18.33,13,16,13z" />
											</g>
										</svg>
										<span>Speakers</span>
									</Link>
								)
							}
						</Match> */}
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath + 'attending'}
						>
							<svg>
								<g>
									<path fill="none" d="M0 0h24v24H0V0z" />
									<path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16h-4.83l-.59.59L12 20.17l-1.59-1.59-.58-.58H5V4h14v14zm-7-7c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V17h12v-1.42zM8.48 15c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48z" />
								</g>
							</svg>
							<span>Attending</span>
						</Link>
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath + 'registration'}
						>
							<svg>
								<path fill="none" d="M0 0h24v24H0V0z" />
								<path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM9.07 16L12 14.12 14.93 16l-.89-3.36 2.69-2.2-3.47-.21L12 7l-1.27 3.22-3.47.21 2.69 2.2z" />
							</svg>
							<span>Registration</span>
						</Link>
						{/* <Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath + 'faq'}
						>
							<svg>
								<g display="inline" />
								<path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,17L12,17c-0.55,0-1-0.45-1-1v-4 c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v4C13,16.55,12.55,17,12,17z M13,9h-2V7h2V9z" />
							</svg>
							<span>FAQ</span>
						</Link> */}
						<div class={style.line} />
					</nav>
				</div>
			</div>
		);
	}
}
