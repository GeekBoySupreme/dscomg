import { Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import GalleryBlock from '../../components/gallery_block';
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
		document.title = 'GDG DevFest Kuala Lumpur 2018';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath, partners }) {
		return (
			<div class={style.home}>
				<div className={[style.hero, 'hero'].join(' ')}>
					<div class={style.hero_title}>
						<IoLogo rootPath={rootPath} />
						<h2>GDG DevFests are large, community-run developer events happening around the globe focused on community building and learning about Google’s technologies.</h2>
						<h4>December 1, 2018 · Sunway University</h4>
					</div>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} />
				<div class={style.home_info}>
					<div class={style.text}>
						<h3>What you need to know, before you ask.</h3>
						<p>GDG DevFest Kuala Lumpur brings together the world class experts in Android, Web and Cloud technologies for one full day of sessions, workshops and showcases.</p>
					</div>
					<div class={style.stats}>
						<div class={style.stat}>
							<div class={style.number}>300+</div>
							<div class={style.label}>Attendees</div>
						</div>
						<div class={style.stat}>
							<div class={style.number}>1</div>
							<div class={style.label}>Day</div>
						</div>
						<div class={style.stat}>
							<div class={style.number}>20+</div>
							<div class={style.label}>Sessions</div>
						</div>
						<div class={style.stat}>
							<div class={style.number}>3</div>
							<div class={style.label}>Tracks</div>
						</div>
					</div>
				</div>
				<GalleryBlock />
				{partners &&
					<div class={style.partners}>
						<h3>Partners</h3>
						{partners.general_sponsor &&
							<div class={style.partner}>
								<h4>Our Mind-blowing Supporters</h4>
								<div class={style.sponsor}>
									{partners.general_sponsor.map(item => (
										<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
											<img crossorigin="anonymous" src={item.image} alt={item.name} />
										</a>
									))}
								</div>
							</div>
						}
						{partners.sponsors &&
							<div class={style.partner}>
								<h4>Our Awesome Partners</h4>
								<div class={style.sponsor}>
									{partners.sponsors.map(item => (
										<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
											<img crossorigin="anonymous" src={item.image} alt={item.name} />
										</a>
									))}
								</div>
							</div>
						}
						{partners.community_sponsors &&
							<div class={style.partner}>
								<h4>Our Hardcore Fans</h4>
								<div class={style.sponsor}>
									{partners.community_sponsors.map(item => (
										<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
											<img crossorigin="anonymous" src={item.image} alt={item.name} />
										</a>
									))}
								</div>
							</div>
						}
						{partners.organizers &&
							<div class={style.partner}>
								<h4>With Love From</h4>
								<div class={style.sponsor}>
									{partners.organizers.map(item => (
										<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
											<img crossorigin="anonymous" src={item.image} alt={item.name} />
										</a>
									))}
								</div>
							</div>
						}
					</div>
				}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
