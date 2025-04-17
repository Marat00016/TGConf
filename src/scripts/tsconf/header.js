export default function initHeaderAnimation() {
  const header = document.querySelector(".header");
  
  if(!header) return
  
  window.addEventListener("scroll", (event) => {
    event.currentTarget.scrollY >= 40 ?
      header.classList.add('--active') :
      header.classList.remove('--active')
  })
}
