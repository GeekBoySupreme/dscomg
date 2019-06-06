/**
 * Copyright 2016 Oleh Zasadnyy, GDG Lviv
 * Source: https://github.com/gdg-x/hoverboard
*/

import { Component } from 'preact';
import style from './style';

export default class GalleryBlock extends Component {

	constructor(props){
		super(props);

		this.io = new IntersectionObserver(
			entries => {
				const visibleEntries = entries.filter(e=> e.isIntersecting);
				
				visibleEntries.filter(e=> e.target instanceof HTMLImageElement).forEach((e)=> {
					e.target.src = e.target.dataset.src;
				})
			},
			{
				/* Using default options. Details below */
			}
		);
	}

	componentDidMount(){
		const elements = document.querySelectorAll(`.${style.grid_item}`);

		elements.forEach(element=> this.io.observe(element));
	}

	componentWillUnmount(){

		this.io.disconnect();
	}

	render() {
		return (
			<div class={style.photos_grid}>
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072861/devfestkl18_pwa/gallery/1.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072831/devfestkl18_pwa/gallery/2.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072843/devfestkl18_pwa/gallery/3.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072857/devfestkl18_pwa/gallery/4.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072841/devfestkl18_pwa/gallery/5.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072846/devfestkl18_pwa/gallery/6.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072883/devfestkl18_pwa/gallery/7.jpg" />
				<img crossorigin="anonymous" class={style.grid_item} data-src="https://res.cloudinary.com/limhenry/image/upload/v1537072866/devfestkl18_pwa/gallery/8.jpg" />
				<div crossorigin="anonymous" class={style.gallery_info}>
					<div>
						<h2>I/O Extended KL 2018 highlights</h2>
						<p>This year's festival built lots of excitement. Check out photos from featured talks, hands-on learning sessions, and after-hours fun.</p>
					</div>
					<a href="https://photos.app.goo.gl/uw6aRmAurGVjafrt8" target="_blank" rel="noopener noreferrer">See all photos</a>
				</div>
			</div>
		);
	}
}