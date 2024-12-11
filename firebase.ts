// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXFQB_JiNeZKAiE8VRCW2OHTHBAkuY6Hw",
  authDomain: "lots-process-manager.firebaseapp.com",
  projectId: "lots-process-manager",
  storageBucket: "lots-process-manager.firebasestorage.app",
  messagingSenderId: "756891560765",
  appId: "1:756891560765:web:452bb9c035546818163354",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const db = getDatabase();
export const auth = getAuth(app);
