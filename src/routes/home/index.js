import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<IoLogo />
					<h2>Google I/O Extended 2018 brings out the best Google technologies all the way from Mountain View to Kuala Lumpur.</h2>
				</div>
				<div className={[style.belt, 'belt'].join(' ')} style="background-image: url(assets/io18_keynote.jpg)" />
				<div class={style.partners}>
					<h3>Partners</h3>
					<div class={style.partner}>
						<h4>General sponsor</h4>
						<div class={style.sponsor}>
							<a href="" class={style.item}>
								<img src="https://firebasestorage.googleapis.com/v0/b/hoverboard-firebase.appspot.com/o/images%2Flogos%2Fgoogle.svg?alt=media&token=3e7c88fe-2e6f-459a-b9dc-c84dd3358d9a" />
							</a>
						</div>
					</div>
					<div class={style.partner}>
						<h4>Dummy Platinum sponsors</h4>
						<div class={style.sponsor}>
							<a href="" class={style.item}>
								<img src="https://dfua17.firebaseapp.com/images/logos/n_ix.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/dataart.svg?alt=media&token=17bf36ef-4f21-44d5-8e6c-8a588d5b50de" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg" />
							</a>
						</div>
					</div>
					<div class={style.partner}>
						<h4>Dummy General sponsor</h4>
						<div class={style.sponsor}>
							<a href="" class={style.item}>
								<img src="https://dfua17.firebaseapp.com/images/logos/itvdn.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/dataart.svg?alt=media&token=17bf36ef-4f21-44d5-8e6c-8a588d5b50de" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/twilio.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://dfua16.firebaseapp.com/images/logos/jetbrains.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://firebasestorage.googleapis.com/v0/b/hoverboard-firebase.appspot.com/o/images%2Flogos%2Fgoogle.svg?alt=media&token=3e7c88fe-2e6f-459a-b9dc-c84dd3358d9a" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/ruckus.svg?alt=media&token=24202cb1-c2de-49f9-b0b2-c2c14bd1006e" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/symphony-solutions.svg?alt=media&token=95796fce-fcb8-433f-ab72-5ac47c95199c" />
							</a>
							<a href="" class={style.item}>
								<img src="https://dfua17.firebaseapp.com/images/logos/n_ix.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://dfua17.firebaseapp.com/images/logos/techmagic.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/twilio.svg" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/symphony-solutions.svg?alt=media&token=95796fce-fcb8-433f-ab72-5ac47c95199c" />
							</a>
							<a href="" class={style.item}>
								<img src="https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg" />
							</a>
						</div>
					</div>
				</div>
				<SocialFooter />
				<Footer />
			</div>
		);
	}
}
