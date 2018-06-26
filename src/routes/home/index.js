import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Home extends Component {
	componentDidMount() {
		document.title = 'Google I/O Extended 2018 Kuala Lumpur';
	}

	render({ rootPath, partners }) {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Google I/O Extended 2018 brings out the best Google technologies all the way from Mountain View to Kuala Lumpur.</h2>
					<h3>July 15, 2018 &middot; Sunway University</h3>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} />
				{partners &&
					<div class={style.partners}>
						<h3>Partners</h3>
						<div class={style.partner}>
							<h4>Our Mind-blowing Supporters</h4>
							<div class={style.sponsor}>
								{partners.general_sponsor && partners.general_sponsor.map(item => (
									<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
										<img src={item.image} alt={item.name} />
									</a>
								))}
							</div>
						</div>
						<div class={style.partner}>
							<h4>Our Awesome Partners</h4>
							<div class={style.sponsor}>
								{partners.sponsors && partners.sponsors.map(item => (
									<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
										<img src={item.image} alt={item.name} />
									</a>
								))}
							</div>
						</div>
						{/* {partners.gift_sponsor &&
							<div class={style.partner}>
								<h4>Gift Sponsor</h4>
								<div class={style.sponsor}>
									{partners.gift_sponsor && partners.gift_sponsor.map(item => (
										<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
											<img src={item.image} alt={item.name} />
										</a>
									))}
								</div>
							</div>
						} */}
						<div class={style.partner}>
							<h4>Our Hardcore Fans</h4>
							<div class={style.sponsor}>
								{partners.community_sponsors && partners.community_sponsors.map(item => (
									<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
										<img src={item.image} alt={item.name} />
									</a>
								))}
							</div>
						</div>
						<div class={style.partner}>
							<h4>With Love From</h4>
							<div class={style.sponsor}>
								{partners.organizers && partners.organizers.map(item => (
									<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
										<img src={item.image} alt={item.name} />
									</a>
								))}
							</div>
						</div>
					</div>
				}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
