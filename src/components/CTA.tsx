import { MessageCircle, Instagram } from "lucide-react";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

export function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="relative overflow-hidden rounded-3xl brand-gradient p-8 text-white shadow-brand md:p-14">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to crack DU?</h2>
            <p className="mt-2 max-w-xl text-white/90">
              Get on a free 15-minute call with our counsellors. We'll help you shortlist colleges,
              decode cutoffs, and plan the smartest path to admission.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20">
              <Instagram className="h-5 w-5" /> Follow @du.science.hub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
