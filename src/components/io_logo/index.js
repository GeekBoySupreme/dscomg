import { h, Component } from 'preact';

import style from './style';
export default class IoLogo extends Component {
	render({ rootPath }) {
		return (
			<div class={style.logo_container}>
				<img
					style="max-height: 55px"
					src={rootPath + 'assets/devfest.svg'}
				/>
				<img
					style="max-width: 30px"
					src={rootPath + 'assets/x.svg'}
				/>
				<img
					class={style.firebase_logo}
					style="max-height: 55px"
					src={rootPath + 'assets/firebaseext.svg'}
				/>
				<img
					class={style.firebase_logo_wrap}
					style="max-height: 80px"
					src={rootPath + 'assets/firebaseext_wrap.svg'}
				/>

				<img
					src={rootPath + 'assets/city2.svg'}
				/>
			</div>

		);
	}
}