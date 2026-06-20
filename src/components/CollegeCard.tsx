import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight } from "lucide-react";
import type { College } from "@/data/colleges";
import { QualityBadge } from "./QualityBadge";
import { waLink, waMessages } from "@/lib/whatsapp";

function gradientFor(name: string) {
  // deterministic dark-blue → red palette per college
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const a = 210 + (h % 30); // blue
  const b = 5 + ((h >> 4) % 25); // red
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

export function CollegeCard({ college }: { college: College }) {
  return (
    <article className="group glass overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-brand">
      <div
        className="relative flex h-32 items-center justify-center"
        style={{ background: gradientFor(college.name) }}
        aria-hidden="true"
      >
        <span className="text-3xl font-black tracking-wider text-white/90">
          {initials(college.name)}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-extrabold leading-snug">
          {college.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {college.streams.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">Academics</span>
          <QualityBadge rating={college.ratings.academics} />
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to="/colleges/$slug"
            params={{ slug: college.slug }}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            View Profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={waLink(waMessages.guidance(college.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Talk to a senior from ${college.name}`}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
