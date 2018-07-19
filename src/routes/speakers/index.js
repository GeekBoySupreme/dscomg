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
			return (string.length > 5) ? string.substr(0, string.lastIndexOf(' ', 150)) + ' ...' : string;
		}
	}

	toggleDialog = (id, item) => e => {
		if (e.target.id !== 'badge') {
			route(this.props.rootPath + 'speakers/' + id);
			this.dialog.toggle(id, item, 'speakers');
		}
	}

	profilePicFallback = () => event => {
		event.target.src = this.props.rootPath + 'assets/person.svg';
	}

	componentDidMount() {
		document.title = 'Speakers - Cloud Next Extended 2018 Kuala Lumpur';
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
			<div class={style.speaker}>
				<Dialog ref={dialog => { this.dialog = dialog; }} speakers={speakers} rootPath={rootPath} />

				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Speakers</h2>
					<p>Find speakers who are building a cloud full of opportunity with our partners and customers.</p>
				</div>
				<div class={style.glyph}>
					<svg data-v-26351a0e="" width="100%" height="100%" viewBox="0 0 515 515" xmlns="http://www.w3.org/2000/svg" focusable="false">
						<path d="M515 21.539203V0H404.64241v21.539203c0 81.137108-66.00214 147.145566-147.13925 147.145566-81.13079 0-147.14557-66.008458-147.14557-147.145566V0H0v21.539203c0 105.401112 63.68195 196.160371 154.56132 235.963958C63.68195 297.306748 0 388.072329 0 493.46712V515h110.35759v-21.53288c0-81.137109 66.01478-147.139245 147.14557-147.139245 81.13711 0 147.13925 66.002136 147.13925 147.139245V515H515v-21.53288c0-105.394791-63.67562-196.160372-154.56132-235.963959C451.32438 217.699574 515 126.940315 515 21.539203" fill="#34A853" fill-rule="evenodd" style="fill: rgb(52, 167, 83);" />
					</svg>
				</div>
				<div class={style.glyph} id={style.middle}>
					<svg data-v-26351a0e="" width="100%" height="100%" viewBox="0 0 232 232" xmlns="http://www.w3.org/2000/svg" focusable="false">
						<path d="M0 49h232V0H0m0 232h232v-49H0m0-43h232V91H0" fill="#EA4335" fill-rule="evenodd" style="fill: #f4ba44" />
					</svg>
				</div>
				{speakers &&
					<div class={style.speakers}>
						{Object.keys(speakers).map(item => (
							<div class={style.speaker_item} onClick={this.toggleDialog(item, speakers[item])}>
								<div class={style.profile_pic}>
									{speakers[item].profile_pic ?
										<img alt={speakers[item].name} crossorigin="anonymous" class={style.speaker_profile_pic} src={speakers[item].profile_pic} onError={this.profilePicFallback()} /> :
										<img alt={speakers[item].name} crossorigin="anonymous" class={style.speaker_profile_pic} src={rootPath + 'assets/person.svg'} />
									}
									{speakers[item].badges &&
										<div class={style.badges}>
											{speakers[item].badges.map(item => (
												<a id="badge" alt={item.name} target="_blank" href={item.link} class={style.badge}>
													<img id="badge" alt={item.name} class={style.badge_icon} src={`${rootPath}assets/${item.type}.svg`} />
												</a>
											))}
										</div>
									}
								</div>
								<div class={style.speaker_name}>{speakers[item].name}</div>
								<div class={style.speaker_title}>{speakers[item].title}</div>
								<div class={style.short_bio}>{speakers[item].short_bio}</div>
							</div>
						))}
					</div>
				}
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div>
		);
	}
}
