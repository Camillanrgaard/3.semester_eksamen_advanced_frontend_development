import { _db } from "./firebase-service.js";
import { showLoader } from "./loader-component.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

export default class Event {
  constructor() {
    this.eventRef = collection(_db, "events");
    this.readData();
  }

  readData() {
    // ========== READ ==========
    // watch the database ref for changes
    onSnapshot(this.eventRef, (snapshot) => {
      // mapping snapshot data from firebase in to user objects
      this.events = snapshot.docs.map((doc) => {
        const event = doc.data();
        event.id = doc.id;
        return event;
      });
      this.appendEvents(this.events);
      this.filterEvents();
      console.log(this.events);
      showLoader(false);
    });
  }

  // append events to the DOM
  appendEvents(events) {
    let htmlTemplate = "";
    for (const event of events) {
      htmlTemplate += /*html*/ `
    <article>
      <p>${event.date}</p>
      <div class="whitespace"></div>
      <p>${event.name}</p>
      <div class="whitespace"></div>
      <button class="button4 dark-green" onclick="showDetailView('${event.id}')">Læs mere & tilmeld</button>
    </article>
    `;
    }

    document.querySelector("#content").innerHTML = htmlTemplate;
  }

  showDetailView(id) {
    const event = this.events.find((event) => event.id == id);
    document.querySelector("#calender-modal").style.display = "block";
    let htmlTemplate = "";
    htmlTemplate = /*html*/ `
    <div class="flex2">
    <span
      onclick="document.getElementById('calender-modal').style.display='none'"
      >&times;</span
    >
  </div>
    <div class="modal-content">
    <h3>${event.name}</h3>
    <div class="line5"></div>
    <p class="modal-text-p">${event.description}</p>
    <a href="${event.link}" target="_blank"><button class="button4 light-green">Tilmeld</button></a>
    </div>`;
    document.querySelector(".modal-text2").innerHTML = htmlTemplate;
  }

  //filter
  filterEvents() {
    document.addEventListener("change", () => {
      const checkedValues = [...document.querySelectorAll(".eventCheckBox")]
        .filter((input) => input.checked)
        .map((input) => input.value);
      const result = this.events.filter((item) => {
        if (item.category.some((tag) => tag == checkedValues)) {
          return item;
        }
      });
      this.appendEvents(result);
      if (checkedValues.length < 1) {
        this.appendEvents(this.events);
      }
    });
  }

  // search
  search(searchValue) {
    searchValue = searchValue.toLowerCase();
    console.log(searchValue);

    let results = [];

    for (const eventName of this.events) {
      console.log(eventName);
      let name = eventName.name.toLocaleLowerCase();
      if (name.includes(searchValue)) {
        results.push(eventName);
      }
    }

    this.appendEvents(results);
  }
}
