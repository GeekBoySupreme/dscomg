import { h, Component } from 'preact';
import style from './style';

export default class Footer extends Component {
	render({ rootPath }) {
		return (
			<div class={style.footer}>
				<div class={style.footer_logo}>
					<img crossorigin="anonymous" alt="GDG Kuala Lumpur Logo" src="https://res.cloudinary.com/limhenry/image/upload/v1528864707/ioxkl18_pwa/sponsors/gdgkl.svg" />
				</div>
				<div class={style.footer_links}>
					<div class={style.footer_link}>
						<a href="https://events.gdgkl.org/ioxkl17/" target="_blank" rel="noopener noreferrer">I/O Extended '17 Kuala Lumpur</a>
						<a href={rootPath + 'faq'}>FAQ</a>
						<a href={rootPath + 'communityguidelines'}>Community Guideline</a>
					</div>
				</div>
			</div>
		);
	}
}