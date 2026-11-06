import { useState } from "react";
import { FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";
import { FaUsers, FaAward, FaThumbsUp } from "react-icons/fa6";
import "./styles/Testimonials.css";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  category: "all" | "engineering" | "founders";
  rating: number;
  content: string;
  tags: string[];
  initials: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "CTO & Co-Founder",
    company: "Veloce Labs",
    category: "engineering",
    rating: 5,
    content:
      "Abhishek delivered our core web platform ahead of schedule with exceptional architectural clarity. His ability to bridge complex backend systems with fluid, high-performance UI set a new standard for our engineering team.",
    tags: ["Full-Stack", "Next.js", "WebSockets"],
    initials: "AR",
  },
  {
    id: "2",
    name: "Sophia Chen",
    role: "Head of Product",
    company: "Horizon AI",
    category: "founders",
    rating: 5,
    content:
      "Working with Abhishek was an absolute game changer. He turned our early product requirements into a sleek, intuitive digital experience that performed effortlessly through our public launch. Fast, clear communication and stellar work.",
    tags: ["Product Dev", "React", "UX/UI"],
    initials: "SC",
  },
  {
    id: "3",
    name: "Marcus Vance",
    role: "Principal Engineer",
    company: "DevSphere Global",
    category: "engineering",
    rating: 5,
    content:
      "Abhishek's deep understanding of performance optimization, state management, and modern full-stack workflows makes him one of the sharpest developers I've worked with. His code is modular, robust, and a delight to maintain.",
    tags: ["TypeScript", "Node.js", "Cloud"],
    initials: "MV",
  },
  {
    id: "4",
    name: "Elena Rostova",
    role: "Creative Director & Founder",
    company: "NovaSphere Studio",
    category: "founders",
    rating: 5,
    content:
      "The visual execution, micro-interactions, and 3D craftsmanship Abhishek brought to our brand exceeded every metric. He has the rare talent of being both a rigorous engineer and an artist with aesthetic taste.",
    tags: ["Creative Tech", "Three.js", "GSAP"],
    initials: "ER",
  },
  {
    id: "5",
    name: "David Kalu",
    role: "VP of Engineering",
    company: "FinEdge Tech",
    category: "engineering",
    rating: 5,
    content:
      "Abhishek demonstrated outstanding rigor in data security, asynchronous event streaming, and API latency optimization. He delivered production-ready microservices that passed rigorous security and compliance audits.",
    tags: ["Microservices", "Redis", "Docker"],
    initials: "DK",
  },
  {
    id: "6",
    name: "Priya Sharma",
    role: "Founder & CEO",
    company: "LeapFlow App",
    category: "founders",
    rating: 5,
    content:
      "Abhishek doesn't just write code; he thinks like a product builder. His architectural insights saved our startup months of engineering overhead and created an app that our initial customers genuinely rave about.",
    tags: ["MVP Delivery", "Fast Shipping", "Scale"],
    initials: "PS",
  },
];

const Testimonials = () => {
  const [filter, setFilter] = useState<"all" | "engineering" | "founders">("all");

  const filteredTestimonials =
    filter === "all"
      ? testimonialsData
      : testimonialsData.filter((item) => item.category === filter);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-badge">TESTIMONIALS</span>
          <h2>
            Client & <span>Peer Reviews</span>
          </h2>
          <p className="testimonials-intro">
            Honest feedback from founders, tech leads, and collaborators I’ve built production software with.
          </p>

          <div className="testimonials-stats-strip">
            <div className="testimonial-stat-box">
              <span className="stat-number">
                5.0 <FaStar className="stat-star-icon" />
              </span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="testimonial-stat-divider"></div>
            <div className="testimonial-stat-box">
              <span className="stat-number">15+</span>
              <span className="stat-label">Production Deliveries</span>
            </div>
            <div className="testimonial-stat-divider"></div>
            <div className="testimonial-stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-label">On-Time Completion</span>
            </div>
          </div>

          <div className="testimonials-filter-tabs">
            <button
              className={`t-filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <FaUsers /> All Endorsements ({testimonialsData.length})
            </button>
            <button
              className={`t-filter-btn ${filter === "engineering" ? "active" : ""}`}
              onClick={() => setFilter("engineering")}
            >
              <FaAward /> Tech Leads & Architects (
              {testimonialsData.filter((t) => t.category === "engineering").length}
              )
            </button>
            <button
              className={`t-filter-btn ${filter === "founders" ? "active" : ""}`}
              onClick={() => setFilter("founders")}
            >
              <FaThumbsUp /> Founders & Product (
              {testimonialsData.filter((t) => t.category === "founders").length}
              )
            </button>
          </div>
        </div>

        <div className="testimonials-grid">
          {filteredTestimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="testimonial-top">
                <div className="rating-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <div className="quote-mark">
                  <FaQuoteLeft />
                </div>
              </div>

              <p className="testimonial-text">“{t.content}”</p>

              <div className="testimonial-tags">
                {t.tags.map((tag, idx) => (
                  <span className="testimonial-tag" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <p>
                    {t.role} • <span>{t.company}</span>
                  </p>
                </div>
                <div className="verified-badge" title="Verified Collaboration">
                  <FaCheckCircle />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
