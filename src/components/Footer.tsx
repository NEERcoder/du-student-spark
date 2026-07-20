import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { INSTAGRAM_LINK } from "@/lib/links";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-card/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
        <div className="light-spot left-[-10%] top-[-30%] h-72 w-72 bg-primary/30" />
        <div className="light-spot right-[-10%] bottom-[-20%] h-72 w-72 bg-brand/25" />
      </div>
      <div className="divider-animated mx-auto max-w-7xl" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="DU Science Hub" className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10" />
            <span className="text-base font-extrabold">DU Science Hub</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Find your perfect DU college. Real seniors, real reviews, real admission help.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
            <li><Link to="/colleges" className="transition-colors hover:text-primary">Colleges</Link></li>
            <li><a href="/#guidance" className="transition-colors hover:text-primary">Free Guidance</a></li>
            <li><a href="/#reviews" className="transition-colors hover:text-primary">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold">Connect</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={waLink()} target="_blank" rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-glow">
              <MessageCircle className="h-4 w-4" /> Free Counselling
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur-md hover:bg-white/10">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DU Science Hub. All rights reserved.
      </div>
    </footer>
  );
}
