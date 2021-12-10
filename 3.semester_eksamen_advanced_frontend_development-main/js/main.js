"use strict";
// Load header og footer ==========================================
async function loadHeader() {
  const response = await fetch("../components/header.html");
  const header = await response.text();
  document.querySelector("body").insertAdjacentHTML("afterbegin", header);
}

async function loadFooter() {
  const response = await fetch("../components/footer.html");
  const footer = await response.text();
  document.querySelector("body").insertAdjacentHTML("beforeend", footer);
}

loadHeader();
loadFooter();

/**
 * Toggle menu for mobile devices
 */
const burger = document.querySelector(".burger");
let navlist = document.querySelector(".nav-list");

let toggleMenu = () => {
  burger.classList.toggle("open");
  navlist.classList.toggle("menu-open");
};

// Import Event class functions ==========================================
import Event from "./event-service.js";
let _event = new Event();

window.toggleMenu = () => toggleMenu();
window.search = (value) => _event.search(value);
window.showDetailView = (id) => _event.showDetailView(id);

// Import Sponsor class functions ======================================
import Sponsor from "./sponsor-service.js";
let _sponsor = new Sponsor();

document.querySelector("#btn-create").onclick = () => createSponsor();
window.previewImage = (file, previewId) => _sponsor.previewImage(file, previewId);
window.createSponsor = () => _sponsor.createSponsor();

// Hero button section ==================================================

try {
  document.querySelector(".button-section").scrollLeft = 80;
} catch (error) {
  console.error();
}

// Hero Slider ===========================================================

let slideSections;
let activeSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  slideSections = document.querySelectorAll(".frontpage-hero");

  showSlide(0);
  setInterval(() => setActiveSlide(), 10000);
});

/**
 * Hiding all slideSections
 */
let hideAllSlideSections = () => {
  for (const slideSection of slideSections) {
    slideSection.style.display = "none";
  }
};

/**
 * displaying a slide section by given index
 */

let showSlide = (index) => {
  hideAllSlideSections(); // start by hiding all slides sections
  activeSlide = index;
  slideSections[activeSlide].style.display = "flex"; // display slide section by activeSlide number
};
/**
 * Chaning and displaying the active slide section
 * - changing the global variable activeSlide and display the new active slideSection
 */

let setActiveSlide = () => {
  if (activeSlide < slideSections.length - 1) {
    // checking if activeSlide is lower than the number of slide sections
    activeSlide++; // incrementing activeSlide number (+1)
  } else {
    // if not, change the activeSlide back to the first one
    activeSlide = 0;
  }
  hideAllSlideSections(); //hide all slides
  slideSections[activeSlide].style.display = "flex"; // display slide section by activeSlide number
};
