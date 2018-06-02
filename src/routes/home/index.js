import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div className={[style.hero, 'hero'].join(' ')}>
					<svg viewBox="0 0 46 33" xmlns="http://www.w3.org/2000/svg"><g id="nav-io-phase-01" fill="none" fill-rule="evenodd" transform="translate(-62 -17)"><g id="ic-io-logo-indigo" transform="translate(62 17)" fill="#536DFE"><g id="io-logo">
						<polygon id="Fill-1" points="0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344" />
						<polygon id="Fill-2" points="20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688" /><path d="M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298" id="Fill-3" /></g></g></g>
					</svg>
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
				<footer>
					<div class={style.footer_logo}>
						<img src="https://events.gdgkl.org/ioxkl17/images/gdgkl.svg" />
					</div>
					<div class={style.footer_links}>
						<div class={style.footer_link}>
							<a href="https://events.gdgkl.org/ioxkl17/" target="_blank" rel="noopener noreferrer">I/O Extended '17 Kuala Lumpur</a>
							<a href="/communityguidelines">Community Guideline</a>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}
