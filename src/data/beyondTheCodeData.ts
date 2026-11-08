import type { MasonryItem } from "../components/Masonry";

/**
 * "Beyond the Code" — Moments, events, and community photos.
 * Real event photographs optimized as WebP in `/images/moments/`.
 */
export const beyondTheCodeItems: MasonryItem[] = [
  {
    id: "moment-1",
    img: "/images/moments/moment-1.webp",
    width: 600,
    height: 800,
    alt: "Developer Keynote & Community Session",
  },
  {
    id: "moment-2",
    img: "/images/moments/moment-2.webp",
    width: 600,
    height: 450,
    alt: "Conference Stage Presentation",
  },
  {
    id: "moment-3",
    img: "/images/moments/moment-3.webp",
    width: 600,
    height: 338,
    alt: "Tech Meetup & Workshop",
  },
  {
    id: "moment-4",
    img: "/images/moments/moment-4.webp",
    width: 600,
    height: 1067,
    alt: "Developer Ecosystem Collaboration",
  },
  {
    id: "moment-5",
    img: "/images/moments/moment-5.webp",
    width: 600,
    height: 391,
    alt: "Hackathon Team Project",
  },
  {
    id: "moment-6",
    img: "/images/moments/moment-6.webp",
    width: 600,
    height: 338,
    alt: "DevFest Community Gathering",
  },
  {
    id: "moment-7",
    img: "/images/moments/moment-7.webp",
    width: 600,
    height: 338,
    alt: "Tech Collaboration & Mentorship",
  },
  {
    id: "moment-8",
    img: "/images/moments/moment-8.webp",
    width: 600,
    height: 338,
    alt: "Community Stage Event",
  },
  {
    id: "moment-9",
    img: "/images/moments/moment-9.webp",
    width: 600,
    height: 333,
    alt: "Engineering Project Milestone",
  },
  {
    id: "moment-10",
    img: "/images/moments/moment-10.webp",
    width: 600,
    height: 339,
    alt: "Developer Achievement & Platform",
  },
];

export const beyondTheCodeContent = {
  title: "Beyond the Code",
  description:
    "Every event, every hackathon, every collaboration, and every experience has been a part of my journey. A collection of moments, people, and experiences that shaped me as a developer.",
} as const;
