import { h, Component } from 'preact';
import TicketIcon from '../../components/ticket_icon';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
// import firebase from '../../components/firebase';
import style from './style';

export default class Registration extends Component {
	state = {
		registrationStatus: 'opening_soon',
		registrationStatusText: 'Loading ...',
		registrationUrl: 'https://ioxkl18.peatix.com/'
	}

	changeRegistrationStatusText(status) {
		if (status === 'opening_soon') {
			this.setState({ registrationStatusText: 'Opening Soon' });
		}
		if (status === 'closed') {
			this.setState({ registrationStatusText: 'Closed' });
		}
		if (status === 'open') {
			this.setState({ registrationStatusText: 'Open' });
		}
	}

	constructor(props) {
		super(props);
		this.props = props;

		if (props.info) {
			const status = props.info.registration_status;
			this.setState({ registrationStatus: status });
			this.changeRegistrationStatusText(status);
		}
	}

	componentDidMount() {
		document.title = 'Registration - Cloud Next Extended 2018 Kuala Lumpur';
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.info !== this.props.info) {
			if (nextProps.info) {
				const status = nextProps.info.registration_status;
				this.setState({ registrationStatus: status });
				this.changeRegistrationStatusText(status);
			}
		}
	}

	render({ rootPath, info }, { registrationStatus, registrationStatusText, registrationUrl }) {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					{info &&
						<h2>
							{info.registration_text} <br />
							<span>{info.registration_text_highlight}</span>
						</h2>
					}
					{registrationStatus === 'open' &&
						<a class={style.ticket_btn} href={registrationUrl} target="_blank" rel="noopener noreferrer">{info.registration_btn_text}</a>
					}
				</div>
				{/* {registrationStatus !== 'opening_soon' &&
					<div class={style.registered}>
						<h3>Registered Attendees</h3>
						<p>If you’re a registered attendee, you can view your ticket details online. </p>
						<a class={style.ticket_btn} href={rootPath + 'registration/ticket'}>View Ticket</a>
					</div>
				} */}
				<div class={style.ticket_types}>
					<h3>Ticket type</h3>
					<div class={style.ticket_types_container}>
						<div class={style.ticket_type} id={style.general}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>General admission</div>
								<div class={style.ticket_body}>I/O welcomes anyone who pursues development and tech as a career, side occupation, or hobby.<br /><br />Price: RM12</div>
							</div>
						</div>
						{/* <div class={style.ticket_type} id={style.community}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>Women Techmakers</div>
								<div class={style.ticket_body}>We’re proud of the fact that every day, women are making technology that changes the world. Hence, we reserved a limited amount of special tickets for women.</div>
							</div>
						</div> */}
					</div>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
