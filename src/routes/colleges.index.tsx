import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CollegeSearch } from "@/components/CollegeSearch";
import { CollegeCard } from "@/components/CollegeCard";
import { colleges, allStreams, allCategories } from "@/data/colleges";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  stream: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/colleges/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Explore All Delhi University Colleges — DU Science Hub" },
      {
        name: "description",
        content:
          "Browse every Delhi University college. Search by name, course, stream, or category and connect with senior mentors over WhatsApp.",
      },
      { property: "og:title", content: "Explore All DU Colleges — DU Science Hub" },
      {
        property: "og:description",
        content: "Search every DU college and talk to a senior mentor.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://du-student-spark.lovable.app/colleges",
      },
    ],
    links: [
      { rel: "canonical", href: "https://du-student-spark.lovable.app/colleges" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Delhi University Colleges Directory",
          description:
            "Searchable directory of Delhi University colleges with reviews and senior mentor guidance.",
          url: "https://du-student-spark.lovable.app/colleges",
          isPartOf: {
            "@type": "WebSite",
            name: "DU Science Hub",
            url: "https://du-student-spark.lovable.app",
          },
        }),
      },
    ],
  }),

  component: CollegesPage,
});

function CollegesPage() {
  const { q, stream, category } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return colleges.filter((c) => {
      if (stream && !c.streams.includes(stream as never)) return false;
      if (category && !c.categories.includes(category as never)) return false;
      if (!term) return true;
      return (
        c.name.toLowerCase().includes(term) ||
        c.popularCourses.some((p) => p.toLowerCase().includes(term)) ||
        c.streams.some((s) => s.toLowerCase().includes(term))
      );
    });
  }, [q, stream, category]);

  function setFilter(key: "stream" | "category", value: string) {
    navigate({
      search: (prev: { q: string; stream: string; category: string }) => ({
        ...prev,
        [key]: prev[key] === value ? "" : value,
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="sticky top-[64px] z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <CollegeSearch size="md" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="mb-6">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Explore DU Colleges
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {filtered.length} of {colleges.length} colleges
            {q && <> matching "{q}"</>}
          </p>
        </header>

        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Stream
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {allStreams.map((s) => (
              <button
                key={s}
                onClick={() => setFilter("stream", s)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  stream === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Category
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter("category", c)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-base font-semibold">No colleges match your filters.</p>
            <Link
              to="/colleges"
              search={{ q: "", stream: "", category: "" }}
              className="mt-3 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Reset filters
            </Link>
          </div>
        ) : (
          <>
            <h2 className="sr-only">
              {q ? "Search results" : "All Delhi University colleges"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((c) => (
                <CollegeCard key={c.slug} college={c} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

