import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADanmpptEcUNUcZTbm7f4NDi_iVQX4h9g',
  authDomain: 'personal-6f995.firebaseapp.com',
  projectId: 'personal-6f995',
  storageBucket: 'personal-6f995.appspot.com',
  messagingSenderId: '175367935496',
  appId: '1:175367935496:web:bcc8ec77ff523acb35a3bd',
  measurementId: 'G-5XRQSHBLFS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
