import { _db } from "./firebase-service.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

let _selectedImgFile = "";
let _selectedSponsorId = "";
import Glide from "https://cdn.skypack.dev/@glidejs/glide";

export default class Sponsor {
  constructor() {
    if (location.pathname.includes("index.html" || "admin.html")) {
      this.sponsorRef = collection(_db, "sponsors");
      this.readData();
    }
  }

  readData() {
    // ========== READ ==========
    // watch the database ref for changes
    onSnapshot(this.sponsorRef, (snapshot) => {
      // mapping snapshot data from firebase in to sponsor objects
      this.sponsors = snapshot.docs.map((doc) => {
        const sponsor = doc.data();
        sponsor.id = doc.id;
        return sponsor;
      });
      initSlider(this.sponsors);
      append_edit_sponsors(this.sponsors);
      console.log(this.sponsors);
    });
  }

  appendSponsors(sponsors) {
    let htmlTemplate = "";
    for (const sponsor of sponsors) {
      htmlTemplate += /*html*/ `
      <div class="sponsor_logo">
      <img src="${sponsor.img}">
      </div>
      `;
    }
    document.querySelector(".sponsor_flex").innerHTML = htmlTemplate;
  }

  previewImage(file, previewId) {
    if (file) {
      _selectedImgFile = file;
      let reader = new FileReader();
      reader.onload = (event) => {
        console.log(event);
        document.querySelector("#" + previewId).setAttribute("src", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  createSponsor() {
    // references to the input fields
    let imgInput = document.querySelector("#imagePreview");

    const newSponsor = {
      img: imgInput.src,
    };
    addDoc(this.sponsorRef, newSponsor);
  }

  updateSponsor(id, image) {
    const sponsorToUpdate = {
      img: document.querySelector("#imagePreviewUpdate").src,
    };
    const sponsorRef = doc(this.sponsorRef, id);
    updateDoc(sponsorRef, sponsorToUpdate);
  }

  selectSponsor(id) {
    _selectedSponsorId = id;
    const user = this.sponsors((sponsor) => sponsor.id == _selectedSponsorId);
    // references to the input fields
    document.querySelector("#imagePreviewUpdate").src = user.img;
  }

  deleteSponsor(id) {
    const docRef = doc(this.sponsorRef, id);
    deleteDoc(docRef);
  }
}

function initSlider(sponsors) {
  let htmlTemplate = "";
  for (const sponsor of sponsors) {
    htmlTemplate += /*html*/ `
		<li class="glide__slide">
    <img src="${sponsor.img}">
		</li>
    `;
  }
  if (document.querySelector("#sponsor-slider")) {
    document.querySelector("#sponsor-slider").innerHTML = htmlTemplate;
  }

  new Glide(".glide", {
    type: "carousel",
    autoplay: 3000,
    hoverpause: false,
    rewind: true,
    perView: 6,
    breakpoints: {
      600: {
        perView: 3,
      },
      992: {
        perView: 5,
      },
    },
  }).mount();
}

export let append_edit_sponsors = (sponsors) => {
  let htmlTemplate = "";
  for (const sponsor of sponsors) {
    htmlTemplate += /*html*/ `
		<article class="sponsor_editable">
    <img src="${sponsor.img}">
    <button class="btn-update-sponsor" data-id="${sponsor.id}">Update</button>
    <button class="btn-delete-sponsor" data-id="${sponsor.id}">Delete</button>
		</article>
    `;
  }
  document.querySelector("#sponsor_edit").innerHTML = htmlTemplate;

  //attach events to update and delete btns
  document.querySelectorAll(".btn-update-sponsor").forEach((btn) => {
    btn.onclick = () => selectUser(btn.getAttribute("data-id"));
  });

  document.querySelectorAll(".btn-delete-sponsor").forEach((btn) => {
    btn.onclick = () => deleteUser(btn.getAttribute("data-id"));
  });
};
