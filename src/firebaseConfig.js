// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl-C1eMeHoDfI0DnFNv38QBWq7BKA4FPs",
  authDomain: "shopping-automation-47de6.firebaseapp.com",
  projectId: "shopping-automation-47de6",
  storageBucket: "shopping-automation-47de6.appspot.com",
  messagingSenderId: "154888655170",
  appId: "1:154888655170:web:609c61d5596288549cf8db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app,auth,firestore}