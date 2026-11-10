const timelineItemClass =
  "career-info-box mb-[70px] flex flex-col items-start justify-between gap-[10px] min-[901px]:mb-[60px] min-[901px]:flex-row min-[901px]:gap-0";
const timelineHeaderClass =
  "box-border flex w-full justify-between gap-0 pl-[5%] min-[601px]:gap-[20px] min-[601px]:pl-[10%] min-[901px]:w-[45%] min-[901px]:pl-0 min-[1401px]:w-[46%] min-[1401px]:gap-[30px]";
const roleTitleClass =
  "m-0 w-auto text-[20px] font-semibold leading-[26px] tracking-[0.6px] min-[1401px]:text-[26px] min-[1401px]:leading-[32px]";
const roleOrgClass =
  "my-[8px] text-[17px] font-normal tracking-[0.7px] text-[var(--accentColor)]";
const yearClass =
  "m-0 text-[33px] font-semibold leading-[42px] text-white min-[601px]:text-[40px]";
const descriptionClass =
  "m-0 box-border w-full pl-[5%] text-[14px] font-light leading-[25px] text-[#D4D4D4] min-[601px]:pl-[10%] min-[901px]:w-[45%] min-[901px]:pl-0 min-[1401px]:w-[46%] min-[1401px]:text-[16px]";

const Career = () => {
  return (
    <div
      className="career-section section-container relative mx-auto -mt-[70px] mb-0 flex h-auto flex-col items-start justify-start pt-[90px] pb-[70px] opacity-100 min-[601px]:-mt-[200px] min-[601px]:items-center min-[601px]:justify-center min-[601px]:place-items-center min-[601px]:pt-[220px] min-[1026px]:mt-0 min-[1026px]:mb-[250px] min-[1026px]:pt-[120px] min-[1026px]:pb-[120px]"
      id="career"
    >
      <div className="w-full max-[900px]:w-[calc(100%-25px)]">
        <h2 className="mt-0 mb-[90px] w-full bg-[linear-gradient(0deg,#FF6B00,#ffffff)] bg-clip-text text-center text-[45px] font-normal leading-[45px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] min-[601px]:mt-[50px] min-[601px]:w-auto min-[601px]:text-[50px] min-[601px]:leading-[50px] min-[1401px]:text-[70px] min-[1401px]:leading-[70px]">
          Experience <span className="font-['Geist',sans-serif] font-light">&</span>
          <br /> Education
        </h2>
        <div className="relative m-0 flex flex-col min-[601px]:mx-auto min-[601px]:my-0">
          <div className="career-timeline absolute -top-[50px] left-0 h-full max-h-0 w-[3px] -translate-x-1/2 bg-[linear-gradient(to_top,#FF6B00_20%,var(--accentColor)_50%,transparent_95%)] min-[901px]:left-1/2">
            <div className="career-dot absolute bottom-0 left-1/2 h-[10px] w-[10px] -translate-x-1/2 translate-y-1/2 animate-pulse rounded-full bg-[#FF6B00] shadow-[0_0_5px_2px_#FF8C42,0_0_15px_8px_#FF8C42,0_0_110px_20px_#FFB380] [animation-duration:0.8s] [animation-timing-function:linear]" />
          </div>
          <div className={timelineItemClass}>
            <div className={timelineHeaderClass}>
              <div>
                <h4 className={roleTitleClass}>Core Tech Team</h4>
                <h5 className={roleOrgClass}>GDG Ranchi</h5>
              </div>
              <h3 className={yearClass}>NOW</h3>
            </div>
            <p className={descriptionClass}>
              Built and maintained software for developer community events,
              including the GDG Ranchi official website and DevFest platforms.
              Contributed to event infrastructure handling more than 5,000
              requests on the DevFest website, led Gemini CLI activities, and
              collaborated across teams to deliver high-reliability features.
            </p>
          </div>
          <div className={timelineItemClass}>
            <div className={timelineHeaderClass}>
              <div>
                <h4 className={roleTitleClass}>Open Source Contributor</h4>
                <h5 className={roleOrgClass}>GSSoC (GirlScript)</h5>
              </div>
              <h3 className={yearClass}>2024</h3>
            </div>
            <p className={descriptionClass}>
              Contributed to open-source repositories and collaborative
              development workflows. Worked with maintainers, resolved bugs,
              reviewed code, and strengthened practical engineering with Git,
              GitHub, and team-based software delivery.
            </p>
          </div>
          <div className={timelineItemClass}>
            <div className={timelineHeaderClass}>
              <div>
                <h4 className={roleTitleClass}>Community & Open Source</h4>
                <h5 className={roleOrgClass}>Developer Ecosystem</h5>
              </div>
              <h3 className={yearClass}>ACTIVE</h3>
            </div>
            <p className={descriptionClass}>
              Active participant in developer communities, hackathons, and
              collaborative engineering initiatives. Focused on building tools
              that improve developer experience, sharing knowledge, and solving
              real-world engineering challenges.
            </p>
          </div>
          <div className={timelineItemClass}>
            <div className={timelineHeaderClass}>
              <div>
                <h4 className={roleTitleClass}>Bachelor of Computer Applications</h4>
                <h5 className={roleOrgClass}>CIITM Dhanbad · MCNU Bhopal</h5>
              </div>
              <h3 className={yearClass}>2027</h3>
            </div>
            <p className={descriptionClass}>
              Bachelor of Computer Applications (2024 – 2027 Expected) at
              Chhotanagpur Institute of Information Technology & Management,
              affiliated with Makhanlal Chaturvedi National University. Focused
              on software development, DSA, backend engineering, and modern AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
