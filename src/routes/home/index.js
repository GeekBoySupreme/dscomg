import { Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
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
		document.title = 'Cloud Next Extended 2018 Kuala Lumpur';
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
						<IoLogo />
						<h2>The cloud for everyone is made here. <span>Together.</span></h2>
						<h3>Cloud Next Extended ’18 Kuala Lumpur</h3>
						<h4>Summer 2018 &middot; Kuala Lumpur, Malaysia</h4>
					</div>
					<div class={style.video}>
						<div class={style.videoblock}>
							<iframe src="https://www.youtube.com/embed/a0zdDitrhoY?" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" title="Google Cloud Next ’18" />
						</div>
					</div>
				</div>
				<div class={style.glyph}>
					<svg data-v-26351a0e="" width="100%" height="100%" viewBox="0 0 232 232" xmlns="http://www.w3.org/2000/svg" focusable="false">
						<path d="M0 49h232V0H0m0 232h232v-49H0m0-43h232V91H0" fill="#EA4335" fill-rule="evenodd" style="fill: #f4ba44" />
					</svg>
				</div>
				{/* <div className={[style.belt, 'belt'].join(' ')} /> */}
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
