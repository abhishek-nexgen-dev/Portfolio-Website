import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import RecruiterModal from "./RecruiterModal";

const SocialIcons = () => {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let rafId: number | null = null;
      let isHovered = false;
      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = mouseX;
      let currentY = mouseY;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        if (isHovered || Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
          rafId = requestAnimationFrame(updatePosition);
        } else {
          rafId = null;
        }
      };

      const onMouseEnter = () => {
        isHovered = true;
        if (!rafId) rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const bound = elem.getBoundingClientRect();
        const x = e.clientX - bound.left;
        const y = e.clientY - bound.top;
        mouseX = x;
        mouseY = y;
        if (!rafId) rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseLeave = () => {
        isHovered = false;
        const bound = elem.getBoundingClientRect();
        mouseX = bound.width / 2;
        mouseY = bound.height / 2;
        if (!rafId) rafId = requestAnimationFrame(updatePosition);
      };

      elem.addEventListener("mouseenter", onMouseEnter);
      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);

      cleanupFns.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        elem.removeEventListener("mouseenter", onMouseEnter);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/abhishek-nexgen-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/abhishek-nexgen-dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
       
        <span>
          <a
            href="https://www.instagram.com/abhishek.nexgen.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/resume.pdf"
        onClick={(e) => {
          e.preventDefault();
          setIsRecruiterOpen(true);
        }}
        data-cursor="disable"
        title="View Executive Resume & Brief"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </div>
  );
};

export default SocialIcons;
