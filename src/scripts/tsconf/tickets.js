import Swiper from "swiper";
import 'swiper/css';

export default function initTickets() {
  if (!window.matchMedia('(max-width: 1024px)').matches) return;

  const slider = document.querySelector('.tickets__slider');

  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: 'auto',
    spaceBetween: 16
  })
}
