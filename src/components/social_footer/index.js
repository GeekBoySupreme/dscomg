import { h, Component } from 'preact';
import style from './style';

export default class SocialFooter extends Component {
	render() {
		return (
			<div class={style.social_footer}>
				<div class={style.social_body}>
					<p>Keep in touch with GDG Kuala Lumpur for the latest I/O announcements</p>
					<div>
						<a href="">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<g id="Indigo-Social-icons" fill="none" fill-rule="evenodd" transform="translate(-52)">
									<g transform="translate(52)" fill="#536DFE" id="Group-17">
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</a>
						<a href="">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<g id="Indigo-Social-icons" fill="none" fill-rule="evenodd" transform="translate(-52)">
									<g transform="translate(52)" fill="#536DFE" id="Group-17">
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</a>
						<a href="">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<g id="Indigo-Social-icons" fill="none" fill-rule="evenodd" transform="translate(-52)">
									<g transform="translate(52)" fill="#536DFE" id="Group-17">
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</a>
					</div>
				</div>
				<div class={style.social_gif}>
					<img src="https://storage.googleapis.com/io-2018.appspot.com/v1/hashtag.gif" />
				</div>
			</div>
		);
	}
}