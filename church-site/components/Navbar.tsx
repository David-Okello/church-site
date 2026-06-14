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
    const handler = () => setScrolled(window.scrollY > 40);
    handler(); // run once on mount
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: solid ? "rgba(249,245,238,0.96)" : "transparent",
          backdropFilter: solid ? "blur(12px)" : "none",
          borderBottom: solid ? "1px solid rgba(224,217,206,0.8)" : "1px solid transparent",
          boxShadow: solid ? "0 2px 20px rgba(60,40,20,0.08)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span
              className="text-xl font-bold select-none transition-colors duration-300"
              style={{ fontFamily: "Georgia, serif", color: solid ? "#C8943A" : "rgba(255,255,255,0.85)" }}
            >
              ✝
            </span>
            <span
              className="font-bold text-base leading-tight transition-colors duration-300"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: solid ? "#1C1814" : "#ffffff",
              }}
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
                  className="px-4 text-sm font-semibold no-underline transition-colors duration-300"
                  style={{
                    color: solid
                      ? active ? "#C05C35" : "#1C1814"
                      : active ? "#E8A85A" : "rgba(255,255,255,0.88)",
                    borderBottom: active
                      ? `2px solid ${solid ? "#C05C35" : "rgba(255,255,255,0.7)"}`
                      : "2px solid transparent",
                    paddingBottom: "6px",
                    paddingTop: "6px",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-4 text-sm! no-underline transition-all duration-300"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: "12px",
                background: solid ? "#C05C35" : "rgba(255,255,255,0.15)",
                color: solid ? "#ffffff" : "#ffffff",
                border: solid ? "none" : "1.5px solid rgba(255,255,255,0.55)",
                backdropFilter: solid ? "none" : "blur(4px)",
              }}
            >
              Plan a Visit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-center rounded-lg transition-colors duration-300"
            style={{ background: solid ? "#EDE8DE" : "rgba(255,255,255,0.15)" }}
            aria-label="Open menu"
          >
            <span className="block w-5 h-0.5 rounded transition-colors duration-300" style={{ background: solid ? "#1C1814" : "#ffffff" }} />
            <span className="block w-5 h-0.5 rounded transition-colors duration-300" style={{ background: solid ? "#1C1814" : "#ffffff" }} />
            <span className="block w-3.5 h-0.5 rounded transition-colors duration-300" style={{ background: solid ? "#1C1814" : "#ffffff" }} />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-100 md:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setOpen(false)} />
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
