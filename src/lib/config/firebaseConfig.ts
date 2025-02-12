// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Setup .env file for this
const firebaseConfig = {
  apiKey: "AIzaSyDrojvy9wRpIIZEyrDyLJG4MNCTCRoi0bQ",
  authDomain: "taskmanagement-139cf.firebaseapp.com",
  projectId: "taskmanagement-139cf",
  storageBucket: "taskmanagement-139cf.firebasestorage.app",
  messagingSenderId: "359626291542",
  appId: "1:359626291542:web:95b2418d3c571e6f2cfef7",
  measurementId: "G-B35FP3VCP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); // Authorizing the app
const provider = new GoogleAuthProvider(); // authorising from google

export { auth, provider, analytics };

//  --> for hosting

/* npm install -g firebase-tools

firebase login

firebase init

firebase deploy

*/
