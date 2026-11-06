import { useEffect } from "react";
import { MdClose, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { ProjectItem } from "../data/projectsData";
import "./styles/CaseStudyModal.css";

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

const CaseStudyModal = ({ project, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="case-study-overlay" onClick={onClose}>
      <div
        className="case-study-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          data-cursor="disable"
        >
          <MdClose />
        </button>

        <div className="modal-header">
          <div className="modal-tag-row">
            <span className="modal-id">CASE STUDY #{project.id}</span>
            <span className="modal-category">{project.category}</span>
          </div>
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-summary">{project.summary}</p>
          <div className="modal-links">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
              data-cursor="disable"
            >
              <FaGithub /> Repository <MdArrowOutward />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn primary"
                data-cursor="disable"
              >
                Live Demonstration <MdArrowOutward />
              </a>
            )}
          </div>
        </div>

        <div className="modal-body">
          {/* Problem & Purpose */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">01</span>
              <h3>Problem Statement & Motivation</h3>
            </div>
            <div className="modal-grid-two">
              <div className="modal-card">
                <h4>Problem Statement</h4>
                <p>{caseStudy.problemStatement}</p>
              </div>
              <div className="modal-card">
                <h4>Why I Built It</h4>
                <p>{caseStudy.whyBuilt}</p>
              </div>
            </div>
          </section>

          {/* Engineering Contribution */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">02</span>
              <h3>Engineering Contribution</h3>
            </div>
            <ul className="modal-bullet-list">
              {caseStudy.engineeringContribution.map((point, index) => (
                <li key={index}>
                  <span className="bullet-indicator">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* System Architecture */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">03</span>
              <h3>System Architecture & Data Flow</h3>
            </div>
            <div className="architecture-box">
              <div className="arch-diagram-text">{caseStudy.systemArchitecture}</div>
            </div>
            <div className="flow-steps">
              <h4>End-to-End Data Lifecycle</h4>
              <div className="steps-timeline">
                {caseStudy.architectureFlow.map((step, idx) => (
                  <div key={idx} className="step-item">
                    <span className="step-badge">Step {idx + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Decisions */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">04</span>
              <h3>Key Technical Decisions</h3>
            </div>
            <div className="decisions-grid">
              {caseStudy.keyTechnicalDecisions.map((dec, idx) => (
                <div key={idx} className="decision-card">
                  <h4>{dec.title}</h4>
                  <p>{dec.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">05</span>
              <h3>Challenges & Engineering Solutions</h3>
            </div>
            <div className="challenges-list">
              {caseStudy.challengesAndSolutions.map((item, idx) => (
                <div key={idx} className="challenge-item">
                  <div className="challenge-block">
                    <span className="pill challenge">CHALLENGE</span>
                    <p>{item.challenge}</p>
                  </div>
                  <div className="solution-block">
                    <span className="pill solution">ENGINEERED SOLUTION</span>
                    <p>{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Breakdown */}
          <section className="modal-section">
            <div className="section-header">
              <span className="section-num">06</span>
              <h3>Technology Stack Breakdown</h3>
            </div>
            <div className="tech-stack-domains">
              {caseStudy.techStackBreakdown.map((domain, idx) => (
                <div key={idx} className="domain-card">
                  <h5>{domain.domain}</h5>
                  <div className="domain-pills">
                    {domain.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="domain-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;

