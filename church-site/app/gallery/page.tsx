import type { Metadata } from "next";
import { getGallery, getGalleryPageContent } from "@/lib/content";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const photos = getGallery();
  const page = getGalleryPageContent();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "52vh", background: "#14100C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.heroImage}
          alt="A gathering of the diocese under the trees"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.50) 55%, rgba(28,24,20,0.90) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 pt-32">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{page.heroKicker}</div>
          <h1
            className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            {page.heroTitle}
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            {page.heroSubtext}
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
          <GalleryGrid photos={photos} />
        )}
      </section>
    </>
  );
}
