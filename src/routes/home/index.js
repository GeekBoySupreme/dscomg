import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Home extends Component {

	render({ rootPath, sponsors, organizers }) {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Google I/O Extended 2018 brings out the best Google technologies all the way from Mountain View to Kuala Lumpur.</h2>
					<h3>July 15, 2018 &middot; Sunway University</h3>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} style="background-image: url('https://res.cloudinary.com/limhenry/image/upload/fl_progressive/v1528856061/ioxkl18_pwa/io18_keynote.jpg')" />
				<div class={style.partners}>
					<h3>Partners</h3>
					<div class={style.partner}>
						<h4>Sponsors</h4>
						<div class={style.sponsor}>
							{sponsors && sponsors.map(item => (
								<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
									<img src={item.image} alt={item.name} />
								</a>
							))}
						</div>
					</div>
					<div class={style.partner}>
						<h4>Brought to you by</h4>
						<div class={style.sponsor}>
							{organizers && organizers.map(item => (
								<a class={style.item} href={item.url} target="_blank" rel="noopener noreferrer">
									<img src={item.image} alt={item.name} />
								</a>
							))}
						</div>
					</div>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
