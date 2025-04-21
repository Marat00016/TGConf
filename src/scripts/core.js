import { Fancybox } from "@fancyapps/ui"
import loopTape from "./tsconf/looptape"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"
import smoothScrolling from "./utils/smoothScrolling"
import connectMap from "./utils/mapInit"
import initFutureSlider from "./tsconf/futureSlider"
import initTickets from "./tsconf/tickets"
import './utils/validation';

document.addEventListener('DOMContentLoaded', () => {
  const instance = Fancybox;
  instance.bind('[data-fancybox]', {});
  window.fancybox = instance
  
  smoothScrolling();
  initAnchors();
  loopTape();
  initHeaderAnimation();
  initFutureSlider();
  initTickets();
  connectMap();

})
