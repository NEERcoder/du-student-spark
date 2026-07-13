import { UserPlus, Youtube } from "lucide-react";
import { YOUTUBE_LINK } from "@/lib/links";
import { waLink, waMessages } from "@/lib/whatsapp";

export function CampusReviewerCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
      <div className="ring-gradient glass relative overflow-hidden rounded-3xl p-8 text-center shadow-token-lg md:p-14">
        {/* Ambient glow accents */}
        <div className="pointer-events-none absolute -left-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 -z-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />

        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Join the community
        </span>
        <h2 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold sm:text-4xl">
          Want to feature your college?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Share your college experience with thousands of DU aspirants — on-camera or in writing.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waLink(waMessages.campusReviewer())}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[color-mix(in_oklab,var(--primary)_70%,var(--brand))] px-6 py-3 text-sm font-bold text-primary-foreground shadow-brand transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-[0.98]"
          >
            <UserPlus className="h-5 w-5" /> Become a Campus Reviewer
          </a>
          <a
            href={YOUTUBE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold backdrop-blur-md transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-token-md active:translate-y-0 active:scale-[0.98]"
          >
            <Youtube className="h-5 w-5 text-red-500" /> Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
