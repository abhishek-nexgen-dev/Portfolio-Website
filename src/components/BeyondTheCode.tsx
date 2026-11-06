import { useEffect, useState } from "react";
import Masonry from "./Masonry";
import { beyondTheCodeItems, beyondTheCodeContent } from "../data/beyondTheCodeData";
import "./styles/BeyondTheCode.css";

const getColumnWidth = (width: number): number => {
  if (width > 1024) return 280;
  if (width > 640) return 220;
  return 160;
};

const BeyondTheCode = () => {
  const [columnWidth, setColumnWidth] = useState<number>(() =>
    typeof window !== "undefined" ? getColumnWidth(window.innerWidth) : 280
  );

  useEffect(() => {
    const onResize = () => setColumnWidth(getColumnWidth(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="beyond-section" id="beyond-the-code" aria-label="Beyond the Code">
      <header className="beyond-header">
        <h2>
          Beyond the <span>Code</span>
        </h2>
        <p>{beyondTheCodeContent.description}</p>
      </header>

      <div className="beyond-gallery px-[3.8vw] my-[3vh]">
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
