import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { useLoading } from "../context/useLoading";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";

import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechSkills from "./TechSkills";
import Exploring from "./Exploring";
import BeyondTheCode from "./BeyondTheCode";
import setSplitText from "./utils/splitText";
import { setAllTimeline } from "./utils/GsapScroll";

// Code-split: the WebGL glow trail
// is NOT part of the initial bundle. It loads only when needed
// (idle time / near viewport), keeping first paint fast.
const GlowCursor = lazy(() => import("./GlowCursor"));

const MainContainer = () => {
  const { isLoading } = useLoading();
  // WebGL glow trail activates for mice/trackpads once the hero reveals.
  const [isFinePointer, setIsFinePointer] = useState<boolean>(
    () =>
      window.matchMedia("(any-pointer: fine)").matches ||
      window.matchMedia("(pointer: fine)").matches
  );
  useEffect(() => {
    const anyFineQuery = window.matchMedia("(any-pointer: fine)");
    const fineQuery = window.matchMedia("(pointer: fine)");
    const updatePointer = () => {
      setIsFinePointer(anyFineQuery.matches || fineQuery.matches);
    };
    anyFineQuery.addEventListener("change", updatePointer);
    fineQuery.addEventListener("change", updatePointer);
    return () => {
      anyFineQuery.removeEventListener("change", updatePointer);
      fineQuery.removeEventListener("change", updatePointer);
    };
  }, []);

  const [glowReady, setGlowReady] = useState(false);
  useEffect(() => {
    if (!isFinePointer || isLoading) return;
    const timer = window.setTimeout(() => setGlowReady(true), 120);
    return () => window.clearTimeout(timer);
  }, [isFinePointer, isLoading]);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setAllTimeline();
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="container-main">
      {/* GlowCursor trail: fixed screen-blended layer at var(--z-glow).
          Full scale: index.css (:root --z-* tokens). */}
      {isFinePointer && glowReady && (
        <Suspense fallback={null}>
          <GlowCursor
            className="glow-cursor-layer"
            style={{ position: "fixed", inset: 0, zIndex: "var(--z-glow)", pointerEvents: "none" }}
            color="#FF6B00"
            secondaryColor="#FF8A3D"
            intensity={1.3}
            trailWidth={3.5}
            linger={1.45}
            glow={1.25}
            hotspot={0.85}
            followSpeed={0.68}
            clickBurst
            quality="medium"
            theme="dark"
            blendMode="screen"
            maxDevicePixelRatio={1.5}
            aria-hidden="true"
          />
        </Suspense>
      )}
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <TechSkills />
            <Exploring />
            <BeyondTheCode />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
