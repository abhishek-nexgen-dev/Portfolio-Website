# Tailwind Migration Plan

The current interface uses Tailwind CSS v4 alongside component stylesheets. The migration target is utility-first styling in TSX while preserving content, animation behavior, and the dark/orange visual system.

## Migration Order

1. Establish shared theme tokens and base styles.
2. Convert global/root layout and navigation.
3. Convert the hero and primary page sections.
4. Convert project cards, filters, and modal layouts.
5. Convert remaining dialogs, gallery, skills, and decorative components.
6. Remove obsolete stylesheet imports and files after their selectors are no longer used.
7. Recheck GSAP selectors, reduced-motion behavior, and responsive layouts.

## Rules

- Do not remove existing content or interactions as a shortcut.
- Prefer standard Tailwind utilities and responsive/state variants over custom CSS selectors.
- Use arbitrary values only for one-off values not covered by the theme or standard scale.
- Keep custom CSS limited to global resets, keyframes, or browser-specific behavior that cannot be expressed cleanly with utilities; record each exception here.
- Preserve stable class hooks used by GSAP until equivalent ref-based animation targeting is implemented and verified.
- Verify each migrated section before deleting its old stylesheet.

## Status

- Documentation established before the component styling migration.
- `Work.tsx` and `WorkImage.tsx` now use Tailwind utilities for the projects layout, cards, filters, actions, and image overlays. `src/components/styles/Work.css` has been removed.
- `About.tsx` and `Contact.tsx` now use Tailwind utilities for their section layouts, text, cards, and links. Their component stylesheets have been removed.
- `Career.tsx` and `Exploring.tsx` now use Tailwind utilities for their responsive section layouts and card content. Their component stylesheets have been removed; career scroll-reveal hooks remain for GSAP.
- `BeyondTheCode.tsx` and `TechSkills.tsx` now use Tailwind utilities for their section layouts, gallery framing, cards, and responsive grids. Their component stylesheets have been removed. The skills marquee keyframe is registered in Tailwind's `@theme` block in `src/index.css`.
- Root overlay and smooth-wrapper layout styles moved into Tailwind utilities; `src/App.css` and the unused `.section-container` rule have been removed.
- `HoverLinks.tsx` now uses Tailwind state utilities; its stylesheet and the unused `Navbar.css` file have been removed.
- The desktop GSAP section hooks (`work-section`, `work-container`, `work-flex`, and `work-box`) remain as behavior selectors. Their visual treatment is provided by Tailwind utilities.
- Remaining component stylesheets: `Landing.css`, `WhatIDo.css`, `CaseStudyModal.css`, `RecruiterModal.css`, `Loading.css`, and `SocialIcons.css`. `src/index.css` still contains global/base layout rules and is the next shared-styles migration target.
