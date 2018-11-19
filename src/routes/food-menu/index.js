import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class FoodMenu extends Component {
	componentDidMount() {
		document.title = 'Food at the Conference - GDG DevFest Kuala Lumpur 2018';
	}

	render({ rootPath }) {
		return (
			<div>
				<div class="hero">
					<IoLogo />
					<h2>Food at the Conference</h2>
				</div>
				<div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Breakfast<br /><p>(Start serving at 8am)</p></div>
						<div class={style.faq_content}>
							<p><b>Non-Vegetarian</b></p>
							<ul>
								<li>Chicken Ham Mini Sandwich</li>
								<li>Marble Cake</li>
								<li>Shell Curry Puff</li>
								<li>Fried Mini Roti Sausage Roll</li>
							</ul>
							<p><b>Vegetarian</b></p>
							<ul>
								<li>Vegetarian Mini Sandwich</li>
								<li>Vegetarian Lotus Pau</li>
								<li>Vegetarian Samosa</li>
								<li>Vegetarial Sausage Roll</li>
							</ul>
							<p><b>Drinks</b></p>
							<ul>
								<li>Coffee</li>
								<li>Teh Tarik</li>
								<li>Teh-O</li>
							</ul>
						</div>
					</div>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Lunch</div>
						<div class={style.faq_content}>
							<p><b>Non-Vegetarian</b></p>
							<ul>
								<li>Steamed Rice</li>
								<li>Cajun Grilled Chicken Breast with Chicken Gravy</li>
								<li>Gulai Mixed Vegetables</li>
								<li>Sambal Egg</li>
								<li>Fried Fish Wantan</li>
							</ul>
							<p><b>Vegetarian</b></p>
							<ul>
								<li>Stir Fried Spaghetti</li>
								<li>Broccoli Mushroom</li>
								<li>Nachocheese Potato Wedges</li>
								<li>Thai Tofu</li>
							</ul>
							<p><b>Drinks</b></p>
							<ul>
								<li>Iced Lemon Tea</li>
							</ul>
						</div>
					</div>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Tea Break</div>
						<div class={style.faq_content}>
							<p><b>Non-Vegetarian</b></p>
							<ul>
								<li>Premium Pastry Curry Puff</li>
								<li>Mini BBQ Chicken Pau</li>
								<li>Popiah Sambal</li>
							</ul>
							<p><b>Vegetarian</b></p>
							<ul>
								<li>Vegetarian Fried Mee Hoon</li>
								<li>Vegetarian Red Bean Pao</li>
								<li>Vegetarian Popia</li>
							</ul>
							<p><b>Drinks</b></p>
							<ul>
								<li>Coffee</li>
								<li>Teh Tarik</li>
								<li>Teh-O</li>
							</ul>
						</div>
					</div>
				</div>

				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
