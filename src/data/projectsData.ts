export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tools: string;
  summary: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  caseStudyUrl: string;
  featured?: boolean;
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
    image: "/images/projects/ciitm_student_management_1794323857120.jpg",
    githubUrl: "https://github.com/abhishek-nexgen-dev",
    liveUrl: "https://github.com/abhishek-nexgen-dev",
    caseStudyUrl: "https://dev.to",
  },
  {
    id: "02",
    title: "Calcutta Hacks – Where Heritage Meets Technology",
    category: "Frontend Engineering",
    tools: "React · JavaScript · Tailwind CSS",
    featured: true,
    summary:
      "A responsive event website built for Apex Circle's 24-hour heritage hackathon, bringing Kolkata's cultural identity and modern technology together through an engaging digital experience.",
    image:
      "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794374457/Screenshot_20261111_104927_rqnnpv.png",
    githubUrl:
      "https://github.com/abhishek-nexgen-dev/calcuttahacks/tree/master",
    liveUrl: "https://cuttahacks.abhishek-nexgen.xyz",
    caseStudyUrl:
      "https://dev.to/abhishek-nexgen-dev/calcutta-hacks-where-heritage-meets-technology-31d8",
  },
  {
    id: "03",
    title: "Tolkify – Real-Time Communication",
    category: "Real-Time Engineering",
    tools: "MERN · Socket.IO · TypeScript · Redis",
    summary:
      "A real-time communication application focused on interactive messaging and seamless user communication.",
    image: "/images/projects/tolkify_realtime_chat_1794323858567.jpg",
    githubUrl: "https://github.com/abhishek-nexgen-dev",
    liveUrl: "https://github.com/abhishek-nexgen-dev",
    caseStudyUrl: "https://dev.to",
  },
  {
    id: "04",
    title: "AI Movie Recommender",
    category: "AI Integration",
    tools: "React · Gemini 2.5 · AI APIs · TMDB",
    summary:
      "An AI-powered movie recommendation experience that uses Gemini to generate intelligent recommendations.",
    image: "/images/projects/ai_movie_recommender_1794323860780.jpg",
    githubUrl: "https://github.com/abhishek-nexgen-dev",
    liveUrl: "https://github.com/abhishek-nexgen-dev",
    caseStudyUrl: "https://dev.to",
  },
  {
    id: "05",
    title: "GDG Ranchi Event Ecosystem",
    category: "Community Engineering",
    tools: "React · Node.js · APIs · RabbitMQ · Cloudflare",
    summary:
      "Built software for developer community events, including event platforms, permission-based backend systems, and registration workflows.",
    image: "/images/projects/gdg_devfest_ecosystem_1794323859606.jpg",
    githubUrl: "https://github.com/abhishek-nexgen-dev",
    liveUrl: "https://github.com/abhishek-nexgen-dev",
    caseStudyUrl: "https://dev.to",
  },
];
