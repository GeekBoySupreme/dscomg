import { h, Component } from 'preact';
import Dialog from '../../components/dialog';
import { route } from 'preact-router';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Schedule extends Component {
	state = {
		schedule: [],
		sessions: {},
		dialogOpened: false,
		toggleDialog: false
	}

	toggleDialog = (id, item) => e => {
		if (e.target.id !== 'star') {
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

	render({ rootPath, user, userSchedule, db, sessions, schedule, speakers }) {
		return (
			<div>
				<Dialog ref={dialog => { this.dialog = dialog; }} star={userSchedule} speakers={speakers} db={db} user={user} rootPath={rootPath} />

				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Schedule</h2>
				</div>

				{schedule &&
					<div class={style.schedule}>
						{schedule.map(item => (
							<div class={style.schedule_section}>
								<div class={style.schedule_content}>
									<div class={style.schedule_time}>
										{item.startTime}<span>{item.ampm}</span>
									</div>
									<div class={style.schedule_events}>
										{item.sessions.map(item => {
											if (sessions[item])
												return (
													<div class={style.schedule_event} onClick={this.toggleDialog(item, sessions[item])}>
														<div class={style.schedule_event_details}>
															<div class={style.schedule_event_title}>{sessions[item].title}</div>
															<div class={style.schedule_event_meta}>
																<div class={style.schedule_event_description}>{sessions[item].duration} / {sessions[item].location}</div>
																<div class={style.schedule_event_topics}>
																	{sessions[item].topics &&
																		sessions[item].topics.map(item => (
																			<div class="session_topic">
																				<span id={item} class="session_topic_dot" />
																				<span>{this.parseTopic(item)}</span>
																			</div>
																		))
																	}
																</div>
															</div>
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
												);
										})}
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

