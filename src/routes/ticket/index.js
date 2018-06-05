import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Ticket extends Component {
	render({ rootPath }) {
		return (
			<div>
				<div class="hero">
					<IoLogo />
					<h2>My Ticket</h2>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
