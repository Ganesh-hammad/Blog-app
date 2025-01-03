// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-f0ec2.firebaseapp.com",
  projectId: "blog-app-f0ec2",
  storageBucket: "blog-app-f0ec2.firebasestorage.app",
  messagingSenderId: "454724396467",
  appId: "1:454724396467:web:18db1067cc43859b1597c6",
  measurementId: "G-5RVV2BESHR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);