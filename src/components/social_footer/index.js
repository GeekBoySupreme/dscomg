import { h, Component } from 'preact';
import style from './style';

export default class SocialFooter extends Component {
	render() {
		return (
			<div class={style.social_footer}>
				<div class={style.social_body}>
					<p>Keep in touch with GDG Kuala Lumpur for the latest I/O announcements</p>
					<div>
						<a href="https://facebook.com/GDGKualaLumpur" target="_blank" rel="noopener noreferrer">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd" transform="translate(-52)">
									<g transform="translate(52)" fill="#536DFE" id="Group-17">
										<path d="M17.1766667,30.88 L21.6726667,30.88 L21.6726667,19.9986667 L24.672,19.9986667 L25.0693333,16.2493333 L21.6726667,16.2493333 L21.6773333,14.372 C21.6773333,13.3946667 21.7706667,12.87 23.1733333,12.87 L25.048,12.87 L25.048,9.12 L22.048,9.12 C18.4446667,9.12 17.1766667,10.9393333 17.1766667,13.998 L17.1766667,16.2493333 L14.9306667,16.2493333 L14.9306667,19.9993333 L17.1766667,19.9993333 L17.1766667,30.88 L17.1766667,30.88 Z M20,40 C8.95466667,40 0,31.0453333 0,20 C0,8.954 8.95466667,0 20,0 C31.0453333,0 40,8.954 40,20 C40,31.0453333 31.0453333,40 20,40 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</a>
						<a href="https://developers.google.com/programs/community/gdg/" target="_blank" rel="noopener noreferrer">
							<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<g id="Indigo-Social-icons" fill="none" fill-rule="evenodd" transform="translate(-156)">
									<g transform="translate(156)" id="Group-18">
										<g id="Group-2">
											<circle id="Oval" fill="#4768FD" cx="20" cy="20" r="20" />
											<g id="logo_google_developers_wht" transform="translate(9 12)" fill="#FFF" fill-rule="nonzero">
												<g id="logo_x5F_google_x5F_student_x5F_ambassador_x5F_program_x5F_192px_x5F_clr">
													<g id="Group">
														<path d="M2.39659574,3.47787234 L0.215319149,7.25531915 C-0.0514893617,7.7187234 -0.0514893617,8.28978723 0.215319149,8.75319149 L4.3906383,15.9944681 L9.60042553,15.9944681 L2.39659574,3.47787234 L2.39659574,3.47787234 Z" id="Shape" />
														<polygon id="Shape" points="2.88340426 2.6306383 5.4906383 7.16638298 9.61914894 0.0140425532 4.3906383 0.0140425532" />
														<polygon id="Shape" points="12.3808511 15.9944681 17.6093617 15.9944681 19.1165957 13.3778723 16.5046809 8.84212766" />
														<path d="M21.7846809,7.25531915 L17.6046809,0.0187234043 L12.3948936,0.0187234043 L19.6034043,12.5353191 L19.6034043,12.5353191 L19.6034043,12.5353191 L21.7846809,8.75319149 C22.0514894,8.28978723 22.0514894,7.7187234 21.7846809,7.25531915 Z" id="Shape" />
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</a>
					</div>
				</div>
				<div class={style.social_gif}>
					<img src="/assets/hashtag.gif" />
				</div>
			</div>
		);
	}
}