import loopTape from "./tsconf/looptape"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"
import smoothScrolling from "./utils/smoothScrolling"

document.addEventListener('DOMContentLoaded', () => {
  smoothScrolling()
  initAnchors()
  loopTape()
  initHeaderAnimation()
})
