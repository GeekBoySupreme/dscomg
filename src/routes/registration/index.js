import { h, Component } from 'preact';
import TicketIcon from '../../components/ticket_icon';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Registration extends Component {
	render() {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Registration is: <br /><span>Opening soon</span></h2>
				</div>
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
								<div class={style.ticket_title}>Community</div>
								<div class={style.ticket_body}>To be eligible, you must be an active member/partner of one of the Google Developers programs.</div>
							</div>
						</div>
						<div class={style.ticket_type} id={style.academic}>
							<TicketIcon />
							<div class={style.ticket_content}>
								<div class={style.ticket_title}>Academic</div>
								<div class={style.ticket_body}>To be eligible, you must be an active full-time student, professor, faculty, or staff member at a high school or institution of higher learning, including those graduating in 2018 prior to the event.</div>
							</div>
						</div>
					</div>
				</div>
				<SocialFooter />
				<Footer />
			</div>
		);
	}
}
