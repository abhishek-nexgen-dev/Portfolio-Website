import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useMemo } from "react";
import { projectsData } from "../data/projectsData";
import { FaGithub, FaStar } from "react-icons/fa6";
import { MdArrowOutward, MdAutoStories } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Full-Stack",
  "AI & Multi-Agent",
  "Real-Time",
  "Community",
];

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    if (selectedCategory === "Full-Stack")
      return projectsData.filter((p) => p.category.includes("Full-Stack"));
    if (selectedCategory === "AI & Multi-Agent")
      return projectsData.filter((p) => p.category.includes("AI"));
    if (selectedCategory === "Real-Time")
      return projectsData.filter((p) => p.category.includes("Real-Time"));
    if (selectedCategory === "Community")
      return projectsData.filter((p) => p.category.includes("Community"));
    return projectsData;
  }, [selectedCategory]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      let translateX: number = 0;

      function setTranslateX() {
        const box = document.getElementsByClassName("work-box");
        if (!box || box.length === 0) return;
        const workContainer = document.querySelector(".work-container");
        if (!workContainer || !box[0].parentElement) return;
        const rectLeft = workContainer.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement.getBoundingClientRect().width;
        const padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX = Math.max(
          0,
          rect.width * box.length - (rectLeft + parentWidth) + padding
        );
      }

      setTranslateX();
      if (translateX <= 0) {
        gsap.set(".work-flex", { clearProps: "x" });
        return undefined;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${Math.max(translateX, 500)}`,
          scrub: true,
          pin: true,
          id: "work-desktop",
        },
      });

      timeline.to(".work-flex", {
        x: () => -translateX,
        ease: "none",
      });

      return () => {
        timeline.kill();
      };
    });

    mm.add("(max-width: 1024px)", () => {
      const boxes = gsap.utils.toArray<HTMLElement>(".work-box");
      if (boxes.length > 0) {
        gsap.fromTo(
          boxes,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".work-flex",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      mm.revert();
    };
  }, [filteredProjects]);

  const actionIconClass =
    "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-white/15 bg-white/[0.08] text-[15px] text-white! transition-all duration-200 ease-in-out hover:border-[var(--accentColor)] hover:bg-white/[0.18] hover:text-white!";

  return (
    <div
      className="work-section h-auto min-h-0 overflow-visible pt-[40px] pb-[80px] transition-none min-[1025px]:box-border min-[1025px]:h-screen min-[1025px]:py-0 min-[1025px]:will-change-transform"
      id="work"
    >
        <div className="work-container section-container mx-auto flex h-auto flex-col content-normal min-[1025px]:h-full min-[1025px]:content-stretch">
          <div className="relative z-[var(--z-section)] mt-[20px] mb-[24px] flex flex-wrap items-end justify-between gap-[16px] min-[1025px]:mt-[50px] min-[1025px]:mb-[20px]">
            <div>
              <span className="mb-[6px] inline-block rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/10 px-[12px] py-[3px] text-[11px] font-bold tracking-[2px] text-[var(--accentColor)]">
                PORTFOLIO CASE STUDIES
              </span>
              <h2 className="m-0 text-[36px] font-medium leading-[38px] min-[601px]:text-[50px] min-[601px]:leading-[56px] min-[1401px]:text-[56px] [@media(min-width:1025px)_and_(min-height:651px)_and_(max-height:900px)]:mt-[70px] [@media(min-width:1025px)_and_(min-height:651px)_and_(max-height:900px)]:mb-[30px] [@media(min-width:1401px)_and_(min-height:651px)_and_(max-height:900px)]:text-[60px] [@media(min-width:1025px)_and_(max-height:650px)]:mt-[70px] [@media(min-width:1025px)_and_(max-height:650px)]:mb-[20px] [@media(min-width:601px)_and_(max-height:650px)]:text-[40px]">
                Featured <span className="text-[var(--accentColor)]">Projects</span>
              </h2>
            </div>
            <div
              className="inline-flex w-full flex-wrap gap-[6px] rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-[4px] min-[601px]:w-auto"
              role="tablist"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cursor-pointer rounded-[6px] border-0 px-[10px] py-[5px] text-[11px] font-medium transition-all duration-200 ease-in-out min-[601px]:px-[14px] min-[601px]:py-[6px] min-[601px]:text-[12px] ${
                    selectedCategory === cat
                      ? "bg-[linear-gradient(135deg,#FF6B00_0%,#CC5200_100%)] text-white shadow-[0_2px_10px_rgba(255,107,0,0.3)]"
                      : "bg-transparent text-[#A3A3A3] hover:bg-white/[0.06] hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="work-flex relative ml-0 flex h-auto w-full flex-col gap-[32px] pr-0 max-[1024px]:transform-none! min-[1025px]:-ml-[30px] min-[1025px]:h-full min-[1025px]:flex-row min-[1025px]:gap-0 min-[1025px]:pr-[45px] min-[1025px]:before:absolute min-[1025px]:before:top-0 min-[1025px]:before:left-1/2 min-[1025px]:before:h-px min-[1025px]:before:w-[50000vw] min-[1025px]:before:-translate-x-1/2 min-[1025px]:before:bg-[#363636] min-[1025px]:before:content-[''] min-[1025px]:after:absolute min-[1025px]:after:top-full min-[1025px]:after:left-1/2 min-[1025px]:after:h-px min-[1025px]:after:w-[50000vw] min-[1025px]:after:-translate-x-1/2 min-[1025px]:after:bg-[#363636] min-[1025px]:after:content-[''] min-[1401px]:-ml-[80px] min-[1401px]:pr-[120px]">
            {filteredProjects.map((project) => (
              <div
                className="work-box box-border flex w-full max-w-full shrink-0 flex-col justify-start gap-[20px] p-[18px] max-[1024px]:rounded-[16px] max-[1024px]:border max-[1024px]:border-white/[0.08] max-[1024px]:bg-[rgba(16,16,20,0.7)] max-[1024px]:backdrop-blur-[12px] min-[601px]:p-[24px] min-[1025px]:w-[350px] min-[1025px]:max-w-none min-[1025px]:gap-[50px] min-[1025px]:border-r min-[1025px]:border-[#363636] min-[1025px]:p-[30px] min-[1025px]:even:flex-col-reverse [@media(min-width:1025px)_and_(max-height:650px)]:gap-[20px] min-[1401px]:w-[600px] min-[1401px]:p-[80px] [@media(min-width:1401px)_and_(max-height:900px)]:py-[40px]"
                key={project.id}
              >
                <div>
                  <div className="mb-[20px] flex w-full justify-between">
                    <div className="flex flex-col items-start gap-[6px]">
                      <h3 className="m-0 text-[32px] font-semibold leading-[32px] min-[1025px]:text-[35px] min-[1025px]:leading-[50px] min-[1401px]:text-[50px]">
                        {project.id}
                      </h3>
                      {project.featured && (
                        <span className="inline-flex items-center gap-[4px] whitespace-nowrap rounded-[4px] border border-[#FF6B00]/30 bg-[#FF6B00]/[0.12] px-[6px] py-[2px] text-[9px] font-bold tracking-[0.8px] text-[#FF6B00]">
                          <FaStar /> FEATURED ARCHITECTURE
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <h4 className="m-0 text-[15px] font-medium text-white min-[1401px]:text-[17px]">
                        {project.title}
                      </h4>
                      <p className="m-0 mt-[3px] text-[13px] font-light text-[#A3A3A3] min-[1401px]:text-[16px]">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <h4 className="m-0 text-[15px] font-medium text-white min-[1401px]:text-[17px]">
                    Tools & Architecture
                  </h4>
                  <p className="m-0 mt-[3px] mb-[8px] w-[95%] text-[13px] font-normal text-[var(--accentColor)]">
                    {project.tools}
                  </p>
                  <p className="m-0 mt-[3px] mb-[14px] w-[95%] text-[13px] font-light leading-[20px] text-[#D4D4D4]">
                    {project.summary}
                  </p>

                  <div className="mt-[15px] flex items-center gap-[10px] max-[1024px]:flex-wrap">
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-[6px] rounded-[8px] border-0 bg-[linear-gradient(135deg,#FF6B00_0%,#CC5200_100%)] px-[14px] py-[8px] text-[12px] font-semibold tracking-[0.3px] text-white! shadow-[0_4px_12px_rgba(255,107,0,0.25)] transition-all duration-[250ms] ease-in-out hover:-translate-y-[2px] hover:text-white! hover:shadow-[0_6px_18px_rgba(255,107,0,0.45)]"
                    >
                      <MdAutoStories /> View Case Study <MdArrowOutward />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionIconClass}
                      aria-label="GitHub Repository"
                      title="GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionIconClass}
                        aria-label="Live Demo"
                        title="Live Demo"
                      >
                        <MdArrowOutward />
                      </a>
                    )}
                  </div>
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.title}
                  link={project.liveUrl || project.githubUrl}
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Work;
