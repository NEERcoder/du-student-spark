import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setProgress(pct);
      setVisible(scrollTop > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      className={`glass shadow-token-lg fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/10 transition-[opacity,transform] duration-300 ease-out hover:shadow-glow sm:bottom-7 sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>
      <ArrowUp className="h-5 w-5 text-primary" />
    </button>
  );
}
