import { Component } from 'preact';
import { Router } from 'preact-router';
import firebase from './firebase';
import NavBar from './navbar';
import idb from 'idb';
import Home from '../routes/home';
import Attending from 'async!../routes/attending';
// import Registration from 'async!../routes/registration';
import CommunityGuidelines from 'async!../routes/communityguidelines';
import NotFoundPage from 'async!../routes/404';
import Faq from 'async!../routes/faq';
import EventMapPage from 'async!../routes/map';
import Schedule from 'async!../routes/schedule';
import Speakers from 'async!../routes/speakers';
import Snackbar from 'preact-material-components/Snackbar';
import 'preact-material-components/Snackbar/style.css';

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
		if (typeof window !== 'undefined') {
			if (window.swUpdate) return (window.location = e.url);
			if (e.previous) {
				if (
					e.url.startsWith(this.state.rootPath + 'schedule') &&
					e.previous.startsWith(this.state.rootPath + 'schedule')
				) {
				}
				else if (
					e.url.startsWith(this.state.rootPath + 'speakers') &&
					e.previous.startsWith(this.state.rootPath + 'speakers')
				) {
				}
				else {
					document.documentElement.scrollTop = 0;
				}
			}
			if (window.ga) {
				window.ga('set', 'page', 'window.location.pathname');
				window.ga('send', 'pageview');
			}
		}
	};

	setDb(key, val) {
		return this.dbPromise.then(db => {
			const tx = db.transaction('data', 'readwrite');
			tx.objectStore('data').put(val, key);
			return tx.complete;
		});
	}

	getDb(key) {
		return this.dbPromise.then(db =>
			db
				.transaction('data')
				.objectStore('data')
				.get(key)
		);
	}

	showRefreshSnack = () => {
		this.snackbar.MDComponent.show({
			message: 'Site updated. Refresh this page for better experience.',
			actionText: 'Refresh',
			timeout: 5000,
			actionHandler: () => {
				window.location.reload();
			}
		});
	};

	componentDidMount() {
		window.addEventListener('showRefreshSnack', this.showRefreshSnack);
	}

	componentWillUnmount() {
		window.removeEventListener('showRefreshSnack', this.showRefreshSnack);
	}

	componentWillMount() {
		if (typeof window !== 'undefined') {
			this.db = firebase.database();

			this.dbPromise = idb.open('ioxkl19', 1, upgradeDB => {
				upgradeDB.createObjectStore('data');
			});

			this.getDb('schedule').then(val => {
				this.setState({ schedule: val });
			});

			this.getDb('userSchedule').then(val => {
				this.setState({ userSchedule: val });
			});

			this.getDb('partners').then(val => {
				this.setState({ partners: val });
			});

			this.getDb('speakers').then(val => {
				this.setState({ speakers: val });
			});

			this.getDb('info').then(val => {
				this.setState({ info: val });
			});

			this.getDb('sessions').then(val => {
				this.setState({ sessions: val });

				if (this.id && val[this.id]) {
					this.setState({ dialogOpened: true });
					this.dialog.toggle(this.id, val[this.id]);
				}
			});

			this.db
				.ref('/events_site/ioxkl19/schedule')
				.once('value')
				.then(snapshot => {
					const data = snapshot.val();
					this.setState({ schedule: data });
					this.setDb('schedule', data);
				});

			this.db
				.ref('/events_site/ioxkl19/sessions')
				.once('value')
				.then(snapshot => {
					const data = snapshot.val();
					this.setState({ sessions: data });
					this.setDb('sessions', data);
				});

			this.db
				.ref('/events_site/ioxkl19/speakers')
				.once('value')
				.then(snapshot => {
					const data = snapshot.val();
					this.setState({ speakers: data });
					this.setDb('speakers', data);
				});

			this.db
				.ref('/events_site/ioxkl19/partners')
				.once('value')
				.then(snapshot => {
					const data = snapshot.val();
					this.setState({ partners: data });
					this.setDb('partners', data);
				});

			this.db
				.ref('/events_site/ioxkl19/info')
				.once('value')
				.then(snapshot => {
					const data = snapshot.val();
					this.setState({ info: data });
					this.setDb('info', data);
				});

			firebase.auth().onAuthStateChanged(currentUser => {
				this.setState({ currentUser });
				if (currentUser) {
					window.Sentry.configureScope((scope) => {
						scope.setUser({
							email: currentUser.email,
							id: currentUser.uid
						});
					});

					const dbRef = '/events_site/ioxkl19/users/' + currentUser.uid;
					this.db.ref(dbRef + '/info/').set({
						uid: currentUser.uid,
						username: currentUser.displayName,
						email: currentUser.email,
						profile_picture: currentUser.photoURL
					});

					this.db.ref(dbRef + '/schedule/').on('value', snapshot => {
						const data = snapshot.val();
						this.setState({ userSchedule: data });
						this.setDb('userSchedule', data);
					});
				}
				else {
					window.Sentry.configureScope((scope) => {
						scope.setUser({});
					});
				}
			});
		}
	}

	constructor() {
		super();

		this.state = {
			currentUser: null,
			schedule: [],
			partners: {},
			sessions: {},
			speakers: {},
			userSchedule: {},
			info: {},
			rootPath: '/'
		};

		if (typeof window !== 'undefined') {
			this.setState({ rootPath: window.GlobalVars.rootPath || '/' });
			if (window.Sentry) {
				window.Sentry.init(
					{ dsn: 'https://822494317dbb488f81fb34fef787a12e@sentry.io/1413330' }
				);
			}
		}
	}

	render(
		{ },
		{
			currentUser,
			schedule,
			sessions,
			speakers,
			partners,
			userSchedule,
			info,
			rootPath
		}
	) {
		return (
			<div id="app">
				<NavBar user={currentUser} rootPath={rootPath} />
				<Router onChange={this.handleRoute}>
					<Attending
						path={rootPath + 'attending/'}
						rootPath={rootPath}
						info={info}
					/>
					<Schedule
						path={rootPath + 'schedule/'}
						user={currentUser}
						schedule={schedule}
						userSchedule={userSchedule}
						sessions={sessions}
						speakers={speakers}
						db={this.db}
						rootPath={rootPath}
					/>
					<Schedule
						path={rootPath + 'schedule/:id'}
						user={currentUser}
						schedule={schedule}
						userSchedule={userSchedule}
						sessions={sessions}
						speakers={speakers}
						db={this.db}
						rootPath={rootPath}
					/>
					<Speakers
						path={rootPath + 'speakers/'}
						user={currentUser}
						schedule={schedule}
						userSchedule={userSchedule}
						sessions={sessions}
						speakers={speakers}
						db={this.db}
						rootPath={rootPath}
					/>
					<Speakers
						path={rootPath + 'speakers/:id'}
						user={currentUser}
						schedule={schedule}
						userSchedule={userSchedule}
						sessions={sessions}
						speakers={speakers}
						db={this.db}
						rootPath={rootPath}
					/>
					{/* <Registration
						path={rootPath + 'registration/'}
						user={currentUser}
						info={info}
						rootPath={rootPath}
					/> */}
					<CommunityGuidelines
						path={rootPath + 'faq/communityguidelines/'}
						rootPath={rootPath}
					/>
					<Faq path={rootPath + 'faq/'} rootPath={rootPath} />
					<Home
						path={rootPath}
						rootPath={rootPath}
						partners={partners}
					/>
					<EventMapPage path={rootPath + 'map/'}
						rootPath={rootPath}
						info={info}
					/>
					<NotFoundPage rootPath={rootPath} default />

				</Router>
				<Snackbar
					ref={snackbar => {
						this.snackbar = snackbar;
					}}
				/>
			</div>
		);
	}
}
