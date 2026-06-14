import type { Metadata } from "next";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = { title: "Sermons" };

const PALETTES = [
  { accent: "#C05C35", bubble1: "#C05C35", bubble2: "#C8943A" },
  { accent: "#2B5740", bubble1: "#2B5740", bubble2: "#C05C35" },
  { accent: "#1C1814", bubble1: "#C8943A", bubble2: "#2B5740" },
];

export default function SermonsPage() {
  const sermons = getSermons();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "52vh" }}>
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
            Teachings from God&apos;s Word — for your encouragement, growth, and edification.
          </p>
        </div>
      </section>

      {/* ── SERMON LIST ── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        {sermons.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#FDFCFB", boxShadow: "0 1px 12px rgba(60,40,20,0.07)" }}
          >
            <p className="text-warm-gray">No sermons yet — check back after Sunday service.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {sermons.map((s, i) => {
              const d = new Date(s.date);
              const isFeatured = i === 0;
              const pal = PALETTES[i % PALETTES.length];

              return (
                <article
                  key={s.title + s.date}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "#FDFCFB",
                    boxShadow: "0 1px 12px rgba(60,40,20,0.07)",
                    borderTop: `4px solid ${pal.accent}`,
                  }}
                >
                  {/* ── HEADER with decorative bubbles ── */}
                  <div className="relative px-6 sm:px-8 pt-7 pb-6 overflow-hidden">
                    {/* Bubble 1 — large, bottom-right */}
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: 160,
                        height: 160,
                        background: pal.bubble1,
                        opacity: 0.07,
                        right: -40,
                        bottom: -50,
                      }}
                    />
                    {/* Bubble 2 — small, top-right */}
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: 70,
                        height: 70,
                        background: pal.bubble2,
                        opacity: 0.09,
                        right: 60,
                        top: -20,
                      }}
                    />

                    {/* Date row — own line so mobile doesn't cramp */}
                    <div className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-3 relative z-10">
                      {d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>

                    {/* Badges row — separate line */}
                    {(isFeatured || s.mediaUrl) && (
                      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                        {isFeatured && (
                          <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{ background: `${pal.accent}14`, color: pal.accent }}
                          >
                            Most Recent
                          </span>
                        )}
                        {s.mediaUrl && (
                          <a
                            href={s.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full"
                            style={{ background: pal.accent, color: "#fff" }}
                          >
                            ▶ Watch
                          </a>
                        )}
                      </div>
                    )}

                    {/* Scripture kicker */}
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-2 relative z-10"
                      style={{ color: pal.accent }}
                    >
                      {s.scripture}
                    </div>

                    {/* Title */}
                    <h2
                      className="font-black text-charcoal mb-1 relative z-10"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title}
                    </h2>

                    {/* Speaker */}
                    <p className="text-sm text-warm-gray font-medium relative z-10">{s.speaker}</p>
                  </div>

                  {/* ── BODY ── */}
                  <div className="px-6 sm:px-8 pb-8" style={{ borderTop: "1px solid #EDE8DE" }}>
                    <p className="text-charcoal/70 leading-relaxed text-sm pt-6 mb-0 max-w-2xl">
                      {s.description}
                    </p>

                    {/* Rich sections */}
                    {(s.keyPoints?.length || s.discussionQuestions?.length || s.prayerPoints?.length) ? (
                      <div
                        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8"
                        style={{ borderTop: "1px solid #EDE8DE" }}
                      >
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
                    ) : (
                      <p
                        className="text-xs text-warm-gray italic mt-6 pt-6"
                        style={{ borderTop: "1px solid #EDE8DE" }}
                      >
                        Notes and questions will be added after the service.
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── NOTICE ── */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
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
