import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination])

export default function speakersSlider() {
  const slider = document.querySelector('.speakers__slider');
  const leftButton = document.querySelector('.speakers__button-navigation--to-left')
  const rightButton = document.querySelector('.speakers__button-navigation--to-right')
  const pagination = document.querySelector('.speakers__pagination')

  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 0,
    initialSlide: 4,
    centeredSlides: true,
    navigation: {
      prevEl: leftButton,
      nextEl: rightButton
    },
    breakpoints: {
      0: {
        pagination: {
          el: pagination,
        }
      },
      1024: {}
    }
  })
}
