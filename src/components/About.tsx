import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiLayers, FiCpu, FiServer, FiUsers } from "react-icons/fi";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (detailsRef.current) {
        const paragraphs = detailsRef.current.querySelectorAll(".about-subtext");
        const card = detailsRef.current.querySelector(".about-philosophy-card");
        const chips = detailsRef.current.querySelectorAll(".about-chip");

        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        if (chips.length > 0) {
          gsap.fromTo(
            chips,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: -20, scale: 0.98 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
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
    <section className="about-section" id="about" ref={containerRef}>
      <div className="about-me">
        <div className="about-eyebrow">
          <span className="about-eyebrow-dot" />
          <span>Profile &amp; Engineering Philosophy</span>
        </div>

        <h3 className="about-title">
          About <span className="accent">Me</span>
        </h3>
        <p className="about-role-subtitle">
          Full-Stack Developer &amp; AI Systems Engineer
        </p>

        <div className="about-details" ref={detailsRef}>
          <p className="about-subtext">
            I'm <strong>Abhishek Kumar Gupta</strong>, a Full-Stack Developer and
            Software Engineer passionate about turning complex ideas into practical,
            scalable digital products that solve real-world problems.
          </p>

          <p className="about-subtext">
            I specialize in building <strong>modern web applications</strong>,
            designing <strong>robust backend architectures</strong>, and
            integrating <strong>autonomous AI capabilities</strong> into
            production workflows. My engineering toolkit spans JavaScript,
            TypeScript, React, Next.js, Node.js, Express, Python, FastAPI, MongoDB,
            PostgreSQL, and modern multi-agent LLM frameworks.
          </p>

          <p className="about-subtext">
            Beyond writing code, I enjoy dissecting <strong>system internals</strong>,
            solving distributed scalability challenges, and building software that
            delivers measurable impact. From developing full-stack platforms and
            real-time collaboration apps to exploring multi-agent AI ecosystems, I
            focus on writing clean, maintainable, and high-performance code.
          </p>

          <div className="about-highlight-chips">
            <span className="about-chip">
              <FiServer className="text-[#FF6B00]" />
              <span>Full-Stack &amp; Scalable Systems</span>
            </span>
            <span className="about-chip">
              <FiCpu className="text-[#FF6B00]" />
              <span>Multi-Agent AI &amp; LangGraph</span>
            </span>
            <span className="about-chip">
              <FiLayers className="text-[#FF6B00]" />
              <span>Clean Architecture &amp; APIs</span>
            </span>
            <span className="about-chip">
              <FiUsers className="text-[#FF6B00]" />
              <span>Community Lead @ GDG Ranchi</span>
            </span>
          </div>

          <div className="about-philosophy-card">
            <span className="philosophy-label">Engineering Philosophy</span>
            <blockquote>
              "Think beyond the interface. Engineer beyond the expected. Build for impact."
            </blockquote>
          </div>

          <div className="about-actions">
            <a href="#work" className="about-btn-secondary">
              <span>View Featured Projects</span>
              <FiArrowUpRight />
            </a>
            <a href="#career" className="about-btn-secondary">
              <span>Explore Career Timeline</span>
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
