import { MessageCircle, Sparkles, Youtube, Compass, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/lib/whatsapp";
import { CollegeSearch } from "./CollegeSearch";
import { HeroFloatingProof } from "./HeroFloatingProof";
import { colleges } from "@/data/colleges";

export function CollegeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layer 1 — Deep navy base */}
      <div className="absolute inset-0 -z-30 bg-background" />
      {/* Layer 2 — Soft radial gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 65%), radial-gradient(60% 50% at 100% 100%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%), radial-gradient(50% 45% at 0% 80%, color-mix(in oklab, oklch(0.45 0.22 286) 18%, transparent), transparent 70%)",
        }}
      />
      {/* Layer 3 — Slow animated mesh gradient */}
      <div className="absolute inset-0 -z-20 mesh-gradient opacity-[0.18]" aria-hidden="true" />
      {/* Layer 4 — Subtle noise */}
      <div className="absolute inset-0 -z-10 noise pointer-events-none" aria-hidden="true" />
      {/* Aurora glow behind headline */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[18%] -z-10 h-[420px] w-[820px] max-w-[95%] -translate-x-1/2 aurora-headline opacity-70"
      />

      {/* Decorative floating cards */}
      <HeroFloatingProof />

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-primary animate-slide-up shadow-token-sm">
          <Sparkles className="h-3.5 w-3.5 animate-glow" /> {colleges.length}+ DU colleges · Verified senior mentors
        </span>

        <h1 className="mt-7 text-[2.6rem] font-black leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.25rem] animate-blur-in">
          Find Your Perfect{" "}
          <span className="text-gradient-brand">DU College</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed animate-slide-up delay-100">
          Explore colleges, courses, placements, campus life, reviews, cutoffs and
          connect directly with seniors — all in one place.
        </p>

        <div className="mx-auto mt-10 max-w-3xl animate-slide-up delay-200">
          <CollegeSearch size="lg" />
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="self-center">Try:</span>
            {["Hindu College", "B.Com (H)", "BSc Physics", "DU CSAS", "Preference Sheet"].map((q) => (
              <a
                key={q}
                href={`/colleges?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border bg-card/60 backdrop-blur px-2.5 py-1 font-semibold transition hover:bg-accent hover:scale-105 hover:text-primary"
              >
                {q}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-slide-up delay-300">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine btn-premium inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[color-mix(in_oklab,var(--primary)_70%,var(--brand))] px-6 py-3 text-sm font-bold text-primary-foreground shadow-brand transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" /> Talk to a Senior
          </a>
          <Link
            to="/colleges"
            className="shine btn-premium inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-bold transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-token-md active:translate-y-0 active:scale-[0.98]"
          >
            <Compass className="h-5 w-5" /> Explore Colleges
          </Link>
          <a
            href="https://www.youtube.com/@DUScienceHub"
            target="_blank"
            rel="noopener noreferrer"
            className="shine btn-premium inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-6 py-3 text-sm font-bold text-foreground/90 transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 active:scale-[0.98]"
          >
            <Youtube className="h-5 w-5 text-red-500" /> Watch on YouTube
          </a>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none mt-16 hidden justify-center md:flex" aria-hidden="true">
          <div className="flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 animate-scroll-bob">
            Scroll
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

