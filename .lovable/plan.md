# Visual & Animation Upgrade Plan

Goal: keep all existing content, structure, copy, links, and functionality identical — only elevate the visual polish and motion to a premium, Awwwards-tier feel.

## Scope (what changes)
Pure presentation: tokens in `src/styles.css`, class names, and lightweight motion. No route, data, or logic edits.

## 1. Design tokens (`src/styles.css`)
- Richer dark palette: deeper indigo/navy base, refined red accent, add `--primary-glow`, `--accent-glow`.
- Add gradient tokens: `--gradient-hero`, `--gradient-card`, `--gradient-border`.
- Add shadow tokens: `--shadow-elegant`, `--shadow-glow`, `--shadow-card`.
- Add smooth transition token: `--transition-smooth`.
- Refined typography scale + tighter tracking on display text.

## 2. Global motion utilities (`src/styles.css`)
- Add keyframes: `float`, `glow-pulse`, `gradient-shift`, `shimmer`, `slide-up-fade`, `blur-in`.
- Utilities: `.animate-float`, `.animate-glow`, `.animate-gradient`, `.hover-lift`, `.glass-card`, `.text-gradient`.
- Keep existing `marquee` for FeaturedColleges intact.

## 3. Hero (`CollegeHero.tsx`)
- Animated aurora/gradient mesh background using existing tokens (no new libs).
- Headline gets gradient text + subtle blur-in entrance.
- Floating decorative orbs with `animate-float` + `animate-glow`.
- CTA buttons: glass + shine sweep on hover; YouTube button gets a soft red glow pulse.
- Search bar: glass card with gradient border and focus ring glow.

## 4. Featured Colleges (`FeaturedColleges.tsx`)
- Edge fade masks on the marquee (already horizontal — keep behavior).
- Cards get gradient borders, lift-on-hover, and inner glow on hover.

## 5. College Card (`CollegeCard.tsx`)
- Glassmorphic surface, gradient initials avatar, badge pill polish, smooth hover scale + shadow.

## 6. Navbar & Footer
- Navbar: scroll-aware blur/opacity already implicit — add gradient underline on links, refined logo glow.
- Footer: subtle top gradient divider, hover glow on social icons.

## 7. Section components (Features, Reviews, FreeGuidance, MentorCTA, CTA)
- Apply shared `glass-card`, `hover-lift`, and entrance animations (`animate-fade-in`, `animate-scale-in`).
- Consistent section heading style with gradient accent underline.

## 8. College profile page (`colleges.$slug.tsx`) & explorer (`colleges.index.tsx`)
- Hero band with gradient mesh + breadcrumb polish.
- Filter chips: pill style with active glow.
- Grid cards inherit upgraded CollegeCard styling.

## Non-goals
- No content/copy changes.
- No new dependencies.
- No route or data changes.
- WhatsApp links, YouTube link, marquee direction — all unchanged.

## Technical notes
- All colors via semantic tokens — no hardcoded hex in components.
- Animations CSS-only (no Framer Motion install) to keep bundle lean.
- Respect `prefers-reduced-motion` via a single media query in styles.css.
