import "./styles/Exploring.css";
import { TbBrain, TbHierarchy2, TbServer, TbCode, TbCloudCheck } from "react-icons/tb";

const exploringTopics = [
  {
    icon: <TbBrain />,
    title: "AI Engineering",
    tags: ["LLM Applications", "LangChain", "LangGraph", "Multi-Agent Systems", "RAG"],
    description:
      "Deepening practical expertise in autonomous agent workflows, state machines for tool-calling agents, dense vector indexing, and grounding LLM reasoning.",
  },
  {
    icon: <TbHierarchy2 />,
    title: "System Design",
    tags: ["Distributed Systems", "Caching", "Message Queues", "API Architecture", "Scalability"],
    description:
      "Studying high-availability designs, database sharding, CAP theorem trade-offs, message broker topologies, and resilient microservice communication.",
  },
  {
    icon: <TbServer />,
    title: "Backend Engineering",
    tags: ["TypeScript", "PostgreSQL", "FastAPI", "Microservices", "Prisma"],
    description:
      "Engineering robust transactional APIs, schema migrations, asynchronous Python services, and strict domain-driven architectures.",
  },
  {
    icon: <TbCode />,
    title: "Problem Solving (DSA)",
    tags: ["Data Structures", "Algorithms", "JavaScript", "Optimization", "Patterns"],
    description:
      "Sharpening problem solving across Trees, Graphs, Dynamic Programming, and Two-Pointer strategies with optimal time and space complexity.",
  },
  {
    icon: <TbCloudCheck />,
    title: "Infrastructure & DevOps",
    tags: ["Docker", "Docker Compose", "Cloudflare", "CI/CD", "Production Observability"],
    description:
      "Standardizing multi-stage container builds, automated deployment pipelines, and edge network caching for bulletproof deployments.",
  },
];

const architectureBlueprints = [
  {
    title: "Distributed Event-Driven Platform",
    subtitle: "High-throughput asynchronous task processing",
    stack: "Node.js · RabbitMQ · WebSockets · Redis · MongoDB",
    pattern: "Publisher -> Event Queue -> Worker Consumer Pool -> Broadcast Engine",
    highlights: [
      "Buffers sudden request bursts without server CPU exhaustion.",
      "Ensures zero message drops using AMQP persistent acknowledgments.",
      "Scales worker instances horizontally based on queue depth metrics.",
    ],
  },
  {
    title: "Autonomous Multi-Agent Swarm",
    subtitle: "Cyclic state machine for coordinated agent execution",
    stack: "FastAPI · LangGraph · Qdrant · Pydantic · Python",
    pattern: "Supervisor -> Planning Node -> Worker Swarm -> Critic Loop -> Final Output",
    highlights: [
      "Employs directed graph state transitions to prevent non-terminating loops.",
      "Uses semantic embeddings in Qdrant to provide long-term episodic recall.",
      "Enforces strict Pydantic schemas for deterministic tool execution.",
    ],
  },
  {
    title: "Zero-Trust Auth & RBAC Architecture",
    subtitle: "Cryptographic token rotation and permission gates",
    stack: "Express · JWT · Bcrypt · Redis Blacklist · HTTP-Only Cookies",
    pattern: "Client Handshake -> Short-Lived Access Token -> Refresh Token Rotation -> RBAC Middleware",
    highlights: [
      "Mitigates XSS vulnerabilities using strict HTTP-only SameSite cookies.",
      "Detects token theft automatically by invalidating entire token families.",
      "Provides sub-millisecond route permission checks with cached roles.",
    ],
  },
];

const journalNotes = [
  {
    title: "Solving Race Conditions in High-Concurrency Registrations",
    category: "System Reliability",
    takeaway:
      "Learned that database unique indexes alone are insufficient during network retries. Implemented distributed Redis mutex locks and client idempotency tokens to ensure deterministic state.",
  },
  {
    title: "Horizontally Scaling WebSocket Clusters with Redis Pub/Sub",
    category: "Real-Time Engineering",
    takeaway:
      "By decoupling socket session state from individual Node.js instances using Redis adapters, users across distinct servers broadcast and receive real-time events without dropped packets.",
  },
  {
    title: "Eliminating Hallucinations with Pydantic JSON Mode Contracts",
    category: "AI Engineering",
    takeaway:
      "Free-form text generation from LLMs causes silent pipeline failures. Enforcing strict JSON schema contracts on Gemini 2.5 produces reliable downstream execution.",
  },
];

const Exploring = () => {
  return (
    <section className="exploring-section section-container" id="exploring">
      <div className="exploring-header">
        <span className="exploring-badge">CONTINUOUS LEARNING & DESIGN</span>
        <h2>
          Beyond My <span>Current Stack</span>
        </h2>
        <p className="exploring-intro">
          I believe continuous learning is core to engineering. Here is what I am
          exploring, designing in the architecture lab, and documenting in public.
        </p>
      </div>

      <div className="exploring-grid">
          {exploringTopics.map((topic, idx) => (
            <div key={idx} className="explore-card">
              <div className="explore-card-top">
                <div className="explore-icon">{topic.icon}</div>
                <h3>{topic.title}</h3>
              </div>
              <p>{topic.description}</p>
              <div className="explore-tags">
                {topic.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="explore-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="arch-lab-grid">
          {architectureBlueprints.map((blueprint, idx) => (
            <div key={idx} className="arch-card">
              <div className="arch-card-header">
                <span className="arch-badge">BLUEPRINT 0{idx + 1}</span>
                <h3>{blueprint.title}</h3>
                <span className="arch-subtitle">{blueprint.subtitle}</span>
                <span className="arch-stack">{blueprint.stack}</span>
              </div>
              <div className="arch-pattern-box">
                <span className="pattern-label">DATA FLOW PATTERN</span>
                <code>{blueprint.pattern}</code>
              </div>
              <ul className="arch-highlights">
                {blueprint.highlights.map((item, hIdx) => (
                  <li key={hIdx}>
                    <span className="arch-dot">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="journal-grid">
          {journalNotes.map((note, idx) => (
            <div key={idx} className="journal-card">
              <div className="journal-top">
                <span className="journal-category">{note.category}</span>
                <span className="journal-num">NOTE 0{idx + 1}</span>
              </div>
              <h3>{note.title}</h3>
              <p>{note.takeaway}</p>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Exploring;

