import { h, Component } from 'preact';
import TicketIcon from '../../components/ticket_icon';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import firebase from '../../components/firebase';
import style from './style';

export default class Registration extends Component {
	state = {
		registrationStatus: 'opening_soon',
		registrationStatusText: 'Loading ...',
		registrationUrl: 'https://gdgkl.peatix.com/'
	}

	changeRegistrationStatusText(status) {
		if (status === 'opening_soon') {
			this.setState({ registrationStatusText: 'Opening Soon' });
		}
		if (status === 'closed') {
			this.setState({ registrationStatusText: 'Closed' });
		}
		if (status === 'open') {
			this.setState({ registrationStatusText: 'Open until 6/30 5pm' });
		}
	}

	constructor(props) {
		super(props);

		const localRegistrationStatus = localStorage.getItem('registrationStatus');

		if (localRegistrationStatus) {
			this.setState({ registrationStatus: localRegistrationStatus });
			this.changeRegistrationStatusText(localRegistrationStatus);
		}

		const db = firebase.database();
		db.ref('/events_site/ioxkl18/info').once('value').then(snapshot => {
			const status = snapshot.val().registration_status;
			this.setState({ registrationStatus: status });
			this.changeRegistrationStatusText(status);
			localStorage.setItem('registrationStatus', status);
		});
	}

	render({}, { registrationStatus, registrationStatusText, registrationUrl }) {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Registration is: <br />
						<span>{registrationStatusText}</span>
					</h2>
					{ registrationStatus === 'open' &&
						<a class={style.ticket_btn} href={registrationUrl} target="_blank" rel="noopener noreferrer">Get Ticket</a>
					}
				</div>
				{ registrationStatus !== 'opening_soon' &&
					<div class={style.registered}>
						<h3>Registered Attendees</h3>
						<p>If you’re a registered attendee, you can view your ticket details online. </p>
						<a class={style.ticket_btn} href="/ticket">View Ticket</a>
					</div>
				}
				<div class={style.ticket_types}>
					<h3>Ticket types</h3>
					<div class={style.ticket_types_container}>
						<div class={style.ticket_type} id={style.general}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>General admission</div>
								<div class={style.ticket_body}>I/O welcomes anyone who pursues development and tech as a career, side occupation, or hobby.</div>
							</div>
						</div>
						<div class={style.ticket_type} id={style.community}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>Women Techmakers</div>
								<div class={style.ticket_body}>We’re proud of the fact that every day, women are making technology that changes the world. Hence, we reserved a limited amount of special tickets for women.</div>
							</div>
						</div>
						{/* <div class={style.ticket_type} id={style.academic}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>Academic</div>
								<div class={style.ticket_body}>To be eligible, you must be an active full-time student, professor, faculty, or staff member at a high school or institution of higher learning, including those graduating in 2018 prior to the event.</div>
							</div>
						</div> */}
					</div>
				</div>
				<SocialFooter />
				<Footer />
			</div>
		);
	}
}
