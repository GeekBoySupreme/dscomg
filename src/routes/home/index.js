import { Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import GalleryBlock from '../../components/gallery_block';
import Countdown from '../../components/Countdown';
import style from './style';

export default class Home extends Component {
	handleScroll() {
		const ele = document.querySelector('.topappbar.mdc-top-app-bar');
		if (document.documentElement.scrollTop < 56) {
			ele.setAttribute('top', true);
		}
		else {
			ele.removeAttribute('top');
		}
	}

	componentDidMount() {
		document.title = 'I/O Extended 2019 Kuala Lumpur';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath, partners }) {
		return (
			<div>
				<div class={`${style.hero} hero`}>
					<div class={style.hero_title}>
						<IoLogo rootPath={rootPath} />
						<h2>
							I/O brings together developers from around the globe for talks, hands-on learning with Google experts, and a first look at Google’s latest developer products.
						</h2>
						<br />
						<h4>June 2019 · Sunway University, Bandar Sunway</h4>
					</div>
					<Countdown />
				</div>
				<div class={`${style.belt} belt`} />
				<div class={style.home_info}>
					<div class={style.text}>
						<h3>What you need to know, before you ask.</h3>
						<p>
							I/O Extended 2019 Kuala Lumpur brings together the world class experts
							in Android, Web, Machine Learning and Cloud technologies for one full day of
							sessions, workshops and showcases.
						</p>
					</div>
					<div class={style.stats}>
						<div class={style.stat}>
							<div class={style.number}>400+</div>
							<div class={style.label}>Attendees</div>
						</div>
						<div class={style.stat}>
							<div class={style.number}>1</div>
							<div class={style.label}>Day</div>
						</div>
					</div>
				</div>
				<GalleryBlock />
				{partners && (
					<div class={style.partners}>
						<h3>Partners</h3>
						{partners.general_sponsor && (
							<div class={style.partner}>
								<h4>Our Mind-blowing Supporters</h4>
								<div class={style.sponsor}>
									{partners.general_sponsor.map(item => (
										<a
											class={style.item}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												crossorigin="anonymous"
												src={item.image}
												alt={item.name}
											/>
										</a>
									))}
								</div>
							</div>
						)}
						{partners.sponsors && (
							<div class={style.partner}>
								<h4>Our Awesome Partners</h4>
								<div class={style.sponsor}>
									{partners.sponsors.map(item => (
										<a
											class={style.item}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												crossorigin="anonymous"
												src={item.image}
												alt={item.name}
											/>
										</a>
									))}
								</div>
							</div>
						)}
						{partners.community_sponsors && (
							<div class={style.partner}>
								<h4>Our Hardcore Fans</h4>
								<div class={style.sponsor}>
									{partners.community_sponsors.map(item => (
										<a
											class={style.item}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												crossorigin="anonymous"
												src={item.image}
												alt={item.name}
											/>
										</a>
									))}
								</div>
							</div>
						)}
						{partners.organizers && (
							<div class={style.partner}>
								<h4>With Love From</h4>
								<div class={style.sponsor}>
									{partners.organizers.map(item => (
										<a
											class={style.item}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												crossorigin="anonymous"
												src={item.image}
												alt={item.name}
											/>
										</a>
									))}
								</div>
							</div>
						)}
					</div>
				)}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
