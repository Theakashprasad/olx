// import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfaucbXTV5LSFsTx7lTcVJGU1_-OEhWWg",
  authDomain: "olx2nd-d8cdb.firebaseapp.com",
  projectId: "olx2nd-d8cdb",
  storageBucket: "olx2nd-d8cdb.appspot.com",
  messagingSenderId: "937351602323",
  appId: "1:937351602323:web:f618e4539e12ccccb76d66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();