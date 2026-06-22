# DU Science Hub — "Operating System for DU Admissions"

This is a large, multi-week build. I'll ship it in **6 focused phases**, each one independently deployable so the site keeps working as we go. After each phase I'll pause for your review before moving on.

Below is the full plan. Before I start, I have a couple of decisions I need from you (at the very bottom).

---

## North Star

Search-first, data-driven DU platform. Every page is generated from a database. Every page ranks. Every page funnels into the WhatsApp mentor flow.

Tech direction:
- Move all content (colleges, courses, cutoffs, reviews, mentors, FAQs) into **Lovable Cloud** (Postgres) so non-coders can update it later.
- TanStack Start server functions for reads; SSR for SEO.
- Tailwind v4 design tokens — dark navy + premium red + glass.
- Fira Sans via `<link>` in `__root.tsx`.
- CSS animations + a small amount of Framer Motion only where it adds value (search dropdown, hero counters).

---

## Phase 1 — Foundation: Design System + Homepage Redesign

Goal: the site immediately *feels* like a venture-backed startup.

1. **Design tokens** (`src/styles.css`)
   - Fira Sans as base font.
   - Palette: `--bg` deep navy, `--surface` glass, `--primary` deep blue, `--accent` premium red, `--text`, `--muted`.
   - Gradients: `--gradient-hero`, `--gradient-accent`, `--gradient-border`.
   - Shadows: `--shadow-elevated`, `--shadow-glow`.
   - Keep existing animation utilities; add `scroll-reveal`, `count-up`, `floating-card`.
2. **Homepage** (`src/routes/index.tsx`)
   - Full-screen hero, big headline "Find Your Perfect DU College".
   - Centerpiece: large animated search bar (existing `CollegeSearch`, restyled).
   - Floating cards behind/around hero: college card, review snippet, mentor card (CSS-animated, parallax-light).
   - Primary CTA: **Talk To A Senior** (WhatsApp). Secondary: **Explore Colleges**.
   - Sections below hero: Top Colleges preview · Course Explorer (Science / Commerce / Humanities) · Compare strip · Reviews · Mentor strip · Free Guidance · Footer.
   - Remove pricing references entirely.
3. **Navbar/Footer** polish — minimal, glass, scroll-aware.

---

## Phase 2 — Data Layer (Lovable Cloud)

Move from hardcoded `src/data/colleges.ts` to a real DB. Enables admin editing later + programmatic SEO.

Tables (all with RLS, public SELECT, admin INSERT/UPDATE via `user_roles`):
- `colleges` (slug, name, type, campus, image_url, description, highlights, location, metro, est_year, women_only, …)
- `courses` (slug, name, stream, description, careers)
- `college_courses` (join, with seats, cutoff data optional)
- `cutoffs` (college_id, course_id, year, category, score)
- `reviews` (college_id, author, year, course, rating_category, text, verified)
- `mentors` (name, college_id, course, year, photo_url, whatsapp_msg)
- `societies`, `hostels`, `placements`, `faqs`, `articles`
- `user_roles` + `has_role()` (per platform rules)

Seed with current colleges + a starter set of courses/reviews/mentors via a migration.

Server fns in `src/lib/*.functions.ts` (public, publishable-key client) for all reads. Loaders call them; pages stay SSR-friendly.

---

## Phase 3 — Discovery: College Explorer + Profiles + Course Hub

1. **College Explorer** `/colleges`
   - Filters: stream, campus, women-only, has-hostel, course offered.
   - Search + sort.
   - Card-grid with image, qualitative rating, courses, "Mentor available" badge.
2. **College Profile** `/colleges/$slug` (DB-driven)
   - Hero image, quick facts strip, overview, courses, campus life, infrastructure, placements, societies, hostels, faculty, reviews, FAQs, mentor CTA, sticky WhatsApp button.
   - Qualitative ratings (Excellent / Very Good / Good / Average) — keep `QualityBadge`.
   - JSON-LD: `CollegeOrUniversity` + `AggregateRating` + `FAQPage` + `BreadcrumbList`.
3. **Course Hub** `/courses` and `/courses/$slug`
   - Overview, best colleges, careers, placements, cutoffs, reviews, FAQs.

---

## Phase 4 — Decision Tools: Comparison + Cutoffs + CSAS + Preference Sheet

1. **Comparison Engine** `/compare/$a-vs-$b`
   - Side-by-side: academics, placements, campus, societies, hostels.
   - Generates a curated set (Hansraj vs Hindu, etc.) + dynamic for any two slugs.
2. **Cutoff Hub** `/cutoffs`
   - College-wise, course-wise, category-wise, year filter, trend charts.
3. **CSAS Hub** `/csas` (+ children: timeline, seat-allocation, preference-sheet-guide, mistakes).
4. **Preference Sheet Tool** `/preference-sheet`
   - Inputs: CUET score, category, gender, preferred courses, campus.
   - Output: ranked college list with reasoning.
   - CTA: "Get a mentor to refine this" → WhatsApp with prefilled context.
   - Stored anonymously for analytics + lead intent.

---

## Phase 5 — Social Proof + Content: Reviews, Mentors, Blog

1. **Reviews Hub** `/reviews` — submission form (auth required), moderation queue, verified-student badge, Review schema.
2. **Mentor Directory** `/mentors` — cards with college/course/year, WhatsApp deep links.
3. **Blog & Guides** `/guides/$slug` — DB-driven articles, MDX-like rich content via DB, Article schema.
   - Launch with: DU Admission Guide, CSAS Guide, Preference Sheet Guide, Best Colleges for Science/Commerce/Life Sciences, Hostel Guide, Society Guide, Fresher Guide.

---

## Phase 6 — Programmatic SEO + Admin

1. **Programmatic pages** (generated from DB):
   - `/best-du-colleges-for/$course`
   - `/best-du-colleges-for/$category` (placements, hostels, women, science…)
   - `/du-colleges-under/$score`
   - Auto-comparison pages for every meaningful pair.
2. **Sitemap** — extend `sitemap[.]xml.ts` to enumerate all DB rows.
3. **SEO automation** — shared `head()` builder, dynamic OG titles/descriptions, llms.txt updates.
4. **Admin Dashboard** `/_authenticated/admin/*` — gated by `has_role('admin')`. CRUD for every table.

---

## Technical Architecture

```text
src/
  routes/
    index.tsx                        # new search-first homepage
    colleges.index.tsx, colleges.$slug.tsx
    courses.index.tsx, courses.$slug.tsx
    compare.$pair.tsx
    cutoffs.index.tsx, cutoffs.$slug.tsx
    csas.index.tsx, csas.*.tsx
    preference-sheet.tsx
    reviews.index.tsx
    mentors.index.tsx
    guides.index.tsx, guides.$slug.tsx
    best-du-colleges-for.$key.tsx
    du-colleges-under.$score.tsx
    _authenticated/admin/*           # admin CRUD
    api/public/lead.ts               # preference-sheet lead webhook (optional)
  lib/
    colleges.functions.ts, courses.functions.ts, cutoffs.functions.ts,
    reviews.functions.ts, mentors.functions.ts, compare.functions.ts,
    pseo.functions.ts
  components/
    explorer/, profile/, compare/, cutoffs/, csas/, preference/,
    reviews/, mentors/, marketing/
  styles.css                         # new tokens, Fira Sans
```

DB-first: every route's `loader` calls a server function that hits Postgres.

---

## What ships in each phase, in order

1. Phase 1 — design system + new homepage. (1 build)
2. Phase 2 — Lovable Cloud enabled + schema + seed + migrate `colleges.ts` reads. (1 build)
3. Phase 3 — Explorer + Profile + Course Hub. (1 build)
4. Phase 4 — Comparison + Cutoffs + CSAS + Preference Sheet. (1 build)
5. Phase 5 — Reviews + Mentors + Blog. (1 build)
6. Phase 6 — Programmatic SEO + Admin. (1 build)

---

## Decisions I need from you before starting

1. **Cloud**: Phase 2 requires enabling **Lovable Cloud** (Postgres + auth + storage). Confirm I should turn it on. Without it, all this content stays hardcoded and there's no admin/reviews/preference-sheet persistence.
2. **Scope of Phase 1 first build**: I'd like to ship **only Phase 1** in the first turn — the redesigned homepage + design system — so you can react to the look before I commit the architecture across 60+ pages. OK?
3. **Initial dataset**: For Phase 2 seed, can you share (or point me at) the list of colleges + any cutoff/placement data you have? Otherwise I'll seed a curated starter set covering the top ~25 DU colleges from public info and expand later.

Reply with the three answers and I'll start with Phase 1.
