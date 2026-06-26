import { useEffect, useRef, useState } from "react";
import { colleges } from "@/data/colleges";

type Stat = { value: string; label: string; numeric: number; suffix: string; prefix?: string };

const stats: Stat[] = [
  { value: `${colleges.length}+`, label: "DU colleges mapped", numeric: colleges.length, suffix: "+" },
  { value: "150+", label: "Senior mentors", numeric: 150, suffix: "+" },
  { value: "10k+", label: "Students guided", numeric: 10, suffix: "k+" },
  { value: "4.9★", label: "WhatsApp rating", numeric: 4.9, suffix: "★" },
];

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView]);
  return [ref, inView];
}

function CountUp({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span ref={ref}>{display}{suffix}</span>;
}

export function StatsStrip() {
  return (
    <section className="mx-auto -mt-6 max-w-6xl px-4 sm:px-6">
      <div className="floating-card ring-gradient grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/50 sm:grid-cols-4">
        {stats.map((s) => {
          const decimals = s.numeric % 1 !== 0 ? 1 : 0;
          return (
            <div
              key={s.label}
              className="bg-card/60 px-5 py-6 text-center transition hover:bg-card"
            >
              <div className="text-2xl font-black tracking-tight text-gradient-brand sm:text-3xl">
                <CountUp to={s.numeric} suffix={s.suffix} decimals={decimals} />
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
