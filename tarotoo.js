// ==UserScript==
// @name        GodzillaZ Tarotoo+
// @namespace   Violentmonkey Scripts
// @match       https://tarotoo.com/free-tarot*
// @match       https://tarotoo.com/it/tarocchi-gratis*
// @grant       none
// @version     0.3
// @author      faipena
// @description 2/1/2025, 10:41:46 AM
// @downloadURL https://raw.githubusercontent.com/faipena/violent-scripts/refs/heads/main/tarotoo.js
// ==/UserScript==

const cardsText = [
  "Kinderata con Michel",
  "Chiama il maestro Pannofino",
  "Credi nel 💜 delle carte",
  "Cosa farebbe Noemi? 🧙‍♀️",
  "Exurgit MAGICA EUROPA",
  "FAI PENA",
  "Bebebe",
  "Dario 🙏 ci manchi",
  "Potresti essere il prossimo young pannofino",
  "Ne vero?",
  "🐝 AIUTO 🐝",
  "  ⃤ 👁️",
  "A Giugno",
];

const $ = selector => (document.querySelector(selector));
const $$ = selector => (document.querySelectorAll(selector));
window._setTimeout = window.setTimeout;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function _removeAllEventListeners(element) {
    const clonedElement = element.cloneNode(true); // Deep clone the element
    element.parentNode.replaceChild(clonedElement, element);
    return clonedElement; // Return the new element reference
}

function removeAllEventListeners(selector) {
    return _removeAllEventListeners($(selector));
}

function replaceOnClick(selector, newEvent) {
  const newElement = removeAllEventListeners(selector);
  newElement.addEventListener("click", newEvent);
}

function run() {
  console.log("[GZTAROT] Let gooo");
  window.setTimeout = (what,when) => {window._setTimeout(what, 0);};
  /* UI TWEAKING */
  // Hiddy shitty tooltips
  tarotManager.tipsManager.tipsElement.style.display = "none";
  tarotManager.tipsManager.asideAdElement.style.display = "none";
  $("#header").remove();
  $(".breadcrumbs").textContent = "GodzillaZ: Tarologia E-VO-LU-TI-VA";
  const randomizedTexts = shuffle(cardsText);
  $("#state-default div h6").textContent = randomizedTexts[0];
  $("#state-ai div h6").textContent = randomizedTexts[1];
  const sheet = window.document.styleSheets[0];
  sheet.insertRule(".result-iframe { display: none !important; }", sheet.cssRules.length);
  $(".face").style.width = "50%";
  window._setTimeout(() => {$(".face").src='https://i.imgur.com/IPKdH4x.png';}, 1500);

  /* ANIMATIONS */
  $("#state-default").style.transition = "none";
  $$(".card-axis").forEach((element) => {element.style.transition = "none";});
  $("#lobby-list").style.transition = "none";
  tarotManager.showParticles = () => {};
  $(".lobby-list-inner").style.transition = "none";
  // Fast result reading
  document.documentElement.style.setProperty('--result-delay', 0);
  document.documentElement.style.setProperty('--result-speed', 0);
  /* JS DELAYS */
  replaceOnClick("#state-default", () => {tarotManager.setState("default");});
  replaceOnClick("#state-ai", () => {tarotManager.setState("default");});

}

const loadTimer = setInterval(() => {
  if (tarotManager) {
    clearInterval(loadTimer);
    setTimeout(run, 50);
  }
}, 100);
