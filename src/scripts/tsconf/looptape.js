import horizontalLoop from "../utils/horizontalLoop.js";
import gsap from "gsap";

export default function loopTape() {
  const loopTapes = document?.querySelectorAll(".js-tape-loop")

  loopTapes.forEach((tape) => {
    if (!tape) return;

    const reversed = Boolean(tape?.dataset?.reversed)
    const speed = Number(tape?.dataset?.speed)
    const modal = Boolean(tape?.dataset?.modal)
    const duplicate = Boolean(tape?.dataset?.duplicate)

    if (duplicate) {
      const copyOfChildren = [...tape.cloneNode(true).children]
      copyOfChildren.forEach((item) => { tape.appendChild(item) })
    }

    const children = tape.children

    const tl = horizontalLoop(children, {
      repeat: -1,
      speed: speed,
      paddingRight: parseFloat(gsap.getProperty(children[0], "marginRight", "px")),
      reversed: reversed,
    })

    if (modal) {
      const buttons = tape.querySelectorAll('button')

      if (!buttons.length) return

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          tl.pause()
        })
      })

      window.fancybox.bind("[data-fancybox]", {
        on: {
          "*": (_, eventName) => {
            if (eventName === 'close') {
              tl
                .play()
                .reversed(true)
            }
          },
        },
      })
    }
  })
}
