export default function initBurgerModal() {
  const menu = document.querySelector('.js-burger-menu');
  const openTrigger = document.querySelector('.js-open')
  const activeClass = '--is-active'

  if (!menu) return;

  const closeTriggers = menu.querySelectorAll('.js-close')

  openTrigger.addEventListener('click', () => {
    menu.classList.add(activeClass)
  })

  closeTriggers.forEach((item) => {
    item.addEventListener('click', () => {
      menu.classList.remove(activeClass)
      if (window.location.pathname.includes('awards')) {
        window.location.href = window.location.origin
      }
    })    
  })
}
