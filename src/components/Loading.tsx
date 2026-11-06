import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";
import { MdArrowForward } from "react-icons/md";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      setLoaded(true);
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      import("./utils/initialFX").then((module) => {
        const timer = setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 350);
        return () => clearTimeout(timer);
      });
    }
  }, [isLoaded, setIsLoading]);

  const handleSkip = () => {
    setClicked(true);
    import("./utils/initialFX").then((module) => {
      if (module.initialFX) {
        module.initialFX();
      }
      setIsLoading(false);
    });
  };

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
        <a href="/#" className="loader-title" data-cursor="disable">
          AKG.
        </a>
        <button
          className="loader-skip-btn"
          onClick={handleSkip}
          data-cursor="disable"
          title="Skip intro and view portfolio immediately"
        >
          Skip to Portfolio <MdArrowForward />
        </button>
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

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Ultra-fast responsive progress so recruiters/visitors are never kept waiting
  const interval = setInterval(() => {
    if (percent < 100) {
      const step = Math.round(Math.random() * 18) + 12;
      percent = Math.min(100, percent + step);
      setLoading(percent);
      if (percent >= 100) {
        clearInterval(interval);
      }
    } else {
      clearInterval(interval);
    }
  }, 25);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      setLoading(100);
      resolve(100);
    });
  }
  return { loaded, percent, clear };
};
