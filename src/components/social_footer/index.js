import { Component } from 'preact';
import style from './style';

export default class SocialFooter extends Component {
	constructor(props) {
		super(props);
		if (typeof window !== "undefined") {
		  this.io = new IntersectionObserver(
			entries => {
			  const visibleEntries = entries.filter(e => e.isIntersecting);
	
			  visibleEntries
				.filter(e => e.target instanceof HTMLImageElement)
				.forEach(e => {
				  e.target.src = e.target.dataset.src;
				});
			},
			{
			  /* Using default options. Details below */
			}
		  );
		}
	  }
	
	  componentDidMount() {
		const ele = document.querySelector(`.social_gif`);
	
		if (!this.io) return;
	
		this.io.observe(ele);
	  }
	
	  componentWillUnmount() {
		if (!this.io) return;
		this.io.disconnect();
	  }
	
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
									<g transform="translate(52)" fill="#1a73e8" >
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" />
									</g>
								</g>
							</svg>
						</a>
						<a href="https://meetup.com/GDGKualaLumpur/" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
								<title>GDG Cloud Kuala Lumpur Meetup</title>
								<circle fill="#1a73e8" cx="20" cy="20" r="20" />
								<path fill="#fff" d="M32,28.24c-.31-1.93-3.88-.45-4.1-2.56-.31-3,4.15-9.46,3.8-12A2.92,2.92,0,0,0,28.51,11a3.09,3.09,0,0,0-2.05.44.79.79,0,0,1-1.12,0,11.49,11.49,0,0,0-.9-.82,1.84,1.84,0,0,0-1-.4A3.09,3.09,0,0,0,22,10.3a3.89,3.89,0,0,0-1,.75c-.33.28-1.15,1.2-1.92.86-.33-.15-1.45-.71-2.27-1.06-1.56-.68-3.82.42-4.63,1.87-1.22,2.15-3.6,10.6-4,11.71a3.32,3.32,0,0,0,3.51,4.43,2.61,2.61,0,0,0,2.41-1.64c.39-.69,4-10.09,4.25-10.54a1.17,1.17,0,0,1,1.39-.48,1.27,1.27,0,0,1,.58,1.42c-.13.9-2.67,6.63-2.77,7.28-.16,1.1.36,1.71,1.51,1.77a2.2,2.2,0,0,0,2.18-1.41c.35-.65,4.35-8.67,4.7-9.2s.71-.78,1.11-.76.8.1.68,1-3.35,6.78-3.68,8.22a4.26,4.26,0,0,0,2.34,4.73C27.51,29.81,32.37,30.74,32,28.24Z" />
							</svg>
						</a>
						<a href="https://gdgmy-slack.herokuapp.com/" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
								<title>GDG Malaysia Slack</title>
								<circle fill="#1a73e8" cx="12" cy="12" r="12" />
								<path fill="#fff" d="M18.82,14.06l-1.55.52.54,1.61A1.24,1.24,0,0,1,17,17.76,1.24,1.24,0,0,1,15.43,17l-.54-1.61-3.21,1.07.54,1.61a1.25,1.25,0,0,1-.79,1.58,1.34,1.34,0,0,1-.44.06,1.25,1.25,0,0,1-1.15-.85L9.3,17.22l-1.56.53a1.67,1.67,0,0,1-.44.06A1.28,1.28,0,0,1,6.15,17a1.22,1.22,0,0,1,.78-1.57l1.56-.53-1-3.09L6,12.29a1.07,1.07,0,0,1-.43.06,1.24,1.24,0,0,1-1.14-.84,1.26,1.26,0,0,1,.8-1.58l1.56-.52L6.2,7.81A1.25,1.25,0,0,1,8.57,7l.54,1.61L12.3,7.55l-.54-1.61a1.26,1.26,0,0,1,.79-1.57,1.24,1.24,0,0,1,1.57.79l.54,1.62,1.56-.51A1.24,1.24,0,0,1,17,8.63l-1.56.52,1,3.09L18,11.72a1.25,1.25,0,0,1,.8,2.37Z" />
								<path fill="#1a73e8" d="M9.88,11l1,3.08L14.12,13l-1-3.07L9.88,11Z" />
							</svg>
						</a>
					</div>
				</div>
				<div class={style.social_gif}>
					<img class="social_gif" crossorigin="anonymous" alt="I/O 2019 Hashtag" data-src="https://res.cloudinary.com/limhenry/image/upload/v1555595550/ioxkl19_pwa/io19_hashtag.gif" />
				</div>
			</div>
		);
	}
}