import { MessageCircle, Sparkles, Youtube, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/lib/whatsapp";
import { CollegeSearch } from "./CollegeSearch";
import { HeroFloatingProof } from "./HeroFloatingProof";
import { colleges } from "@/data/colleges";

export function CollegeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 -z-10 aurora opacity-80" aria-hidden="true" />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-glow" />
      <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand/35 blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute left-1/2 top-20 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-2xl animate-float" />

      {/* Decorative floating cards */}
      <HeroFloatingProof />

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-semibold text-primary animate-slide-up shadow-glow">
          <Sparkles className="h-3.5 w-3.5 animate-glow" /> {colleges.length}+ DU colleges · Verified senior mentors
        </span>

        <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-blur-in">
          Find Your Perfect{" "}
          <span className="text-gradient-brand">DU College</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg animate-slide-up delay-100">
          Explore colleges, courses, placements, campus life, reviews, cutoffs and
          connect directly with seniors — all in one place.
        </p>

        <div className="mx-auto mt-9 max-w-3xl animate-slide-up delay-200">
          <CollegeSearch size="lg" />
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="self-center">Try:</span>
            {["Hindu College", "B.Com (H)", "BSc Physics", "DU CSAS", "Preference Sheet"].map((q) => (
              <a
                key={q}
                href={`/colleges?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border bg-card/70 backdrop-blur px-2.5 py-1 font-semibold transition hover:bg-accent hover:scale-105 hover:text-primary"
              >
                {q}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3 animate-slide-up delay-300">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-brand transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <MessageCircle className="h-5 w-5" /> Talk to a Senior
          </a>
          <Link
            to="/colleges"
            className="shine inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 backdrop-blur px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
          >
            <Compass className="h-5 w-5" /> Explore Colleges
          </Link>
          <a
            href="https://www.youtube.com/@DUScienceHub"
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 backdrop-blur px-6 py-3 text-sm font-bold text-foreground/90 transition hover:-translate-y-0.5 hover:bg-accent"
          >
            <Youtube className="h-5 w-5 text-red-500" /> Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
