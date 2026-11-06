import type { MasonryItem } from "../components/Masonry";

/**
 * "Beyond the Code" — Masonry images.
 *
 * TODO (owner): replace every `img` below with real photographs from
 * your actual events (hackathons, GDG Ranchi / DevFest, conferences,
 * meetups, volunteering, team collaborations, workshops, networking).
 *
 * Recommended: save optimized photos (WebP/JPEG, ~1200px wide) to
 *   public/images/moments/
 * and reference them as  "/images/moments/<file>.webp"  below.
 * Example: { id: "devfest-2025-01", img: "/images/moments/devfest-2025-01.webp", width: 600, height: 800, alt: "DevFest 2025" }
 *
 * Keep `width`/`height` close to the real aspect ratio so the masonry
 * layout reserves the right space before images load (no layout shift).
 * Titles/descriptions are intentionally omitted — the gallery shows
 * images only, no captions.
 *
 * Privacy: only ship photos you are cleared to publish — get consent
 * for identifiable faces and confirm the event organizer allows reuse.
 *
 * NOTE: URLs below are temporary dummy placeholders for preview only.
 * They are NOT real event photographs — do not ship them as final content.
 */
export const beyondTheCodeItems: MasonryItem[] = [
  { id: "1", img: "https://picsum.photos/id/1015/600/400", width: 600, height: 400, alt: "Developer journey moment" },
  { id: "2", img: "https://picsum.photos/id/1025/600/750", width: 600, height: 750, alt: "Developer journey moment" },
  { id: "3", img: "https://picsum.photos/id/1039/600/520", width: 600, height: 520, alt: "Developer journey moment" },
  { id: "4", img: "https://picsum.photos/id/1043/600/820", width: 600, height: 820, alt: "Developer journey moment" },
  { id: "5", img: "https://picsum.photos/id/1044/600/450", width: 600, height: 450, alt: "Developer journey moment" },
  { id: "6", img: "https://picsum.photos/id/1050/600/700", width: 600, height: 700, alt: "Developer journey moment" },
  { id: "7", img: "https://picsum.photos/id/1062/600/380", width: 600, height: 380, alt: "Developer journey moment" },
  { id: "8", img: "https://picsum.photos/id/1069/600/780", width: 600, height: 780, alt: "Developer journey moment" },
  { id: "9", img: "https://picsum.photos/id/1074/600/500", width: 600, height: 500, alt: "Developer journey moment" },
  { id: "10", img: "https://picsum.photos/id/1080/600/860", width: 600, height: 860, alt: "Developer journey moment" },
  { id: "11", img: "https://picsum.photos/id/1084/600/420", width: 600, height: 420, alt: "Developer journey moment" },
  { id: "12", img: "https://picsum.photos/id/106/600/720", width: 600, height: 720, alt: "Developer journey moment" },
  { id: "13", img: "https://picsum.photos/id/110/600/460", width: 600, height: 460, alt: "Developer journey moment" },
  { id: "14", img: "https://picsum.photos/id/133/600/800", width: 600, height: 800, alt: "Developer journey moment" },
  { id: "15", img: "https://picsum.photos/id/164/600/560", width: 600, height: 560, alt: "Developer journey moment" },
];

export const beyondTheCodeContent = {
  title: "Beyond the Code",
  description:
    "Every event, every hackathon, every collaboration, and every experience has been a part of my journey. A collection of moments, people, and experiences that shaped me as a developer.",
} as const;
