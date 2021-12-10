import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js";
import { showLoader } from "./loader-component.js";

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change

const _auth = getAuth();

onAuthStateChanged(_auth, (user) => {
  console.log(user);
  if (user) {
    userAuthenticated(user);
  } else {
    // User is signed out
    userNotAuthenticated();
  }
});

function userAuthenticated() {
  navigateTo("#/");
  showLoader(false);
}

function userNotAuthenticated() {
  navigateTo("#/login");

  // Firebase UI configuration
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "#/",
  };
  // Init Firebase UI Authentication
  if (!_firebaseUI) {
    _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
  }
  _firebaseUI.start("#firebaseui-auth-container", uiConfig);
  showLoader(false);
}

function logout() {
  signOut(_auth);
}

function showLoader(show) {
  let loader = document.querySelector("#loader");
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

// =========== attach events =========== //
document.querySelector("#btn-logout").onclick = () => logout();
