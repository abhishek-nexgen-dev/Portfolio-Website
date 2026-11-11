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
  title: "EduVanta – Institutional Management Platform",
  category: "Full-Stack Application",
  tools: "Web Development · Desktop Application · Content Management",
  featured: true,
  summary:
    "An educational institution management platform combining a public-facing website with a dedicated desktop application for administrators to manage admissions, notices, photo albums, and institutional content.",
  image: "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794421192/Screenshot_20261111_173628_mz5we2.png",
  githubUrl: "https://github.com/NexGenStudioDev/Eduvanta-web",
  liveUrl: "https://eduvanta.abhishek-nexgen.xyz/",
  caseStudyUrl: "https://dev.to/abhishek-nexgen-dev/eduvanta-website-desktop-management-system-3nfi",
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
  title: "DevFest Ranchi 2026",
  category: "Event Technology",
  tools: "React · TypeScript · Tailwind CSS · GSAP",
  summary:
    "The official event website for DevFest Ranchi 2026, built to deliver an engaging digital experience for attendees through event information, speaker highlights, session details, and responsive interfaces.",
  image: "https://res.cloudinary.com/dpnc8ddpf/image/upload/v1794420215/Screenshot_20261111_181242_pql3yc.png",
  githubUrl: "https://github.com/amandangi26/gdg-ranchi-devfest",
  liveUrl: "https://devfest.gdgranchi.in/",
  caseStudyUrl: "https://dev.to/abhishek-nexgen-dev/building-the-official-devfest-ranchi-2026-website-my-frontend-development-journey-5685",
}
];
