import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechSkills from "./TechSkills";
import Testimonials from "./Testimonials";
import Exploring from "./Exploring";
import setSplitText from "./utils/splitText";

// Code-split: the WebGL glow trail and the 2.2 MB TechStack 3D scene
// (three + @react-three/*) are NOT part of the initial bundle. They
// load only when needed (idle time / near viewport), cutting the
// initial JS transfer by ~60-70%.
const GlowCursor = lazy(() => import("./GlowCursor"));
const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  // WebGL glow trail only makes sense with a fine (mouse) pointer,
  // and only after the browser is idle — never on the critical path.
  const [isFinePointer] = useState<boolean>(
    () => window.matchMedia("(pointer: fine)").matches
  );
  const [glowReady, setGlowReady] = useState(false);
  useEffect(() => {
    if (!isFinePointer) return;
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback?.call(window, () => setGlowReady(true), { timeout: 1500 })
      ?? window.setTimeout(() => setGlowReady(true), 1200);
    return () => {
      const w = window as unknown as {
        cancelIdleCallback?: (id: number) => void;
        clearTimeout: typeof clearTimeout;
      };
      w.cancelIdleCallback?.(idle as number);
      w.clearTimeout(idle as unknown as ReturnType<typeof setTimeout>);
    };
  }, [isFinePointer]);

  // Defer TechStack (2.2 MB three-ecosystem chunk) until the user
  // scrolls near it. A same-height placeholder preserves scroll height
  // so ScrollSmoother / ScrollTrigger measurements stay correct.
  const [techNear, setTechNear] = useState(false);
  const techSentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = techSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTechNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      {/* GlowCursor trail: fixed BACKGROUND layer at var(--z-glow) —
          always lowest, so it shows through the background and never
          covers the character (z-11) or text (inside #smooth-wrapper,
          z-20). Full scale: index.css (:root --z-* tokens). */}
      {isFinePointer && glowReady && (
        <Suspense fallback={null}>
          <GlowCursor
            className="glow-cursor-layer"
            style={{ position: "fixed", inset: 0, zIndex: "var(--z-glow)", pointerEvents: "none" }}
            color="#FF6B00"
            secondaryColor="#FF8A3D"
            intensity={1.15}
            trailWidth={3}
            linger={1.4}
            glow={1.1}
            hotspot={0.8}
            followSpeed={0.6}
            clickBurst
            quality="low"
            theme="dark"
            blendMode="screen"
            maxDevicePixelRatio={1.25}
            aria-hidden="true"
          />
        </Suspense>
      )}
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <TechSkills />
            {isDesktopView &&
              (techNear ? (
                <Suspense fallback={<div style={{ height: "100vh" }} />}>
                  <TechStack />
                </Suspense>
              ) : (
                <div ref={techSentinelRef} style={{ height: "100vh" }} aria-hidden="true" />
              ))}
            <Testimonials />
            <Exploring />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
