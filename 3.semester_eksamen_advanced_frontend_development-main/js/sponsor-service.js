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

import Glide from "https://cdn.skypack.dev/@glidejs/glide";

export default class Sponsor {
  constructor() {
    this.sponsorRef = collection(_db, "sponsors");
    this.readData();
  }

  readData() {
    // ========== READ ==========
    // watch the database ref for changes
    onSnapshot(this.sponsorRef, (snapshot) => {
      // mapping snapshot data from firebase in to user objects
      this.sponsors = snapshot.docs.map((doc) => {
        const sponsor = doc.data();
        sponsor.id = doc.id;
        return sponsor;
      });
      //this.appendSponsors(this.sponsors);
      initSlider(this.sponsors);
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
        document
          .querySelector("#" + previewId)
          .setAttribute("src", event.target.result);
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
      image: image,
    };
    const sponsorRef = doc(this.sponsorRef, id);
    updateDoc(sponsorRef, sponsorToUpdate);
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
  document.querySelector("#sponsor-slider").innerHTML = htmlTemplate;

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
