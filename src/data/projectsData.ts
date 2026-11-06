export interface ProjectCaseStudy {
  problemStatement: string;
  whyBuilt: string;
  engineeringContribution: string[];
  systemArchitecture: string;
  architectureFlow: string[];
  keyTechnicalDecisions: { title: string; detail: string }[];
  challengesAndSolutions: { challenge: string; solution: string }[];
  techStackBreakdown: { domain: string; tools: string[] }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tools: string;
  summary: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  caseStudy: ProjectCaseStudy;
}

export const projectsData: ProjectItem[] = [
  {
    id: "01",
    title: "CIITM Student Management System",
    category: "Full-Stack Application",
    tools: "MERN · JWT · Socket.IO · Razorpay · Redis",
    featured: true,
    summary:
      "A student management platform featuring role-based access control, payment integration, and real-time administrative dashboards.",
    image:
      "https://images.openai.com/static-rsc-4/IQeVij682nxhZtet-pWYhEMy7C8NhM6ql26CGZAEzwOvvE6BLW2ziY_dHZZacHIFNn8yb9scTTUpIPPGe8N5HDmX1oPIxvcZe_bkAWq9aYC22EkFpPZZbRYmxCVagCdqOqSa5EO-xC5wKHPkAxD3hEmQmSMzCTTn5h1zH-CAu2A?purpose=inline",
    githubUrl: "https://github.com/AbhishekNexGenDev",
    liveUrl: "https://github.com/AbhishekNexGenDev",
    caseStudy: {
      problemStatement:
        "Academic institutions frequently suffer from fragmented student records, manual fee reconciliation prone to errors, delayed circular announcements, and insecure access hierarchies.",
      whyBuilt:
        "Engineered to provide CIITM with a unified digital ecosystem that digitizes admissions, tracks academic progress, automates tuition payments, and provides real-time administrative intelligence.",
      engineeringContribution: [
        "Architected scalable RESTful APIs with Express.js and modular MVC folder structure.",
        "Implemented strict Role-Based Access Control (RBAC) across Students, Faculty, and Administrators with JWT HTTP-only authentication.",
        "Integrated Razorpay Payment Gateway with cryptographically verified webhook event listeners for automated fee reconciliation.",
        "Built bidirectional real-time notification streams via Socket.IO for grade releases, urgent alerts, and fee confirmations.",
      ],
      systemArchitecture:
        "Client (React + Vite) <—> REST API Gateway (Node.js/Express) <—> JWT RBAC Auth Filter <—> MongoDB & Redis In-Memory Cache <—> Razorpay Webhook Verifier & Socket.IO Push Server.",
      architectureFlow: [
        "User sends credentials -> Server validates bcrypt hash -> Emits signed JWT in HTTP-only cookie.",
        "Admin posts batch notification -> Socket.IO pushes alert payload instantly to targeted student room.",
        "Student initiates tuition payment -> Razorpay checkout creates order -> Server verifies HMAC SHA256 signature on webhook -> Database status marks paid atomically.",
      ],
      keyTechnicalDecisions: [
        {
          title: "Atomic Transactions for Payments",
          detail:
            "Utilized MongoDB multi-document transactions during fee processing to guarantee student payment records and receipt numbers never go out of sync.",
        },
        {
          title: "Room-Partitioned WebSockets",
          detail:
            "Segmented Socket.IO connections into dynamic rooms based on student cohort and role, minimizing socket broadcast overhead by 70%.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            "Handling double-payment race conditions caused by intermittent mobile network retries during checkout.",
          solution:
            "Implemented unique idempotency keys in payment initialization and a distributed Redis lock during webhook confirmation.",
        },
      ],
      techStackBreakdown: [
        {
          domain: "Frontend",
          tools: ["React.js", "Vite", "Tailwind CSS", "Axios", "Lucide Icons"],
        },
        {
          domain: "Backend",
          tools: ["Node.js", "Express.js", "Socket.IO", "JWT", "Bcrypt"],
        },
        {
          domain: "Database & Cache",
          tools: ["MongoDB", "Mongoose", "Redis"],
        },
        {
          domain: "Payments & Cloud",
          tools: ["Razorpay Gateway", "Render / Cloudflare CDN"],
        },
      ],
    },
  },
  {
    id: "02",
    title: "NEXORA – Autonomous Multi-Agent AI",
    category: "AI Engineering",
    tools: "React · Python · FastAPI · PostgreSQL · Qdrant",
    featured: true,
    summary:
      "An AI orchestration platform designed around multi-agent workflows, intelligent task execution, and coordinated AI systems.",
    image:
      "https://images.openai.com/static-rsc-4/4DZ2TbL0Nn3ReiRFbSrgtWaKNb79E-Wtea_l_IbA98h_YjKhlfy1O5fRKZ0MwTqrWc0Ssb4OT2RTyUullg7rpaqSLtMyFKGS6r5OE-BRGpKpjzEjY-oKw75P4smxDa53l7Ntvakkw70gk-XUeSS5vh0q7EP1AW94YqG4xI5PKf0?purpose=inline",
    githubUrl: "https://github.com/AbhishekNexGenDev",
    liveUrl: "https://github.com/AbhishekNexGenDev",
    caseStudy: {
      problemStatement:
        "Single-prompt Large Language Models lack the capacity to solve long-horizon engineering tasks requiring systematic decomposition, tool invocation, code execution, and autonomous validation.",
      whyBuilt:
        "Created to experiment with agentic workflows where specialized AI personas (Planner, Coder, Critic, Executor) coordinate over shared state to accomplish end-to-end user objectives.",
      engineeringContribution: [
        "Built the core agent orchestration engine using Python, FastAPI, and LangGraph stateful DAG graphs.",
        "Implemented vector-grounded memory using Qdrant vector database for semantic recall across long conversational sessions.",
        "Engineered strict tool calling schemas using Pydantic, enabling agents to safely run Python sandbox scripts and web queries.",
        "Constructed a real-time reactive UI with React and WebSockets showing live agent-to-agent thought loops and task handoffs.",
      ],
      systemArchitecture:
        "React Frontend (Live DAG Visualizer) <—> WebSocket Engine (FastAPI) <—> LangGraph Supervisor Node <—> Worker Agent Swarm (Coder, Tool Runner, Critic) <—> Qdrant Vector Store & PostgreSQL.",
      architectureFlow: [
        "User prompt submitted -> Supervisor decomposes goal into sequential and parallel DAG nodes.",
        "Specialized agent executes node using registered tools (web search, code interpreter).",
        "Critic Agent validates execution outputs against test fixtures; passes state or requests corrective iteration.",
        "Final artifact compiled and streamed to client in real-time.",
      ],
      keyTechnicalDecisions: [
        {
          title: "Graph-Based Execution Loop",
          detail:
            "Adopted LangGraph's state machine architecture rather than fragile prompt chaining, allowing deterministic state transitions and cycle management.",
        },
        {
          title: "Vector Retrieval with Hybrid Search",
          detail:
            "Combined dense Qdrant vector embeddings with sparse keyword indexing to ensure accurate retrieval of project-specific context.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            "Preventing infinite hallucination loops when agents encounter ambiguous tool errors.",
          solution:
            "Added a deterministic circuit-breaker mechanism with max step ceilings and structured fallback strategies to ask for user guidance.",
        },
      ],
      techStackBreakdown: [
        {
          domain: "AI Frameworks",
          tools: ["LangChain", "LangGraph", "Gemini API", "OpenAI API"],
        },
        {
          domain: "Backend",
          tools: ["Python", "FastAPI", "WebSockets", "Pydantic", "Uvicorn"],
        },
        {
          domain: "Databases",
          tools: ["Qdrant Vector DB", "PostgreSQL", "SQLAlchemy"],
        },
        {
          domain: "Frontend",
          tools: ["React.js", "TypeScript", "Tailwind CSS", "React Flow"],
        },
      ],
    },
  },
  {
    id: "03",
    title: "Tolkify – Real-Time Communication",
    category: "Real-Time Engineering",
    tools: "MERN · Socket.IO · TypeScript · Redis",
    summary:
      "A real-time communication application focused on interactive messaging and seamless user communication.",
    image:
      "https://images.openai.com/static-rsc-4/p_nzRGnnzhe7JQTAWse5wJlQyl5m1OnBu3Sk82pWczIZCJmGsGSw824CWYPSb4d3yWGaTf29pDoVFosNAsiGiRHaUrZfsd3CUXUR0dh3P3f-7WZV7KRSOBZgQBC2AnSYrrxjaU-TVQpp_yACPmQjO1ddYTCdznvV_aJBzLEqVAk?purpose=inline",
    githubUrl: "https://github.com/AbhishekNexGenDev",
    liveUrl: "https://github.com/AbhishekNexGenDev",
    caseStudy: {
      problemStatement:
        "Modern communication applications demand sub-second latency, reliable connection resumption during mobile network switching, message delivery guarantees, and typing presence indicators.",
      whyBuilt:
        "Built to master distributed real-time architectures, bidirectional WebSocket event systems, and horizontal scaling patterns with Redis pub/sub.",
      engineeringContribution: [
        "Engineered end-to-end typed WebSocket event handlers in TypeScript across server and client.",
        "Integrated Redis Pub/Sub adapter to allow horizontal scaling across multiple Node.js server instances without message drops.",
        "Implemented persistent message queuing, read receipts (sent, delivered, read), active typing indicators, and user presence heartbeat.",
        "Designed clean optimistic UI rendering ensuring zero perceptual lag during sending.",
      ],
      systemArchitecture:
        "Client (React + TypeScript) <—> Socket.IO WebSocket Layer <—> Redis Pub/Sub Adapter <—> Node.js / Express Clusters <—> MongoDB Database.",
      architectureFlow: [
        "Client establishes authenticated WSS connection with JWT handshake token.",
        "Outgoing message sent with temporary client ID -> UI renders message instantly with pending badge.",
        "Server acknowledges arrival, assigns persistent ID, broadcasts via Redis to recipient's cluster node -> Client updates checkmark to delivered.",
      ],
      keyTechnicalDecisions: [
        {
          title: "Horizontal Scaling via Redis Adapter",
          detail:
            "Implemented `@socket.io/redis-adapter` so users connected to different WebSocket instances seamlessly exchange messages via Redis pub/sub.",
        },
        {
          title: "Sequenced Message Sync",
          detail:
            "Added monotonically incrementing cursor timestamps so reconnecting clients backfill missed messages without duplicates.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            "Handling reconnect storms when users switch from Wi-Fi to cellular networks.",
          solution:
            "Implemented exponential backoff reconnection strategies with jitter and batched message acknowledgments.",
        },
      ],
      techStackBreakdown: [
        {
          domain: "Client",
          tools: ["React.js", "TypeScript", "Tailwind CSS", "Zustand"],
        },
        {
          domain: "Real-time & Server",
          tools: ["Node.js", "Express.js", "Socket.IO", "Redis Pub/Sub"],
        },
        {
          domain: "Data & Storage",
          tools: ["MongoDB", "Mongoose", "Cloudinary (Media)"],
        },
      ],
    },
  },
  {
    id: "04",
    title: "AI Movie Recommender",
    category: "AI Integration",
    tools: "React · Gemini 2.5 · AI APIs · TMDB",
    summary:
      "An AI-powered movie recommendation experience that uses Gemini to generate intelligent recommendations.",
    image:
      "https://images.openai.com/static-rsc-4/KgAC5Qb6zTgt9O4ZflX3cS3Wja5hYr0dWH3EmGQQxVv0dSLNo6kQpxl76B-iuuIEEOcxNsmSlspS7t16XZtgtRxiPQpzFuWZlcH7PG-s2ZTovUtQ8--oe_gSu9pfp8qmttgsYUBN7G7aGg7TefzRplqdeMADo-2DZF5vmrsvPwk?purpose=inline",
    githubUrl: "https://github.com/AbhishekNexGenDev",
    liveUrl: "https://github.com/AbhishekNexGenDev",
    caseStudy: {
      problemStatement:
        "Traditional recommendation engines rely strictly on rigid genres or shallow collaborative filtering, completely missing subjective context like mood, tone, pacing, and complex thematic queries.",
      whyBuilt:
        "Built to explore the capabilities of Google Gemini 2.5 in interpreting complex human cinematic queries and mapping them to structured real-world movie datasets.",
      engineeringContribution: [
        "Designed few-shot prompt templates enforcing strict JSON output schemas from Gemini 2.5.",
        "Created an orchestration layer that takes Gemini's thematic recommendations and cross-references them against TMDB API for trailers, posters, and cast metadata.",
        "Built client-side search caching and debouncing to minimize redundant LLM token expenditures.",
        "Designed an ultra-responsive, cinematic dark-mode UI with smooth card transitions.",
      ],
      systemArchitecture:
        "React Frontend <—> Serverless AI Route <—> Google Gemini 2.5 Flash API (Structured JSON Mode) <—> TMDB Catalog API <—> Client View.",
      architectureFlow: [
        "User describes subjective mood: 'cerebral noir thrillers with mind-bending endings like Shutter Island'.",
        "System sends curated prompt to Gemini 2.5 requesting matched titles, thematic rationale, and similarity scores.",
        "Backend queries TMDB API in parallel for high-resolution artwork and ratings.",
        "Rich cinematic recommendations render with personalized thematic reasoning for each pick.",
      ],
      keyTechnicalDecisions: [
        {
          title: "Structured Schema Output Enforcement",
          detail:
            "Enforced strict JSON mode response contracts on Gemini API to eliminate LLM parsing exceptions in production.",
        },
        {
          title: "Parallel Asynchronous Enrichment",
          detail:
            "Leveraged `Promise.allSettled` to fetch external TMDB movie metadata in parallel, cutting total response latency by 60%.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            "LLMs occasionally recommending non-existent or fabricated movie titles.",
          solution:
            "Introduced automated validation against TMDB ID verification before displaying any recommended item to the user.",
        },
      ],
      techStackBreakdown: [
        {
          domain: "AI Layer",
          tools: ["Google Gemini 2.5 Flash", "Prompt Engineering", "JSON Mode"],
        },
        {
          domain: "Frontend",
          tools: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
        },
        {
          domain: "External APIs",
          tools: ["The Movie Database (TMDB) API"],
        },
      ],
    },
  },
  {
    id: "05",
    title: "GDG Ranchi Event Ecosystem",
    category: "Community Engineering",
    tools: "React · Node.js · APIs · RabbitMQ · Cloudflare",
    summary:
      "Built software for developer community events, including event platforms, permission-based backend systems, and registration workflows.",
    image:
      "https://images.openai.com/static-rsc-4/gOFAltoRCdiCI6yltBAwGXPH5NIwgZkQIa1eGbNipdcc35QABD1xj4PJZ-Oa35aPJ7nvwHzMy9zaAWtWs6HngEDixOd4vSZf303fA1SdUC9iTJK-JD7vvG7xxdFk5E6ebMtdStP02LO70GB-PjVHgAKflnLTzPz7Sm-Q7PTrCCI?purpose=inline",
    githubUrl: "https://github.com/AbhishekNexGenDev",
    liveUrl: "https://github.com/AbhishekNexGenDev",
    caseStudy: {
      problemStatement:
        "Community tech events experience severe traffic spikes during ticket release drops and day-of check-ins, leading to database lockups and lost attendee registrations.",
      whyBuilt:
        "Built for the Google Developer Group (GDG) Ranchi community to power DevFest Ranchi, managing speaker sessions, ticketing surges, and attendee verification.",
      engineeringContribution: [
        "Engineered the official GDG Ranchi community and DevFest web platform handling 5,000+ requests with zero downtime.",
        "Implemented RabbitMQ message queues to buffer high-concurrency ticket registrations, preventing database connection exhaustion.",
        "Built an administrative portal with QR code ticket scanner for rapid on-site attendee check-in.",
        "Coordinated technical activities around Gemini CLI workshops and developer hands-on challenges.",
      ],
      systemArchitecture:
        "Attendee Client <—> Cloudflare Edge CDN <—> Express REST API <—> RabbitMQ Event Queue <—> Background Worker Pool <—> MongoDB Cluster.",
      architectureFlow: [
        "Surge of 1,000+ simultaneous registrations hit API.",
        "Express verifies inputs, returns immediate receipt acknowledgment, and enqueues payload to RabbitMQ ticket queue.",
        "Worker processes consume queue items at a steady rate, generate secure QR ticket hashes, and persist to MongoDB.",
        "Confirmation email and ticket pushed asynchronously to attendee.",
      ],
      keyTechnicalDecisions: [
        {
          title: "Asynchronous Queueing with RabbitMQ",
          detail:
            "Decoupled registration write operations from HTTP response cycles using message queues, ensuring endpoints respond in under 50ms during flash traffic.",
        },
        {
          title: "Cloudflare Edge Caching",
          detail:
            "Cached static event assets, schedule schemas, and speaker bios on Cloudflare edge servers, absorbing 85% of repeated read requests.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            "Handling network instability during in-person check-in verification at the venue.",
          solution:
            "Built an offline-first QR verification mode in the organizer dashboard that syncs batched scan logs when connection restores.",
        },
      ],
      techStackBreakdown: [
        {
          domain: "Frontend",
          tools: ["React.js", "Next.js", "Tailwind CSS", "HTML5 QR Scanner"],
        },
        {
          domain: "Backend",
          tools: ["Node.js", "Express.js", "RabbitMQ", "AMQP", "JWT"],
        },
        {
          domain: "Database & Infrastructure",
          tools: ["MongoDB Atlas", "Cloudflare CDN", "Docker"],
        },
      ],
    },
  },
];

