# Folder Structure

This document describes the current source layout of the portfolio.

```text
Portfolio-Website/
├── docs/                         # Project and implementation documentation
├── public/
│   ├── draco/                    # Draco decoder used by compressed 3D assets
│   ├── images/                   # Portfolio and technology imagery
│   └── models/                   # Character model and environment assets
├── src/
│   ├── assets/                   # Imported source assets
│   ├── components/               # Page sections and reusable UI
│   │   ├── Character/            # Three.js scene, model, and interaction helpers
│   │   │   └── utils/
│   │   ├── styles/               # Legacy component styles; migration target for Tailwind
│   │   └── utils/                # GSAP, split text, and loading helpers
│   ├── context/                  # Loading context and smooth-scroll setup
│   ├── data/                     # Projects, gallery, and character data
│   ├── App.tsx                   # Root app and lazy loading boundaries
│   ├── App.css                   # Root layout styling (migration target)
│   ├── index.css                 # Tailwind entry and global browser/theme styles
│   └── main.tsx                  # React entry point
├── index.html                    # Metadata, font links, and app mount point
├── vite.config.ts                # Vite, React, Tailwind, and build chunk settings
└── package.json                  # Scripts and dependencies
```

## Main Components

- `MainContainer.tsx` composes the page sections and controls desktop/mobile character placement.
- `Landing.tsx`, `About.tsx`, `WhatIDo.tsx`, `Career.tsx`, `Work.tsx`, `TechSkills.tsx`, `Exploring.tsx`, `BeyondTheCode.tsx`, and `Contact.tsx` render the portfolio sections.
- `Navbar.tsx`, `CaseStudyModal.tsx`, `RecruiterModal.tsx`, and `Loading.tsx` provide navigation, dialogs, and loading UI.
- `Character/Scene.tsx` owns the Three.js renderer and character scene lifecycle.
- `data/` contains content data so project/gallery content stays separate from presentation.

## Placement Guidance

- Put page content in the relevant section component.
- Put reusable UI in `components/` and reusable behavior in `components/utils/` or `context/`.
- Keep project and gallery content in `src/data/`.
- Keep public assets under `public/` when referenced by URL; use `src/assets/` for assets imported and bundled by Vite.
