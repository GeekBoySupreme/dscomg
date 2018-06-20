import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Ticket extends Component {
	getTicketInfo(salesId) {
		for (let key in salesId) {
			if (salesId.hasOwnProperty(key)) {
				this.props.db.ref('/events_site/ioxkl18/peatix' + key).on('value', snapshot => {
					console.log(snapshot.val());
				});
			}
		}
	}

	gorunthis() {
		console.log(this.props.user);
	}
	
	// componentWillReceiveProps(nextProps) {
	// 	if ((nextProps.db !== this.props.db) && (nextProps.user !== this.props.user)) {
	// 		if (nextProps.user) {
	// 			console.log('ok');
	// 			// nextProps.db.ref('/events_site/ioxkl18/users/' + nextProps.user.uid + '/peatix/').on('value', snapshot => {
	// // 				const salesId = snapshot.val();
	// // 				this.setState({ ticket: salesId });
	// // 				this.getTicketInfo(salesId);
	// // 			});
	// 		}
	// 	}
	// }

	render({ rootPath, user }, { ticket }) {
		return (
			<div>
				<div class="hero">
					<IoLogo />
					<h2>My Ticket</h2>
				</div>
				{!user &&
					<div class={style.signin}>
						<h3>You need to sign in with a Google account or a Gmail address to view your ticket.</h3>
						<p>If you don’t already have a Google account you can convert your current email address (work or personal) into a Google account in just a few easy steps. <a class={style.learn_more} href="https://accounts.google.com/SignUpWithoutGmail">Learn more.</a></p>
						<a class={style.ticket_btn} href={rootPath + 'ticket'}>Sign In</a>
					</div>
				}
				{user &&
					<div>{this.gorunthis()}</div>
				}
				{user && ticket &&
					<div class={style.ticket}>
						{Object.keys(ticket).map(item => (
							<div class={style.ticket_item}>
								<div class={style.ticket_logo}>
									<svg viewBox="0 0 46 33" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(-62 -17)"><g transform="translate(62 17)" fill="#999999"><g>
										<polygon points="0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344" />
										<polygon points="20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688" /><path d="M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298" /></g></g></g>
									</svg>
								</div>
								<div class={style.ticket_content}>
									<div class={style.ticket_detail}>
										<div>Order Number: #12345</div>
										<div>Type: General Admission</div>
										<div>Full Name: Larry Page</div>
										<div>Purchase Date: July 3, 2018</div>
									</div>
									<div class={style.ticket_action}>
										<a href="https://peatix.com/event/397632/ticket" class={style.action_btn}>View Ticket</a>
										<div class={style.action_btn}>Cancel Ticket</div>
									</div>
								</div>
							</div>
						))}
					</div>
				}
				{/* <div class={style.ticket}>
					
				</div> */}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
