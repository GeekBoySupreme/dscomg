import { h, Component } from 'preact';
import style from './style';

export default class Register extends Component {
	render() {
		return (
			<div>
				<div class="hero">
					<svg viewBox="0 0 46 33" xmlns="http://www.w3.org/2000/svg"><g id="nav-io-phase-01" fill="none" fill-rule="evenodd" transform="translate(-62 -17)"><g id="ic-io-logo-indigo" transform="translate(62 17)" fill="#536DFE"><g id="io-logo">
						<polygon id="Fill-1" points="0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344" />
						<polygon id="Fill-2" points="20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688" /><path d="M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298" id="Fill-3" /></g></g></g>
					</svg>
					<h2>Community Guidelines</h2>
				</div>
				<div class={style.container}>
					<p>Google Developer Group Kuala Lumpur (GDGKL) and Google is dedicated to providing a harassment-free and inclusive event experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. We do not tolerate harassment of event participants in any form. Google takes violations of our policy seriously and will respond appropriately.</p>
					<p>All participants of Google-supported events must abide by the following policy:</p>
					<h4>Be excellent to each other.</h4>
					<p><span>Treat everyone with respect. Participate while acknowledging that everyone deserves to be here — and each of us has the right to enjoy our experience without fear of harassment, discrimination, or condescension, whether blatant or via micro-aggressions. Jokes shouldn’t demean others. Consider what you are saying and how it would feel if it were said to or about you.</span></p>
					<h4>Speak up if you see or hear something.</h4>
					<p><span>Harassment is not tolerated, and you are empowered to politely engage when you or others are disrespected. The person making you feel uncomfortable may not be aware of what they are doing, and politely bringing their behavior to their attention is encouraged.</span></p>
					<h4>Practice saying "Yes and" to each other.</h4>
					<p><span>It’s a theatre improv technique to build on each other’s ideas. We all benefit when we create together.</span></p>
					<h4>We have a ZERO TOLERANCE POLICY for harassment of any kind, including but not limited to:</h4>
					<ul>
						<li>Stalking/following</li>
						<li>Deliberate intimidation</li>
						<li>Harassing photography or recording</li>
						<li><span>Sustained disruption of talks or other events</span></li>
						<li>Offensive verbal language</li>
						<li>Verbal language that reinforces social structures of domination</li>
						<li>Sexual imagery and language in public spaces</li>
						<li>Inappropriate physical contact</li>
						<li>Unwelcome sexual or physical attention</li>
					</ul>
					<p><span>In relation to, but not limited to:</span></p>
					<ul>
						<li>Neurodiversity</li>
						<li>Race</li>
						<li>Color</li>
						<li>National origin</li>
						<li>Gender identity</li>
						<li>Gender expression</li>
						<li>Sexual orientation</li>
						<li>Age</li>
						<li>Body size</li>
						<li>Disabilities</li>
						<li>Appearance</li>
						<li>Religion</li>
						<li>Pregnancy</li>
					</ul>
					<br />
					<p>Participants asked to stop any harassing behavior are expected to comply immediately. Our zero tolerance policy means that we will look into and review every allegation of violation of our Event Community Guidelines and Anti-Harassment Policy and respond appropriately. We empower and encourage you to report any behavior that makes you or others feel uncomfortable by finding a GDGKL organizer or volunteer or by emailing henry@gdg.my.</p>
					<br />
					<p>Event staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing discomfort or harassment to feel safe for the duration of the event. We value your attendance.</p>
					<br />
					<p>This policy extends to talks, forums, workshops, codelabs, social media, parties, hallway conversations, all attendees, partners, sponsors, volunteers, event staff, etc. You catch our drift. GDGKL reserves the right to refuse admittance to, or remove any person from, any GDGKL hosted event (including future GDGKL events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with this policy, and the terms and conditions herein. If a participant engages in harassing or uncomfortable behavior, the conference organizers may take any action they deem appropriate, including warning or expelling the offender from the conference with no refund.</p>
				</div>
			</div>
		);
	}
}
