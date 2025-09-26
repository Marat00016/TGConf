export default function initHeaderAnimation() {
  const header = document.querySelector(".header");
  const headerLinks = header.querySelectorAll('.header__nav-link');
  const ticketButton = document.querySelector(".header__button-ticket");
  const attentionTicketButton = document.querySelector(".attention__button-ticket");

  if (!header) return;

  if (window.scrollY >= 40) {
    header.classList.add('--active')
  }
  
  window.addEventListener("scroll", (event) => {
    event.currentTarget.scrollY >= 40 ?
      header.classList.add('--active') :
      header.classList.remove('--active')
  })

  headerLinks.forEach((item) => {
    item.addEventListener('click', () => {
      if (window.location.pathname.includes('awards')) {
        window.location.href = window.location.origin
      }
    })    
  })
  ticketButton.addEventListener('click', () => {
    if (window.location.pathname.includes('awards')) {
      window.location.href = window.location.origin
    }
  })
  attentionTicketButton.addEventListener('click', () => {
    if (window.location.pathname.includes('awards')) {
      window.location.href = window.location.origin
    }
  })
}
