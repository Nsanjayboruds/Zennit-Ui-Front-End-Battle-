// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyDn_VV6uLI-LaIl_D2KHR7fFIUOFIWXRqg",
  authDomain: "mindspace-13fe5.firebaseapp.com",
  projectId: "mindspace-13fe5",
 storageBucket: "mindspace-13fe5.appspot.com",

  messagingSenderId: "563084313271",
  appId: "1:563084313271:web:e01f81bafecd7db0514332"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export `db`
export { db };
