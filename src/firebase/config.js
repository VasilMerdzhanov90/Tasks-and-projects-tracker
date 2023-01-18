import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCDbYn-yOFzqsEBlRIX0CCY5s4fJwcXIoY",
    authDomain: "finalproject-1e3fd.firebaseapp.com",
    projectId: "finalproject-1e3fd",
    storageBucket: "finalproject-1e3fd.appspot.com",
    messagingSenderId: "1064483913424",
    appId: "1:1064483913424:web:152f490a65e4a7d61f68d5"
};

//init firebase
firebase.initializeApp(firebaseConfig);


//init auth and firestore
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//setup timestamp 
const timestamp = firebase.firestore.Timestamp;

//storage initialize
const projectStorage = firebase.storage()

export { projectAuth, projectFirestore, timestamp, projectStorage };