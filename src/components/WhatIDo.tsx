
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "BACKEND & SYSTEMS",
    subtitle: "Architecture & APIs",
    description:
      "Architecting robust backend services, scalable REST APIs, database schemas, authentication, and real-time WebSockets.",
    skills: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "Docker",
    ],
  },
  {
    title: "AI & MULTI-AGENT",
    subtitle: "Intelligent Systems",
    description:
      "Designing autonomous multi-agent orchestration workflows, LLM integrations, vector database embeddings, and RAG pipelines.",
    skills: [
      "LangChain",
      "LangGraph",
      "Gemini API",
      "Qdrant",
      "Vector DBs",
      "LLM Agents",
      "Vercel AI SDK",
      "TensorFlow.js",
    ],
  },
  {
    title: "FULL-STACK APPS",
    subtitle: "Frontend & Platform Engineering",
    description:
      "Engineering production-ready web apps with clean component architectures, state management, and developer event tooling.",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "GSAP",
      "Vite",
      "RabbitMQ",
      "Zod / JWT",
    ],
  },
];

const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".what-content",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.30,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative mx-auto flex flex-col lg:flex-row min-h-screen w-full max-w-[1920px] items-center justify-center gap-10 overflow-hidden px-6 py-24 lg:gap-16 lg:px-12"
    >
      {/* SECTION TITLE */}
      <div className="what-content flex w-full items-start lg:w-1/2 lg:justify-center">
        <h2 className="text-[12vw] lg:text-[6vw] font-semibold leading-[0.9] tracking-tight">
          W<span className="italic">HAT</span>
          <span className="block">
            I <span className="text-[var(--accentColor)]">DO</span>
          </span>
        </h2>
      </div>

      {/* SERVICE CARDS */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="relative flex h-[540px] w-full max-w-[470px] flex-col gap-0 sm:h-[560px]">

          {/* SIDE DASHED BORDERS */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 border-l border-dashed border-white/30" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 border-r border-dashed border-white/30" />

          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={service.title}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className={`
                  what-content relative flex  min-h-0 cursor-pointer flex-col
                  overflow-hidden border-b border-dashed border-white/30
                  transition-[flex,padding] duration-500 ease-in-out
                  outline-none focus-visible:ring-1 focus-visible:ring-[var(--accentColor)]
                  ${isActive ? "flex-[2.2] px-5 py-5 sm:px-9 sm:py-6" : "flex-[0.9] px-5 py-3 sm:px-9 sm:py-4"}
                `}
              >
                {/* CORNER DECORATIONS */}
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-white" />
                <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-white" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-white" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white" />

                {/* CARD CONTENT */}
                <div className="flex h-full min-h-0 flex-col overflow-hidden">

                  <h3 className="shrink-0 text-lg font-semibold tracking-wide sm:text-2xl">
                    {service.title}
                  </h3>

                  <h4 className="mt-1 shrink-0 text-xs font-light tracking-wider text-white/40 sm:text-sm">
                    {service.subtitle}
                  </h4>

                  {/* EXPANDED CONTENT */}
                  <div
                    className={`
                      min-h-0 overflow-hidden transition-opacity duration-300
                      ${isActive ? "mt-3 flex-1 opacity-100" : "mt-0 flex-1 opacity-0"}
                    `}
                  >
                    <p className="text-xs font-light leading-relaxed tracking-wide text-[#D4D4D4] sm:text-[13px]">
                      {service.description}
                    </p>

                    <h5 className="mb-2 mt-4 text-[10px] font-light tracking-widest text-white/50 sm:text-xs">
                      SKILLSET & TOOLS
                    </h5>

                    <div className="flex flex-wrap content-start gap-1.5">
                      {service.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/20 bg-white/[0.08] px-2 py-1 text-[10px] font-normal text-white/80 transition-colors hover:border-[var(--accentColor)] hover:text-[var(--accentColor)] sm:text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ARROW */}
                  <div
                    className={`
                      absolute bottom-4 right-4 flex h-6 w-6 shrink-0
                      items-center justify-center border border-white/60
                      transition-transform duration-500
                      ${isActive ? "rotate-180" : "rotate-0"}
                    `}
                  >
                    <span className="mb-1 block h-2 w-2 rotate-[-45deg] border-b border-l border-white" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
