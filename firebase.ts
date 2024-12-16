// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuJb1k5EcoT5k68urSsYz0DF1szpFtmrk",
  authDomain: "lots-process-manager-372cf.firebaseapp.com",
  projectId: "lots-process-manager-372cf",
  storageBucket: "lots-process-manager-372cf.firebasestorage.app",
  messagingSenderId: "610544975752",
  appId: "1:610544975752:web:388cb61a69f87627c0043d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const db = getDatabase();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
