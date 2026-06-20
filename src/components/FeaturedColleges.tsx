import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { colleges } from "@/data/colleges";
import { CollegeCard } from "./CollegeCard";

const featuredSlugs = [
  "hindu-college",
  "st-stephens-college",
  "lady-shri-ram-college-for-women",
  "miranda-house",
  "shri-ram-college-of-commerce",
  "hans-raj-college",
  "ramjas-college",
  "sri-venkateswara-college",
];

export function FeaturedColleges() {
  const list = featuredSlugs
    .map((s) => colleges.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section id="colleges" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Featured DU Colleges
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            A curated peek. Use search above or browse the full list to find your match.
          </p>
        </div>
        <Link
          to="/colleges"
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm font-bold hover:bg-accent"
        >
          Explore all {colleges.length} colleges <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div
        className="mt-8 -mx-4 sm:-mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        aria-label="Featured DU colleges scrolling carousel"
      >
        <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] px-4 sm:px-6">
          {[...list, ...list].map((c, i) => (
            <div key={`${c.slug}-${i}`} className="w-[280px] sm:w-[320px] shrink-0">
              <CollegeCard college={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
