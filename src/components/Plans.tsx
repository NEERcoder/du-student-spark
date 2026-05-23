import { Check, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/links";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    tagline: "Get clarity on your DU options",
    features: [
      "1 counselling call (30 min)",
      "College shortlist (top 5)",
      "Cutoff & CUET score analysis",
      "WhatsApp support for 7 days",
    ],
  },
  {
    name: "Pro",
    price: "₹1,499",
    tagline: "Most popular — full admission support",
    highlight: true,
    features: [
      "3 counselling calls",
      "Personalised college roadmap",
      "Form-filling & document help",
      "Society & internship guidance",
      "WhatsApp support for 30 days",
    ],
  },
  {
    name: "Elite",
    price: "₹2,999",
    tagline: "End-to-end, until you're admitted",
    features: [
      "Unlimited counselling till admission",
      "1:1 sessions with DU seniors",
      "Hostel + PG guidance",
      "Course vs college trade-off plan",
      "Priority WhatsApp support",
    ],
  },
];

export function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Pick a plan that fits your journey</h2>
        <p className="mt-3 text-muted-foreground">
          Transparent pricing. No hidden fees. Cancel anytime.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name}
            className={`relative flex flex-col rounded-2xl border p-6 transition hover:-translate-y-1 ${
              p.highlight
                ? "border-primary bg-card shadow-brand"
                : "border-border bg-card"
            }`}>
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                MOST POPULAR
              </span>
            )}
            <h3 className="text-xl font-extrabold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">{p.price}</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                p.highlight
                  ? "bg-primary text-primary-foreground shadow-brand hover:opacity-90"
                  : "border border-border hover:bg-accent"
              }`}>
              <MessageCircle className="h-4 w-4" /> Choose {p.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
