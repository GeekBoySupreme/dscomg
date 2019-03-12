import { h, Component } from 'preact';
import Dialog from '../../components/dialog';
import { route } from 'preact-router';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import 'preact-material-components/Switch/style.css';
import style from './style';

export default class Schedule extends Component {
	state = {
		schedule: [],
		sessions: {},
		dialogOpened: false,
		toggleDialog: false,
		showMyIO: false
	}

	toggleDialog = (id, item) => e => {
		if (e.target.id !== 'star' && e.target.id !== 'slides') {
			route(this.props.rootPath + 'schedule/' + id);
			this.dialog.toggle(id, item, 'schedule');
		}
	}

	star = (id) => e => {
		let star = this.props.userSchedule ? !this.props.userSchedule[id] : true;
		const ref = this.props.db.ref('/events_site/ioxkl18/users/' + this.props.user.uid + '/schedule/' + id);
		ref.set(star ? true : null);
	}

	parseTopic(topic) {
		topic = topic.replace('_', ' ');
		return topic.charAt(0).toUpperCase() + topic.slice(1);
	}

	showEvents(item, userSchedule, user) {
		if (!user && this.state.showMyIO) return false;
		if (!user || !this.state.showMyIO) return true;
		let showEvent = false;
		item.sessions.map(item => {
			if (userSchedule && userSchedule[item]) {
				showEvent = true;
			}
		});
		return showEvent;
	}

	showEvent(sessions, item, userSchedule, user) {
		if (sessions && sessions[item]) {
			if (!user && this.state.showMyIO) return false;
			if (!user || !this.state.showMyIO) return true;
			if (userSchedule[item]) return true;
		}
	}

	showMyIO = (state) => e => {
		this.setState({ showMyIO: state });
	}

	handleScroll() {
		const ele = document.querySelector('.topappbar.mdc-top-app-bar');
		if (document.documentElement.scrollTop < 56) {
			ele.setAttribute('top', true);
		}
		else {
			ele.removeAttribute('top');
		}
	}

	constructor(props) {
		super(props);

		this.id = props.id;
		if (this.id) {
			this.setState({ toggleDialog: true });
		}
	}

	componentDidMount() {
		document.title = 'Schedule - I/O Extended 2019 Kuala Lumpur';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.id !== this.props.id) {
			if (nextProps.id) {
				this.dialog.toggle(nextProps.id, nextProps.sessions[nextProps.id], 'schedule');
			}
			else {
				this.dialog.close();
			}
		}
		if (nextProps.id && nextProps.sessions && nextProps.schedule && this.state.toggleDialog) {
			if (nextProps.sessions[nextProps.id]) {
				this.setState({ toggleDialog: false });
				this.dialog.toggle(nextProps.id, nextProps.sessions[nextProps.id], 'schedule');
			}
		}
	}

	render({ rootPath, user, userSchedule, db, sessions, schedule, speakers }, { showMyIO }) {
		return (
			<div>
				<Dialog ref={dialog => { this.dialog = dialog; }} star={userSchedule} speakers={speakers} db={db} user={user} rootPath={rootPath} />

				<div class={`${style.hero} hero`}>
					<IoLogo rootPath={rootPath} />
					<h2>Schedule</h2>
					<p>
						All sessions feature a Q&amp;A session at the end, time permitting.<br /><br />
						Speakers will be taking questions via the website <a href="https://www.sli.do/">sli.do</a>. The room code for each venue are:<br />
						<li>Hall A (JC 1) - #9769</li>
						<li>Hall B (JC 2) - #L145</li>
						<li>Hall C (JC 3) - #N095</li>
						<li>Hall D (LT 5) - #L556</li>
					</p>
				</div>
				<div class={style.tabs}>
					<div class={style.tab} onClick={this.showMyIO(false)} active={!showMyIO}>All</div>
					<div class={style.tab} onClick={this.showMyIO(true)} active={showMyIO}>My Schedule</div>
				</div>
				{!user && this.state.showMyIO &&
					<div class={style.myio_info}>Sign in to save events to My Schedule and create your custom schedule.</div>
				}
				{user && this.state.showMyIO &&
					<div class={style.myio_info}>Your saved events appear below, and are synced from your account across mobile and desktop.</div>
				}
				{schedule &&
					<div class={style.schedule}>
						{schedule.map(item => (
							this.showEvents(item, userSchedule, user) &&
							<div class={style.schedule_section}>
								<div class={style.schedule_content}>
									<div class={style.schedule_time}>
										{item.startTime}<span>{item.ampm}</span>
									</div>
									<div class={style.schedule_events}>
										{item.sessions.map(item => (
											this.showEvent(sessions, item, userSchedule, user) &&
											<div class={style.schedule_event} onClick={this.toggleDialog(item, sessions[item])}>
												<div class={style.schedule_event_details}>
													<div class={style.schedule_event_title}>{sessions[item].title}</div>
													<div class={style.schedule_event_meta}>
														<div class={style.schedule_event_description}>{sessions[item].duration} / {sessions[item].location}</div>
														<div class={style.schedule_event_topics}>
															{sessions[item].topics &&
																sessions[item].topics.map(item => (
																	<div id={item} class="session_topic">
																		<span>{this.parseTopic(item)}</span>
																	</div>
																))
															}
														</div>
													</div>
													{sessions[item].slides &&
														<a class={style.slides} id="slides" target="_blank" rel="noopener noreferrer" href={sessions[item].slides}>
															<svg id="slides" viewBox="0 0 24 24">
																<g id="slides">
																	<path id="slides" d="M19,16H5V8H19M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
																</g>
															</svg>
															<span id="slides">View Slides</span>
														</a>
													}
												</div>
												{user &&
													<div class={style.star_button} onClick={this.star(item)} id="star">
														<svg id="star">
															{
																userSchedule ?
																	userSchedule[item] ? <path id="star" class={style.star} fill="#4768FD" d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z" />
																		: <path id="star" class={style.star_border} d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
																	: <path id="star" class={style.star_border} d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
															}
														</svg>
													</div>
												}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				}
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div >
		);
	}
}

