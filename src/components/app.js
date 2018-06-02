import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { auth } from './firebase';
import NavBar from './navbar';
import Home from '../routes/home';
import Attending from '../routes/attending';
import Registration from '../routes/registration';
import Schedule from '../routes/schedule';
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
		auth.onAuthStateChanged(currentUser => {
			this.setState({ currentUser });
			console.log(currentUser);
		});
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
					<CommunityGuidelines path="/communityguidelines/" />
					<Home path="/" default />
				</Router>
			</div>
		);
	}
}
