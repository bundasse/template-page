import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDsav8VPboDFXUkcvkMWdw0DSpPCOLmJ7o",
  authDomain: "template-page-ff569.firebaseapp.com",
  projectId: "template-page-ff569",
  storageBucket: "template-page-ff569.appspot.com",
  messagingSenderId: "1002282674128",
  appId: "1:1002282674128:web:675428f686618c93157bd5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth, db, storage}