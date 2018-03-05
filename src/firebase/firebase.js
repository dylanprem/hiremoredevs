import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAJutexjlLmJxmNca1t4lErfKmdWrwD6VY",
    authDomain: "hiremoredevs.firebaseapp.com",
    databaseURL: "https://hiremoredevs.firebaseio.com",
    projectId: "hiremoredevs",
    storageBucket: "",
    messagingSenderId: "494437200930"

};

if (!firebase.apps.length){
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();




export {
  db,
  auth,

};
