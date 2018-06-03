import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import firebase from '../firebase';
import Drawer from 'preact-material-components/Drawer';
import IconToggle from 'preact-material-components/IconToggle';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/IconToggle/style.css';
import style from './style';

export default class NavBar extends Component {

	closeDrawer = () => (this.drawer.MDComponent.open = false);

	openDrawer = () => (this.drawer.MDComponent.open = true);

	signIn() {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
			console.log(result);
			
		}).catch(error => {
			console.log(error);
		});
	}

	signOut() {
		firebase.auth().signOut().then(() => {
			console.log('Signed Out');
		}, error => {
			console.error('Sign Out Error', error);
		});
	}

	drawerRef = drawer => {
		this.drawer = drawer;
	};

	render() {
		return (
			<div>
				<div class={style.toolbar}>
					<TopAppBar className="topappbar">
						<TopAppBar.Row>
							<TopAppBar.Section align-start>
								<TopAppBar.Icon navigation class={style.icon} onClick={this.openDrawer}>menu</TopAppBar.Icon>
							</TopAppBar.Section>
							<TopAppBar.Section align-end>
								{this.props.user ? (
									<img src={this.props.user.photoURL} onClick={this.signOut} />
								) : (
									<div class={style.signin_btn} onClick={this.signIn}>Sign In</div>
								)}
							</TopAppBar.Section>
						</TopAppBar.Row>
					</TopAppBar>
				</div>
				<Drawer.TemporaryDrawer ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<div class={style.drawer_toolbar}>
							<svg viewBox="0 0 46 33" xmlns="http://www.w3.org/2000/svg"><g id="nav-io-phase-01" fill="none" fill-rule="evenodd" transform="translate(-62 -17)"><g id="ic-io-logo-indigo" transform="translate(62 17)" fill="#536DFE"><g id="io-logo">
								<polygon id="Fill-1" points="0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344" />
								<polygon id="Fill-2" points="20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688" /><path d="M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298" id="Fill-3" /></g></g></g>
							</svg>
							<h2>July 14, 2018</h2>
							<p>Sunway University<br />Bandar Sunway, Selangor</p>
						</div>
						<div class={style.drawer_nav}>
							<Link href="/" onClick={this.closeDrawer}>Home</Link>
							<Link href="/schedule" onClick={this.closeDrawer}>Schedule</Link>
							<Link href="/attending" onClick={this.closeDrawer}>Attending</Link>
							<Link href="/registration" onClick={this.closeDrawer}>Registration</Link>
							<Link href="/communityguidelines" onClick={this.closeDrawer}>Community Guideline</Link>
						</div>
					</Drawer.DrawerContent>
				</Drawer.TemporaryDrawer>
				<div class={style.desktop_toolbar}>
					{this.props.user ? (
						<img src={this.props.user.photoURL} onClick={this.signOut} />
					) : (
						<div class={style.signin_btn} onClick={this.signIn}>Sign In</div>
					)}</div>
				<div class={style.navbar}>
					<div class={style.hamburger}>
						<IconToggle class={style.icon} role="button" tabindex="0" onClick={this.openDrawer}>menu</IconToggle>
					</div>
					<nav>
						<Link activeClassName={style.active} class={style.nav_item} href="/">
							<svg>
								<g id="ui_x5F_spec_x5F_header_copy_5" display="inline" />
								<path display="inline" d="M10,19v-5h4v5c0,0.55,0.45,1,1,1h3c0.55,0,1-0.45,1-1v-7h1.7c0.46,0,0.68-0.57,0.33-0.87L12.67,3.6 c-0.38-0.34-0.96-0.34-1.34,0l-8.36,7.53C2.63,11.43,2.84,12,3.3,12H5v7c0,0.55,0.45,1,1,1h3C9.55,20,10,19.55,10,19z" />
							</svg>
							<span>Home</span>
						</Link>
						<Link activeClassName={style.active} class={style.nav_item} href="/schedule">
							<svg>
								<g>
									<path d="M19,3h-1V2c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1H8V2c0-0.55-0.45-1-1-1h0C6.45,1,6,1.45,6,2v1H5 C3.89,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,19H6c-0.55,0-1-0.45-1-1V8h14v10 C19,18.55,18.55,19,18,19z M8,10h3c0.55,0,1,0.45,1,1v3c0,0.55-0.45,1-1,1H8c-0.55,0-1-0.45-1-1v-3C7,10.45,7.45,10,8,10z" />
								</g>
							</svg>
							<span>Schedule</span>
						</Link>
						<Link activeClassName={style.active} class={style.nav_item} href="/attending">
							<svg>
								<g>
									<path d="M19,2H5C3.89,2,3,2.9,3,4v14c0,1.1,0.9,2,2,2h4l2.29,2.29c0.39,0.39,1.02,0.39,1.41,0L15,20h4c1.1,0,2-0.9,2-2V4 C21,2.9,20.1,2,19,2z M12,5.3c1.49,0,2.7,1.21,2.7,2.7s-1.21,2.7-2.7,2.7S9.3,9.49,9.3,8S10.51,5.3,12,5.3z M18,16H6v-0.9 c0-2,4-3.1,6-3.1s6,1.1,6,3.1V16z" />
								</g>
							</svg>
							<span>Attending</span>
						</Link>
						<Link activeClassName={style.active} class={style.nav_item} href="/registration">
							<svg>
								<g>
									<path d="M20,12c0-0.76,0.43-1.42,1.06-1.76C21.66,9.91,22,9.23,22,8.54V6c0-1.1-0.9-2-2-2H4C2.9,4,2.01,4.89,2.01,5.99l0,2.55 c0,0.69,0.33,1.37,0.94,1.69C3.58,10.58,4,11.24,4,12c0,0.76-0.43,1.43-1.06,1.76C2.34,14.09,2,14.77,2,15.46l0,2.25 C2,19.1,2.9,20,4,20h16c1.1,0,2-0.9,2-2v-2.54c0-0.69-0.34-1.37-0.94-1.7C20.43,13.42,20,12.76,20,12z M14.5,16.1L12,14.5 l-2.5,1.61C9.12,16.35,8.63,16,8.75,15.56l0.75-2.88L7.2,10.8c-0.35-0.29-0.17-0.86,0.29-0.89l2.96-0.17l1.08-2.75 c0.17-0.42,0.77-0.42,0.93,0l1.08,2.76l2.96,0.17c0.45,0.03,0.64,0.6,0.29,0.89l-2.3,1.88l0.76,2.86 C15.37,16,14.88,16.35,14.5,16.1z" />
								</g>
							</svg>
							<span>Registration</span>
						</Link>
					</nav>
				</div>
			</div>
		);
	}
}
