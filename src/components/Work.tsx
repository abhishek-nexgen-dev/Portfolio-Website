import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useMemo } from "react";
import { projectsData, ProjectItem } from "../data/projectsData";
import CaseStudyModal from "./CaseStudyModal";
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

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
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${Math.max(translateX, 500)}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [filteredProjects]);

  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <div className="work-header-wrap">
            <div>
              <span className="work-pill">PORTFOLIO CASE STUDIES</span>
              <h2>
                Featured <span>Projects</span>
              </h2>
            </div>
            <div className="work-filters" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`work-filter-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="work-flex">
            {filteredProjects.map((project) => (
              <div className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <div className="work-id-badge">
                      <h3>{project.id}</h3>
                      {project.featured && (
                        <span className="featured-pill">
                          <FaStar /> FEATURED ARCHITECTURE
                        </span>
                      )}
                    </div>

                    <div className="work-title-text">
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>

                  <h4>Tools & Architecture</h4>
                  <p className="work-tools">{project.tools}</p>
                  <p className="work-summary">{project.summary}</p>

                  <div className="work-action-group">
                    <button
                      className="work-btn-case-study"
                      onClick={() => setSelectedProject(project)}
                    >
                      <MdAutoStories /> View Case Study
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn-icon"
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
                        className="work-btn-icon"
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

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Work;
