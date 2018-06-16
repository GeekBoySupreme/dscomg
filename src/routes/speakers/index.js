import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import Dialog from '../../components/dialog';
import { route } from 'preact-router';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Speakers extends Component {
	state = {
		schedule: [],
		sessions: {},
		dialogOpened: false,
		toggleDialog: false
	}

	shortBio(string) {
		if (string) {
			return (string.length > 5) ? string.substr(0, string.lastIndexOf(' ', 150)) +' ...' : string;
		}
	}

	toggleDialog = (id, item) => e => {
		route(this.props.rootPath + 'speakers/' + id);
		this.dialog.toggle(id, item, 'speakers');
	}

	constructor(props) {
		super(props);

		this.id = props.id;
		if (this.id) {
			this.setState({ toggleDialog: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.id !== this.props.id) {
			if (nextProps.id) {
				this.dialog.toggle(nextProps.id, nextProps.speakers[nextProps.id], 'speakers');
			}
			else {
				this.dialog.close();
			}
		}
		if (nextProps.id && nextProps.speakers && this.state.toggleDialog) {
			if (nextProps.speakers[nextProps.id]) {
				this.setState({ toggleDialog: false });
				this.dialog.toggle(nextProps.id, nextProps.speakers[nextProps.id], 'speakers');
			}
		}
	}

	render({ rootPath, speakers }) {
		return (
			<div>
				<Dialog ref={dialog => { this.dialog = dialog; }} speakers={speakers} rootPath={rootPath} />

				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Speakers</h2>
					<p>Learn Google's latest developer products from Googlers, Google Developer Experts, guest speakers and more.</p>
				</div>
				{speakers &&
					<div class={style.speakers}>
						{Object.keys(speakers).map(item => (
							<div class={style.speaker_item} onClick={this.toggleDialog(item, speakers[item])}>
								{speakers[item].profile_pic ?
									<div class={style.speaker_profile_pic} style={"background-image: url('" + speakers[item].profile_pic + "')"} />:
									<div class={style.speaker_profile_pic} style={"background-image: url('" + rootPath + "assets/person.svg')"} />
								}
								<div class={style.speaker_name}>{speakers[item].name}</div>
								<div class={style.speaker_title}>{speakers[item].title}</div>
								<div class={style.short_bio}>{this.shortBio(speakers[item].bio)}</div>
							</div>
						))}
					</div>
				}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
