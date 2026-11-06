import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./styles/TechSkills.css";
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

interface Category {
  id: string;
  title: string;
  caption: string;
  icon: ReactNode;
  accent: string;
  skills: { name: string; icon?: ReactNode }[];
}

const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    caption: "Fast, responsive UIs",
    icon: <FaReact />,
    accent: "#FF6B00",
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
    title: "Backend",
    caption: "Secure APIs & realtime",
    icon: <FaNodeJs />,
    accent: "#FF6B00",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Python", icon: <FaPython /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Socket.IO", icon: <SiSocketdotio /> },
      { name: "REST APIs", icon: <SiJavascript /> },
    ],
  },
  {
    id: "data",
    title: "Data & DevOps",
    caption: "Reliable storage & infra",
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
    title: "AI & Tools",
    caption: "Smart apps, smooth workflow",
    icon: <TbBrain />,
    accent: "#FF8C42",
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

const marqueeSkills = categories.flatMap((c) => c.skills.map((s) => s.name));

const TechSkills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`tech-skills-section section-container ${visible ? "is-visible" : ""}`}
      id="skills"
    >
      <div className="skills-header">
        <span className="skills-pill">Skills</span>
        <h2>
          Tools I use to <span>build & ship</span>
        </h2>
        <p className="skills-intro">
          A focused stack for modern web apps — from interface to database to AI.
        </p>
      </div>

      <div className="skills-marquee" aria-hidden="true">
        <div className="skills-marquee-track">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="marquee-item">
              {s} <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {categories.map((cat, idx) => (
          <article
            key={cat.id}
            className="skill-card"
            style={
              {
                "--accent": cat.accent,
                "--delay": `${idx * 80}ms`,
              } as React.CSSProperties
            }
          >
            <div className="skill-card-top">
              <div className="skill-card-icon">{cat.icon}</div>
              <div>
                <h3>{cat.title}</h3>
                <p>{cat.caption}</p>
              </div>
              <span className="skill-count">{cat.skills.length}</span>
            </div>

            <ul className="skill-chips">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="skill-chip">
                  {skill.icon && <span className="chip-icon">{skill.icon}</span>}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="skills-footer">
        Always learning — currently exploring LangGraph, Vector DBs & Rust.
      </p>
    </section>
  );
};

export default TechSkills;
