
import { useEffect, useRef, useState } from "react";

import { getSmoother } from "../context/smoother";

import { MdDownload } from "react-icons/md";
import {
  FiArrowUpRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

const EMAIL = "abhishek.nexgen.dev@gmail.com";

const HERO_IMAGE =
  "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794371653/Gemini_Generated_Image_crt47xcrt47xcrt4_za6ask.png";

const Landing = () => {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiedEmail(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2200);
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
        id="landingDiv"
        className="relative  w-full overflow-hidden text-white"
      >
        {/* HERO VISUAL — masked to transparency instead of painting black scrims */}
        <div
          aria-hidden="true"
          className="hero-visual pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="absolute inset-y-0 right-0 w-full opacity-40 sm:w-[85%] sm:opacity-65 lg:w-[75%] lg:opacity-100 xl:w-[80%]"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.22) 22%, rgba(0,0,0,0.78) 46%, black 68%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.22) 22%, rgba(0,0,0,0.78) 46%, black 68%)",
            }}
          >
            <div
              className="relative h-full w-full"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 20%, black 84%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 84%, transparent 100%)",
              }}
            >
              <img
                src={HERO_IMAGE}
                alt=""
                decoding="async"
                fetchPriority="high"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover  object-center"
              />
            </div>
          </div>

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

              <a
                href="https://docs.google.com/document/d/1sF2VN9DuwBd0vMRuZnrpSl4sCW5GAQy2/edit?usp=sharing&ouid=115579106773621874111&rtpof=true&sd=true"
                 target="_blank"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#FF6B00]/35 bg-[#101014]/75 px-5 py-3.5 text-sm font-semibold text-[#FFB380] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6B00] hover:bg-[#FF6B00]/15 hover:text-white sm:px-6"
              >
                <MdDownload size={18} />
                View Resume
              </a>

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

    

        {/* SCROLL INDICATOR */}
        <div className="hero-animate pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 lg:flex mt-[3vh]">
          <span className="h-px w-8 bg-white/20" />
          Scroll to explore
          <span className="h-px w-8 bg-white/20" />
        </div>
      </section>

    </>
  );
};

export default Landing;
