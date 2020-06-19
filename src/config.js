import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyBNTXh3LHPz9a-on4NKN5unttHzqd51t0M',
  authDomain: 'mycalendar-9e8f5.firebaseapp.com',
  databaseURL: 'https://mycalendar-9e8f5.firebaseio.com',
  projectId: 'mycalendar-9e8f5',
  storageBucket: 'mycalendar-9e8f5.appspot.com',
  messagingSenderId: '510498304275',
  appId: '1:510498304275:web:614c19590067fa3b9f2ae6',
  measurementId: 'G-81T50KTC9E',
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
