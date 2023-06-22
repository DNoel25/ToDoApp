import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCArzsixq5F7ssU1afkiWji4b2RGmgO6Og",
  authDomain: "toapp-60f8f.firebaseapp.com",
  projectId: "toapp-60f8f",
  storageBucket: "toapp-60f8f.appspot.com",
  messagingSenderId: "799420991357",
  appId: "1:799420991357:web:b8c8f15eb9994992b56e14",
  measurementId: "G-EKZSV30K10"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };