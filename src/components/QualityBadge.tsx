import type { Quality } from "@/data/colleges";

const styles: Record<Quality, string> = {
  Excellent: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30",
  "Very Good": "bg-blue-500/15 text-blue-700 dark:text-blue-300 ring-blue-500/30",
  Good: "bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-500/30",
  Average: "bg-muted text-muted-foreground ring-border",
};

export function QualityBadge({ rating, className = "" }: { rating: Quality; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${styles[rating]} ${className}`}
    >
      {rating}
    </span>
  );
}
