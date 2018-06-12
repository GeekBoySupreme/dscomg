// import { h, Component } from 'preact';
// import style from './style';

// export default class Map extends Component {
// 	initMap() {
// 		const google = this.google;
// 		let map = new google.maps.Map(this.map, {
// 			// center: { lat: 3.0676545, lng: 101.6037808 },
// 			center: { lat: 37.426087, lng: -122.079449 },
// 			zoom: 15,
// 			disableDefaultUI: false,
// 			minZoom: 15,
// 			maxZoom: 21,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP
// 		});

// 		new google.maps.Marker({
// 			position: { lat: 37.422575848907385, lng: -122.08427427244185 },
// 			map: map
// 		});

// 		new google.maps.Marker({
// 			position: { lat: 37.428147033226864, lng: -122.07285879087446 },
// 			map: map
// 		});

// 		// marker.setMap(map);

// 		// const defaultBounds = new google.maps.LatLngBounds(
// 		// 	new google.maps.LatLng(37.422575848907385, -122.08427427244185),
// 		// 	new window.google.maps.LatLng(37.428147033226864, -122.07285879087446)
// 		// );

// 		// map.fitBounds(defaultBounds);
// 	}
// 	componentDidMount() {
// 		if (!document.getElementById('gmaps_script')) {
// 			const script = document.createElement('script');
// 			script.id = 'gmaps_script';
// 			script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBHNCoqcrWmTa54JH305X8SzIblXKONm0';
// 			script.async = true;
// 			document.body.appendChild(script);
// 			script.addEventListener('load', () => {
// 				this.google = window.google;
// 				this.initMap();
// 			});
// 		}
// 		else {
// 			this.google = window.google;
// 			this.initMap();
// 		}
// 	}

// 	render({ rootPath }) {
// 		return (
// 			<div>
// 				<div class={style.map} ref={map => { this.map = map; }} />
// 			</div>
// 		);
// 	}
// }
