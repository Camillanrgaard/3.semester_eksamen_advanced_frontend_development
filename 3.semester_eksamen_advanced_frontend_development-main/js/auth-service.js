import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-service.js";

initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    // User is signed out
  }
});

export const login = async () => {
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      document.querySelector(".login-message").innerHTML = "";
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".login-message").innerHTML = "Invalid email or password";
    });
};

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    firebase.auth().setPersistence.SESSION;
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export const logout = () => {
  signOut(auth);
  console.log("Logged out...");
};

if (auth.currentUser === null && location.pathname.includes("./admin.html")) {
  location.href = "./index.html";
}
