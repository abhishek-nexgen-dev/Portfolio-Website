# Application Architecture

## Runtime

- Vite serves and builds a React 18 + TypeScript single-page application.
- Tailwind CSS v4 is integrated through `@tailwindcss/vite` and imported from `src/index.css`.
- GSAP and ScrollTrigger drive scroll-linked section and character motion.
- Three.js renders the character scene; compressed model decoding uses the bundled Draco decoder.
- `motion` and icon packages support selected transitions and decorative UI.

## Rendering Flow

`src/main.tsx` mounts `App`. `App.tsx` wraps the page in `LoadingProvider` and lazy-load boundaries. `MainContainer.tsx` composes the navbar and ordered page sections. The character and glow cursor are separate visual layers, with the glow cursor deferred until an idle period on fine pointers.

## Data Flow

Content for project cards and the gallery is kept in `src/data/`. Section components consume that data and own local presentation state such as selected project filters or open dialogs. Loading state is shared through `src/context/`.

## Styling Migration Boundaries

Move visual styling into Tailwind classes in TSX, using responsive and state variants where possible. Keep GSAP selectors and semantic state classes stable until their animation hooks are replaced. Put shared colors and other design constants in Tailwind v4 theme tokens. Retain only truly global browser defaults or keyframes that cannot reasonably be represented with existing utilities; document every such exception.
