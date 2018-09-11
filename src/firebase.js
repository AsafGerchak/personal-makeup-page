import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRsTwA1Ojol0uagUPMctRItwawg7AKLtA",
  authDomain: "personal-makeup-page.firebaseapp.com",
  databaseURL: "https://personal-makeup-page.firebaseio.com",
  projectId: "personal-makeup-page",
  storageBucket: "personal-makeup-page.appspot.com",
  messagingSenderId: "756148000218"
};
firebase.initializeApp(config);

export default firebase;