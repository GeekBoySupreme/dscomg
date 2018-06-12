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
		supportShare: false,
		star: false
	}

	star = (id) => e => {
		let star = this.props.star ? !this.props.star[id] : true;
		const ref = this.props.db.ref('/events_site/ioxkl18/users/' + this.props.user.uid + '/schedule/' + id);
		ref.set(star ? true : null);
	}

	share = (dataId, data) => e => {
		if (navigator.share) {
			navigator.share({
				title: 'I/O Extended 2018 Kuala Lumpur',
				text: `Check out '${data.title}' at #ioxkl18`,
				url: `https://events.gdgkl.org/io/schedule/${dataId}`
			});
		}
	}

	onClose = type => e => {
		route(this.props.rootPath + 'schedule');
	}

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

	render({ rootPath, user, star }, { id, data, type, supportShare }) {
		return (
			<Dialog onCancel={this.onClose(type)} onAccept={this.onClose(type)} class={style.dialog} ref={scrollingDlg => { this.scrollingDlg = scrollingDlg; }}>
				<div class={style.dialog_header} style={"background-image: url('" + rootPath + "assets/grid_seamless.png')"}>
					<Dialog.FooterButton class={style.back} accept>
						<svg>
							<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
						</svg>
					</Dialog.FooterButton>
					<div class={style.header_text}>{star} {data.title}</div>
					{user &&
						<div class={style.fab} onClick={this.star(id)}>
							<svg>
								{star ?
									star[id] ?
										<path fill="#4768FD" d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z" />
										: <path d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
									: <path d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
								}
							</svg>
						</div>
					}
				</div>
				<div class={style.dialog_body} scrollable>
					<div class={style.subtitle}>{data.startTime} - {data.endTime}, {data.location}</div>
					<p class={style.dialog_body_description}>{data.description}</p>
				</div>
				{(supportShare || user) &&
					<Dialog.Footer class={style.dialog_footer}>
						{user &&
							<div class={style.fab} onClick={this.star(id)}>
								<svg>
									{star ?
										star[id] ?
											<path fill="#4768FD" d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z" />
											: <path d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
										: <path d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z" />
									}
								</svg>
							</div>
						}
						{supportShare &&
							<div class={style.share} onClick={this.share(id, data)}>
								<svg>
									<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
								</svg>
							</div>
						}
					</Dialog.Footer>
				}
			</Dialog>
		);
	}
}
