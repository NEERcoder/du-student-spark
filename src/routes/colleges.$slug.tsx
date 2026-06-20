import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  MessageCircle,
  GraduationCap,
  Sparkles,
  Building2,
  Users,
  Briefcase,
  Star,
  Info,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCTA } from "@/components/MentorCTA";
import { QualityBadge } from "@/components/QualityBadge";
import { getCollegeBySlug } from "@/data/colleges";
import { waLink, waMessages } from "@/lib/whatsapp";

export const Route = createFileRoute("/colleges/$slug")({
  loader: ({ params }) => {
    const college = getCollegeBySlug(params.slug);
    if (!college) throw notFound();
    return { college };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.college.name ?? "DU College";
    const desc =
      loaderData?.college.shortDescription ??
      "Explore this Delhi University college on DU Science Hub.";
    return {
      meta: [
        { title: `${name} — Courses, Reviews, Placements | DU Science Hub` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} | DU Science Hub` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/colleges/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/colleges/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-black">College not found</h1>
        <p className="mt-2 text-muted-foreground">
          The college you're looking for isn't in our directory yet.
        </p>
        <Link
          to="/colleges"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          Browse all colleges
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-black">Couldn't load this college</h1>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
      <Footer />
    </div>
  ),
  component: CollegePage,
});

function gradientFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const a = 210 + (h % 30);
  const b = 5 + ((h >> 4) % 25);
  return `linear-gradient(135deg, hsl(${a} 70% 28%), hsl(${b} 75% 45%))`;
}

function initials(name: string) {
  return name
    .replace(/&/g, "and")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function CollegePage() {
  const data = Route.useLoaderData() as { college: import("@/data/colleges").College };
  const { college } = data;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="relative flex h-56 items-center justify-center sm:h-72"
          style={{ background: gradientFor(college.name) }}
          aria-hidden="true"
        >
          <span className="text-6xl font-black tracking-wider text-white/85 sm:text-7xl">
            {initials(college.name)}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="mx-auto -mt-16 max-w-5xl px-4 sm:px-6">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <Link
              to="/colleges"
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all colleges
            </Link>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {college.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
              {college.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {college.streams.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
                >
                  {s}
                </span>
              ))}
              {college.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waLink(waMessages.guidance(college.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-brand transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Get Admission Help
              </a>
              <a
                href={waLink(waMessages.mentor(college.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold hover:bg-accent"
              >
                <Users className="h-4 w-4" /> Connect With College Senior
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Quick Facts */}
        <Section icon={<Sparkles className="h-5 w-5" />} title="Quick Facts">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {college.quickFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </div>
                <div className="mt-1 text-sm font-extrabold">{f.value}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Ratings */}
        <Section icon={<Star className="h-5 w-5" />} title="At a Glance">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(college.ratings).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
              >
                <span className="text-sm font-semibold capitalize">
                  {k.replace(/([A-Z])/g, " $1")}
                </span>
                <QualityBadge rating={v} />
              </div>
            ))}
          </div>
        </Section>

        {/* Popular Courses */}
        <Section icon={<GraduationCap className="h-5 w-5" />} title="Popular Courses">
          <ul className="grid gap-2 sm:grid-cols-2">
            {college.popularCourses.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold"
              >
                <GraduationCap className="h-4 w-4 text-primary" /> {c}
              </li>
            ))}
          </ul>
        </Section>

        {/* Highlights */}
        <Section icon={<Sparkles className="h-5 w-5" />} title="Key Highlights">
          <ul className="grid gap-2 sm:grid-cols-2">
            {college.highlights.map((h) => (
              <li
                key={h}
                className="rounded-xl border border-border bg-card p-3 text-sm"
              >
                {h}
              </li>
            ))}
          </ul>
        </Section>

        {/* Campus Life */}
        <Section icon={<Users className="h-5 w-5" />} title="Campus Life">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {college.campusLife}
          </p>
        </Section>

        {/* Infrastructure */}
        <Section icon={<Building2 className="h-5 w-5" />} title="Infrastructure">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {college.infrastructure}
          </p>
        </Section>

        {/* Placements */}
        <Section icon={<Briefcase className="h-5 w-5" />} title="Placements">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">Overall</span>
              <QualityBadge rating={college.placements.rating} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {college.placements.summary}
            </p>
          </div>
        </Section>

        {/* Student Reviews */}
        <Section icon={<Star className="h-5 w-5" />} title="Student Reviews">
          <div className="grid gap-4 sm:grid-cols-2">
            {college.reviews.map((r, i) => (
              <article
                key={i}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold text-white"
                      style={{ background: gradientFor(r.name) }}
                    >
                      {r.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{r.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {r.course} · {r.year}
                      </div>
                    </div>
                  </div>
                  <QualityBadge rating={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Admission Insights */}
        <Section icon={<Info className="h-5 w-5" />} title="Admission Insights">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {college.admissionInsights}
            </p>
            <a
              href={waLink(waMessages.guidance(college.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-brand transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Get Preference Sheet Guidance
            </a>
          </div>
        </Section>

        {/* Mentor */}
        <div className="mt-12">
          <MentorCTA collegeName={college.name} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight sm:text-2xl">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
