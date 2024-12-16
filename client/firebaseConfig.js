import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgm48NDdkmQg1G8JUgMgs0EyvBDgxT79o",
  authDomain: "plantify-3b3a9.firebaseapp.com",
  projectId: "plantify-3b3a9",
  storageBucket: "plantify-3b3a9.appspot.com",
  messagingSenderId: "267170335326",
  appId: "1:267170335326:web:d80e2649e4f88703f102cf",
  measurementId: "G-971P0QZETG"
};

// Check if the app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app); // Initialize Auth

export { auth }; // Export the auth instance