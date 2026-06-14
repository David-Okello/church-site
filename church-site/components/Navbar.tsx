"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ churchName }: { churchName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(249,245,238,0.97)" : "#F9F5EE",
          borderBottom: "1px solid #E0D9CE",
          boxShadow: scrolled ? "0 2px 20px rgba(60,40,20,0.08)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="text-gold text-xl font-bold select-none" style={{ fontFamily: "Georgia, serif" }}>✝</span>
            <span
              className="font-bold text-charcoal text-base leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {churchName}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 text-sm font-semibold no-underline transition-colors"
                  style={{
                    color: active ? "#C05C35" : "#1C1814",
                    borderBottom: active ? "2px solid #C05C35" : "2px solid transparent",
                    paddingBottom: "6px",
                    paddingTop: "6px",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-terra ml-4 py-2.5! px-5! text-sm!" style={{ textDecoration: "none" }}>
              Plan a Visit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-center rounded-lg bg-cream-dark"
            aria-label="Open menu"
          >
            <span className="block w-5 h-0.5 bg-charcoal rounded" />
            <span className="block w-5 h-0.5 bg-charcoal rounded" />
            <span className="block w-3.5 h-0.5 bg-charcoal rounded" />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setOpen(false)} />

          {/* Sidebar */}
          <div className="absolute right-0 top-0 bottom-0 w-72 flex flex-col bg-cream">
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-darker">
              <span
                className="font-bold text-charcoal"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {churchName}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full grid place-items-center text-charcoal text-xl font-light bg-cream-dark"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4 flex-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 rounded-xl text-base font-semibold no-underline transition-colors"
                    style={{
                      color: active ? "#C05C35" : "#1C1814",
                      background: active ? "#FBF0EB" : "transparent",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-cream-darker">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-terra w-full justify-center"
                style={{ textDecoration: "none" }}
              >
                Plan a Visit
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
