import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Tech Team</h4>
                <h5>GDG Ranchi</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built and maintained software for developer community events,
              including the GDG Ranchi official website and DevFest platforms.
              Contributed to event infrastructure handling more than 5,000
              requests on the DevFest website, led Gemini CLI activities, and
              collaborated across teams to deliver high-reliability features.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open Source Contributor</h4>
                <h5>GSSoC (GirlScript)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Contributed to open-source repositories and collaborative
              development workflows. Worked with maintainers, resolved bugs,
              reviewed code, and strengthened practical engineering with Git,
              GitHub, and team-based software delivery.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Community & Open Source</h4>
                <h5>Developer Ecosystem</h5>
              </div>
              <h3>ACTIVE</h3>
            </div>
            <p>
              Active participant in developer communities, hackathons, and
              collaborative engineering initiatives. Focused on building tools
              that improve developer experience, sharing knowledge, and solving
              real-world engineering challenges.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Computer Applications</h4>
                <h5>CIITM Dhanbad · MCNU Bhopal</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
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
