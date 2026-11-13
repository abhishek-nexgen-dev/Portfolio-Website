import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SmootherInstance {
  locomotive: LocomotiveScroll | null;
  scrollTo: (
    target: string | HTMLElement | number,
    smooth?: boolean,
    offset?: string | number
  ) => void;
  paused: (isPaused?: boolean) => boolean | void;
  scrollTop: (value?: number) => number | void;
  destroy: () => void;
  refresh: () => void;
}

let smootherInstance: SmootherInstance | null = null;
let isScrollPaused = false;

export function initLocomotiveScroll(): SmootherInstance {
  if (typeof window === "undefined") {
    return {
      locomotive: null,
      scrollTo: () => {},
      paused: () => false,
      scrollTop: () => 0,
      destroy: () => {},
      refresh: () => {},
    };
  }

  if (smootherInstance && smootherInstance.locomotive) {
    return smootherInstance;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth ticker coordination between GSAP and Locomotive Scroll
  gsap.ticker.lagSmoothing(0);

  const locomotive = new LocomotiveScroll({
    lenisOptions: {
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    },
    scrollCallback: () => {
      ScrollTrigger.update();
    },
    initCustomTicker: (render: () => void) => {
      gsap.ticker.add(render);
    },
    destroyCustomTicker: (render: () => void) => {
      gsap.ticker.remove(render);
    },
  });

  const refreshHandler = () => {
    locomotive.resize();
  };
  ScrollTrigger.addEventListener("refresh", refreshHandler);

  smootherInstance = {
    locomotive,
    scrollTo: (
      target: string | HTMLElement | number,
      smooth = true,
      offset = 0
    ) => {
      if (typeof target === "string" && target.startsWith("#")) {
        const el = document.querySelector(target);
        if (el) {
          locomotive.scrollTo(el as HTMLElement, {
            immediate: !smooth,
            offset: typeof offset === "number" ? offset : 0,
          });
          return;
        }
      }
      if (typeof target === "string" || typeof target === "number" || target instanceof HTMLElement) {
        locomotive.scrollTo(target as HTMLElement, {
          immediate: !smooth,
          offset: typeof offset === "number" ? offset : 0,
        });
      }
    },
    paused: (isPaused?: boolean) => {
      if (isPaused === undefined) {
        return isScrollPaused;
      }
      isScrollPaused = isPaused;
      if (isPaused) {
        locomotive.stop();
      } else {
        locomotive.start();
      }
    },
    scrollTop: (value?: number) => {
      if (typeof value === "number") {
        locomotive.scrollTo(value, { immediate: true });
        return;
      }
      return window.scrollY;
    },
    destroy: () => {
      ScrollTrigger.removeEventListener("refresh", refreshHandler);
      locomotive.destroy();
      smootherInstance = null;
    },
    refresh: () => {
      locomotive.resize();
      ScrollTrigger.refresh();
    },
  };

  return smootherInstance;
}

export const setSmoother = (value: SmootherInstance | null) => {
  smootherInstance = value;
};

export const getSmoother = (): SmootherInstance | null => {
  if (!smootherInstance && typeof window !== "undefined") {
    return initLocomotiveScroll();
  }
  return smootherInstance;
};
