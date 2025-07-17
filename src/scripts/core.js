import { Fancybox } from "@fancyapps/ui"
import loopTape from "./tsconf/looptape"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"
import smoothScrolling from "./utils/smoothScrolling"
import connectMap from "./utils/mapInit"
import initFutureSlider from "./tsconf/futureSlider"
import initTickets from "./tsconf/tickets"
import initBurgerModal from "./tsconf/menu"
import loadVideoModal from "./tsconf/loadVideoModal"
import './utils/validation';
import submitForm from './utils/partner';

document.addEventListener('DOMContentLoaded', () => {
  const instance = Fancybox;
  window.fancybox = instance
  window.fancybox.bind("[data-fancybox]", {})
  
  smoothScrolling();
  initAnchors();
  loopTape();
  initHeaderAnimation();
  initFutureSlider();
  initTickets();
  connectMap();
  initBurgerModal();
  loadVideoModal();
})
