import { MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const perks = [
  "Talk to verified DU seniors",
  "Compare courses across colleges",
  "Decode CUET cutoffs honestly",
  "Personalized preference sheet guidance",
  "Hostel, fees & campus life clarity",
  "Zero cost. Zero pressure.",
];

export function FreeGuidance() {
  return (
    <section id="guidance" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> 100% Free
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Free Admission <span className="text-gradient-brand">Guidance</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              Talk to seniors, understand courses, compare colleges, get preference sheet
              guidance, and make informed admission decisions — without spending a rupee.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-brand transition hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" /> Book Free Guidance Call
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold hover:bg-accent"
              >
                Talk to DU Science Hub
              </a>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
