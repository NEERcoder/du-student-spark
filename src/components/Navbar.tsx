import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/", label: "Home" },
    { to: "/#plans", label: "Plans" },
    { to: "/#reviews", label: "Reviews" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="DU Science Hub logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="text-base font-extrabold tracking-tight sm:text-lg">DU Science Hub</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a key={n.to} href={n.to} className="text-sm font-medium text-foreground/80 hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="rounded-md p-2 text-foreground/70 hover:bg-accent hover:text-primary">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Talk to us
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-3">
            {nav.map((n) => (
              <a key={n.to} href={n.to} onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                {n.label}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="mt-2 block rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
              Talk to us on WhatsApp
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
              className="mt-2 block rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold">
              Follow on Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
