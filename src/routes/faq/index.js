import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Faq extends Component {
	render({ rootPath }) {
		return (
			<div>
				<div class="hero">
					<IoLogo />
					<h2>FAQ</h2>
				</div>
				<div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>General</div>
						<div class={style.faq_content}>
							<p><b>Date and location</b></p>
							<p>I/O Extended 2018 Kuala Lumpur will take place on the 15th of July at <a href="https://goo.gl/maps/vok9mgz1nB62" target="_blank" rel="noopener noreferrer">Sunway University</a> in Bandar Sunway, Selangor.</p>
							<br />
							<p><b>Stay Informed</b></p>
							<p>To stay up to date on the latest information on sessions, speakers, and activities, be sure to visit the I/O Extended website, <a href="http://ioxkl18.peatix.com" target="_blank" rel="noopener noreferrer">RSVP on Peatix</a> and follow us on <a href="https://www.facebook.com/GDGKualaLumpur/" target="_blank" rel="noopener noreferrer">Facebook Page</a> and <a href="https://www.facebook.com/events/180152056008809/" target="_blank" rel="noopener noreferrer">Facebook Event Page</a> can also follow and join the social conversation about I/O Extended 2018 Kuala Lumpur via official hashtags #ioxkl18 and #io18extended. In addition, we'll be emailing important information to all registered attendees, along with check-in instructions prior to the conference.</p>
							<br />
							<p><b>Content Formats</b></p>
							<p>During the conference, attendees will be able to attend sessions and hands-on workshops, chat with experts and attendees.</p>
						</div>
					</div>
				</div>
				<div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Registration</div>
						<div class={style.faq_content}>
							<p><b>Registration terms &amp; conditions</b></p>
							<ul>
								<li>Each individual may purchase only one ticket.</li>
								<li>You may not register on behalf of anyone else.</li>
								<li>By registering and accepting any discounts, gifts, or items of value related to I/O Extended 2018 Kuala Lumpur, you certify that you are able to do so in compliance with applicable laws and the internal rules of your organization.</li>
								<li>Tickets may not be sold, bartered, or auctioned in any way, and doing so may result in GDG Kuala Lumpur rendering the ticket null and void without any responsibility to GDG Kuala Lumpur.</li>
								<li>Attendees aren’t permitted to bring guests to I/O Extended 2018 Kuala Lumpur. If you have someone traveling with you, they’ll need to register themselves and purchase an attendee ticket.</li>
								<li>Photographs and/or video taken at I/O Extended 2018 Kuala Lumpur by GDG Kuala Lumpur, or others on behalf of GDG Kuala Lumpur, may include your image or likeness. You agree that GDG Kuala Lumpur may use such photographs and/or video for any purpose without compensation to you.</li>
								<li>All information entered into the registration form must be correct and accurate to the best of your knowledge.</li>
								<li>All registered attendees agree to allow GDG Kuala Lumpur to contact them regarding their registration and attendance at the event. By registering for a ticket, you agree to allow GDG Kuala Lumpur to communicate with you via email with information regarding the event.</li>
								<li>You agree to be solely responsible for your own safety, belongings, and well-being while participating in I/O Extended 2018 Kuala Lumpur. GDG Kuala Lumpur won't be liable for your participation in I/O Extended 2018 Kuala Lumpur.</li>
								<li>No solicitation or selling of items or services is allowed at I/O Extended 2018 Kuala Lumpur. Any attendee conducting these activities may be removed from the conference.</li>
							</ul>
						</div>
					</div>
				</div>
				<div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Attendance Details</div>
						<div class={style.faq_content}>
							<p><b>Language</b></p>
							<p>All presentations at I/O Extended 2018 Kuala Lumpur will be in English.</p>
							<br />
							<p><b>Registration &amp; Badge Pick-up</b></p>
							<p>We’ll begin badge pick-up on 8:00am, July 15. Please note, you may not share, give, or otherwise provide your badge to anyone. I/O Extended 2018 Kuala Lumpur badges aren’t replaceable, so don't lose yours or you won’t be readmitted to the conference. You must wear your I/O Extended 2018 Kuala Lumpur badge to gain admission to the conference, including the sessions, and workshops. If requested by security, please display or provide additional identification.</p>
							<br />
							<p><b>Transportations</b></p>
							<p>Check out our <a href={rootPath + 'attending'}>Attending page</a> for all the transportations tips you need, including driving, public transport information, ride sharing tips, and more!</p>
							<br />
							<p><b>Event Attire</b></p>
							<p>I/O Extended 2018 Kuala Lumpur is a developer event, so please be comfortable and casual. There is no enforced dress code.</p>
							<br />
							<p><b>Onsite food &amp; beverages</b></p>
							<p>Attendees are offered complimentary breakfast, lunch, and tea break.</p>
							<br />
							<p><b>Smoking</b></p>
							<p>Smoking is strictly prohibited in Sunway University.</p>
							<br />
							<p><b>No Soliciting</b></p>
							<p>No solicitation or selling of items or services is allowed at I/O Extended 2018 Kuala Lumpur. Any attendee conducting these activities may be removed from the conference.</p>
							<br />
							<p><b>Community Guidelines</b></p>
							<p>Check out the full Community Guidelines <a href={rootPath + 'communityguidelines'}>here</a>.</p>
						</div>
					</div>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
