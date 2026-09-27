// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNFdG4LaAQWCwWw1rbOApLQafqFW4ob40",
  authDomain: "sports-cred.firebaseapp.com",
  projectId: "sports-cred",
  storageBucket: "sports-cred.firebasestorage.app",
  messagingSenderId: "1049212545392",
  appId: "1:1049212545392:web:ea209e178ed2595a1407b5",
  measurementId: "G-JM9BC3VXJN"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
