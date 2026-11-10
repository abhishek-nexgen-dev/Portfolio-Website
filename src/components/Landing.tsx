import { PropsWithChildren, useState } from "react";
import "./styles/Landing.css";
import RecruiterModal from "./RecruiterModal";
import { MdDownload } from "react-icons/md";
import { FiArrowUpRight, FiCopy, FiCheck } from "react-icons/fi";

const Landing = ({ children }: PropsWithChildren) => {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("abhishek.nexgen.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div
              className="hero-status-badge"
              onClick={() => setIsRecruiterOpen(true)}
              style={{ cursor: "pointer" }}
              title="Click to view Recruiter Executive Brief"
            >
              <span className="status-dot"></span>
              <span>Available for Opportunities</span>
            </div>
            <h2>Hello! I'm</h2>
            <h1>
              ABHISHEK
              <br />
              <span>KUMAR GUPTA</span>
            </h1>
            <p className="hero-mantra">
              Building beyond tutorials. Engineering beyond interfaces.
            </p>
          </div>

          <div className="landing-info">
            {/* Ambient orange glow effect */}
            <div className="landing-info-glow" aria-hidden="true" />

            {/* Micro Eyebrow Badge */}
            <div className="hero-status-pill-secondary">
              <span className="hero-status-beacon"></span>
              <span>Full-Stack &amp; Systems</span>
            </div>

            {/* Kinetic Typography Headings (SplitText targets preserved) */}
            <h3>I Build Products &amp;</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Engineer</div>
              <div className="landing-h2-2">Architect</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Systems</div>
              <div className="landing-h2-info-1">Reality</div>
            </h2>

            {/* Bio with subtle highlights */}
            <p className="hero-bio">
              Focused on engineering scalable <strong>backend systems</strong>,
              resilient web architectures, and intelligent{" "}
              <strong>AI workflows</strong>.
            </p>

           

            {/* High-Impact CTA Group */}
            <div className="hero-cta-group mt-1 flex max-w-[440px] flex-wrap items-center gap-2.5">
              <a href="#work" className="hero-btn-primary">
                <span>Explore Projects</span>
                <FiArrowUpRight className="hero-btn-arrow" />
              </a>

              <button
                className="hero-btn-recruiter"
                onClick={() => setIsRecruiterOpen(true)}
                title="View Recruiter Executive Brief & Resume"
              >
                <MdDownload className="recruiter-btn-icon" />
                <span>Resume &amp; Brief</span>
              </button>

              <button
                className={`hero-btn-copy-email ${copiedEmail ? "copied" : ""}`}
                onClick={handleCopyEmail}
                title={copiedEmail ? "Email copied to clipboard!" : "Copy email address"}
              >
                {copiedEmail ? (
                  <>
                    <FiCheck className="copy-icon check" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="copy-icon" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </>
  );
};

export default Landing;
