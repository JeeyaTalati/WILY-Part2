import firebase from 'firebase';
require ('@firebase/firestore') 
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBoE_kRO45-7SOZfKWq73GnX0gYwy_U-0A",
    authDomain: "wily-6d828.firebaseapp.com",
    databaseURL: "https://wily-6d828.firebaseio.com",
    projectId: "wily-6d828",
    storageBucket: "wily-6d828.appspot.com",
    messagingSenderId: "551397115762",
    appId: "1:551397115762:web:010663ffff8be2031a3feb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()