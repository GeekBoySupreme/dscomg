import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyD_B8LAxG-1IlfrlZwN5HAbncuwHrCZxU8',
	authDomain: 'gdg-kl.firebaseapp.com',
	databaseURL: 'https://gdg-kl.firebaseio.com',
	projectId: 'gdg-kl',
	storageBucket: 'gdg-kl.appspot.com',
	messagingSenderId: '824291119922'
};
firebase.initializeApp(config);

export default firebase;

// export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();