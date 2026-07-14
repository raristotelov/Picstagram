// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDBG3-arEqRWFkPmWiJmh7P8369JTMJW3k',
	authDomain: 'picstagram-app.firebaseapp.com',
	projectId: 'picstagram-app',
	storageBucket: 'picstagram-app.firebasestorage.app',
	messagingSenderId: '324145159825',
	appId: '1:324145159825:web:5aa93b449ef43d7dbaa930',
	measurementId: 'G-QR6HZMJRF4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
