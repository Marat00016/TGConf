import loopTape from "./tsconf/looptape"
import initHeaderAnimation from "./tsconf/header"
import initAnchors from "./utils/anhors"

document.addEventListener('DOMContentLoaded', () => {
  initAnchors()
  loopTape()
  initHeaderAnimation()
})
