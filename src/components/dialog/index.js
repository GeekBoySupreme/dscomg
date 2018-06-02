import { h, Component } from 'preact';
import { route } from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import style from './style';

export default class CustomDialog extends Component {
	state = {
		data: {
			tags: []
		},
		supportShare: false
	}

	share = (dataId, data, type) => e => {
		if (navigator.share) {
			navigator.share({
				title: data.talk_title,
				text: data.event_name,
				url: 'https://limhenryxyz.firebaseapp.com/' + type + '/' + dataId
			});
		}
	}

	onClose = type => e => {}

	toggle(dataId, dataItem, dataType) {
		this.setState({ data: dataItem, id: dataId, type: dataType });
		this.scrollingDlg.MDComponent.show();
	}

	close() {
		this.scrollingDlg.MDComponent.close();
	}

	constructor(props) {
		super();
		if (navigator.share) {
			this.setState({ supportShare: true });
		}
	}

	render({ }, { id, data, type }) {
		return (
			<Dialog onCancel={this.onClose(type)} onAccept={this.onClose(type)} class={style.dialog} ref={scrollingDlg => { this.scrollingDlg = scrollingDlg; }}>
				<div class={style.dialog_header}>
					<Dialog.FooterButton class={style.back} accept>
						<svg>
							<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
						</svg>
					</Dialog.FooterButton>
					<div class={style.header_text}>{data.title}</div>
					{/* <a class={style.fab} href={data.link} target="_blank" rel="noopener">
						<svg>
							<path d="M19.66,3.99c-2.64-1.8-5.9-0.96-7.66,1.1c-1.76-2.06-5.02-2.91-7.66-1.1C2.94,4.95,2.06,6.57,2,8.28 c-0.14,3.88,3.3,6.99,8.55,11.76l0.1,0.09c0.76,0.69,1.93,0.69,2.69-0.01l0.11-0.1c5.25-4.76,8.68-7.87,8.55-11.75 C21.94,6.57,21.06,4.95,19.66,3.99z M12.1,18.55l-0.1,0.1l-0.1-0.1C7.14,14.24,4,11.39,4,8.5C4,6.5,5.5,5,7.5,5 c1.54,0,3.04,0.99,3.57,2.36h1.87C13.46,5.99,14.96,5,16.5,5c2,0,3.5,1.5,3.5,3.5C20,11.39,16.86,14.24,12.1,18.55z" />
						</svg>
					</a> */}
				</div>
				<div class={style.dialog_body} scrollable>
					<div class={style.subtitle}>{data.startTime} - {data.endTime}, {data.location}</div>
					<p class={style.dialog_body_description}>{data.description}</p>
					{/* <div class={style.event_topic}>
						{data.tags.map(item => (
							<div class="item_tag">
								<div class="item_circle" id={item.id} />
								<span>{item.value}</span>
							</div>
						))}
					</div> */}
				</div>
				<Dialog.Footer class={style.dialog_footer}>
					<a class={style.fab} href={data.link} target="_blank" rel="noopener">
						{/* <svg>
							<path d="M19.66,3.99c-2.64-1.8-5.9-0.96-7.66,1.1c-1.76-2.06-5.02-2.91-7.66-1.1C2.94,4.95,2.06,6.57,2,8.28 c-0.14,3.88,3.3,6.99,8.55,11.76l0.1,0.09c0.76,0.69,1.93,0.69,2.69-0.01l0.11-0.1c5.25-4.76,8.68-7.87,8.55-11.75 C21.94,6.57,21.06,4.95,19.66,3.99z M12.1,18.55l-0.1,0.1l-0.1-0.1C7.14,14.24,4,11.39,4,8.5C4,6.5,5.5,5,7.5,5 c1.54,0,3.04,0.99,3.57,2.36h1.87C13.46,5.99,14.96,5,16.5,5c2,0,3.5,1.5,3.5,3.5C20,11.39,16.86,14.24,12.1,18.55z" />
						</svg> */}
					</a>
					{/* { this.state.supportShare &&
						<div class={style.share} onClick={this.share(id, data, type)}>
							<svg>
								<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
							</svg>
						</div>
					} */}
				</Dialog.Footer>
			</Dialog>
		);
	}
}
