"use client";

import { useEffect, useState } from "react";
import type { Sermon } from "@/lib/content";
import { getYouTubeId } from "@/lib/youtube";
import VideoThumbnail from "./VideoThumbnail";

type Palette = { accent: string; bubble1: string; bubble2: string };

export default function SermonCard({
  sermon: s,
  thumb,
  pal,
  isFeatured,
}: {
  sermon: Sermon;
  thumb: string | null;
  pal: Palette;
  isFeatured: boolean;
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const d = new Date(s.date);
  const hasNotes = Boolean(s.keyPoints?.length || s.discussionQuestions?.length || s.prayerPoints?.length);
  const videoId = getYouTubeId(s.mediaUrl);

  useEffect(() => {
    if (!notesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNotesOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [notesOpen]);

  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 6px 24px rgba(60,40,20,0.10), 0 1px 4px rgba(60,40,20,0.08)",
        border: "1px solid #EDE8DE",
        borderTop: `5px solid ${pal.accent}`,
      }}
    >
      {/* ── VIDEO THUMBNAIL ── */}
      {thumb && videoId && (
        <VideoThumbnail videoId={videoId} thumb={thumb} title={s.title} playSize={56} />
      )}

      {/* ── HEADER with decorative bubbles ── */}
      <div className="relative px-6 pt-6 pb-5 overflow-hidden">
        {/* Bubble 1: large, bottom-right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 130, height: 130, background: pal.bubble1, opacity: 0.12, right: -30, bottom: -40 }}
        />
        {/* Bubble 2: small, top-right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 56, height: 56, background: pal.bubble2, opacity: 0.16, right: 50, top: -16 }}
        />

        {/* Date + badges: same line, wraps on narrow cards */}
        <div className="flex flex-wrap items-center gap-2 mb-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-warm-gray">
            {d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          {isFeatured && (
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: `${pal.accent}26`, color: pal.accent }}
            >
              Most Recent
            </span>
          )}
        </div>

        {/* Scripture kicker */}
        <div className="text-xs font-bold uppercase tracking-widest mb-2 relative z-10" style={{ color: pal.accent }}>
          {s.scripture}
        </div>

        {/* Title */}
        <h2
          className="font-black text-charcoal mb-1 relative z-10"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {s.title}
        </h2>

        {/* Speaker */}
        <p className="text-sm text-warm-gray font-medium relative z-10">{s.speaker}</p>
      </div>

      {/* ── BODY ── */}
      <div className="px-6 pb-6 flex flex-col flex-1" style={{ borderTop: "1px solid #EDE8DE" }}>
        <p className="text-charcoal/70 leading-relaxed text-sm pt-5">{s.description}</p>

        {s.mediaUrl && !thumb && (
          <a
            href={s.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-4 self-start"
            style={{ color: pal.accent }}
          >
            ▶ Watch the recording
          </a>
        )}

        {hasNotes ? (
          <button
            type="button"
            onClick={() => setNotesOpen(true)}
            className="w-full text-center text-xs font-bold uppercase tracking-wider py-3 mt-5 cursor-pointer"
            style={{ color: pal.accent, borderTop: "1px solid #EDE8DE" }}
          >
            View sermon notes →
          </button>
        ) : (
          <p className="text-xs text-warm-gray italic mt-5 pt-5" style={{ borderTop: "1px solid #EDE8DE" }}>
            Notes and questions will be added after the service.
          </p>
        )}
      </div>

      {/* ── SERMON NOTES MODAL ── */}
      {notesOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Sermon notes for ${s.title}`}
          onClick={() => setNotesOpen(false)}
        >
          <div className="absolute inset-0" style={{ background: "rgba(20,16,12,0.6)" }} />

          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: "#FFFFFF", boxShadow: "0 24px 64px rgba(20,16,12,0.35)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4" style={{ background: "#FFFFFF", borderBottom: "1px solid #EDE8DE" }}>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: pal.accent }}>
                  {s.scripture}
                </div>
                <h3
                  className="font-black text-charcoal"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.4rem", lineHeight: 1.15 }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-warm-gray font-medium mt-0.5">{s.speaker}</p>
              </div>
              <button
                type="button"
                onClick={() => setNotesOpen(false)}
                aria-label="Close"
                className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-charcoal/60 hover:text-charcoal cursor-pointer"
                style={{ background: "#F9F5EE" }}
              >
                ✕
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 px-6 sm:px-8 py-7">
              {s.keyPoints && s.keyPoints.length > 0 && (
                <div>
                  <p className="kicker mb-4">Key Points</p>
                  <ol className="flex flex-col gap-3">
                    {s.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-charcoal/75 leading-snug">
                        <span
                          className="shrink-0 text-xs font-black mt-0.5 w-4"
                          style={{ color: pal.accent, fontFamily: "var(--font-playfair), Georgia, serif" }}
                        >
                          {idx + 1}.
                        </span>
                        {point}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {s.discussionQuestions && s.discussionQuestions.length > 0 && (
                <div>
                  <p className="kicker mb-4" style={{ color: "#2B5740" }}>Discussion</p>
                  <ul className="flex flex-col gap-3">
                    {s.discussionQuestions.map((q, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-charcoal/75 leading-snug pl-3"
                        style={{ borderLeft: "1.5px solid #2B5740" }}
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.prayerPoints && s.prayerPoints.length > 0 && (
                <div>
                  <p className="kicker mb-4" style={{ color: "#C8943A" }}>Prayer</p>
                  <ul className="flex flex-col gap-3">
                    {s.prayerPoints.map((p, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-charcoal/75 leading-snug">
                        <span className="shrink-0 mt-0.5 text-xs" style={{ color: "#C8943A" }}>✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
