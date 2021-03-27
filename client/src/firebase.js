import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDRKJvqg4H32asKXWJO2gXLowA6JJ1fBuc',
    authDomain: 'picstagram-cf7f1.firebaseapp.com',
    projectId: 'picstagram-cf7f1',
    storageBucket: 'picstagram-cf7f1.appspot.com',
    messagingSenderId: '873317650713',
    appId: '1:873317650713:web:c4f0b21ae08692a0cfb588',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
