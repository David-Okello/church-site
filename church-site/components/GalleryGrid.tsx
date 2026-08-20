"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/content";
import { getYouTubeId } from "@/lib/youtube";
import VideoThumbnail from "./VideoThumbnail";

const PAGE_SIZE = 24;

export default function GalleryGrid({ photos }: { photos: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < photos.length;
  const loadMore = useCallback(() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, photos.length)), [photos.length]);

  // Auto-load the next page once the "Load more" area scrolls into view.
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext]);

  const active = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.slice(0, visibleCount).map((p, i) => (
          <button
            key={(p.image || "") + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative overflow-hidden rounded-2xl text-left cursor-pointer"
            style={{ background: "#D4CCBC", aspectRatio: "1 / 1", boxShadow: "0 1px 12px rgba(60,40,20,0.08)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.caption || "Diocese photo"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {p.video && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(28,24,20,0.18)" }}>
                <span
                  className="w-12 h-12 rounded-full grid place-items-center text-white text-lg transition-transform group-hover:scale-110"
                  style={{ background: "rgba(28,24,20,0.55)" }}
                >
                  ▶
                </span>
              </div>
            )}
            {(p.caption || p.category) && (
              <span
                className="absolute inset-x-0 bottom-0 p-4 text-white"
                style={{ background: "linear-gradient(to top, rgba(20,16,12,0.82) 0%, rgba(20,16,12,0) 100%)" }}
              >
                {p.category && (
                  <span className="block text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#E8A85A" }}>
                    {p.category}
                  </span>
                )}
                {p.caption && <span className="block text-sm font-semibold leading-snug">{p.caption}</span>}
              </span>
            )}
          </button>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            className="btn-outline text-sm cursor-pointer"
          >
            Load more photos ({photos.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Diocese photo"}
          onClick={close}
        >
          <div className="absolute inset-0" style={{ background: "rgba(10,8,6,0.92)" }} />

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full grid place-items-center text-white cursor-pointer"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Previous"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center text-white text-xl cursor-pointer"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Next"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center text-white text-xl cursor-pointer"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                ›
              </button>
            </>
          )}

          <div className="relative z-10 max-w-5xl w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {active.video && getYouTubeId(active.video) ? (
              <div className="w-full" style={{ maxWidth: 900 }}>
                <VideoThumbnail
                  videoId={getYouTubeId(active.video)!}
                  thumb={active.image}
                  title={active.caption || "Diocese video"}
                  playSize={64}
                  className="rounded-lg overflow-hidden"
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.image}
                alt={active.caption || "Diocese photo"}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
            {(active.caption || active.category) && (
              <div className="mt-4 text-center">
                {active.category && (
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#E8A85A" }}>
                    {active.category}
                  </div>
                )}
                {active.caption && <div className="text-white/90 text-sm">{active.caption}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
