import { GraduationCap, MessageCircle, Star } from "lucide-react";

/**
 * Decorative floating cards layered behind the hero search.
 * Pure CSS animation; hidden on small screens to keep the hero readable.
 */
export function HeroFloatingProof() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      {/* Top-left: college card */}
      <div className="absolute left-[4%] top-[12%] w-[230px] rotate-[-6deg] animate-float-slow">
        <div className="floating-card ring-gradient rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg,#1e3a8a,#dc2626)" }}
            >
              HC
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">Hindu College</p>
              <p className="text-[10px] text-muted-foreground">North Campus · Co-ed</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold">
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
              Academics · Excellent
            </span>
          </div>
        </div>
      </div>

      {/* Top-right: review snippet */}
      <div className="absolute right-[5%] top-[18%] w-[260px] rotate-[5deg] animate-float-slower">
        <div className="floating-card ring-gradient rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand text-[11px] font-bold text-white">
              AK
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">Ananya K.</p>
              <p className="text-[10px] text-muted-foreground">B.Sc Physics · LSR</p>
            </div>
            <div className="ml-auto flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]"
                />
              ))}
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-[11px] leading-relaxed text-foreground/80">
            "Faculty in physical sciences is genuinely brilliant. Society life is
            unmatched — joined four in my first month."
          </p>
        </div>
      </div>

      {/* Bottom-left: mentor card */}
      <div className="absolute bottom-[10%] left-[7%] w-[230px] rotate-[4deg] animate-float-slower">
        <div className="floating-card ring-gradient rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">Mentor online</p>
              <p className="text-[10px] text-muted-foreground">
                Senior · Hansraj · BSc CS
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-foreground/80">
            Ask anything about cutoffs, CSAS, or campus life — replies on WhatsApp.
          </p>
        </div>
      </div>

      {/* Bottom-right: cutoff chip */}
      <div className="absolute bottom-[14%] right-[7%] w-[200px] rotate-[-5deg] animate-float-slow">
        <div className="floating-card ring-gradient rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold">
            <GraduationCap className="h-4 w-4 text-primary" />
            CUET Cutoff
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            B.Com (H) · SRCC · 2024
          </div>
          <div className="mt-1 text-lg font-black tracking-tight text-foreground">
            720<span className="text-xs font-bold text-muted-foreground"> / 800</span>
          </div>
        </div>
      </div>
    </div>
  );
}
