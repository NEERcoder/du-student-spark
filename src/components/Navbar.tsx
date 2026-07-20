import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { to: "/" | "/colleges"; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/colleges", label: "Colleges" },
  ];
  const anchors = [
    { href: "/#guidance", label: "Free Guidance" },
    { href: "/#reviews", label: "Reviews" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl shadow-token-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <img
            src={logo}
            alt="DU Science Hub logo"
            className={`shrink-0 rounded-lg object-cover ring-1 ring-white/10 transition-[height,width,transform] duration-300 group-hover:scale-105 ${
              scrolled ? "h-9 w-9" : "h-10 w-10"
            }`}
          />
          <span className="truncate text-base font-extrabold tracking-tight sm:text-lg">
            DU Science Hub
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="group relative text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100" />
            </Link>
          ))}
          {anchors.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-md p-2 text-foreground/70 transition hover:bg-accent hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-[color-mix(in_oklab,var(--primary)_75%,var(--brand))] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" /> Talk to a Senior
          </a>
        </div>
        <button
          className="rounded-md p-2 transition hover:bg-accent md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-background/90 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold transition hover:bg-accent"
              >
                {n.label}
              </Link>
            ))}
            {anchors.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold transition hover:bg-accent"
              >
                {n.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-brand"
            >
              Talk to a Senior on WhatsApp
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-semibold"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
