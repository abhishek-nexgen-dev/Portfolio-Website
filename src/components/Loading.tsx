import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/useLoading";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = async () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setClicked(true);
    try {
      const module = await import("./utils/initialFX");
      if (module.initialFX) module.initialFX();
    } catch (e) {
      console.error("initialFX failed:", e);
    }
    // Ensure scroll is always restored even if intro animation fails
    document.body.style.overflowY = "auto";
    setIsLoading(false);
  };

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      setLoaded(true);
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => dismiss(), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Failsafe: force-exit after 3.5s no matter what the 3D progress is.
  useEffect(() => {
    const timer = setTimeout(() => dismiss(), 3500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title">
          AKG.
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee speed={40}>
            <span>Abhishek Kumar Gupta</span>
            <span>Full-Stack Developer</span>
            <span>Backend Systems</span>
            <span>AI Multi-Agent Architecture</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
