import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class CallForPresentersPage extends Component {
	handleScroll() {
		const ele = document.querySelector('.topappbar.mdc-top-app-bar');
		if (document.documentElement.scrollTop < 56) {
			ele.setAttribute('top', true);
		}
		else {
			ele.removeAttribute('top');
		}
	}

	resize() {
		if (window.innerWidth > 768) {
			this.setState({ isMobile: false, showTravel: true, showEvent: true });
		}
		if (window.innerWidth <= 768) {
			this.setState({ isMobile: true, showTravel: false, showEvent: true });
		}
	}

	showTravel = (state) => e => {
		this.setState({ showTravel: state, showEvent: !state });
	}

	constructor(props) {
		super(props);
		this.resize = this.resize.bind(this);
	}

	componentDidMount() {
		document.title = 'Call for Presenters - I/O Extended 2019 Kuala Lumpur';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		window.addEventListener('resize', this.resize);
		this.resize();
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.resize);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath, info }, { showTravel, showEvent }) {
		return (
			<div>
				
				<div class={style.cfp}>
				<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeLSSPdRakpp8rG1ZCeMRwzDQ_NEs8K6QnL8_f6JvFtjnLT5g/viewform?embedded=true" width="640" height="2050" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
		
				</div>
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div>
		);
	}
}
