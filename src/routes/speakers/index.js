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
	};

	shortBio(string) {
		if (string) {
			return string.length > 5
				? string.substr(0, string.lastIndexOf(' ', 150)) + ' ...'
				: string;
		}
	}

	toggleDialog = (id, item) => e => {
		if (e.target.id !== 'badge') {
			route(this.props.rootPath + 'speakers/' + id);
			this.dialog.toggle(id, item, 'speakers');
		}
	};

	profilePicFallback = () => event => {
		event.target.src = this.props.rootPath + 'assets/person.svg';
	};

	componentDidMount() {
		document.title = 'Speakers - DSCOMG 2020';
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
				const speaker = nextProps.speakers[nextProps.id];
				document.title = `${speaker.name} - Speakers - DSCOMG 2020`;
				this.dialog.toggle(
					nextProps.id,
					speaker,
					'speakers'
				);
			}
			else {
				document.title = 'Speakers - DSCOMG 2020';
				this.dialog.close();
			}
		}
		if (nextProps.id && nextProps.speakers && this.state.toggleDialog) {
			const speaker = nextProps.speakers[nextProps.id];
			if (speaker) {
				this.setState({ toggleDialog: false });
				document.title = `${speaker.name} - Speakers - DSCOMG 2020`;
				this.dialog.toggle(
					nextProps.id,
					nextProps.speakers[nextProps.id],
					'speakers'
				);
			}
		}
	}

	render({ rootPath, speakers }) {
		return (
			<div>
				<Dialog
					ref={dialog => {
						this.dialog = dialog;
					}}
					speakers={speakers}
					rootPath={rootPath}
				/>

				<div class={`${style.hero} hero`}>
					<IoLogo rootPath={rootPath} />
					<h2>Speakers</h2>
					<p>
						Learn Google's latest developer products from DSC Leads, Googlers, Google
						Developer Experts, guest speakers and more. 
					</p>
				</div>
				 {speakers && (
					<div class={style.speakers}>
						{Object.keys(speakers).map(item => (
							<div
								class={style.speaker_item}
								onClick={this.toggleDialog(item, speakers[item])}
							>
								<div class={style.profile_pic}>
									{speakers[item].profile_pic ? (
										<img
											alt={speakers[item].name}
											crossorigin="anonymous"
											class={style.speaker_profile_pic}
											src={speakers[item].profile_pic}
											onError={this.profilePicFallback()}
										/>
									) : (
										<img
											alt={speakers[item].name}
											crossorigin="anonymous"
											class={style.speaker_profile_pic}
											src={rootPath + 'assets/person.svg'}
										/>
									)}
									{speakers[item].badges && (
										<div class={style.badges}>
											{speakers[item].badges.map(item => (
												<a
													id="badge"
													alt={item.name}
													target="_blank"
													href={item.link}
													class={style.badge}
												>
													<img
														id="badge"
														alt={item.name}
														class={style.badge_icon}
														src={`${rootPath}assets/${item.type}.svg`}
													/>
												</a>
											))}
										</div>
									)}
								</div>
								<div class={style.speaker_name}>{speakers[item].name}</div>
								<div class={style.speaker_title}>{speakers[item].title}</div>
								<div class={style.short_bio}>{speakers[item].short_bio}</div>
							</div>
						))}
					</div>
				)}
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div>
		);
	}
}
