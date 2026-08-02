import type { Metadata } from "next";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const photos = getGallery();

  return (
    <>
      {/* ── HEADER (solid, so the transparent navbar stays readable) ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "52vh", background: "linear-gradient(135deg, #2B5740 0%, #1C1814 70%)" }}
      >
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 pt-32">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Diocese in pictures</div>
          <h1
            className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Gallery
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Moments of worship, fellowship, and service from across the Diocese of Wanyjok.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {photos.length === 0 ? (
          <div
            className="rounded-2xl p-16 text-center"
            style={{ background: "#FDFCFB", boxShadow: "0 1px 12px rgba(60,40,20,0.07)" }}
          >
            <div className="text-5xl mb-4">📷</div>
            <h2
              className="font-black text-charcoal text-2xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Photos coming soon
            </h2>
            <p className="text-warm-gray">Check back soon. We are gathering pictures of life across the Diocese.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((p, i) => (
              <figure
                key={(p.image || "") + i}
                className="group relative overflow-hidden rounded-2xl"
                style={{ background: "#D4CCBC", aspectRatio: "1 / 1", boxShadow: "0 1px 12px rgba(60,40,20,0.08)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.caption || "Diocese photo"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {(p.caption || p.category) && (
                  <figcaption
                    className="absolute inset-x-0 bottom-0 p-4 text-white"
                    style={{ background: "linear-gradient(to top, rgba(20,16,12,0.82) 0%, rgba(20,16,12,0) 100%)" }}
                  >
                    {p.category && (
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#E8A85A" }}>
                        {p.category}
                      </div>
                    )}
                    {p.caption && <div className="text-sm font-semibold leading-snug">{p.caption}</div>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
