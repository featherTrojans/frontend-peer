// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi-mitwXb4VYIZo9p-FXCwzMeHSsknCnY",
  authDomain: "feather-340809.firebaseapp.com",
  projectId: "feather-340809",
  storageBucket: "feather-340809.appspot.com",
  messagingSenderId: "310047587893",
  appId: "1:310047587893:web:2775171187465f4539fb7c"
};

// Initialize Firebase
let app;

if(firebase.apps.length === 0){
    app = initializeApp(firebaseConfig)
}else{
    app = firebase.config()
}

const db = app.firestore();

export {db}