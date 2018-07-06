import { h, Component } from 'preact';
import style from './style';

export default class SocialFooter extends Component {
	render({ rootPath }) {
		return (
			<div class={style.social_footer}>
				<div class={style.social_body}>
					<p>Keep in touch with GDG Kuala Lumpur for the latest I/O announcements</p>
					<div>
						<a alt="" href="https://facebook.com/GDGKualaLumpur" target="_blank" rel="noopener noreferrer">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<title>GDG Kuala Lumpur Facebook Page</title>
								<g fill="none" fill-rule="evenodd" transform="translate(-52)">
									<g transform="translate(52)" fill="#536DFE" >
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" />
									</g>
								</g>
							</svg>
						</a>
						<a href="https://gdgmy-slack.herokuapp.com/" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
								<title>GDG Malaysia Slack</title>
								<circle fill="#536dfe" cx="12" cy="12" r="12" />
								<path fill="#fff" d="M18.82,14.06l-1.55.52.54,1.61A1.24,1.24,0,0,1,17,17.76,1.24,1.24,0,0,1,15.43,17l-.54-1.61-3.21,1.07.54,1.61a1.25,1.25,0,0,1-.79,1.58,1.34,1.34,0,0,1-.44.06,1.25,1.25,0,0,1-1.15-.85L9.3,17.22l-1.56.53a1.67,1.67,0,0,1-.44.06A1.28,1.28,0,0,1,6.15,17a1.22,1.22,0,0,1,.78-1.57l1.56-.53-1-3.09L6,12.29a1.07,1.07,0,0,1-.43.06,1.24,1.24,0,0,1-1.14-.84,1.26,1.26,0,0,1,.8-1.58l1.56-.52L6.2,7.81A1.25,1.25,0,0,1,8.57,7l.54,1.61L12.3,7.55l-.54-1.61a1.26,1.26,0,0,1,.79-1.57,1.24,1.24,0,0,1,1.57.79l.54,1.62,1.56-.51A1.24,1.24,0,0,1,17,8.63l-1.56.52,1,3.09L18,11.72a1.25,1.25,0,0,1,.8,2.37Z" />
								<path fill="#536dfe" d="M9.88,11l1,3.08L14.12,13l-1-3.07L9.88,11Z" />
							</svg>
						</a>
					</div>
				</div>
				<div class={style.social_gif}>
					<img crossorigin="anonymous" alt="I/O 2018 Hashtag" src="https://res.cloudinary.com/limhenry/image/upload/v1529145705/ioxkl18_pwa/hashtag.gif" />
				</div>
			</div>
		);
	}
}