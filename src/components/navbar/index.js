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
import IoLogo from '../io_logo';
import MenuIcon from '../SVG/Icons/menu';
import HomeIcon from '../SVG/Icons/home';
import AttendingIcon from '../SVG/Icons/attending';
import RegistrationIcon from '../SVG/Icons/registration';
import FaqIcon from '../SVG/Icons/faq';
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
								<MenuIcon class={style.menu_icon} onClick={this.openDrawer} />
							</TopAppBar.Section>
							<div class={style.mobile_title}>
								<Match path={rootPath + 'schedule'}>
									{({ path }) =>
										path.startsWith(rootPath + 'schedule') && (
											<span>Schedule</span>
										)
									}
								</Match>
								<Match path={rootPath + 'attending'}>
									{({ path }) =>
										path.startsWith(rootPath + 'attending') && (
											<span>Attending</span>
										)
									}
								</Match>
								<Match path={rootPath + 'speakers'}>
									{({ path }) =>
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
							<IoLogo />
							<h2>June 2019</h2>
							<p>Sunway University, Bandar Sunway</p>
						</div>
						<div class={style.drawer_nav}>
							<Link
								activeClassName={style.active}
								href={rootPath}
								onClick={this.closeDrawer}
							>
								Home
							</Link>
							<Link
								activeClassName={style.active}
								href={rootPath + 'attending'}
								onClick={this.closeDrawer}
							>
								Attending
							</Link>
							<Link
								activeClassName={style.active}
								href={rootPath + 'registration'}
								onClick={this.closeDrawer}
							>
								Registration
							</Link>
							<Link
								activeClassName={style.active}
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
						<MenuIcon class={style.menu_icon} onClick={this.openDrawer} />
					</div>
					<nav>
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath}
						>
							<HomeIcon />
							<span>Home</span>
						</Link>
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath + 'attending'}
						>
							<AttendingIcon />
							<span>Attending</span>
						</Link>
						<Link
							activeClassName={style.active}
							class={style.nav_item}
							href={rootPath + 'registration'}
						>
							<RegistrationIcon />
							<span>Registration</span>
						</Link>
						<Match path="/faq">
							{({ path, url }) => (
								<Link
									activeClassName={style.active}
									class={style.nav_item}
									href={rootPath + 'faq'}
									path={path.startsWith('/faq/') ? url : undefined}
								>
									<FaqIcon />
									<span>FAQ</span>
								</Link>
							)}
						</Match>
						<div class={style.line} />
					</nav>
				</div>
			</div>
		);
	}
}
