import type { Metadata } from "next";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = { title: "Sermons" };

const ACCENT_COLORS = ["#C05C35", "#2B5740", "#1C1814"];

export default function SermonsPage() {
  const sermons = getSermons();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative bg-cream py-24 px-6 overflow-hidden">
        <div
          className="absolute -left-20 -bottom-20 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "#C8943A", opacity: 0.07 }}
        />
        <div className="mx-auto max-w-4xl relative z-10">
          <div className="kicker mb-4">Media ministry</div>
          <h1
            className="text-charcoal font-black mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Sermons
          </h1>
          <p className="text-warm-gray text-lg max-w-xl leading-relaxed">
            Teachings from God's Word — for your encouragement, growth, and edification.
          </p>
        </div>
      </section>

      {/* ── SERMON LIST ── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        {sermons.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: "#F2F1EE", boxShadow: "0 2px 16px rgba(60,40,20,0.06)" }}>
            <p className="text-warm-gray">No sermons yet — check back after Sunday service.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {sermons.map((s, i) => {
              const d = new Date(s.date);
              const isFeatured = i === 0;
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

              return (
                <article
                  key={s.title + s.date}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#F2F1EE", boxShadow: "0 2px 20px rgba(60,40,20,0.06)", borderTop: `4px solid ${accent}` }}
                >
                  {/* ── HEADER BAND ── */}
                  <div className="px-8 pt-7 pb-6">
                    {/* Date + badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-warm-gray">
                        {d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <div className="flex items-center gap-3">
                        {isFeatured && (
                          <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{ background: `${accent}15`, color: accent }}
                          >
                            Most Recent
                          </span>
                        )}
                        {s.mediaUrl && (
                          <a
                            href={s.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition"
                            style={{ background: accent, color: "#fff" }}
                          >
                            ▶ Watch
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Scripture */}
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: accent }}
                    >
                      {s.scripture}
                    </div>

                    {/* Title */}
                    <h2
                      className="font-black text-charcoal mb-1"
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
                    <p className="text-sm text-warm-gray font-medium">{s.speaker}</p>
                  </div>

                  {/* ── BODY ── */}
                  <div className="px-8 pb-8" style={{ borderTop: "1px solid #DDDBD6" }}>
                    <p className="text-charcoal/70 leading-relaxed text-sm pt-6 mb-0 max-w-2xl">
                      {s.description}
                    </p>

                    {/* Rich sections */}
                    {(s.keyPoints?.length || s.discussionQuestions?.length || s.prayerPoints?.length) && (
                      <div className="grid md:grid-cols-3 gap-8 mt-8 pt-8" style={{ borderTop: "1px solid #E3E1DC" }}>

                        {s.keyPoints && s.keyPoints.length > 0 && (
                          <div>
                            <p className="kicker mb-4">Key Points</p>
                            <ol className="flex flex-col gap-3">
                              {s.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-charcoal/75 leading-snug">
                                  <span
                                    className="shrink-0 text-xs font-black mt-0.5 w-4"
                                    style={{ color: accent, fontFamily: "var(--font-playfair), Georgia, serif" }}
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
                    )}

                    {!s.keyPoints?.length && !s.discussionQuestions?.length && !s.prayerPoints?.length && (
                      <p className="text-xs text-warm-gray italic mt-6 pt-6" style={{ borderTop: "1px solid #E3E1DC" }}>
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
