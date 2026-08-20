import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import { getSettings, getGiveContent } from "@/lib/content";

export const metadata: Metadata = { title: "Give" };

export default function GivePage() {
  const settings = getSettings();
  const give = getGiveContent();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "52vh", background: "#14100C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/hero-give.jpg"
          alt="A procession of the diocese carrying a cross"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.50) 55%, rgba(28,24,20,0.92) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 pt-24">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{give.heroKicker}</div>
          <h1
            className="text-white font-black mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {give.heroTitle}
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            {give.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── WHY GIVE ── */}
      <section className="bg-cream-dark py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-charcoal/80 leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)", lineHeight: 1.75 }}
          >
            {give.introText}
          </p>
        </div>
      </section>

      {/* ── WAYS TO GIVE ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="kicker mb-3">Ways to give</div>
        <h2
          className="text-charcoal font-black mb-10"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Choose what works for you.
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {give.ways.map((w) => (
            <Card key={w.title} white className="p-7 flex flex-col">
              <h3
                className="font-black text-charcoal text-lg mb-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {w.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-5 flex-1">{w.description}</p>
              {w.whatsapp ? (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-forest justify-center text-center text-sm"
                >
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/contact" className="btn-outline justify-center text-center text-sm">
                  Contact us
                </Link>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* ── WHAT YOUR SUPPORT ENABLES ── */}
      <section className="px-6 py-20" style={{ background: "#1F5C99" }}>
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Where it goes</div>
          <h2
            className="text-white font-black mb-10"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            What your support enables.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {give.supportAreas.map((a) => (
              <div key={a.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-black text-white text-base mb-2">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2
          className="text-charcoal font-black mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15 }}
        >
          {give.closingTitle}
        </h2>
        <p className="text-warm-gray leading-relaxed mb-8">
          {give.closingText}
        </p>
        <Link href="/contact" className="btn-terra">Get in touch</Link>
      </section>
    </>
  );
}
