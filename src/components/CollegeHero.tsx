import { MessageCircle, Users, Sparkles, Youtube } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { CollegeSearch } from "./CollegeSearch";
import { colleges } from "@/data/colleges";

export function CollegeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent via-background to-background" />
      <div className="absolute inset-0 -z-10 aurora opacity-70" aria-hidden="true" />
      <div className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-glow" />
      <div className="absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand/30 blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute left-1/2 top-20 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-2xl animate-float" />

      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-semibold text-primary animate-slide-up shadow-glow">
          <Sparkles className="h-3.5 w-3.5 animate-glow" /> {colleges.length}+ DU colleges · Verified senior mentors
        </span>

        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-blur-in">
          Find Your Perfect{" "}
          <span className="text-gradient-brand">DU College</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg animate-slide-up delay-100">
          Explore courses, campus life, placements, student reviews, admission insights, and
          connect directly with seniors from your target college.
        </p>

        <div className="mx-auto mt-8 max-w-3xl animate-slide-up delay-200">
          <CollegeSearch size="lg" />
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {["Hindu College", "B.Com (H)", "Science", "Women", "Off-campus"].map((q) => (
              <a
                key={q}
                href={`/colleges?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border bg-card/70 backdrop-blur px-2.5 py-0.5 font-semibold transition hover:bg-accent hover:scale-105 hover:text-primary"
              >
                {q}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-slide-up delay-300">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-brand transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <MessageCircle className="h-5 w-5" /> Book Free Guidance Call
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 backdrop-blur px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
          >
            <Users className="h-5 w-5" /> Talk to a Senior on WhatsApp
          </a>
          <a
            href="https://www.youtube.com/@DUScienceHub"
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
            style={{ boxShadow: "0 20px 50px -20px rgba(220,38,38,0.6), 0 0 0 1px rgba(220,38,38,0.25)" }}
          >
            <Youtube className="h-5 w-5" /> Watch the Detailed review on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

