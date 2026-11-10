
import { useCallback, useEffect, useRef, useState } from "react";
import RecruiterModal from "./RecruiterModal";
import { getSmoother } from "../context/smoother";
import { useLoading } from "../context/useLoading";

import { MdDownload } from "react-icons/md";
import {
  FiArrowUpRight,
  FiCopy,
  FiCheck,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

const EMAIL = "abhishek.nexgen.dev@gmail.com";

const HERO_VIDEO =
  "https://res.cloudinary.com/dpnc8ddpf/video/upload/v1794340002/gemini_generated_video_9ba42a3f_mflamr.mp4";

const HERO_POSTER =
  "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794337576/42117f8d-a260-4639-9ba7-71c838ebad2d_yx7au1.png";
const HERO_FINAL_IMAGE =
  "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794337576/42117f8d-a260-4639-9ba7-71c838ebad2d_yx7au1.png";

const Landing = () => {
  const { isLoading } = useLoading();

  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const canPlayRef = useRef(false);
  const autoMutedRef = useRef(false);
  const userMutedRef = useRef(false);
  const hasPlayedRef = useRef(false);

  canPlayRef.current =
    !isLoading &&
    isInHero &&
    !videoEnded &&
    !hasPlayedRef.current;

  // Observe hero visibility.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInHero(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Respect reduced-motion preferences.
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        videoRef.current?.pause();
        hasPlayedRef.current = true;
        setVideoEnded(true);
        setShowFinalImage(true);
      }
    };

    if (mediaQuery.matches) {
      hasPlayedRef.current = true;
      setVideoEnded(true);
      setShowFinalImage(true);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () =>
      mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Start the video only after the loader finishes.
  const startPlayback = useCallback(async () => {
    const video = videoRef.current;

    if (
      !video ||
      !canPlayRef.current ||
      document.hidden ||
      !video.paused ||
      hasPlayedRef.current
    ) {
      return;
    }

    const wantMuted = userMutedRef.current;

    try {
      video.defaultMuted = wantMuted;
      video.muted = wantMuted;
      video.volume = 1;

      await video.play();

      if (!canPlayRef.current || document.hidden) {
        video.pause();
        return;
      }

      hasPlayedRef.current = true;
      setHasStarted(true);
      setIsMuted(wantMuted);
      autoMutedRef.current = false;
    } catch (error) {
      if (!canPlayRef.current || document.hidden) return;

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      // Retry with muted playback if autoplay with sound is blocked.
      if (!wantMuted) {
        try {
          video.defaultMuted = true;
          video.muted = true;

          await video.play();

          if (!canPlayRef.current || document.hidden) {
            video.pause();
            return;
          }

          hasPlayedRef.current = true;
          setHasStarted(true);
          setIsMuted(true);
          autoMutedRef.current = true;
          return;
        } catch (mutedError) {
          if (
            mutedError instanceof DOMException &&
            mutedError.name === "AbortError"
          ) {
            return;
          }
        }
      }

      // If playback fails, display the final image.
      hasPlayedRef.current = true;
      setVideoEnded(true);
      setShowFinalImage(true);
    }
  }, []);

  // Trigger playback once loading is complete.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoEnded || hasPlayedRef.current) return;

    if (isLoading || !isInHero) {
      video.pause();
      return;
    }

    void startPlayback();

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (canPlayRef.current) {
        void startPlayback();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
  }, [isInHero, isLoading, startPlayback, videoEnded]);

  // Unlock audio after browser forces muted autoplay.
  useEffect(() => {
    if (!isMuted || videoEnded || !isInHero || isLoading) return;

    const unlockAudio = (event: Event) => {
      if (!autoMutedRef.current || userMutedRef.current) return;

      const target = event.target as Element | null;
      if (target?.closest("[data-hero-audio-btn]")) return;

      const video = videoRef.current;
      if (!video || !hasPlayedRef.current) return;

      video.defaultMuted = false;
      video.muted = false;
      video.volume = 1;

      autoMutedRef.current = false;
      setIsMuted(false);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [isInHero, isLoading, isMuted, videoEnded]);

  const handleVideoEnded = () => {
    videoRef.current?.pause();

    autoMutedRef.current = false;
    hasPlayedRef.current = true;

    setVideoEnded(true);
    setShowFinalImage(true);
    setIsMuted(false);
  };

  const handleVideoError = () => {
    autoMutedRef.current = false;
    hasPlayedRef.current = true;

    setVideoEnded(true);
    setShowFinalImage(true);
    setIsMuted(false);
  };

  const handleToggleAudio = () => {
    const video = videoRef.current;
    if (!video || videoEnded) return;

    const nextMuted = !video.muted;

    autoMutedRef.current = false;
    userMutedRef.current = nextMuted;

    video.defaultMuted = nextMuted;
    video.muted = nextMuted;

    if (!nextMuted) {
      video.volume = 1;
    }

    setIsMuted(nextMuted);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch (error) {
      console.error("Unable to copy email:", error);
    }
  };

  const handleScrollToWork = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (window.innerWidth > 1024) {
      const smoother = getSmoother();

      if (smoother) {
        e.preventDefault();
        smoother.scrollTo("#work", true, "top top");
      }
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="landingDiv"
        className="relative isolate min-h-svh w-full overflow-hidden  text-white"
      >
        {/* HERO VISUAL */}
        <div
          aria-hidden="true"
          className="hero-visual pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-y-0 right-0 w-full opacity-50 sm:w-[85%] sm:opacity-75 lg:w-[75%] lg:opacity-100 xl:w-[80%]">

            {/* INITIAL POSTER / FINAL IMAGE */}
            <img
              src={showFinalImage ? HERO_FINAL_IMAGE : HERO_POSTER}
              alt=""
              className="absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-1000"
            />



            {/* VIDEO — HIDDEN UNTIL PLAYBACK STARTS */}
            <video
              ref={videoRef}
              src={HERO_VIDEO}
              playsInline
              preload="auto"
              poster={HERO_POSTER}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              className={`absolute inset-0 z-[2] h-full w-full object-cover object-center transition-opacity duration-1000 ${
                hasStarted && !videoEnded
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </div>

          {/* MAIN GRADIENT */}
          <div className="absolute inset-0 z-[3] bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.92)_38%,rgba(0,0,0,0.28)_100%)] lg:bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.94)_42%,rgba(0,0,0,0.5)_58%,transparent_88%)]" />

          {/* MOBILE SCRIM */}
          <div className="absolute inset-0 z-[3] bg-black/35 lg:hidden" />

          {/* TOP & BOTTOM BLENDING */}
          <div className="absolute inset-x-0 top-0 z-[3] h-36 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[3] h-44 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* AMBIENT LIGHTING */}
          <div className="absolute -left-40 top-1/3 z-[3] h-80 w-80 rounded-full bg-orange-600/[0.08] blur-[120px]" />
          <div className="absolute bottom-0 right-0 z-[3] h-96 w-96 rounded-full bg-orange-600/[0.10] blur-[150px]" />

          {/* GRID */}
          <div
            className="absolute inset-0 z-[3] opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg,#ffffff 1px,transparent 1px)",
              backgroundSize: "65px 65px",
              maskImage: "linear-gradient(to right, black, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to right, black, transparent 80%)",
            }}
          />
        </div>

        {/* LEFT CONTENT */}
        <div className="landing-parallax relative z-10 flex min-h-svh w-full items-center px-5 pb-24 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-[5.5vw] lg:pb-20 lg:pt-28">
          <div className="w-full max-w-3xl lg:max-w-[54%]">

            {/* AVAILABILITY */}
            <div className="hero-animate mb-7">
              <button
                type="button"
                onClick={() => setIsRecruiterOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-2 text-xs font-semibold tracking-wide text-emerald-400 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/[0.15]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for Opportunities
                <FiArrowUpRight />
              </button>
            </div>

            {/* NAME */}
            <div className="hero-animate">
              <p className="mb-3 text-base font-medium tracking-wide text-white/55 sm:text-xl">
                Hello! I&apos;m
              </p>

              <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.96] tracking-[-0.065em]">
                <span className="block text-white">ABHISHEK</span>
                <span className="mt-2 block bg-gradient-to-r from-orange-300 via-[#FF6B00] to-orange-600 bg-clip-text text-transparent">
                  KUMAR GUPTA
                </span>
              </h1>
            </div>

            {/* ROLE */}
            <div className="hero-animate mt-8 sm:mt-10">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/25 bg-orange-500/[0.08] px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400 sm:text-xs">
                  Full-Stack &amp; Systems
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="hero-animate mt-5 max-w-xl space-y-3 text-sm leading-7 text-white/70 sm:text-base">
              <p>
                I&apos;m a Full-Stack Developer focused on building
                modern web applications, scalable backend systems,
                and reliable APIs using the MERN stack and TypeScript.
              </p>

              <p>
                I enjoy solving complex problems, exploring AI-powered
                technologies, and turning ideas into real-world products.
                Currently learning Python and deepening my knowledge
                of system design.
              </p>
            </div>

            {/* EXPERTISE */}
            <div className="hero-animate mt-6 flex max-w-xl flex-wrap gap-2.5">
              {[
                "MERN Stack",
                "JavaScript",
                "TypeScript",
                "Backend Engineering",
                "AI & LLMs",
                "System Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/[0.08] bg-[#101014]/75 px-3.5 py-2 text-xs font-medium text-white/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/[0.08] hover:text-orange-300 sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="hero-animate mt-8 flex max-w-xl flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={handleScrollToWork}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[linear-gradient(135deg,#FF6B00_0%,#CC5200_100%)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_25px_rgba(255,107,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_8px_35px_rgba(255,107,0,0.45)] sm:px-6"
              >
                Explore Projects
                <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                type="button"
                onClick={() => setIsRecruiterOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#FF6B00]/35 bg-[#101014]/75 px-5 py-3.5 text-sm font-semibold text-[#FFB380] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6B00] hover:bg-[#FF6B00]/15 hover:text-white sm:px-6"
              >
                <MdDownload size={18} />
                Resume &amp; Brief
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
                  copiedEmail
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/[0.08] bg-[#101014]/75 text-white/75 hover:border-orange-500/35 hover:text-white"
                }`}
              >
                {copiedEmail ? (
                  <>
                    <FiCheck />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy />
                    Copy Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AUDIO CONTROL */}
        {!videoEnded && hasStarted && !isLoading && isInHero && (
          <button
            type="button"
            data-hero-audio-btn="true"
            onClick={handleToggleAudio}
            aria-label={isMuted ? "Unmute hero video audio" : "Mute hero video audio"}
            className="absolute bottom-6 right-5 z-20 inline-flex cursor-pointer items-center gap-2 rounded-full border border-orange-500/30 bg-[#101014]/85 px-3.5 py-2 text-xs font-medium text-[#FFB380] backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00] hover:bg-orange-500/15 hover:text-white sm:right-8"
          >
            {isMuted ? (
              <>
                <FiVolumeX className="text-sm text-orange-400" />
                <span>Tap for Sound</span>
              </>
            ) : (
              <>
                <FiVolume2 className="text-sm text-[#FF6B00]" />
                <span>Audio On</span>
              </>
            )}
          </button>
        )}

        {/* SCROLL INDICATOR */}
        <div className="hero-animate pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 lg:flex">
          <span className="h-px w-8 bg-white/20" />
          Scroll to explore
          <span className="h-px w-8 bg-white/20" />
        </div>
      </section>

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </>
  );
};

export default Landing;
