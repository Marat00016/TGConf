import { Fancybox } from "@fancyapps/ui"
import loopTape from "./tsconf/looptape"
import speakersSlider from "./tsconf/speakersSlider"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"
import smoothScrolling from "./utils/smoothScrolling"
import connectMap from "./utils/mapInit"
import initFutureSlider from "./tsconf/futureSlider"
import initTickets from "./tsconf/tickets"
import initBurgerModal from "./tsconf/menu"
import loadVideoModal from "./tsconf/loadVideoModal"
import './utils/validation';

document.addEventListener('DOMContentLoaded', () => {
  const instance = Fancybox;
  window.fancybox = instance;
  window.fancybox.bind("[data-fancybox]", {});
  
  smoothScrolling();
  initAnchors();
  loopTape();
  initHeaderAnimation();
  initFutureSlider();
  initTickets();
  connectMap();
  initBurgerModal();
  loadVideoModal();
  speakersSlider();
})
