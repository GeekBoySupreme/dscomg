import { h, Component } from 'preact';

export default class IoLogo extends Component {
	render({ rootPath }) {
		return (
			<img style="width: 38px; margin-left: 4px; margin-bottom: 32px;" src={rootPath + 'assets/gdg_icon.svg'} />
		);
	}
}