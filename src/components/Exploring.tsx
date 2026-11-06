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

    
       
    </section>
  );
};

export default Exploring;

