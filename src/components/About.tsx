import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: detailsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: -30, scale: 0.98 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.35,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section" id="about" ref={containerRef}>
      <div className="about-me">
        <h3 className="text-2xl font-extrabold title">About Me</h3>

        <div className="about-details" ref={detailsRef}>
          <p className="about-subtext">
            I'm Abhishek Kumar Gupta, a Full-Stack Developer and Software Engineer passionate about turning complex ideas into practical, scalable digital products.
          </p>
          <p className="about-subtext">
            I specialize in building modern web applications, designing robust backend architectures, and integrating AI-powered capabilities into real-world solutions. My core stack includes JavaScript, TypeScript, React, Node.js, Express, MongoDB, and modern AI technologies.
          </p>
          <p className="about-subtext">
            Beyond writing code, I enjoy understanding how systems work, solving engineering challenges, and building products that deliver meaningful value. From developing full-stack platforms and real-time applications to exploring multi-agent AI systems, I focus on writing maintainable code and engineering solutions that scale.
          </p>

          <div className="about-philosophy-card">
            <span className="philosophy-label">ENGINEERING PHILOSOPHY</span>
            <blockquote>
              "Think beyond the interface. Engineer beyond the expected. Build for impact."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
