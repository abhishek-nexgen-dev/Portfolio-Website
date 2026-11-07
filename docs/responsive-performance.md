# Responsive and Performance Guidelines

## Responsive Checks

Review narrow phone widths (320–390px), larger phones, tablets around the 768–1024px range, and desktop widths. Confirm there is no horizontal page overflow, headings do not clip, card content remains readable, dialogs fit within the viewport, and every interactive element remains reachable by touch and keyboard.

Use Tailwind mobile-first utilities. Add breakpoint variants only when the content or interaction needs a layout change. Prefer `minmax(0, 1fr)`, `min-w-0`, wrapping, `max-w-full`, and fluid sizing to fixed widths that can force overflow.

## Performance

- Preserve route/component lazy loading and deferred decorative effects.
- Keep WebGL pixel ratios capped and stop rendering when the scene is offscreen or the document is hidden.
- Use appropriately sized, compressed images and set dimensions/aspect ratios when practical.
- Avoid broad `will-change` usage and unnecessary continuously animated layers.
- Respect reduced-motion preferences for CSS and JavaScript-driven animation.
- Check the production bundle for unexpectedly large eager chunks when adding dependencies.

## Verification

Use `npm run build` to verify TypeScript and production bundling. Use `npm run lint` for static lint checks. For visual review, inspect the running site at representative widths and open the modal/filter interactions; a successful build alone does not prove responsive layout quality.
