import { Link } from "@tanstack/react-router";
import { Atom, LineChart, BookText, ArrowRight } from "lucide-react";

const streams = [
  {
    key: "Science",
    icon: Atom,
    title: "Science",
    desc: "Physics, Chemistry, Maths, CS, Life Sciences, Electronics.",
    courses: ["B.Sc Physics", "B.Sc Computer Science", "B.Sc Life Sciences"],
    grad: "from-sky-500/30 to-indigo-600/20",
  },
  {
    key: "Commerce",
    icon: LineChart,
    title: "Commerce",
    desc: "B.Com (H), Economics, BMS, BBA, BBE — placement & pedigree.",
    courses: ["B.Com (H)", "Economics (H)", "BMS"],
    grad: "from-rose-500/30 to-red-600/20",
  },
  {
    key: "Arts & Humanities",
    icon: BookText,
    title: "Humanities",
    desc: "English, History, Pol Sci, Psychology, Sociology, Journalism.",
    courses: ["English (H)", "Political Science", "Psychology"],
    grad: "from-amber-400/30 to-orange-600/20",
  },
];

export function CourseExplorerPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Course explorer
        </span>
        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Explore by what you want to study
        </h2>
        <p className="mt-3 text-muted-foreground">
          Jump straight into the colleges that matter for your stream.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {streams.map((s) => (
          <Link
            key={s.key}
            to="/colleges"
            search={{ stream: s.key }}
            className="floating-card hover-lift group relative overflow-hidden rounded-3xl p-6"
          >
            <div
              className={`absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br ${s.grad} blur-2xl transition-opacity group-hover:opacity-100`}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-black tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.courses.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
                Browse colleges
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
