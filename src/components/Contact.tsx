import { MdArrowOutward, MdCopyright, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-headline-wrap">
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

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Direct Reach</h4>
            <p>
              <a
                href="mailto:abhishekg6889@gmail.com"
                data-cursor="disable"
                className="contact-email-link"
              >
                <FaEnvelope /> abhishekg6889@gmail.com
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
              data-cursor="disable"
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
              data-cursor="disable"
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
              data-cursor="disable"
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
              <MdCopyright /> 2025 Abhishek Kumar Gupta · All Rights Reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
