import { MessageCircle, Users } from "lucide-react";
import { waLink, waMessages } from "@/lib/whatsapp";

export function MentorCTA({ collegeName }: { collegeName: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border p-6 sm:p-10">
      <div className="brand-gradient absolute inset-0 -z-10 opacity-95" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-black/10" aria-hidden="true" />
      <div className="flex flex-col items-start gap-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Users className="h-3.5 w-3.5" /> Mentorship
          </div>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Connect with a Senior Mentor from {collegeName}
          </h2>
          <p className="mt-2 text-sm opacity-90 sm:text-base">
            Get unfiltered answers on courses, professors, hostel options, society life, and
            placements — directly from a current student.
          </p>
        </div>
        <a
          href={waLink(waMessages.mentor(collegeName))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition hover:scale-[1.02]"
        >
          <MessageCircle className="h-5 w-5" /> Talk to a Senior
        </a>
      </div>
    </section>
  );
}
