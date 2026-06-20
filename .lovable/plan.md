
## Goal

Transform DU Science Hub from a pricing-led landing page into a search-first college discovery + mentorship platform. The hero becomes a large DU College Explorer, pricing is removed, and every CTA across the site reuses the existing WhatsApp link (`src/lib/links.ts`) with college-aware prefilled messages.

## Information architecture

New routes (TanStack Start, file-based):

```
src/routes/
  index.tsx               -> hero + sticky search + featured colleges + guidance + reviews
  colleges.tsx            -> full explorer (search, filters, grid)
  colleges.$slug.tsx      -> dynamic college profile page
  mentors.tsx             -> (optional, phase 2) — skipped for now
```

Removed from page: `Plans` section. The `Plans.tsx` file will be deleted.

## Data model

Single source of truth: `src/data/colleges.ts`.

```ts
type Quality = "Excellent" | "Very Good" | "Good" | "Average";
type Stream = "Science" | "Commerce" | "Arts & Humanities" | "Medical"
            | "Nursing" | "Pharmacy" | "Education" | "Vocational"
            | "Performing Arts" | "Physical Education";
type Category = "Co-ed" | "Women" | "Evening" | "Off-campus" | "Medical"
              | "Nursing" | "Specialized";

interface College {
  slug: string;          // "hindu-college"
  name: string;
  shortDescription: string;
  streams: Stream[];
  categories: Category[];
  popularCourses: string[];
  highlights: string[];
  campusLife: string;
  infrastructure: string;
  placements: { summary: string; rating: Quality };
  admissionInsights: string;
  ratings: {
    academics: Quality;
    campusLife: Quality;
    placements: Quality;
    faculty: Quality;
  };
  quickFacts: { label: string; value: string }[];
  reviews: { name: string; course: string; year: string; rating: Quality; text: string }[];
}
```

All ~95 colleges from the brief are seeded with realistic boilerplate content (description, streams, courses, highlights, 2–3 sample reviews each). Image placeholders use a deterministic gradient + initials component — no external image fetches.

## Components

New / changed files:

- `src/data/colleges.ts` — full seed (95 entries)
- `src/lib/whatsapp.ts` — `waLink(message?)` helper that wraps existing `WHATSAPP_LINK` from `src/lib/links.ts` and appends `?text=` when a prefill is given (falls back to plain link if the base URL isn't compatible)
- `src/components/CollegeHero.tsx` — new hero with big headline, subheadline, primary + secondary WhatsApp CTAs, and embedded search
- `src/components/CollegeSearch.tsx` — searchable combobox with autocomplete (name / course / stream / category), keyboard nav, sticky variant
- `src/components/StickySearchBar.tsx` — shrinks on scroll, persistent across home & explorer
- `src/components/CollegeCard.tsx` — glassmorphism card with placeholder gradient cover, name, streams, qualitative rating badges, "View Profile" + "Talk to a Senior"
- `src/components/CollegeGrid.tsx` — responsive grid + filter chips (stream, category)
- `src/components/QualityBadge.tsx` — colored pill for Excellent/Very Good/Good/Average
- `src/components/FreeGuidance.tsx` — replaces `Plans`; single "Free Admission Guidance" panel with "Book Free Guidance Call" CTA
- `src/components/MentorCTA.tsx` — reusable "Connect with a Senior Mentor" block; takes `collegeName` and builds prefilled WhatsApp link
- `src/components/college/*` — `Overview`, `QuickFacts`, `PopularCourses`, `CampusLife`, `Infrastructure`, `Placements`, `StudentReviews`, `AdmissionInsights` subsections for the profile page

Updated:

- `src/components/Navbar.tsx` — add "Colleges" link; CTA stays WhatsApp
- `src/components/Footer.tsx` — link to `/colleges`; remove pricing links
- `src/routes/index.tsx` — new section order: Hero (with search) → Featured Colleges (8 cards) → Free Guidance → Features → Reviews → CTA → Footer. Update SEO title/description to "Find Your Perfect DU College".
- `src/routes/sitemap[.]xml.ts` — include `/colleges` and every `/colleges/<slug>`
- `src/routes/colleges.tsx` — full explorer page with sticky search, filter chips, grid, count
- `src/routes/colleges.$slug.tsx` — profile page: hero image (gradient placeholder) → Overview → Quick Facts → Popular Courses → Campus Life → Infrastructure → Placements → Student Reviews → Admission Insights → Mentor CTA. `notFoundComponent` for unknown slugs. Per-route `head()` with college-specific title + description + og tags.

Deleted:

- `src/components/Plans.tsx`

## WhatsApp integration

All CTAs use a single helper:

```ts
// src/lib/whatsapp.ts
import { WHATSAPP_LINK } from "./links";
export function waLink(message?: string) {
  if (!message) return WHATSAPP_LINK;
  const sep = WHATSAPP_LINK.includes("?") ? "&" : "?";
  return `${WHATSAPP_LINK}${sep}text=${encodeURIComponent(message)}`;
}
```

Prefill messages:
- College profile mentor CTA: `Hi DU Science Hub, I would like guidance regarding {College Name}.`
- Mentor card CTA: `Hi DU Science Hub, I would like to connect with a mentor from {College Name}.`
- Generic CTAs ("Book Free Guidance Call", "Talk to a Senior", "Free Counselling", etc.): no prefill — reuse base link.

Every button label listed in the brief ("Book Free Guidance Call", "Talk to a Senior", "Connect With Mentor", "Get Admission Help", "Connect With College Senior", "Get Preference Sheet Guidance", "Talk to DU Science Hub", "Contact Mentor", "Free Counselling", "Connect Now") maps to `waLink(...)`.

## Design

- Typography: Fira Sans (loaded via `<link>` in `src/routes/__root.tsx` head, set as `--font-sans` in `src/styles.css` `@theme`).
- Keep current dark-blue + red DU brand tokens; add `--quality-excellent`, `--quality-very-good`, `--quality-good`, `--quality-average` semantic tokens.
- Glassmorphism cards (existing pattern), sticky search bar with backdrop blur, subtle hover lift, fade-in on scroll for grid items.
- Mobile-first: search bar is the dominant element on the hero at all breakpoints; filter chips become a horizontal scroll on small screens.

## SEO

- Home: title "Find Your Perfect DU College — DU Science Hub", new description.
- `/colleges`: "Explore All Delhi University Colleges" + count.
- `/colleges/$slug`: `{College Name} — Courses, Reviews, Placements | DU Science Hub` + dynamic description from `shortDescription`. OG title/description per college (no og:image — no real photos yet).
- Sitemap regenerated to include all college URLs.
- Single H1 per page; semantic sections; alt text on placeholder images.

## Out of scope (not in this plan)

- Real college photos (placeholders only; swappable later)
- Mentor profile pages (mentor CTAs live on college pages only)
- Backend / database (static TS data file — no Lovable Cloud needed)
- Auth, booking system (CTAs always go to WhatsApp)

## Implementation order

1. Tokens + Fira Sans + `waLink` helper
2. `colleges.ts` seed (all ~95 entries)
3. Shared components (Search, Card, QualityBadge, MentorCTA, FreeGuidance)
4. New hero + updated `index.tsx` (delete Plans)
5. `/colleges` explorer route
6. `/colleges/$slug` profile route + notFound
7. Navbar/Footer updates, sitemap update, SEO polish
8. Verify build + spot-check a profile page in the preview
