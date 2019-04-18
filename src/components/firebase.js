import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyBrddT3o-QvxKQm22qyybuPZ8EOyWj7mAc',
	authDomain: 'ioxkl-3fbcb.firebaseapp.com',
	databaseURL: 'https://ioxkl-3fbcb.firebaseio.com',
	projectId: 'ioxkl-3fbcb',
	storageBucket: 'ioxkl-3fbcb.appspot.com',
	messagingSenderId: '327746388642'
};
firebase.initializeApp(config);

export default firebase;