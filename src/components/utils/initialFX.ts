import gsap from "gsap";
import { getSmoother } from "../../context/smoother";

export function initialFX() {
  document.body.style.overflowY = "auto";
  getSmoother()?.paused(false);
  const mainElem = document.getElementsByTagName("main")[0];
  if (mainElem) mainElem.classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#000000",
    duration: 0.5,
    delay: 0.15,
  });

  gsap.fromTo(
    [".header", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.05,
    }
  );

  const heroItems = gsap.utils.toArray<HTMLElement>("#landingDiv .hero-animate");
  if (heroItems.length > 0) {
    gsap.fromTo(
      heroItems,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "transform",
      }
    );
  }

  const heroVisual = document.querySelector("#landingDiv .hero-visual");
  if (heroVisual) {
    gsap.fromTo(
      heroVisual,
      { opacity: 0, scale: 1.03 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.1,
        clearProps: "transform",
      }
    );
  }
}
