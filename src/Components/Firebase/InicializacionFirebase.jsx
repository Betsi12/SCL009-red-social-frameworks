import * as firebase from 'firebase'

const Config = {
    apiKey: "AIzaSyCrmGOYpER0h6-bPtNQ3q0v-JzF4TTTM_k",
    authDomain: "red-social-framework-8034b.firebaseapp.com",
    databaseURL: "https://red-social-framework-8034b.firebaseio.com",
    projectId: "red-social-framework-8034b",
    storageBucket: "",
    messagingSenderId: "948942136587",
    appId: "1:948942136587:web:3f343a99bbbc2861b2ae0e"
  };
  
  firebase.initializeApp(Config);

  export default firebase;