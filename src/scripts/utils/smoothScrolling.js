import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function smoothScrolling() {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(time => {
        lenis.raf(time * 900);
    });

    gsap.ticker.lagSmoothing(0);

    window.scroll = {
        stopScroll: null,
        startScroll: null
    };
    window.scroll.stopScroll = () => lenis.stop();
    window.scroll.startScroll = () => lenis.start();
}
