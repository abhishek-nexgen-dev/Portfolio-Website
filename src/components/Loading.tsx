
import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/useLoading";
import gsap from "gsap";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();

  const [isLoaded, setIsLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);

  const dismissedRef = useRef(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const progress = Math.min(100, Math.max(0, percent));

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      height: `${progress}%`,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  }, [progress]);

  useEffect(() => {
    if (progress < 100) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [progress]);

  const dismiss = async () => {
    if (dismissedRef.current) return;

    dismissedRef.current = true;
    setExiting(true);

    try {
      const module = await import("./utils/initialFX");
      if (module.initialFX) module.initialFX();
    } catch (error) {
      console.error("initialFX failed:", error);
    }

    document.body.style.overflowY = "auto";
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => dismiss(), 350);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <div className={`loading-screen ${exiting ? "loading-exit" : ""}`}>
      <div className="loading-progress">
        <div
          ref={progressRef}
          className="loading-progress-fill"
        />
      </div>
    </div>
  );
};

export default Loading;
