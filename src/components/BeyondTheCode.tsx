import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Masonry from "./Masonry";
import { beyondTheCodeItems, beyondTheCodeContent } from "../data/beyondTheCodeData";
import "./styles/BeyondTheCode.css";

gsap.registerPlugin(ScrollTrigger);

const getColumnWidth = (width: number): number => {
  if (width > 1024) return 280;
  if (width > 640) return 220;
  return 160;
};

const BeyondTheCode = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [columnWidth, setColumnWidth] = useState<number>(() =>
    typeof window !== "undefined" ? getColumnWidth(window.innerWidth) : 280
  );

  useEffect(() => {
    const onResize = () => setColumnWidth(getColumnWidth(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="beyond-section"
      id="beyond-the-code"
      aria-label="Beyond the Code"
    >
      <header ref={headerRef} className="beyond-header">
        <h2>
          Beyond the <span>Code</span>
        </h2>
        <p>{beyondTheCodeContent.description}</p>
      </header>

      <div ref={galleryRef} className="beyond-gallery px-[3.8vw] my-[3vh]">
        <Masonry
          className="beyond-masonry"
          items={beyondTheCodeItems}
          columns="auto"
          columnWidth={columnWidth}
          gap={14}
          radius={14}
          animateFrom="bottom"
          stagger={0.05}
          duration={0.6}
          blurToFocus
          revealOnScroll
          hoverEffect="lift"
          captions="none"
          parallax={0.3}
          lightbox={false}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default BeyondTheCode;
