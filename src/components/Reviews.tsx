import { Star, BadgeCheck } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { listApprovedReviews } from "@/lib/content.functions";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function gradientFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 40) % 360} 75% 45%))`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
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
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", "approved"],
    queryFn: () => listApprovedReviews(),
    staleTime: 60_000,
  });

  // Dedupe by author name + body, then shuffle deterministically per render group
  const displayed = useMemo(() => {
    const seenName = new Set<string>();
    const seenBody = new Set<string>();
    const unique = reviews.filter((r) => {
      const n = r.author_name.trim().toLowerCase();
      const b = r.body.trim().toLowerCase();
      if (seenName.has(n) || seenBody.has(b)) return false;
      seenName.add(n);
      seenBody.add(b);
      return true;
    });
    // Fisher-Yates with seeded order based on id hash for stable-but-random feel
    const arr = [...unique];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(i * 9301 + 49297) + 1) / 2 * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [reviews]);

  return (
    <section id="reviews" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Student reviews</span>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">What DU students actually say</h2>
        <p className="mt-3 text-muted-foreground">
          Unfiltered reviews from verified students across Delhi University — the good, the messy, the real.
        </p>
      </div>
      {displayed.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">Loading community reviews…</p>
      ) : (
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {displayed.map((r) => (
            <article
              key={r.id}
              className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-brand glass"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                  style={{ background: gradientFor(r.author_name) }}
                  aria-hidden
                >
                  {initials(r.author_name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-sm font-bold">{r.author_name}</p>
                    <BadgeCheck
                      className="h-4 w-4 shrink-0 text-primary"
                      aria-label="Verified DU Student"
                    />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {r.course ? `${r.course} · ` : ""}
                    {r.college_name}
                  </p>
                </div>
                <Stars rating={Number(r.rating)} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{r.body}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                  <BadgeCheck className="h-3 w-3" /> Verified DU Student
                </span>
                <time className="text-xs text-muted-foreground" dateTime={r.created_at}>
                  {formatDate(r.created_at)}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
