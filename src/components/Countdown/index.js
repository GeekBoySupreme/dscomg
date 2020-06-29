/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
let style = require('./style.css');
import { Component } from 'preact';
import { Countdown as CountdownController } from './Countdown';

export default class Countdown extends Component {
  state = {
  	isReset: false
  };

  componentDidMount() {
  	if (!this.controller) {
  		this.controller = new CountdownController(
  			style,
  			this.countdownContainer,
  			this.state.isReset
  		);
  		this.controller.reset(this.state.isReset);
  		this.controller.init();
  	}
  }

  shouldComponentUpdate() {
  	return !this.controller.isReset;
  }

  componentWillUnmount() {
  	this.setState({
  		isReset: true
  	});

  	this.controller.reset(this.state.isReset);
  }

  render() {
  	return (
  		// <div
  		// 	class={style.countdownContainer}
  		// 	ref={div => (this.countdownContainer = div)}
  		// >
  		// 	<div
  		// 		class={`${style.countdown}`}
  		// 		aria-hidden="true"
  		// 		role="presentation"
  		// 	>
  		// 		<div class={`${style.unitWrapper}`}>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="days"
  		// 				data-max-number="nine"
  		// 			/>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="days"
  		// 				data-max-number="nine"
  		// 			/>
  		// 			<span class={`${style.unitLabel}`}>D</span>
  		// 		</div>
  		// 		<div class={`${style.unitWrapper}`}>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="hours"
  		// 				data-max-number="two"
  		// 			/>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="hours"
  		// 				data-max-number="nine"
  		// 			/>
  		// 			<span class={`${style.unitLabel}`}>H</span>
  		// 		</div>
  		// 		<div class={`${style.unitWrapper}`}>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="minutes"
  		// 				data-max-number="five"
  		// 			/>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="minutes"
  		// 				data-max-number="nine"
  		// 			/>
  		// 			<span class={`${style.unitLabel}`}>M</span>
  		// 		</div>
  		// 		<div class={`${style.unitWrapper}`}>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="seconds"
  		// 				data-max-number="five"
  		// 			/>
  		// 			<div
  		// 				class={`${style.digit} js-digit`}
  		// 				data-unit="seconds"
  		// 				data-max-number="nine"
  		// 			/>
  		// 			<span class={`${style.unitLabel}`}>S</span>
  		// 		</div>
  		// 	</div>
		  // </div>
		  
		  <div>
			  <div class={style.social_gif}>
  				<svg xmlns="http://www.w3.org/2000/svg" width="129" height="162" viewBox="0 0 129.54 162.45">
  					<path
  						d="M48.61 127.61C59.48 136.9 65.9 148 67 159.16H3.29v-31.55h45.32m1.2-3.29H0v38.13h70.39c0-14.61-8.29-27.95-20.58-38.13z"
  						fill="#fde293"
  					/>
  					<path d="M0 76.27h129.54c0-40.7-33.83-74.78-73.38-76.27H0z" fill="#fbbc04" />
  					<path d="M0 76.27v48.05h99.91c0-17.15-7-33.92-18.85-48z" fill="#fdedc5" />
  				</svg>

  				<svg height="201" viewBox="0 0 409 501" width="209" xmlns="http://www.w3.org/2000/svg">
  					<g fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-width="10">
  						<path d="m11.929 116.176h267.61v248.957" stroke="#fad2cf" />
  						<path d="m11.929 365.133h386.668m-247.025-125.619v-227.584h-139.643m0 227.584v248.647"
  							stroke="#fce8e6"
  						/>
  						<path d="m11.929 121.176v118.338h386.668v247.647" stroke="#ee675c" />
  						<path d="m399.597 488.161h-387.668" stroke="#fce8e6" />
  						<path d="m11.929 11.93v104.246" stroke="#fad2cf" />
  					</g>
  				</svg>

  				<svg width="140" height="90" viewBox="0 0 299 150" xmlns="http://www.w3.org/2000/svg">
  					<path d="M293.916 5C291.29 82.77 227.634 145 149.5 145S7.71 82.77 5.084 5h288.832z"
  						stroke="#FAD2CF" stroke-width="10" fill="none" fill-rule="evenodd"
  					/>
  				</svg>

  				<svg aria-hidden="true" width="112" height="80" viewBox="0 0 512 257"
  					xmlns="http://www.w3.org/2000/svg"
  				>
  					<path d="M488 245c0-128.683-103.87-233-232-233S24 116.317 24 245h464z" stroke="#1a73e8"
  						stroke-width="18" fill="none"
  					/>
  				</svg>
  			</div>
		  </div>
  	);
  }
}
