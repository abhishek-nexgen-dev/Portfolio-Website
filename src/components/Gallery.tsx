import { useState } from "react";
import {
  FaEye,
  FaTimes,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaLaptopCode,
  FaCube,
  FaServer,
} from "react-icons/fa";
import "./styles/Gallery.css";

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "web" | "architecture" | "creative";
  categoryLabel: string;
  date: string;
  summary: string;
  details: string;
  technologies: string[];
  visualType: "dashboard" | "architecture" | "spatial3d" | "mobile" | "realtime" | "kinetic";
  externalLink?: string;
  stats?: { label: string; value: string }[];
}

const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Apex Trader — Ultra Dark Financial Terminal",
    category: "web",
    categoryLabel: "Web & UI",
    date: "2025",
    summary:
      "A high-density financial analytics dashboard with millisecond latency telemetry, candle charts, and orderbook heatmaps.",
    details:
      "Designed and prototyped for high-frequency trading analysts. Features canvas-based high FPS charting, customizable widget grid, WebSocket streaming ticker bars, and strict dark-mode contrast conforming to WCAG AAA standards.",
    technologies: ["React", "TypeScript", "Canvas API", "Tailwind CSS", "WebSockets"],
    visualType: "dashboard",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Render Rate", value: "60 FPS" },
      { label: "Data Latency", value: "< 15ms" },
      { label: "Theme", value: "Black & Orange" },
    ],
  },
  {
    id: "g2",
    title: "Resilient Microservices Mesh Topology",
    category: "architecture",
    categoryLabel: "System Arch",
    date: "2024",
    summary:
      "Scalable event-driven distributed system blueprint featuring RabbitMQ asynchronous pipelines, Redis caching, and Docker swarm.",
    details:
      "Architectural diagram illustrating load balancing, circuit breakers, rate limiting, and cache-aside patterns. Built to handle 10,000+ requests per second with sub-50ms 99th percentile response latency.",
    technologies: ["Docker", "RabbitMQ", "Redis", "Node.js", "NGINX"],
    visualType: "architecture",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Throughput", value: "10k+ req/s" },
      { label: "P99 Latency", value: "48ms" },
      { label: "Availability", value: "99.99%" },
    ],
  },
  {
    id: "g3",
    title: "Spatial 3D Physics & WebGL Particle World",
    category: "creative",
    categoryLabel: "3D & Creative",
    date: "2025",
    summary:
      "Interactive 3D spatial canvas with rigid body physics simulation, custom GLSL shaders, and orbit collision detection.",
    details:
      "Engineered using Three.js and React Three Fiber with Rapier physics engine. Features procedural lighting, normal mapping, dynamic emissive orange materials, and smooth mouse-follow vector calculations.",
    technologies: ["Three.js", "R3F", "GLSL Shaders", "Rapier Physics", "GSAP"],
    visualType: "spatial3d",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Particles", value: "50,000+" },
      { label: "Engine", value: "Three.js" },
      { label: "Physics", value: "Rapier" },
    ],
  },
  {
    id: "g4",
    title: "Pulse Mobile Commerce & Design System",
    category: "web",
    categoryLabel: "Web & UI",
    date: "2024",
    summary:
      "Clean, component-driven mobile application design system built for speed, accessibility, and high conversion checkout.",
    details:
      "Includes complete atomic component hierarchy: micro-interaction tokens, haptic feedback states, fluid sheet dialogs, and Apple Human Interface Guidelines-inspired navigation layouts.",
    technologies: ["Figma", "Design Tokens", "React Native", "CSS Modules"],
    visualType: "mobile",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Components", value: "80+" },
      { label: "Accessibility", value: "100%" },
      { label: "Tokens", value: "Design Tokens" },
    ],
  },
  {
    id: "g5",
    title: "Realtime CRDT Collaborative State Sync",
    category: "architecture",
    categoryLabel: "System Arch",
    date: "2025",
    summary:
      "Multiplayer state synchronization architecture utilizing conflict-free replicated data types and binary protocol frames.",
    details:
      "Enables multi-user synchronous canvas collaboration with cursor extrapolation, offline edit reconciliation, and end-to-end cryptographic integrity verification.",
    technologies: ["CRDTs", "WebSockets", "Binary Protocol", "TypeScript", "Node.js"],
    visualType: "realtime",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Sync Overhead", value: "Tiny" },
      { label: "Collision Rate", value: "0%" },
      { label: "Protocol", value: "Binary WSS" },
    ],
  },
  {
    id: "g6",
    title: "Kinetic Geometry & Morphing GSAP Laboratory",
    category: "creative",
    categoryLabel: "3D & Creative",
    date: "2025",
    summary:
      "Experimental interactive playground testing fluid scroll-driven SVG morphs, magnetic boundaries, and inertial spring physics.",
    details:
      "Crafted with GSAP ScrollTrigger and custom requestAnimationFrame loops. Showcases non-blocking micro-interactions, responsive typography scaling, and dark-palette vector graphics.",
    technologies: ["GSAP", "ScrollTrigger", "SVG Animation", "CSS Math", "TypeScript"],
    visualType: "kinetic",
    externalLink: "https://github.com/Abhishek-N-G",
    stats: [
      { label: "Scroll Engine", value: "GSAP Smoother" },
      { label: "Frame Drops", value: "0" },
      { label: "Vectors", value: "Procedural SVG" },
    ],
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "architecture" | "creative">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const renderVisual = (type: GalleryItem["visualType"]) => {
    switch (type) {
      case "dashboard":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            <rect x="15" y="15" width="370" height="30" rx="6" fill="#171717" stroke="#262626" />
            <circle cx="32" cy="30" r="4" fill="#FF6B00" />
            <circle cx="45" cy="30" r="4" fill="#404040" />
            <circle cx="58" cy="30" r="4" fill="#404040" />
            <rect x="80" y="26" width="90" height="8" rx="4" fill="#333333" />
            <rect x="15" y="55" width="240" height="110" rx="8" fill="#141414" stroke="#262626" />
            <path d="M 25 140 Q 70 80, 110 110 T 170 70 T 245 95" fill="none" stroke="#FF6B00" strokeWidth="2.5" />
            <path d="M 25 140 Q 70 80, 110 110 T 170 70 T 245 95 L 245 155 L 25 155 Z" fill="url(#orangeGrad)" opacity="0.2" />
            <defs>
              <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="265" y="55" width="120" height="110" rx="8" fill="#141414" stroke="#262626" />
            <rect x="278" y="70" width="94" height="10" rx="3" fill="#2A2A2A" />
            <rect x="278" y="88" width="70" height="10" rx="3" fill="#FF6B00" opacity="0.8" />
            <rect x="278" y="106" width="85" height="10" rx="3" fill="#2A2A2A" />
            <rect x="278" y="124" width="60" height="10" rx="3" fill="#FF6B00" opacity="0.6" />
            <rect x="15" y="175" width="115" height="50" rx="6" fill="#171717" stroke="#262626" />
            <rect x="142" y="175" width="115" height="50" rx="6" fill="#171717" stroke="#262626" />
            <rect x="270" y="175" width="115" height="50" rx="6" fill="#171717" stroke="#262626" />
            <circle cx="30" cy="195" r="5" fill="#FF6B00" />
            <circle cx="157" cy="195" r="5" fill="#FFFFFF" />
            <circle cx="285" cy="195" r="5" fill="#FF6B00" />
          </svg>
        );
      case "architecture":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            {/* API Gateway */}
            <rect x="25" y="95" width="75" height="50" rx="6" fill="#1C1C1C" stroke="#FF6B00" strokeWidth="1.5" />
            <text x="35" y="124" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">GATEWAY</text>
            {/* Lines */}
            <path d="M 100 120 L 150 70" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 100 120 L 150 120" stroke="#FF6B00" strokeWidth="1.5" />
            <path d="M 100 120 L 150 170" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Services */}
            <rect x="150" y="45" width="95" height="45" rx="6" fill="#171717" stroke="#333" />
            <text x="162" y="72" fill="#E5E5E5" fontSize="10" fontFamily="sans-serif">Auth Service</text>
            <rect x="150" y="100" width="95" height="45" rx="6" fill="#171717" stroke="#FF6B00" />
            <text x="162" y="127" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">Core Worker</text>
            <rect x="150" y="155" width="95" height="45" rx="6" fill="#171717" stroke="#333" />
            <text x="162" y="182" fill="#E5E5E5" fontSize="10" fontFamily="sans-serif">Event Stream</text>
            {/* Lines to DB */}
            <path d="M 245 70 L 295 120" stroke="#444" strokeWidth="1.5" />
            <path d="M 245 120 L 295 120" stroke="#FF6B00" strokeWidth="1.5" />
            <path d="M 245 170 L 295 120" stroke="#444" strokeWidth="1.5" />
            {/* Cluster Database */}
            <rect x="295" y="90" width="80" height="60" rx="8" fill="#1C1C1C" stroke="#FF6B00" strokeWidth="1.5" />
            <ellipse cx="335" cy="105" rx="26" ry="6" fill="#292929" stroke="#FF6B00" />
            <text x="312" y="132" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">REDIS DB</text>
          </svg>
        );
      case "spatial3d":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            {/* 3D Wireframe Grid Perspective */}
            <path d="M 20 220 L 200 130 L 380 220" stroke="#2A2A2A" strokeWidth="1" />
            <path d="M 60 220 L 200 130 L 340 220" stroke="#2A2A2A" strokeWidth="1" />
            <path d="M 110 220 L 200 130 L 290 220" stroke="#2A2A2A" strokeWidth="1" />
            <path d="M 160 220 L 200 130 L 240 220" stroke="#2A2A2A" strokeWidth="1" />
            <line x1="20" y1="210" x2="380" y2="210" stroke="#333" strokeWidth="1" />
            <line x1="50" y1="190" x2="350" y2="190" stroke="#262626" strokeWidth="1" />
            <line x1="90" y1="170" x2="310" y2="170" stroke="#222" strokeWidth="1" />
            <line x1="140" y1="150" x2="260" y2="150" stroke="#1A1A1A" strokeWidth="1" />
            {/* Glowing 3D Sphere */}
            <circle cx="200" cy="95" r="42" fill="#141414" stroke="#FF6B00" strokeWidth="2" />
            <ellipse cx="200" cy="95" rx="42" ry="16" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="200" cy="95" rx="16" ry="42" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="185" cy="80" r="6" fill="#FFFFFF" opacity="0.9" />
            <circle cx="200" cy="95" r="54" stroke="#FF6B00" strokeWidth="0.8" opacity="0.4" strokeDasharray="4 4" />
          </svg>
        );
      case "mobile":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            {/* Mobile frame */}
            <rect x="145" y="15" width="110" height="210" rx="16" fill="#141414" stroke="#333" strokeWidth="2" />
            <rect x="175" y="23" width="50" height="6" rx="3" fill="#2A2A2A" />
            <circle cx="218" cy="26" r="2" fill="#FF6B00" />
            <rect x="155" y="42" width="90" height="36" rx="6" fill="#1F1F1F" stroke="#FF6B00" strokeWidth="0.8" />
            <rect x="162" y="48" width="40" height="6" rx="2" fill="#FF6B00" />
            <rect x="162" y="60" width="65" height="8" rx="2" fill="#FFFFFF" />
            <rect x="155" y="86" width="42" height="48" rx="6" fill="#1C1C1C" />
            <rect x="203" y="86" width="42" height="48" rx="6" fill="#1C1C1C" />
            <rect x="155" y="142" width="90" height="26" rx="5" fill="#242424" />
            <rect x="160" y="180" width="80" height="22" rx="11" fill="#FF6B00" />
            <text x="180" y="195" fill="#FFFFFF" fontSize="9" fontWeight="700" fontFamily="sans-serif">PAY NOW</text>
            {/* Accent lines */}
            <circle cx="80" cy="110" r="24" fill="#171717" stroke="#FF6B00" strokeWidth="1" />
            <circle cx="320" cy="110" r="24" fill="#171717" stroke="#333" strokeWidth="1" />
          </svg>
        );
      case "realtime":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            {/* Collaborative board */}
            <rect x="25" y="25" width="350" height="190" rx="8" fill="#141414" stroke="#292929" />
            <rect x="45" y="45" width="80" height="50" rx="6" fill="#1C1C1C" stroke="#FF6B00" strokeWidth="1.5" />
            <rect x="160" y="45" width="80" height="50" rx="6" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="275" y="45" width="80" height="50" rx="6" fill="#1C1C1C" stroke="#333" strokeWidth="1" />
            <path d="M 125 70 L 160 70" stroke="#FF6B00" strokeWidth="2" />
            <path d="M 240 70 L 275 70" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* User 1 Cursor */}
            <g transform="translate(110, 115)">
              <polygon points="0,0 5,14 8,9 14,8" fill="#FF6B00" />
              <rect x="12" y="10" width="75" height="18" rx="4" fill="#FF6B00" />
              <text x="18" y="23" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">Abhishek (Dev)</text>
            </g>
            {/* User 2 Cursor */}
            <g transform="translate(240, 140)">
              <polygon points="0,0 5,14 8,9 14,8" fill="#FFFFFF" />
              <rect x="12" y="10" width="60" height="18" rx="4" fill="#FFFFFF" />
              <text x="18" y="23" fill="#000000" fontSize="10" fontWeight="600" fontFamily="sans-serif">Client (Sync)</text>
            </g>
          </svg>
        );
      case "kinetic":
        return (
          <svg viewBox="0 0 400 240" className="gallery-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="10" fill="#0D0D0D" />
            {/* Geometric Kinetic Rings */}
            <circle cx="200" cy="120" r="75" stroke="#262626" strokeWidth="1.5" />
            <circle cx="200" cy="120" r="55" stroke="#FF6B00" strokeWidth="2" strokeDasharray="12 6" />
            <circle cx="200" cy="120" r="35" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="200" cy="120" r="14" fill="#FF6B00" />
            {/* Crosshairs & dynamic tick marks */}
            <line x1="200" y1="25" x2="200" y2="215" stroke="#222" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="85" y1="120" x2="315" y2="120" stroke="#222" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="40" y="40" width="12" height="12" fill="none" stroke="#FF6B00" strokeWidth="1" />
            <rect x="348" y="40" width="12" height="12" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="40" y="188" width="12" height="12" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            <rect x="348" y="188" width="12" height="12" fill="none" stroke="#FF6B00" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-badge">GALLERY & ARCHIVE</span>
          <h2>
            Visual <span>Exhibits</span>
          </h2>
          <p className="gallery-intro">
            A curated showcase of design systems, full-stack architectures, interactive 3D experiments, and production blueprints.
          </p>

          <div className="gallery-filter-tabs">
            <button
              className={`g-filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <FaLayerGroup /> All ({galleryData.length})
            </button>
            <button
              className={`g-filter-btn ${activeCategory === "web" ? "active" : ""}`}
              onClick={() => setActiveCategory("web")}
            >
              <FaLaptopCode /> Web & UI ({galleryData.filter((i) => i.category === "web").length})
            </button>
            <button
              className={`g-filter-btn ${activeCategory === "architecture" ? "active" : ""}`}
              onClick={() => setActiveCategory("architecture")}
            >
              <FaServer /> System Arch ({galleryData.filter((i) => i.category === "architecture").length})
            </button>
            <button
              className={`g-filter-btn ${activeCategory === "creative" ? "active" : ""}`}
              onClick={() => setActiveCategory("creative")}
            >
              <FaCube /> 3D & Creative ({galleryData.filter((i) => i.category === "creative").length})
            </button>
          </div>
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              className="gallery-card"
              key={item.id}
              onClick={() => setSelectedItem(item)}
            >
              <div className="gallery-card-visual">
                {renderVisual(item.visualType)}
                <div className="gallery-visual-overlay">
                  <span className="gallery-overlay-btn">
                    <FaEye /> View Case Exhibit
                  </span>
                </div>
              </div>

              <div className="gallery-card-body">
                <div className="gallery-card-meta">
                  <span className="gallery-category-pill">{item.categoryLabel}</span>
                  <span className="gallery-date-pill">{item.date}</span>
                </div>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-summary">{item.summary}</p>
                <div className="gallery-card-tags">
                  {item.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="gallery-tech-pill">
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="gallery-tech-pill-more">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox Modal */}
      {selectedItem && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="gallery-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-modal-close"
              onClick={() => setSelectedItem(null)}
              title="Close exhibit"
            >
              <FaTimes />
            </button>

            <div className="gallery-modal-header">
              <div className="gallery-modal-tags">
                <span className="modal-category-tag">{selectedItem.categoryLabel}</span>
                <span className="modal-date-tag">{selectedItem.date}</span>
              </div>
              <h2>{selectedItem.title}</h2>
            </div>

            <div className="gallery-modal-visual-frame">
              {renderVisual(selectedItem.visualType)}
            </div>

            {selectedItem.stats && (
              <div className="gallery-modal-stats-row">
                {selectedItem.stats.map((s, idx) => (
                  <div key={idx} className="modal-stat-card">
                    <span className="modal-stat-val">{s.value}</span>
                    <span className="modal-stat-lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="gallery-modal-content">
              <h3>Technical Overview & Rationale</h3>
              <p>{selectedItem.details}</p>

              <h3>Technology & Tooling</h3>
              <div className="modal-tech-list">
                {selectedItem.technologies.map((t, idx) => (
                  <span key={idx} className="modal-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="gallery-modal-actions">
              {selectedItem.externalLink && (
                <a
                  href={selectedItem.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-action-btn primary"
                >
                  <FaExternalLinkAlt /> View GitHub Repository
                </a>
              )}
              <button
                className="modal-action-btn secondary"
                onClick={() => setSelectedItem(null)}
              >
                Close Exhibit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
