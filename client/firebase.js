import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyAgm48NDdkmQg1G8JUgMgs0EyvBDgxT79o",
  authDomain: "plantify-3b3a9.firebaseapp.com",
  projectId: "plantify-3b3a9",
  storageBucket: "plantify-3b3a9.appspot.com",
  messagingSenderId: "267170335326",
  appId: "1:267170335326:web:d80e2649e4f88703f102cf",
  measurementId: "G-971P0QZETG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export const db = getFirestore(app);
