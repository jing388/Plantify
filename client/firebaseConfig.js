import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import
import {createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgm48NDdkmQg1G8JUgMgs0EyvBDgxT79o",
  authDomain: "plantify-3b3a9.firebaseapp.com",
  projectId: "plantify-3b3a9",
  storageBucket: "plantify-3b3a9.appspot.com",
  messagingSenderId: "267170335326",
  appId: "1:267170335326:web:d80e2649e4f88703f102cf",
  measurementId: "G-971P0QZETG"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const signIn = signInWithEmailAndPassword;
export const sendEmail = sendEmailVerification;
export const signOutUser = signOut;
export const googleProvider = provider;
export const db = getFirestore(app); // Add this line to export Firestore instance
export const createUserEmail = createUserWithEmailAndPassword;