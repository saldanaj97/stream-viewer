import { EmblaOptionsType } from "embla-carousel";

import "@/styles/embla.css";
import TopStreamCarousel from "./StreamCarousel";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const Carousel = () => (
  <>
    <TopStreamCarousel options={OPTIONS} slides={SLIDES} />
  </>
);
