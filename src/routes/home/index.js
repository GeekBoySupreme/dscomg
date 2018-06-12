import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Home extends Component {

	render({ rootPath }) {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Google I/O Extended 2018 brings out the best Google technologies all the way from Mountain View to Kuala Lumpur.</h2>
					<h3>July 15, 2018 &middot; Sunway University</h3>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} style="background-image: url(assets/io18_keynote.jpg)" />
				<div class={style.partners}>
					<h3>Partners</h3>
					<div class={style.partner}>
						<h4>General sponsor</h4>
						<div class={style.sponsor}>
							<a class={style.item} href="https://www.google.com" target="_blank" rel="noopener noreferrer">
								<img src="assets/partners/google.svg" alt="Google" />
							</a>
						</div>
					</div>
					<div class={style.partner}>
						<h4>Brought to you by</h4>
						<div class={style.sponsor}>
							<a class={style.item} href="https://meetup.com/GDGKualaLumpur/" target="_blank" rel="noopener noreferrer">
								<img src="assets/gdgkl.svg" alt="GDG Kuala Lumpur" />
							</a>
						</div>
					</div>
				</div>
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
