// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAofZ8xZHUXkNVe23f-JnlXHbugF7tIkO0",
  authDomain: "fir-hello-world-cb9a9.firebaseapp.com",
  projectId: "fir-hello-world-cb9a9",
  storageBucket: "fir-hello-world-cb9a9.appspot.com",
  messagingSenderId: "234938677012",
  appId: "1:234938677012:web:59ec48df03a1549909b401",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init Services (use firestore to CRUD databse, get data)
export const db = getFirestore(app);
export const auth = getAuth(app);
