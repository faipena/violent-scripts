// ==UserScript==
// @name        GodzillaZ Tarotoo+
// @namespace   Violentmonkey Scripts
// @match       https://tarotoo.com/free-tarot*
// @grant       none
// @version     0.1
// @author      scorbutico
// @description 2/1/2025, 10:41:46 AM
// @downloadURL https://raw.githubusercontent.com/faipena/violent-scripts/refs/heads/main/tarotoo.js
// ==/UserScript==

const DEVELOPER_MODE = true;

const $ = selector => (document.querySelector(selector));
const $$ = selector => (document.querySelectorAll(selector));
window._setTimeout = window.setTimeout;

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
  // Developer mode
  if(DEVELOPER_MODE) {
    $("#header").remove();
  }
  window.setTimeout = (what,when) => {window._setTimeout(what, 0);};
  /* UI TWEAKING */
  // Hiddy shitty tooltips
  tarotManager.tipsManager.tipsElement.style.display = "none";
  tarotManager.tipsManager.asideAdElement.style.display = "none";
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

}

const loadTimer = setInterval(() => {
  if (tarotManager) {
    clearInterval(loadTimer);
    setTimeout(run, 50);
  }
}, 100);
