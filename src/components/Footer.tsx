import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { INSTAGRAM_LINK } from "@/lib/links";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="DU Science Hub" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-base font-extrabold">DU Science Hub</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Find your perfect DU college. Real seniors, real reviews, real admission help.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/colleges" className="hover:text-primary">Colleges</Link></li>
            <li><a href="/#guidance" className="hover:text-primary">Free Guidance</a></li>
            <li><a href="/#reviews" className="hover:text-primary">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold">Connect</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={waLink()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Free Counselling
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DU Science Hub. All rights reserved.
      </div>
    </footer>
  );
}
