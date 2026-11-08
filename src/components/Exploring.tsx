import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  TbBrain,
  TbHierarchy2,
  TbServer,
  TbCode,
  TbCloudCheck,
  TbArrowUpRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

interface ExploringTopic {
  id: string;
  number: string;
  icon: ReactNode;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  accent: string;
}

const exploringTopics: ExploringTopic[] = [
  {
    id: "ai-engineering",
    number: "01",
    icon: <TbBrain />,
    title: "AI Engineering",
    eyebrow: "Intelligent Systems",
    accent: "#FF9B50",
    tags: [
      "LLM Applications",
      "LangChain",
      "LangGraph",
      "Multi-Agent Systems",
      "RAG",
    ],
    description:
      "Building practical expertise in autonomous agent workflows, state machines for tool-calling agents, vector indexing, and grounding LLM reasoning.",
  },
  {
    id: "system-design",
    number: "02",
    icon: <TbHierarchy2 />,
    title: "System Design",
    eyebrow: "Architecture & Scale",
    accent: "#A78BFA",
    tags: [
      "Distributed Systems",
      "Caching",
      "Message Queues",
      "API Architecture",
      "Scalability",
    ],
    description:
      "Understanding high-availability architectures, database sharding, CAP theorem trade-offs, message broker topologies, and resilient service communication.",
  },
  {
    id: "backend-engineering",
    number: "03",
    icon: <TbServer />,
    title: "Backend Engineering",
    eyebrow: "Reliable Infrastructure",
    accent: "#60A5FA",
    tags: [
      "TypeScript",
      "PostgreSQL",
      "FastAPI",
      "Microservices",
      "Prisma",
    ],
    description:
      "Engineering robust transactional APIs, schema migrations, asynchronous Python services, and maintainable domain-driven architectures.",
  },
  {
    id: "problem-solving",
    number: "04",
    icon: <TbCode />,
    title: "Problem Solving",
    eyebrow: "DSA & Algorithms",
    accent: "#4ADE80",
    tags: [
      "Data Structures",
      "Algorithms",
      "JavaScript",
      "Optimization",
      "Patterns",
    ],
    description:
      "Strengthening problem-solving skills across Trees, Graphs, Dynamic Programming, and Two-Pointer strategies with optimal time and space complexity.",
  },
  {
    id: "infrastructure",
    number: "05",
    icon: <TbCloudCheck />,
    title: "Infrastructure & DevOps",
    eyebrow: "Cloud & Deployment",
    accent: "#F472B6",
    tags: [
      "Docker",
      "Docker Compose",
      "Cloudflare",
      "CI/CD",
      "Observability",
    ],
    description:
      "Exploring multi-stage container builds, automated deployment pipelines, production monitoring, and edge network caching for reliable deployments.",
  },
];

const Exploring = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const subBarRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Learning bar entrance
      if (subBarRef.current) {
        gsap.fromTo(
          subBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subBarRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Topic cards stagger entrance
      if (cardsContainerRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".exploring-topic-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Tags micro-stagger
        const tags = gsap.utils.toArray<HTMLElement>(".topic-tag-chip");
        gsap.fromTo(
          tags,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exploring"
      aria-labelledby="exploring-heading"
      className="relative isolate mx-auto w-full max-w-7xl overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-orange-600/[0.07] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-80 w-80 rounded-full bg-orange-500/[0.05] blur-[120px]"
      />

      {/* Header */}
      <header
        ref={headerRef}
        className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400 sm:text-xs">
            Continuous Learning & Exploration
          </span>
        </div>

        <h2
          id="exploring-heading"
          className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Beyond my
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            current stack.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
          Engineering is a continuous learning process. These are the
          technologies, concepts and architectural patterns I'm
          exploring to become a better engineer.
        </p>
      </header>

      {/* Learning overview */}
      <div
        ref={subBarRef}
        className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/[0.07] py-4"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-orange-500">~/</span>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
            Current learning interests
          </span>
        </div>

        <span className="font-mono text-[10px] tracking-wider text-white/30">
          {String(exploringTopics.length).padStart(2, "0")} AREAS OF FOCUS
        </span>
      </div>

      {/* Topic Cards */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {exploringTopics.map((topic) => (
          <article
            key={topic.id}
            style={
              {
                "--topic-accent": topic.accent,
              } as React.CSSProperties
            }
            className="exploring-topic-card group relative isolate flex min-h-[290px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014] p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/30 hover:shadow-[0_20px_60px_-25px_rgba(255,107,0,0.18)] sm:p-6"
          >
            {/* Top accent */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${topic.accent}, transparent)`,
              }}
            />

            {/* Decorative background icon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 top-14 -z-10 text-[130px] opacity-[0.025] transition-all duration-700 group-hover:rotate-[-10deg] group-hover:scale-110 group-hover:opacity-[0.07]"
              style={{ color: topic.accent }}
            >
              {topic.icon}
            </div>

            {/* Card top */}
            <div className="mb-7 flex items-start justify-between">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{
                  color: topic.accent,
                  borderColor: `${topic.accent}35`,
                  backgroundColor: `${topic.accent}12`,
                }}
              >
                {topic.icon}
              </div>

              <span className="font-mono text-xs tracking-widest text-white/25 transition-colors group-hover:text-orange-400">
                / {topic.number}
              </span>
            </div>

            {/* Card content */}
            <div className="mb-5">
              <span
                className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: topic.accent }}
              >
                {topic.eyebrow}
              </span>

              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {topic.title}
              </h3>

              <p className="mt-3 text-xs leading-6 text-white/45 sm:text-sm">
                {topic.description}
              </p>
            </div>

            {/* Technology tags */}
            <div className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="topic-tag-chip rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-medium text-white/50 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300 sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover indicator */}
            <div
              className="pointer-events-none absolute bottom-5 right-5 translate-y-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-70"
              style={{ color: topic.accent }}
            >
              <TbArrowUpRight />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Exploring;
