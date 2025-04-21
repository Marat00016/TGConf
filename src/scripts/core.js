import loopTape from "./tsconf/looptape"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"
import smoothScrolling from "./utils/smoothScrolling"
import connectMap from "./utils/mapInit"
import initFutureSlider from "./tsconf/futureSlider"
import initTickets from "./tsconf/tickets"

document.addEventListener('DOMContentLoaded', () => {
  smoothScrolling();
  initAnchors();
  loopTape();
  initHeaderAnimation();
  initFutureSlider();
  initTickets();
  connectMap();
})
