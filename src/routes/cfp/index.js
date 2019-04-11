import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

const CallForPresentersPage = ({ rootPath }) => (
	<div>
		<main class={style.main} style="min-height: 60vh;">
		<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeLSSPdRakpp8rG1ZCeMRwzDQ_NEs8K6QnL8_f6JvFtjnLT5g/viewform?embedded=true" width="640" height="2050" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
		</main>
		<SocialFooter rootPath={rootPath} />
		<Footer rootPath={rootPath} />
	</div>
);

export default CallForPresentersPage;
