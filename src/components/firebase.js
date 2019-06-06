import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyBrddT3o-QvxKQm22qyybuPZ8EOyWj7mAc',
	authDomain: 'ioxkl-3fbcb.firebaseapp.com',
	databaseURL: 'https://ioxkl-3fbcb.firebaseio.com',
	projectId: 'ioxkl-3fbcb',
	storageBucket: 'ioxkl-3fbcb.appspot.com',
	messagingSenderId: '327746388642',
    appId: "1:327746388642:web:f89b1e137b60f39b"
};
firebase.initializeApp(config);
if (typeof window !== "undefined"){

import ("firebase/performance").then(()=> firebase.performance());
}
export default firebase;