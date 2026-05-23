import { MessageCircle, Instagram, Star } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent via-background to-background" />
      <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <Star className="h-3.5 w-3.5 fill-current" /> Trusted by 10,000+ DU aspirants
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Real college reviews. <span className="text-gradient-brand">Smarter DU admissions.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Honest student reviews, cutoff insights, and 1:1 admission guidance — everything you need to crack
            Delhi University with confidence.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-90">
              <MessageCircle className="h-5 w-5" /> Get free counselling
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
              <Instagram className="h-5 w-5" /> Follow on Instagram
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              ["10k+", "Students helped"],
              ["50+", "DU colleges"],
              ["4.8★", "Avg. rating"],
            ].map(([k, v]) => (
              <div key={v} className="rounded-xl border border-border bg-card p-3 text-center">
                <dt className="text-xl font-extrabold text-primary">{k}</dt>
                <dd className="text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="brand-gradient absolute -inset-4 rounded-3xl opacity-30 blur-2xl" />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-brand">
            <img src={logo} alt="DU Science Hub" className="mx-auto h-48 w-48 rounded-2xl object-cover" />
            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">Your DU admission partner</p>
              <p className="mt-1 text-xl font-extrabold">From cutoffs to campus life</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
