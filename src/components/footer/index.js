import { Component } from 'preact';
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
						<a href="https://events.gdgkl.org/ioxkl18/">I/O Extended KL 2018</a>
						<a href="https://events.gdgkl.org/ioxkl17/">I/O Extended KL 2017</a>
						<a href={rootPath + 'communityguidelines'}>Community Guidelines</a>
					</div>
				</div>
			</div>
		);
	}
}