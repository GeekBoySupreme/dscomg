import { Component } from 'preact';
import style from './style';

export default class Footer extends Component {
	render({ rootPath }) {
		return (
			<div class={style.footer}>
				<div class={style.footer_logo}>
					<img crossorigin="anonymous" alt="GDG Kuala Lumpur Logo" src="https://res.cloudinary.com/shangyilim/image/upload/v1554985776/new-gdgkl.svg" />
				</div>
				<div class={style.footer_links}>
					<div class={style.footer_link}>
						<a href="https://events.gdgkl.org/ioxkl19/">I/O Extended KL 2019</a>
						<a href={rootPath + 'schedule'}>Schedule</a>
						<a href={rootPath + 'speakers'}>Speakers</a>
						<a href={rootPath + 'faq'}>FAQ</a>
						<a href={rootPath + 'faq/communityguidelines'}>Community Guidelines</a>
					</div>
				</div>
			</div>
		);
	}
}
