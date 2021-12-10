import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXtvGh3sI1h30JZnxThgDjUgQM7FXz56M",
  authDomain: "aska-webpage.firebaseapp.com",
  projectId: "aska-webpage",
  storageBucket: "aska-webpage.appspot.com",
  messagingSenderId: "916349369138",
  appId: "1:916349369138:web:465e81c7be1e4ea58bb52b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// reference to database
export const _db = getFirestore();
