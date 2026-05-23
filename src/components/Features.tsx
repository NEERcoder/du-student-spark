import { BookOpen, Compass, Users, GraduationCap } from "lucide-react";

const items = [
  { icon: BookOpen, title: "Verified reviews", desc: "Real students. Real experiences. No paid promotions." },
  { icon: Compass, title: "Cutoff intelligence", desc: "Historical CUET cutoffs across courses & categories." },
  { icon: Users, title: "1:1 with seniors", desc: "Talk to students already studying in your dream college." },
  { icon: GraduationCap, title: "Admission roadmap", desc: "From CSAS form to allotment — we hold your hand." },
];

export function Features() {
  return (
    <section id="about" className="bg-accent/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Why students trust DU Science Hub</h2>
          <p className="mt-3 text-muted-foreground">
            Built by DU students, for DU aspirants. Everything you need before saying yes to a college.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-brand">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl brand-gradient text-white">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
