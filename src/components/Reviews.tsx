import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= Math.round(rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Student reviews</span>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">What DU students actually say</h2>
        <p className="mt-3 text-muted-foreground">
          Unfiltered reviews from students across Delhi University — the good, the messy, the real.
        </p>
      </div>
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {reviews.map((r, idx) => (
          <article key={idx}
            className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-brand glass">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white">
                {initials(r.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{r.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.course ? `${r.course} · ` : ""}{r.college}
                </p>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{r.text}</p>
            <span className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {r.college}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
