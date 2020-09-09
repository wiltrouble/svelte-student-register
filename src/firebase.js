import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBbxy4j09pgEYbpnPJgIu7uMvVquHDPqvg",
    authDomain: "student-registration-80432.firebaseapp.com",
    databaseURL: "https://student-registration-80432.firebaseio.com",
    projectId: "student-registration-80432",
    storageBucket: "student-registration-80432.appspot.com",
    messagingSenderId: "410210244778",
    appId: "1:410210244778:web:f245aaf34fc4226c1758d3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();