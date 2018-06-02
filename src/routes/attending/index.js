import { h, Component } from 'preact';
import style from './style';

export default class Attending extends Component {
	render() {
		return (
			<div>
				<div class="hero">
					<svg viewBox="0 0 46 33" xmlns="http://www.w3.org/2000/svg"><g id="nav-io-phase-01" fill="none" fill-rule="evenodd" transform="translate(-62 -17)"><g id="ic-io-logo-indigo" transform="translate(62 17)" fill="#536DFE"><g id="io-logo">
						<polygon id="Fill-1" points="0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344" />
						<polygon id="Fill-2" points="20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688" /><path d="M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298" id="Fill-3" /></g></g></g>
					</svg>
					<h2>Attending</h2>
					<p>Join us at Sunway University as we celebrate product and platform innovations at Google.</p>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} style="background-image: url(assets/sunway_auditorium.jpg)" />
				<div class={style.attending}>
					{/* <div class={style.attending_item}>
						<div class={style.attending_title}>What to bring for the event</div>
						<div class={style.attending_content}>
							<p>Google I/O is an outdoor festival. While this is a big part of what makes I/O special, it also means there are some things to consider. Sessions will happen inside of climate-controlled tents, but sunscreen, sunglasses, and an extra layer for the evening are recommended. I/O is a casual event, so keep this in mind when deciding what to wear.</p>
						</div>
					</div> */}
					<div class={style.attending_item}>
						<div class={style.attending_title}>Getting to Sunway University</div>
						<div class={style.attending_content}>
							<p>Plan ahead, expect traffic delays, be patient, and consider carpooling.</p>
							<p><b>Get transportation directions: </b></p>
							<div class={style.attending_list}>
								<p><a href="">Google Maps</a></p>
								<p><a href="">Waze</a></p>
							</div>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Public Transportation</div>
						<div class={style.attending_content}>
							<p>Public transportation to the area is accessible via:</p>
							<div class={style.attending_list}>
								<p><a href="">BRT Sunway Line</a></p>
							</div>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Ridesharing</div>
						<div class={style.attending_content}>
							<p><b>Grab</b></p>
							<p>Download the Grab app from <a href="">Google Play</a> or the <a href="">App Store</a>.</p>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Parking</div>
						<div class={style.attending_content}>Stay tuned over the coming weeks for more information about parking.</div>
					</div>
				</div>
			</div>
		);
	}
}
