import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCopyright, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";

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

  const sectionHeadingClass =
    "m-0 mb-[10px] text-[14px] font-semibold uppercase tracking-[1px] text-[var(--accentColor)] opacity-80";
  const socialLinkClass =
    "flex items-center justify-between gap-[12px] border-b border-white/15 py-[10px] text-[17px] transition-all duration-200 ease-in-out hover:border-b-[var(--accentColor)] hover:pl-[5px] hover:text-[var(--accentColor)]";
  const socialLabelClass = "inline-flex items-center gap-[8px]";

  return (
    <div
      className="section-container mx-auto mt-[50px] pb-[50px] min-[901px]:mt-[100px] min-[901px]:pb-[100px]"
      id="contact"
      ref={sectionRef}
    >
      <div className="max-[900px]:w-[calc(100%-25px)]">
        <h3 className="m-0 mb-[16px] text-[24px] font-semibold uppercase tracking-[4px] text-[var(--accentColor)]">
          Contact
        </h3>
        <div className="mb-[50px] max-w-[850px]" ref={headlineRef}>
          <h2 className="m-0 mb-[20px] text-[32px] font-medium leading-[38px] min-[901px]:text-[38px] min-[901px]:leading-[44px] min-[1301px]:text-[46px] min-[1301px]:leading-[52px] min-[1601px]:text-[52px] min-[1601px]:leading-[58px]">
            Have an Idea?{" "}
            <span className="text-[var(--accentColor)]">Let's Build</span> Something Meaningful.
          </h2>
          <p className="m-0 text-[17px] font-light leading-[28px] text-[#D4D4D4]">
            I'm always interested in collaborating on innovative products,
            solving challenging engineering problems, contributing to open source,
            and connecting with developers and builders. Whether you have a project
            idea, an opportunity, or simply want to discuss technology, I'd love
            to connect. Let's turn your next idea into something real.
          </p>
        </div>

        <div
          className="flex flex-col justify-between gap-[40px] min-[901px]:flex-row"
          ref={flexRef}
        >
          <div className="contact-box flex flex-col">
            <h4 className={sectionHeadingClass}>Direct Reach</h4>
            <p className="mt-[4px] mb-[24px]">
              <a
                href="mailto:abhishek.nexgen.dev@gmail.com"
                className="inline-flex items-center gap-[8px] text-[18px] text-white! transition-colors duration-200 ease-in-out hover:text-[var(--accentColor)]!"
              >
                <FaEnvelope /> abhishek.nexgen.dev@gmail.com
              </a>
            </p>
            <h4 className={sectionHeadingClass}>Location</h4>
            <p className="mt-[4px] mb-[24px] flex items-center gap-[6px] text-[16px] text-[#D4D4D4]">
              <MdLocationOn /> Jharkhand, India
            </p>
          </div>

          <div className="contact-box flex flex-col">
            <h4 className={sectionHeadingClass}>Social & Code</h4>
            <a
              href="https://github.com/AbhishekNexGenDev"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
            >
              <span className={socialLabelClass}>
                <FaGithub /> GitHub (AbhishekNexGenDev)
              </span>
              <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/abhisheknexgendev"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
            >
              <span className={socialLabelClass}>
                <FaLinkedinIn /> LinkedIn
              </span>
              <MdArrowOutward />
            </a>
            <a
              href="https://x.com/AbhishekNexGen"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
            >
              <span className={socialLabelClass}>
                <FaXTwitter /> Twitter / X
              </span>
              <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box flex flex-col">
            <h2 className="m-0 text-[23px] font-normal leading-[32px]">
              Designed & Engineered <br /> by{" "}
              <span className="text-[var(--accentColor)]">Abhishek Kumar Gupta</span>
            </h2>
            <h5 className="mt-[16px] flex items-center gap-[6px] text-[14px] font-normal leading-[22px] text-[#A3A3A3]">
              <MdCopyright /> {new Date().getFullYear()} Abhishek Kumar Gupta · All Rights Reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
