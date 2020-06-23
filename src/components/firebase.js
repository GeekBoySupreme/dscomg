import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

const config = {
	apiKey: 'AIzaSyB_sK0hZM_uLzDpfiCkkrKfelHOY8VkuWY',
	authDomain: 'dscomg-6d3e0.firebaseapp.com',
	databaseURL: 'https://dscomg-6d3e0.firebaseio.com',
	projectId: 'dscomg-6d3e0',
	storageBucket: 'dscomg-6d3e0.appspot.com',
	messagingSenderId: '154730227119',
	appId: '1:154730227119:web:2bcd7929668a1c8125bb5a',
	measurementId: "G-0BN7X5YM73"
};
firebase.initializeApp(config);
firebase.analytics();
if (typeof window !== 'undefined'){

import('firebase/performance').then(() => firebase.performance());
}
export default firebase;
