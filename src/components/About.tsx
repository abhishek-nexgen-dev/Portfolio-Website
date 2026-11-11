import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpRight,
  FiLayers,
  FiCpu,
  FiServer,
  FiUsers,
} from "react-icons/fi";
import BorderGlow from "./BorderGlow";
import { getSmoother } from "../context/smoother";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PERSON_IMAGES = [
  {
    src: "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793635442/f2f87fdedf8e8cef7b106c40.jpg",
    alt: "Abhishek Kumar Gupta mentoring developers at DevFest Gemini challenge",
  },
  {
    src: "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794372236/1768826060627_hmnolo.jpg",
  },
  {
    src: "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794372235/1793942563582_e3tmlz.jpg",
  
  }
  
];

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLImageElement | null)[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, x: -30, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      const slides = slideRefs.current.filter(Boolean) as HTMLImageElement[];
      if (slides.length > 1) {
        // Park slide 0 centered on top, remaining slides ready just below viewport
        gsap.set(slides, {
          yPercent: (index) => (index === 0 ? 0 : 100),
          zIndex: (index) => (index === 0 ? 2 : 1),
          opacity: 1,
          scale: 1,
        });

        if (!prefersReducedMotion) {
          let activeIndex = 0;

          const cycleToNext = () => {
            const currentSlide = slides[activeIndex];
            const nextIndex = (activeIndex + 1) % slides.length;
            const nextSlide = slides[nextIndex];

            gsap.set(currentSlide, { zIndex: 2 });
            gsap.set(nextSlide, {
              yPercent: 100,
              zIndex: 3,
              opacity: 1,
              scale: 1.05,
            });

            const tl = gsap.timeline({
              onComplete: () => {
                gsap.set(currentSlide, {
                  yPercent: 100,
                  zIndex: 1,
                  opacity: 1,
                  scale: 1,
                });
                gsap.set(nextSlide, { zIndex: 2 });
                activeIndex = nextIndex;
                gsap.delayedCall(2.6, cycleToNext);
              },
            });

            tl.to(
              currentSlide,
              {
                yPercent: -35,
                opacity: 0.35,
                scale: 0.97,
                duration: 0.95,
                ease: "power3.inOut",
              },
              0
            ).to(
              nextSlide,
              {
                yPercent: 0,
                scale: 1,
                duration: 0.95,
                ease: "power3.inOut",
              },
              0
            );
          };

          gsap.delayedCall(2.4, cycleToNext);
        }
      }

      if (detailsRef.current) {
        const paragraphs = detailsRef.current.querySelectorAll(".about-subtext");
        const card = detailsRef.current.querySelector(".about-philosophy-card");
        const chips = detailsRef.current.querySelectorAll(".about-chip");

        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        if (chips.length > 0) {
          gsap.fromTo(
            chips,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.18,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 82%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              delay: 0.25,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 82%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      aria-labelledby="about-heading"
      className="relative isolate mx-auto flex min-h-screen w-full max-w-7xl items-center overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Ambient background glows matching TechSkills & Exploring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-orange-600/[0.08] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 -z-10 h-72 w-72 rounded-full bg-orange-500/[0.05] blur-[110px]"
      />

      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        {/* LEFT SECTION — Pure image frame (no text/overlays), cycling bottom-to-top via GSAP */}
        <div className="flex items-center justify-center">
          <div
            ref={visualRef}
            className="relative w-full max-w-[330px] py-2 sm:max-w-[370px]"
          >
            {/* Subtle orange glow directly behind frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/[0.12] blur-[85px]"
            />

            {/* Offset subtle architectural backing border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 -z-10 rotate-[-2.5deg] rounded-[26px] border border-orange-500/[0.14] bg-white/[0.015]"
            />

            <BorderGlow
              className="transition-all duration-500 ease-out hover:-translate-y-1"
              backgroundColor="#101014"
              borderRadius={22}
              glowColor="#FF6B00"
              colors={["#FF6B00", "#FF8C42", "#FFB380"]}
              glowRadius={32}
              glowIntensity={1.1}
              edgeSensitivity={20}
              coneSpread={28}
            >
              <div className="p-2.5 sm:p-3">
                <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black">
                  {ABOUT_PERSON_IMAGES.map((image, index) => (
                    <img
                      key={image.src}
                      ref={(el) => {
                        slideRefs.current[index] = el;
                      }}
                      src={image.src}
                      alt={image.alt ?? "Abhishek Kumar Gupta"}
                      width={720}
                      height={900}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover object-top will-change-transform"
                    />
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>

        {/* RIGHT SECTION — Profile & Philosophy */}
        <div className="w-full" ref={detailsRef}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400 sm:text-xs">
              Profile &amp; Engineering Philosophy
            </span>
          </div>

          <h2
            id="about-heading"
            className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl"
          >
            About{" "}
            <span className="bg-gradient-to-r from-orange-300 via-[#FF6B00] to-orange-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="mt-2.5 text-base font-medium tracking-wide text-white/50 sm:text-lg">
            Full-Stack Developer &amp; AI Systems Engineer
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <p className="about-subtext text-sm leading-7 text-white/65 sm:text-[15.5px]">
              I&apos;m <strong className="font-semibold text-white">Abhishek Kumar Gupta</strong>,
              a Full-Stack Developer and Software Engineer passionate about turning complex ideas
              into practical, scalable digital products that solve real-world problems.
            </p>

            <p className="about-subtext text-sm leading-7 text-white/65 sm:text-[15.5px]">
              I specialize in building{" "}
              <strong className="font-semibold text-white">modern web applications</strong>,
              designing{" "}
              <strong className="font-semibold text-white">robust backend architectures</strong>,
              and integrating{" "}
              <strong className="font-semibold text-white">autonomous AI capabilities</strong>{" "}
              into production workflows. My engineering toolkit spans JavaScript, TypeScript, React,
              Next.js, Node.js, Express, Python, FastAPI, MongoDB, PostgreSQL, and modern
              multi-agent LLM frameworks.
            </p>

           

            {/* Highlight Chips */}
            <div className="mt-2 flex flex-wrap gap-2.5">
              <span className="about-chip inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300">
                <FiServer className="text-[#FF6B00]" />
                <span>Full-Stack &amp; Scalable Systems</span>
              </span>
              <span className="about-chip inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300">
                <FiCpu className="text-[#FF6B00]" />
                <span>Multi-Agent AI &amp; LangGraph</span>
              </span>
              <span className="about-chip inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300">
                <FiLayers className="text-[#FF6B00]" />
                <span>Clean Architecture &amp; APIs</span>
              </span>
              <span className="about-chip inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300">
                <FiUsers className="text-[#FF6B00]" />
                <span>Community Lead @ GDG Ranchi</span>
              </span>
            </div>

            {/* Philosophy Quote Card */}
            <div className="about-philosophy-card relative mt-3 overflow-hidden rounded-2xl border border-[#FF6B00]/25 bg-[#101014] px-6 py-5 shadow-[0_12px_35px_rgba(0,0,0,0.45)]">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF6B00] to-[#FF8A3D]"
              />
              <span className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                Engineering Philosophy
              </span>
              <blockquote className="m-0 text-sm font-normal italic leading-6 text-white sm:text-[15.5px]">
                &ldquo;Think beyond the interface. Engineer beyond the expected. Build for
                impact.&rdquo;
              </blockquote>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  if (window.innerWidth > 1024) {
                    const smoother = getSmoother();
                    if (smoother) {
                      e.preventDefault();
                      smoother.scrollTo("#work", true, "top top");
                    }
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/[0.08] px-4 py-2.5 text-xs font-semibold tracking-wide text-[#FFB380] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF6B00] hover:bg-[#FF6B00]/20 hover:text-white"
              >
                <span>View Featured Projects</span>
                <FiArrowUpRight />
              </a>
              <a
                href="#career"
                onClick={(e) => {
                  if (window.innerWidth > 1024) {
                    const smoother = getSmoother();
                    if (smoother) {
                      e.preventDefault();
                      smoother.scrollTo("#career", true, "top top");
                    }
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#101014] px-4 py-2.5 text-xs font-semibold tracking-wide text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/35 hover:bg-white/[0.06] hover:text-white"
              >
                <span>Explore Career Timeline</span>
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
