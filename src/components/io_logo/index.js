import { h, Component } from 'preact';

import style from './style';
export default class IoLogo extends Component {
	render({ rootPath }) {
		return (
			<div class={style.logo_container}>
				<svg aria-hidden="true" width="202" height="146" viewBox="0 0 202 146">
					<defs><path id="a" d="M.158.39H107.28v106.92H.158z" /><path id="c" d="M.105.557h38.004v144.574H.105z" /></defs><g fill="none" fill-rule="evenodd"><path fill="#D3E3F9" d="M0 123.16h51.714V19.926H0z" /><g transform="translate(94.034 17.693)"><mask id="b" fill="#fff"><use href="#a" /></mask><path d="M53.72.39C24.138.39.157 24.325.157 53.85c0 29.525 23.98 53.46 53.561 53.46 29.582 0 53.562-23.935 53.562-53.46C107.28 24.326 83.3.39 53.719.39m0 5.214c26.653 0 48.338 21.643 48.338 48.247 0 26.601-21.685 48.245-48.338 48.245-26.652 0-48.337-21.644-48.337-48.245 0-26.604 21.685-48.247 48.337-48.247" fill="#4285F4" mask="url(#b)" /></g><g transform="translate(58.336 .312)"><mask id="d" fill="#fff"><use href="#c" /></mask><path fill="#5BB974" mask="url(#d)" d="M5.625 145.131l-5.52-1.247L32.588.557l5.52 1.246z" /></g></g>
				</svg>
			</div>
		);
	}
}