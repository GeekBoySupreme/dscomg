import { h, Component } from 'preact';
import { Router } from 'preact-router';
import firebase from './firebase';
import NavBar from './navbar';
import Home from '../routes/home';
import Attending from '../routes/attending';
import Registration from '../routes/registration';
import Schedule from '../routes/schedule';
import Ticket from '../routes/ticket';
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
			document.documentElement.scrollTop = 0;
		}
	};

	componentWillMount() {
		// console.log(firebase);
		if (typeof window !== 'undefined') {
			firebase.auth().onAuthStateChanged(currentUser => {
				this.setState({ currentUser });
				console.log(currentUser);
				const db = firebase.database();
				db.ref('/events_site/ioxkl18/users/' + currentUser.uid + '/info/').set({
					uid: currentUser.uid,
					username: currentUser.displayName,
					email: currentUser.email,
					profile_picture: currentUser.photoURL
				});
			});
		}
	}

	constructor() {
		super();

		this.state = {
			currentUser: null
		};
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div id="app">
				<NavBar user={currentUser} />
				<Router onChange={this.handleRoute}>
					<Attending path="/attending/" />
					<Registration path="/registration/" user={currentUser} />
					<Schedule path="/schedule/" user={currentUser} />
					<Ticket path="/ticket/" user={currentUser} />
					<CommunityGuidelines path="/communityguidelines/" />
					<Home path="/" default />
				</Router>
			</div>
		);
	}
}
