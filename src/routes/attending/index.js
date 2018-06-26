import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Attending extends Component {
	componentDidMount() {
		document.title = 'Attending - Google I/O Extended 2018 Kuala Lumpur';
	}

	render({ rootPath }) {
		return (
			<div>
				<div class="hero">
					<IoLogo />
					<h2>Attending</h2>
					<p>Join us at Sunway University as we celebrate product and platform innovations at Google.</p>
				</div>
				<div className={[style.belt, 'belt'].join(' ')}
					style={"background-image: url('" + rootPath + "assets/sunway_auditorium.jpg')"}
				/>
				<div class={style.attending}>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Getting to Sunway University</div>
						<div class={style.attending_content}>
							<p>Plan ahead, expect traffic delays, be patient, and consider carpooling.</p>
							<p><b>Get transportation directions: </b></p>
							<div class={style.attending_list}>
								<p>
									<a href="https://goo.gl/maps/vok9mgz1nB62" target="_blank" rel="noopener noreferrer">Google Maps</a>
								</p>
								<p>
									<a href="https://mobile-web.world.waze.com/en_US/meetup/location?h=w2832n3w7snh"  target="_blank" rel="noopener noreferrer">Waze</a>
								</p>
							</div>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Public Transportation</div>
						<div class={style.attending_content}>
							<p>Public transportation to the area is accessible via:</p>
							<div class={style.attending_list}>
								<p>
									<a href="https://www.myrapid.com.my/traveling-with-us/how-to-travel-with-us/rapid-kl/brt-sunway-line" target="_blank" rel="noopener noreferrer">BRT Sunway Line</a>
								</p>
							</div>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Ridesharing</div>
						<div class={style.attending_content}>
							<p><b>Grab</b></p>
							<p>Download the Grab app from <a href="https://play.google.com/store/apps/details?id=com.grabtaxi.passenger" target="_blank" rel="noopener noreferrer">Google Play</a> or the <a href="https://itunes.apple.com/MY/app/id647268330" target="_blank" rel="noopener noreferrer">App Store</a>.</p>
						</div>
					</div>
					<div class={style.attending_item}>
						<div class={style.attending_title}>Parking</div>
						<div class={style.attending_content}>Limited parking is available at Sunway University. The parking rate is RM5.00 per entry.</div>
					</div>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
