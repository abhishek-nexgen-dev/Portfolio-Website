# Visual Theme

## Identity

The portfolio uses a dark, high-contrast interface with a warm orange accent. The style combines restrained panels and typography with selective motion, glow, and 3D effects.

## Tokens

| Token | Current value | Use |
| --- | --- | --- |
| Background | `#000000` | Page and section backgrounds |
| Accent | `#FF6B00` | Links, highlights, active controls, and calls to action |
| Accent light | `#FF8A3D` / `#FFB380` | Secondary glow and gradient highlights |
| Primary text | `#FFFFFF` | Headings and key content |
| Secondary text | `#D4D4D4` | Body copy |
| Muted text | `#A3A3A3` | Supporting copy and labels |
| Font | Geist, sans-serif | Interface and headings |
| Content maximum | `1920px` | Wide-screen content boundary |

The canonical CSS custom properties currently live in `src/index.css` as `--accentColor`, `--backgroundColor`, and `--cMaxWidth`. The Tailwind migration should expose the same values as Tailwind theme tokens so the palette is used consistently in utilities.

## Layout and Responsive Intent

- Use fluid container widths with a centered maximum width.
- Keep the hero readable and visually balanced at narrow widths; stack content when a two-column composition no longer fits.
- Present project cards in a grid on tablet and phone sizes; retain the desktop scroll-driven project presentation on wide screens.
- Allow headings to scale with viewport width while retaining sensible minimum and maximum sizes.
- Keep controls touch-friendly and allow filters and tag lists to wrap or scroll without widening the page.

## Motion and Effects

GSAP scroll timelines, the character animation, glow cursor, and reveal effects are part of the visual identity. Keep motion purposeful, avoid running expensive rendering while hidden, and honor `prefers-reduced-motion`. GSAP-targeted DOM hooks must remain stable during styling changes.
