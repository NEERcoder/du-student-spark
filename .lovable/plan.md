
# Cloudflare audit + Phase 2 data layer

## 1. Cloudflare compatibility audit

I scanned the codebase for the things that actually break on the Cloudflare Workers runtime (the production target):

- No `child_process`, `sharp`, `canvas`, `puppeteer`, `fs.watch`, `os.cpus`, `__dirname`/`__filename`, or raw `node:fs` usage.
- No `framer-motion` is installed or imported — all hero/floating-card animations are pure CSS keyframes (Worker-safe).
- All new components (`HeroFloatingProof`, `StatsStrip`, `CourseExplorerPreview`) are client React with no Node APIs.
- No server functions exist yet, so there is no `process.env` / `supabaseAdmin` leak risk.
- Dev-server log shows no resolve errors or warnings.

Conclusion: nothing in the current code is Cloudflare-incompatible. If you are seeing a specific broken element (a button doing nothing, an animation stuttering, a layout glitch), I need the exact symptom + screenshot to fix it — I'll patch it as a small adjustment inside this same turn once you point at it. Otherwise we move on.

## 2. What to build next (Phase 2 — Data Layer)

Phases 3 and 4 (College Explorer, Course Hub, Compare, Cutoffs, Preference Sheet) all read from a real DB. Polishing the homepage further without a backend is wasted effort. So Phase 2 is the unlock — I'll do it next, then the polish + Phases 3–4 stack on top cleanly.

### 2a. Enable Lovable Cloud
One tool call. Provisions Postgres + Auth + Storage. Required for everything below.

### 2b. Schema (migration)
Tables under `public.*`, all with `GRANT` + RLS:

```text
colleges        (slug PK-ish, name, type, established, location, ranking, image_url, hero_blurb, ...)
courses         (slug, name, stream, duration, description)
college_courses (college_id, course_id, seats, cutoff_general, cutoff_obc, ...)
cutoffs         (college_id, course_id, year, category, score)
reviews         (id, college_id, author_handle, rating 1-5, body, created_at, status)
mentors         (id, name, college_slug, course, year, whatsapp, photo_url, verified)
societies       (college_id, name, category)
hostels         (college_id, available, fees, capacity)
placements      (college_id, year, avg_package, top_recruiters[])
faqs            (college_id NULL = global, question, answer, sort)
articles        (slug, title, excerpt, body_md, hero_image, published_at)
user_roles      (user_id, role: admin|moderator|user)  -- canonical pattern
```

Grants: `SELECT` to `anon` on public-read tables (colleges, courses, cutoffs, mentors, articles, faqs, societies, hostels, placements, approved reviews via a view). `INSERT/UPDATE` to `authenticated` only via RLS that scopes to `auth.uid()` or admin role. `service_role` full access. `user_roles` is auth-only.

### 2c. Seed
Migration seeds the existing `src/data/colleges.ts` set + ~25 top DU science/commerce/humanities colleges from public info, plus a starter set of courses (BSc Physics, BSc Maths, BCom Hons, BA Economics, etc.) and 2024 cutoffs where reliably public. Reviews stay empty (user-generated). Mentors seeded with 3 placeholder verified mentors so the section isn't blank.

### 2d. Server functions (all under `src/lib/*.functions.ts`)
- `colleges.functions.ts` — `listColleges({ stream?, type? })`, `getCollegeBySlug(slug)`
- `courses.functions.ts` — `listCourses()`, `getCourseBySlug(slug)`
- `cutoffs.functions.ts` — `getCutoffsForCollege(slug)`, `cutoffsByScore(score, category)`
- `reviews.functions.ts` — `listApprovedReviews(collegeSlug)`, `submitReview(...)` (authenticated)
- `mentors.functions.ts` — `listMentors({ collegeSlug? })`

Each uses the **server publishable client** for public reads (Worker-safe, no `client.server` leakage). Authenticated mutations use `requireSupabaseAuth` middleware. `supabaseAdmin` is only used inside admin functions (none in this phase).

### 2e. Wire existing pages to DB
- `src/routes/index.tsx`, `colleges.index.tsx`, `colleges.$slug.tsx` switch from hardcoded `src/data/colleges.ts` to loader-driven server functions (using TanStack Query `ensureQueryData` + `useSuspenseQuery` pattern).
- Keep `src/data/colleges.ts` temporarily as a fallback until the new pages are verified, then delete.
- Sitemap reads from DB.

### 2f. Cloudflare-safety guardrails enforced
- All `.functions.ts` files live in `src/lib/` (not `src/server/`).
- `supabaseAdmin` never imported at module scope; only `await import(...)` inside admin handlers.
- `process.env.*` read only inside `.handler()` bodies.
- No new Node-only dependencies added.

## 3. After Phase 2 lands
Next turn proposes Phase 3 (College Explorer filters + Course Hub) using the now-live data. Phase 4 (Compare / Cutoffs / Preference Sheet) follows. Homepage polish (typography tightening, micro-interactions, replacing placeholder mentor cards with real records) folds into each phase rather than a separate pass.

## 4. What I need from you to proceed
1. Approve enabling Lovable Cloud (it's required — without it Phases 2–6 cannot ship).
2. If you have a CSV/sheet of college + cutoff data, drop it; otherwise I seed from public 2024 CSAS data for ~25 colleges.
3. If there is a specific element you saw breaking, name it so I can fix it in the same turn — otherwise I treat the audit as clean.
