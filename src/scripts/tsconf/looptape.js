import horizontalLoop from "../utils/horizontalLoop.js";
import gsap from "gsap";

export default function loopTape() {
  const loopTapes = document?.querySelectorAll(".js-tape-loop")

  loopTapes.forEach((tape) => {
    if (!tape) return;

    const reversed = Boolean(tape?.dataset?.reversed)
    const speed = Number(tape?.dataset?.speed)
    const duplicate = Boolean(tape?.dataset?.duplicate)

    if (duplicate) {
      const copyOfChildren = [...tape.cloneNode(true).children]
      copyOfChildren.forEach((item) => { tape.appendChild(item) })
    }

    const children = tape.children

    horizontalLoop(children, {
      repeat: -1,
      speed: speed,
      paddingRight: parseFloat(gsap.getProperty(children[0], "marginRight", "px")),
      reversed: reversed,
    })
  })
}
