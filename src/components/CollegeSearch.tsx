import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, GraduationCap, BookOpen, Tag } from "lucide-react";
import { colleges, allStreams, allCategories } from "@/data/colleges";

type Suggestion =
  | { kind: "college"; label: string; slug: string; sub: string }
  | { kind: "course"; label: string; sub: string }
  | { kind: "stream"; label: string }
  | { kind: "category"; label: string };

export function CollegeSearch({
  size = "lg",
  placeholder = "Search a college, course, or stream…",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo<Suggestion[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Suggestion[] = [];

    for (const c of colleges) {
      if (c.name.toLowerCase().includes(term)) {
        out.push({
          kind: "college",
          label: c.name,
          slug: c.slug,
          sub: c.streams.slice(0, 3).join(" · "),
        });
      }
    }

    const courseSet = new Map<string, string>();
    for (const c of colleges) {
      for (const course of c.popularCourses) {
        if (course.toLowerCase().includes(term) && !courseSet.has(course.toLowerCase())) {
          courseSet.set(course.toLowerCase(), c.name);
        }
      }
    }
    for (const [course, anyCollege] of courseSet) {
      out.push({ kind: "course", label: titleCase(course), sub: `e.g. ${anyCollege}` });
      if (out.length > 30) break;
    }

    for (const s of allStreams) {
      if (s.toLowerCase().includes(term)) out.push({ kind: "stream", label: s });
    }
    for (const cat of allCategories) {
      if (cat.toLowerCase().includes(term)) out.push({ kind: "category", label: cat });
    }

    return out.slice(0, 12);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  function pick(s: Suggestion) {
    setOpen(false);
    if (s.kind === "college") {
      navigate({ to: "/colleges/$slug", params: { slug: s.slug } });
    } else if (s.kind === "course") {
      navigate({ to: "/colleges", search: { q: s.label } });
    } else if (s.kind === "stream") {
      navigate({ to: "/colleges", search: { stream: s.label } });
    } else {
      navigate({ to: "/colleges", search: { category: s.label } });
    }
    setQ("");
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[activeIdx]) pick(suggestions[activeIdx]);
      else if (q.trim()) {
        navigate({ to: "/colleges", search: { q: q.trim() } });
        setQ("");
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const big = size === "lg";

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border border-border bg-card shadow-brand ring-1 ring-primary/10 ${
          big ? "px-4 py-3 sm:px-5 sm:py-4" : "px-3 py-2.5"
        }`}
      >
        <Search className={`${big ? "h-6 w-6" : "h-5 w-5"} shrink-0 text-primary`} />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActiveIdx(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={placeholder}
          className={`w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground ${
            big ? "text-base sm:text-lg" : "text-sm"
          }`}
          aria-label="Search DU colleges"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="rounded-md p-1 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-popover p-2 shadow-2xl">
          {suggestions.map((s, i) => (
            <button
              key={`${s.kind}-${s.label}-${i}`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => pick(s)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                i === activeIdx ? "bg-accent" : "hover:bg-accent/60"
              }`}
            >
              <SuggestionIcon kind={s.kind} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{s.label}</div>
                {"sub" in s && s.sub && (
                  <div className="truncate text-xs text-muted-foreground">{s.sub}</div>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {s.kind}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SuggestionIcon({ kind }: { kind: Suggestion["kind"] }) {
  const cls = "h-4 w-4 text-primary";
  if (kind === "college") return <GraduationCap className={cls} />;
  if (kind === "course") return <BookOpen className={cls} />;
  return <Tag className={cls} />;
}

function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
