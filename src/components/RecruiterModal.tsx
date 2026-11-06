import { useEffect, useState } from "react";
import {
  MdClose,
  MdArrowOutward,
  MdContentCopy,
  MdCheck,
  MdDownload,
  MdLocationOn,
} from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa6";
import "./styles/RecruiterModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RecruiterModal = ({ isOpen, onClose }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText("abhishekg6889@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="recruiter-overlay" onClick={onClose}>
      <div
        className="recruiter-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="recruiter-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <MdClose />
        </button>

        {/* Header Profile */}
        <div className="recruiter-header">
          <div className="recruiter-badge-row">
            <span className="recruiter-pill">RECRUITER EXECUTIVE BRIEF</span>
            <span className="recruiter-avail-badge">
              <span className="pulse-green"></span> Available for Opportunities
            </span>
          </div>
          <h2>Abhishek Kumar Gupta</h2>
          <p className="recruiter-subheading">
            Engineering-Focused Full-Stack Developer · Backend & AI Systems
          </p>
          <div className="recruiter-meta-row">
            <span>
              <MdLocationOn /> Jharkhand, India (Open to Remote / Relocation)
            </span>
            <span>
              <FaGraduationCap /> BCA (2024–2027) · CIITM / MCNU
            </span>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="recruiter-actions-bar">
          <a
            href="/resume.pdf"
            download="Resume-Abhishek-Kumar-Gupta.pdf"
            className="recruiter-action-btn primary"
          >
            <MdDownload /> Download Resume (PDF)
          </a>
          <button
            onClick={copyEmail}
            className="recruiter-action-btn secondary"
          >
            {copied ? (
              <>
                <MdCheck style={{ color: "#4ade80" }} /> Email Copied!
              </>
            ) : (
              <>
                <MdContentCopy /> Copy Email
              </>
            )}
          </button>
          <a
            href="https://www.linkedin.com/in/abhisheknexgendev"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-action-btn outline"
          >
            <FaLinkedinIn /> LinkedIn <MdArrowOutward />
          </a>
          <a
            href="https://github.com/AbhishekNexGenDev"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-action-btn outline"
          >
            <FaGithub /> GitHub <MdArrowOutward />
          </a>
        </div>

        {/* 3-Column Highlights Grid */}
        <div className="recruiter-grid">
          {/* Column 1: Core Competencies */}
          <div className="recruiter-card">
            <div className="card-title-row">
              <FaCode className="card-icon" />
              <h3>Core Tech Stack</h3>
            </div>
            <div className="skill-group">
              <span className="group-label">Languages & Runtime:</span>
              <p>TypeScript, JavaScript (ES6+), Python, Node.js, SQL</p>
            </div>
            <div className="skill-group">
              <span className="group-label">Backend & Real-Time:</span>
              <p>Express.js, FastAPI, REST APIs, Socket.IO, JWT, Webhooks</p>
            </div>
            <div className="skill-group">
              <span className="group-label">Databases & Infrastructure:</span>
              <p>PostgreSQL, MongoDB, Redis, Docker, RabbitMQ, Cloudflare</p>
            </div>
            <div className="skill-group">
              <span className="group-label">AI & Emerging Frameworks:</span>
              <p>LangChain, LangGraph, Gemini 2.5, Qdrant Vector DB, RAG</p>
            </div>
          </div>

          {/* Column 2: Key Proof of Work */}
          <div className="recruiter-card">
            <div className="card-title-row">
              <FaBriefcase className="card-icon" />
              <h3>Proven Experience</h3>
            </div>
            <ul className="recruiter-list">
              <li>
                <strong>GDG Ranchi (Core Tech Team):</strong> Engineered event
                platforms handling 5,000+ requests for DevFest; led technical
                workshops including Gemini CLI activities.
              </li>
              <li>
                <strong>GSSoC Open Source Contributor:</strong> Collaborated on
                production codebases with global maintainers, enforcing clean Git
                branching and peer code reviews.
              </li>
              <li>
                <strong>CIITM Student Management System:</strong> Architected
                role-based academic platform with Razorpay payment webhooks and
                Socket.IO real-time alerts.
              </li>
              <li>
                <strong>NEXORA Multi-Agent Platform:</strong> Designed autonomous
                swarms using LangGraph DAG execution loops and Qdrant memory.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Fast Contact */}
        <div className="recruiter-bottom">
          <div className="direct-contact-info">
            <span>Direct Email:</span>
            <a href="mailto:abhishekg6889@gmail.com">
              <FaEnvelope /> abhishekg6889@gmail.com
            </a>
          </div>
          <p className="recruiter-note">
            Targeting Full-Stack Developer, Backend Engineer, and AI Systems roles.
            Open to immediate interviews and technical discussions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterModal;

