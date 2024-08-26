// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfmpDSXiuCXOIR4P_VYN7KJWtjHwXX9_4",
  authDomain: "scrimba-practice-194b7.firebaseapp.com",
  projectId: "scrimba-practice-194b7",
  storageBucket: "scrimba-practice-194b7.appspot.com",
  messagingSenderId: "400317346226",
  appId: "1:400317346226:web:171c617138843481a6f4ab",
  measurementId: "G-8EWQ538VXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db }