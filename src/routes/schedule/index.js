import { h, Component } from 'preact';
import Dialog from '../../components/dialog';
import { route } from 'preact-router';
import IoLogo from '../../components/io_logo';
import schedule from '../../assets/schedule.json';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Schedule extends Component {
	toggleDialog = (id, item) => e => {
		// if (typeof window !== 'undefined') {
		// 	document.title = item.title + ' - Projects - Henry Lim';
		// }
		// route('/projects/' + id);
		console.log('what');
		this.dialog.toggle(id, item, 'projects');
	}

	render() {
		return (
			<div>
				<Dialog ref={dialog => { this.dialog = dialog; }} />

				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Schedule</h2>
					<p>This is just a preview! More events will be added frequently, so make sure to check back often.</p>
				</div>

				<div class={style.schedule}>
					{schedule.map(item => (
						<div class={style.schedule_section}>
							<div class={style.schedule_content}>
								<div class={style.schedule_time}>
									{item.time}<span>{item.ampm}</span>
								</div>
								<div class={style.schedule_events}>
									{item.session.map(item => (
										<div class={style.schedule_event} id="this" onClick={this.toggleDialog('', '')}>
											<div class={style.schedule_event_details}>
												<div class={style.schedule_event_title}>{item.title}</div>
												<div class={style.schedule_event_meta}>
													<div class={style.schedule_event_description}>{item.duration}</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				<SocialFooter />
				<Footer />
			</div >
		);
	}
}

