import { h, Component } from 'preact';
import { Router } from 'preact-router';

import NavBar from './navbar';
import Home from '../routes/home';
import Attending from '../routes/attending';
import Register from '../routes/register';
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
	};

	render() {
		return (
			<div id="app">
				<NavBar />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Attending path="/attending/" />
					<Register path="/register/" />
					<Schedule path="/schedule/" />
					<CommunityGuidelines path="/communityguidelines/" />
				</Router>
			</div>
		);
	}
}
