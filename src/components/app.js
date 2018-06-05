import { h, Component } from 'preact';
import { Router } from 'preact-router';
import firebase from './firebase';
import NavBar from './navbar';
import Home from '../routes/home';
import Attending from '../routes/attending';
import Registration from '../routes/registration';
import Schedule from '../routes/schedule';
import Ticket from '../routes/ticket';
import idb from 'idb';
import CommunityGuidelines from '../routes/communityguidelines';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	handleRoute = e => {
		this.currentUrl = e.url;
		if (typeof window !== 'undefined') {
			if (e.previous) {
				if (e.url.startsWith(this.state.rootPath + 'schedule') && e.previous.startsWith(this.state.rootPath + 'schedule')) { }
				else {
					document.documentElement.scrollTop = 0;
				}
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
		return this.dbPromise.then(db => db.transaction('data').objectStore('data').get(key));
	}

	componentWillMount() {
		if (typeof window !== 'undefined') {
			this.db = firebase.database();

			this.dbPromise = idb.open('ioxkl18', 1, upgradeDB => {
				upgradeDB.createObjectStore('data');
			});

			this.getDb('schedule').then(val => {
				this.setState({ schedule: val });
			});

			this.getDb('userSchedule').then(val => {
				this.setState({ userSchedule: val });
			});

			this.getDb('sessions').then(val => {
				this.setState({ sessions: val });

				if (this.id && val[this.id]) {
					this.setState({ dialogOpened: true });
					this.dialog.toggle(this.id, val[this.id]);
				}
			});

			this.db.ref('/events_site/ioxkl18/test_data/schedule').once('value').then(snapshot => {
				const data = snapshot.val();
				this.setState({ schedule: data });
				this.setDb('schedule', data);
			});

			this.db.ref('/events_site/ioxkl18/test_data/sessions').once('value').then(snapshot => {
				const data = snapshot.val();
				this.setState({ sessions: data });
				this.setDb('sessions', data);
			});

			firebase.auth().onAuthStateChanged(currentUser => {
				this.setState({ currentUser });
				if (currentUser) {
					const dbRef = '/events_site/ioxkl18/users/' + currentUser.uid;
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
			});
		}
	}

	constructor() {
		super();

		this.state = {
			currentUser: null,
			schedule: [],
			sessions: {},
			userSchedule: {},
			rootPath: '/'
		};

		if (typeof window !== 'undefined') {
			this.setState({ rootPath: window.GlobalVars.rootPath || '/' });
		}
	}

	render({ }, { currentUser, schedule, sessions, userSchedule, db, rootPath }) {
		return (
			<div id="app">
				<NavBar user={currentUser} rootPath={rootPath} />
				<Router onChange={this.handleRoute}>
					<Attending path={rootPath + 'attending/'} rootPath={rootPath} />
					<Registration path={rootPath + 'registration/'} user={currentUser} rootPath={rootPath} />
					<Schedule path={rootPath + 'schedule/'} user={currentUser} schedule={schedule}
						userSchedule={userSchedule} sessions={sessions} db={this.db} rootPath={rootPath}
					/>
					<Schedule path={rootPath + 'schedule/:id'} user={currentUser} schedule={schedule}
						userSchedule={userSchedule} sessions={sessions} db={this.db} rootPath={rootPath}
					/>
					<Ticket path={rootPath + 'ticket/'} user={currentUser} rootPath={rootPath} />
					<CommunityGuidelines path={rootPath + 'communityguidelines/'} rootPath={rootPath} />
					<Home path={rootPath} rootPath={rootPath} default />
				</Router>
			</div>
		);
	}
}
