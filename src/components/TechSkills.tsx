import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa6";

import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiRabbitmq,
  SiPostman,
  SiFigma,
  SiVite,
} from "react-icons/si";

import { TbBrain, TbDatabase } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon?: ReactNode;
}

interface Category {
  id: string;
  number: string;
  title: string;
  caption: string;
  icon: ReactNode;
  accent: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend",
    caption: "Crafting intuitive digital experiences",
    icon: <FaReact />,
    accent: "#61DAFB",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "Vite", icon: <SiVite /> },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend",
    caption: "Building scalable APIs & services",
    icon: <FaNodeJs />,
    accent: "#68A063",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Python", icon: <FaPython /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Socket.IO", icon: <SiSocketdotio /> },
      { name: "REST APIs", icon: <SiJavascript /> },
    ],
  },
  {
    id: "data",
    number: "03",
    title: "Database & DevOps",
    caption: "Managing data, infrastructure & delivery",
    icon: <TbDatabase />,
    accent: "#FFB380",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "RabbitMQ", icon: <SiRabbitmq /> },
      { name: "Git", icon: <FaGitAlt /> },
    ],
  },
  {
    id: "ai-tools",
    number: "04",
    title: "AI & Developer Tools",
    caption: "Exploring intelligent applications & workflows",
    icon: <TbBrain />,
    accent: "#FF9B50",
    skills: [
      { name: "LangChain", icon: <TbBrain /> },
      { name: "Gemini API", icon: <TbBrain /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "Linux", icon: <FaLinux /> },
      { name: "JavaScript", icon: <SiJavascript /> },
    ],
  },
];

const marqueeSkills = categories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);

const TechSkills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation with GSAP ScrollTrigger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Marquee entrance animation
      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Category cards stagger entrance
      if (cardsContainerRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".tech-skill-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Chip micro-stagger
        const chips = gsap.utils.toArray<HTMLElement>(".skill-chip-item");
        gsap.fromTo(
          chips,
          { opacity: 0, y: 15, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.02,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 75%",
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
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate mx-auto w-full max-w-7xl overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/[0.08] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-0 -z-10 h-64 w-64 rounded-full bg-orange-500/[0.05] blur-[100px]"
      />

      {/* Section Header */}
      <header
        ref={headerRef}
        className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
            My Tech Arsenal
          </span>
        </div>

        <h2
          id="skills-heading"
          className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Turning ideas into
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            digital experiences.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
          The technologies, tools and frameworks I use to design,
          develop and ship modern digital products — from frontend
          experiences to backend systems and AI-powered applications.
        </p>
      </header>

      {/* Technology Marquee */}
      <div
        ref={marqueeRef}
        aria-label={`Technologies: ${marqueeSkills.join(", ")}`}
        className="relative mb-14 overflow-hidden border-y border-white/[0.06] py-5 sm:mb-16"
      >
        <div
          aria-hidden="true"
          className="skills-marquee-track flex w-max items-center gap-7 whitespace-nowrap sm:gap-10"
        >
          {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="flex items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-orange-400 sm:gap-10 sm:text-xs"
            >
              {skill}
              <span className="text-orange-500">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
      >
        {categories.map((category) => (
          <article
            key={category.id}
            style={
              {
                "--accent": category.accent,
              } as CSSProperties
            }
            className="tech-skill-card group relative isolate overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014] p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/30 hover:shadow-[0_20px_60px_-25px_rgba(255,107,0,0.2)] sm:p-7"
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
              }}
            />

            {/* Hover background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 -z-10 h-52 w-52 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-20"
              style={{ backgroundColor: category.accent }}
            />

            {/* Card Header */}
            <div className="mb-8 flex items-center gap-4">
              {/* Category Icon */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{
                  color: category.accent,
                  borderColor: `${category.accent}30`,
                  backgroundColor: `${category.accent}12`,
                }}
              >
                {category.icon}
              </div>

              {/* Category Details */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-orange-500/70">
                    / {category.number}
                  </span>

                  <span className="h-px w-5 bg-white/15" />
                </div>

                <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                  {category.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/40 sm:text-sm">
                  {category.caption}
                </p>
              </div>

              {/* Skill Count */}
              <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                <span className="font-mono text-sm font-semibold text-white/70">
                  {String(category.skills.length).padStart(2, "0")}
                </span>
                <span className="text-[7px] uppercase tracking-wider text-white/30">
                  Skills
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px w-full bg-gradient-to-r from-white/[0.1] via-white/[0.05] to-transparent" />

            {/* Skills */}
            <ul className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="skill-chip-item group/chip inline-flex cursor-default items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-xs font-medium text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.08] hover:text-orange-300 sm:text-sm"
                >
                  {skill.icon && (
                    <span className="text-sm text-white/40 transition-colors duration-300 group-hover/chip:text-orange-400">
                      {skill.icon}
                    </span>
                  )}

                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>

            {/* Bottom card detail */}
            <div className="mt-7 flex items-center justify-between">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/20">
                Technology Stack
              </span>

              <span
                className="h-1.5 w-1.5 rounded-full opacity-40 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100"
                style={{ backgroundColor: category.accent }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechSkills;
