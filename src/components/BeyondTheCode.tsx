import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Masonry from "./Masonry";
import { beyondTheCodeItems, beyondTheCodeContent } from "../data/beyondTheCodeData";

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
      className="relative z-[var(--z-section)] mx-auto overflow-hidden pt-[80px] pb-[90px] min-[641px]:pt-[110px] min-[641px]:pb-[120px]"
      id="beyond-the-code"
      aria-label="Beyond the Code"
    >
      {/* Subtle ambient glow behind the gallery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] left-1/2 z-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.07)_0%,transparent_65%)] motion-reduce:hidden"
      />

      <header
        ref={headerRef}
        className="relative z-[1] mx-auto mb-[24px] max-w-[760px] px-[24px] text-center min-[641px]:mb-[36px]"
      >
        <h2 className="m-0 mb-[16px] text-[34px] font-medium leading-[38px] text-white min-[641px]:text-[42px] min-[641px]:leading-[44px] min-[1025px]:text-[54px] min-[1025px]:leading-[56px]">
          Beyond the <span className="text-[var(--accentColor)]">Code</span>
        </h2>
        <p className="m-0 mx-auto max-w-[640px] text-[14px] font-light leading-[22px] text-[#a3a3a3] min-[641px]:text-[16px] min-[641px]:leading-[26px]">
          {beyondTheCodeContent.description}
        </p>
      </header>

      <div
        ref={galleryRef}
        className="relative z-[1] mx-auto my-[3vh] w-[var(--cWidth)] px-[3.8vw]"
      >
        <Masonry
          className="[&_[data-media]]:bg-[#0b0b12] [&_[data-media]_img]:[filter:grayscale(1)_brightness(0.92)_contrast(1.02)] [&_[data-media]_img]:[transition:filter_0.5s_ease,transform_0.8s_cubic-bezier(0.2,0.8,0.2,1),opacity_0.5s_ease] [&_[data-card]:hover_[data-media]_img]:[filter:grayscale(0)_brightness(1)_contrast(1)] [&_[data-card]:focus-visible_[data-media]_img]:[filter:grayscale(0)_brightness(1)_contrast(1)] motion-reduce:[&_[data-media]_img]:[transition:filter_0.01ms]"
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
          captions="hover"
          parallax={0.3}
          lightbox={true}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default BeyondTheCode;
