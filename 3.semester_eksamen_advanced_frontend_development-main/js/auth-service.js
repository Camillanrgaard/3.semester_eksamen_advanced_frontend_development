import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-service.js";

initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});

export const login = () => {
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      document.querySelector(".login-message").innerHTML = "";
      // ...
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".login-message").innerHTML = error.message;
    });
};

const logout = () => {
  signOut(auth);
  console.log("Logged out...");
};

function appendAdminFunction() {
  let htmlTemplate = "";
  htmlTemplate = /*html*/ `
        <form id="sponsorForm">
        <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')" />
        <img id="imagePreview" class="image-preview" />
        <button type="button" name="button" id="btn-create">Tilføj sponsor</button>
      </form>
    `;

  document.querySelector(".loggedinSponsor").innerHTML = htmlTemplate;
}
