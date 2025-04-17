import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function initAnchors() {
  document.addEventListener('click', event => {
    if (event.target.matches('a') || event.target.closest('a')) {
      const link = event.target.matches('a') ? event.target : event.target.closest('a');
      const hash = link.hash;

      if (hash && hash.startsWith('#to-')) {
        event.preventDefault();

        const elementToScroll = document.getElementById(hash.replace(/^#to\-/, ''));
        if (elementToScroll) {
          if (window.menuOpen) {
            window.closeMenu();
          } else {
            console.log('menu not open');
          }

          gsap.to(window, {
            duration: 1.25,
            ease: 'power3.out',
            scrollTo: {
              offsetY: 120,
              y: elementToScroll,
              autoKill: false
            }
          });
        }
      }
    }
  });
}
