import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCopyright, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (flexRef.current) {
        const boxes = flexRef.current.querySelectorAll(".contact-box");
        gsap.fromTo(
          boxes,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: flexRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-section section-container" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-headline-wrap" ref={headlineRef}>
          <h2>
            Have an Idea? <span>Let's Build</span> Something Meaningful.
          </h2>
          <p className="contact-lead">
            I'm always interested in collaborating on innovative products,
            solving challenging engineering problems, contributing to open source,
            and connecting with developers and builders. Whether you have a project
            idea, an opportunity, or simply want to discuss technology, I'd love
            to connect. Let's turn your next idea into something real.
          </p>
        </div>

        <div className="contact-flex" ref={flexRef}>
          <div className="contact-box">
            <h4>Direct Reach</h4>
            <p>
              <a
                href="mailto:abhishek.nexgen.dev@gmail.com"
                className="contact-email-link"
              >
                <FaEnvelope /> abhishek.nexgen.dev@gmail.com
              </a>
            </p>
            <h4>Location</h4>
            <p className="contact-location">
              <MdLocationOn /> Jharkhand, India
            </p>
          </div>

          <div className="contact-box">
            <h4>Social & Code</h4>
            <a
              href="https://github.com/AbhishekNexGenDev"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              <span className="contact-social-label">
                <FaGithub /> GitHub (AbhishekNexGenDev)
              </span>
              <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/abhisheknexgendev"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              <span className="contact-social-label">
                <FaLinkedinIn /> LinkedIn
              </span>
              <MdArrowOutward />
            </a>
            <a
              href="https://x.com/AbhishekNexGen"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              <span className="contact-social-label">
                <FaXTwitter /> Twitter / X
              </span>
              <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2>
              Designed & Engineered <br /> by <span>Abhishek Kumar Gupta</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()} Abhishek Kumar Gupta · All Rights Reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
