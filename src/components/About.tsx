import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="text-2xl font-extrabold title">About Me</h3>
       
        <div className="about-details">
          <p className="about-subtext">
            I'm Abhishek Kumar Gupta, a Full-Stack Developer and Software Engineer passionate about turning complex ideas into practical, scalable digital products.
          </p>
          <p className="about-subtext">
           I specialize in building modern web applications, designing robust backend architectures, and integrating AI-powered capabilities into real-world solutions. My core stack includes JavaScript, TypeScript, React, Node.js, Express, MongoDB, and modern AI technologies.
          </p>

           <p className="about-subtext">
          Beyond writing code, I enjoy understanding how systems work, solving engineering challenges, and building products that deliver meaningful value. From developing full-stack platforms and real-time applications to exploring multi-agent AI systems, I focus on writing maintainable code and engineering solutions that scale.
          </p>

          <div className="about-philosophy-card">
            <span className="philosophy-label">ENGINEERING PHILOSOPHY</span>
            <blockquote>
              Think beyond the interface. Engineer beyond the expected. Build for impact."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
