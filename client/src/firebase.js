import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCBnJFFVzyt-WcQnpmr6gFQ2RBHdfXDCmE',
	authDomain: 'picstagram-857d3.firebaseapp.com',
	projectId: 'picstagram-857d3',
	storageBucket: 'picstagram-857d3.appspot.com',
	messagingSenderId: '684296567400',
	appId: '1:684296567400:web:edd0dd40d5e31f683799dd'
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
