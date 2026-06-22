import { colleges } from "@/data/colleges";

const stats = [
  { value: `${colleges.length}+`, label: "DU colleges mapped" },
  { value: "150+", label: "Senior mentors" },
  { value: "10k+", label: "Students guided" },
  { value: "4.9★", label: "WhatsApp rating" },
];

export function StatsStrip() {
  return (
    <section className="mx-auto -mt-6 max-w-6xl px-4 sm:px-6">
      <div className="floating-card ring-gradient grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/50 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card/60 px-5 py-6 text-center transition hover:bg-card"
          >
            <div className="text-2xl font-black tracking-tight text-gradient-brand sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
