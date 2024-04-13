// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-university-management.firebaseapp.com",
  projectId: "mern-university-management",
  storageBucket: "mern-university-management.appspot.com",
  messagingSenderId: "881757319591",
  appId: "1:881757319591:web:2c881bdf03f55f5840c682",
  measurementId: "G-D38DQVMD4M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);