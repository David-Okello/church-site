import type { Metadata } from "next";
import { getSermons, getYouTubeThumbnail } from "@/lib/content";
import SermonCard from "@/components/SermonCard";

export const metadata: Metadata = { title: "Sermons" };

const PALETTES = [
  { accent: "#1F5C99", bubble1: "#1F5C99", bubble2: "#C8943A" },
  { accent: "#2B5740", bubble1: "#2B5740", bubble2: "#1F5C99" },
  { accent: "#1C1814", bubble1: "#C8943A", bubble2: "#2B5740" },
];

export default function SermonsPage() {
  const sermons = getSermons();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "65vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1713909399240-2f5627fa1e41?w=1600&q=85&auto=format&fit=crop"
          alt="Worship service"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.5) 55%, rgba(28,24,20,0.90) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl w-full px-6 pb-14 pt-24">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Media ministry</div>
          <h1
            className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Sermons
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Teachings from God&apos;s Word for your encouragement, growth, and edification.
          </p>
        </div>
      </section>

      {/* ── SERMON GRID ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {sermons.length === 0 ? (
          <div
            className="max-w-xl mx-auto rounded-2xl p-12 text-center"
            style={{ background: "#FDFCFB", boxShadow: "0 1px 12px rgba(60,40,20,0.07)" }}
          >
            <p className="text-warm-gray">No sermons yet. Check back after Sunday service.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {sermons.map((s, i) => (
              <SermonCard
                key={s.title + s.date + i}
                sermon={s}
                thumb={getYouTubeThumbnail(s.mediaUrl)}
                pal={PALETTES[i % PALETTES.length]}
                isFeatured={i === 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── NOTICE ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div
          className="rounded-2xl p-7 flex gap-5 items-start"
          style={{ background: "#EDE8DE", borderLeft: "3px solid #C8943A" }}
        >
          <span className="text-xl shrink-0 mt-0.5">📡</span>
          <div>
            <h3
              className="font-black text-charcoal text-lg mb-1"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Recordings coming soon
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              Join us in person or send a WhatsApp message to receive sermon notes directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
