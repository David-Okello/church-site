import type { Metadata } from "next";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = { title: "Sermons" };

const HEADER_COLORS = [
  { bg: "#C05C35", accent: "#D97045", text: "#FBF0EB" },
  { bg: "#2B5740", accent: "#3A7356", text: "#E8F0EC" },
  { bg: "#1C1814", accent: "#2E2620", text: "#EDE8DE" },
];

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
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="kicker mb-4">Media ministry</div>
          <h1
            className="text-charcoal font-black mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Sermons
          </h1>
          <p className="text-warm-gray text-lg max-w-xl leading-relaxed">
            Teachings from God's Word — for your encouragement, growth, and edification.
            Each entry includes notes and questions for personal and group reflection.
          </p>
        </div>
      </section>

      {/* ── SERMON LIST ── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        {sermons.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📖</div>
            <h2
              className="font-black text-charcoal text-2xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Sermons coming soon
            </h2>
            <p className="text-warm-gray">Check back after Sunday service.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {sermons.map((s, i) => {
              const d = new Date(s.date);
              const isFeatured = i === 0;
              const palette = HEADER_COLORS[i % HEADER_COLORS.length];

              return (
                <article
                  key={s.title + s.date}
                  className="rounded-2xl overflow-hidden shadow-md"
                  style={{ boxShadow: "0 8px 40px rgba(60,40,20,0.10), 0 2px 8px rgba(60,40,20,0.06)" }}
                >
                  {/* ── COVER HEADER ── */}
                  <div
                    className="relative px-8 pt-8 pb-10 overflow-hidden"
                    style={{ background: palette.bg }}
                  >
                    {/* Decorative circle */}
                    <div
                      className="absolute -right-10 -bottom-10 rounded-full pointer-events-none"
                      style={{ width: 200, height: 200, background: palette.accent, opacity: 0.5 }}
                    />
                    <div
                      className="absolute right-24 top-4 rounded-full pointer-events-none"
                      style={{ width: 60, height: 60, background: palette.accent, opacity: 0.35 }}
                    />

                    {/* Date + badge row */}
                    <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                      <div
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: `${palette.text}99` }}
                      >
                        {d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isFeatured && (
                          <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{ background: "rgba(255,255,255,0.18)", color: palette.text }}
                          >
                            Most Recent
                          </span>
                        )}
                        {s.mediaUrl && (
                          <a
                            href={s.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold px-4 py-2 rounded-full transition"
                            style={{ background: "rgba(255,255,255,0.2)", color: palette.text }}
                          >
                            ▶ Watch
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Scripture kicker */}
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-3 relative z-10"
                      style={{ color: `${palette.text}BB` }}
                    >
                      {s.scripture}
                    </div>

                    {/* Big title */}
                    <h2
                      className="font-black relative z-10 mb-4"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                        lineHeight: 1.08,
                        color: palette.text,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title}
                    </h2>

                    {/* Speaker */}
                    <div
                      className="text-sm font-semibold relative z-10"
                      style={{ color: `${palette.text}CC` }}
                    >
                      {s.speaker}
                    </div>
                  </div>

                  {/* ── BODY ── */}
                  <div className="bg-white px-8 py-8">
                    {/* Description */}
                    <p className="text-charcoal/75 leading-relaxed mb-8 text-base max-w-2xl">
                      {s.description}
                    </p>

                    {/* Rich content sections */}
                    {(s.keyPoints?.length || s.discussionQuestions?.length || s.prayerPoints?.length) ? (
                      <div
                        className="grid md:grid-cols-3 gap-8 pt-8"
                        style={{ borderTop: "1px solid #EDE8DE" }}
                      >
                        {/* Key points */}
                        {s.keyPoints && s.keyPoints.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-5">
                              <div
                                className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs shrink-0"
                                style={{ background: "#C05C35" }}
                              >
                                📌
                              </div>
                              <span className="kicker">Key Points</span>
                            </div>
                            <ol className="flex flex-col gap-4">
                              {s.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-charcoal/80 leading-snug">
                                  <span
                                    className="shrink-0 w-5 h-5 rounded-full text-white text-xs font-black grid place-items-center mt-0.5"
                                    style={{ background: "#C05C35", fontFamily: "var(--font-playfair), Georgia, serif" }}
                                  >
                                    {idx + 1}
                                  </span>
                                  {point}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Discussion questions */}
                        {s.discussionQuestions && s.discussionQuestions.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-5">
                              <div
                                className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs shrink-0"
                                style={{ background: "#2B5740" }}
                              >
                                💬
                              </div>
                              <span className="kicker" style={{ color: "#2B5740" }}>Discussion</span>
                            </div>
                            <ul className="flex flex-col gap-4">
                              {s.discussionQuestions.map((q, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-charcoal/80 leading-snug pl-4"
                                  style={{ borderLeft: "2px solid #2B5740" }}
                                >
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Prayer points */}
                        {s.prayerPoints && s.prayerPoints.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-5">
                              <div
                                className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs shrink-0"
                                style={{ background: "#C8943A" }}
                              >
                                🙏
                              </div>
                              <span className="kicker" style={{ color: "#C8943A" }}>Prayer</span>
                            </div>
                            <ul className="flex flex-col gap-4">
                              {s.prayerPoints.map((p, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-charcoal/80 leading-snug">
                                  <span className="shrink-0 text-gold font-bold mt-0.5">✦</span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p
                        className="text-xs text-warm-gray italic pt-6"
                        style={{ borderTop: "1px solid #EDE8DE" }}
                      >
                        Notes and discussion questions will be added after the service.
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
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div
          className="rounded-2xl p-8 flex gap-5 items-start"
          style={{
            background: "#EDE8DE",
            borderLeft: "4px solid #C8943A",
            boxShadow: "0 4px 24px rgba(60,40,20,0.07)",
          }}
        >
          <div className="shrink-0 text-2xl">📡</div>
          <div>
            <h3
              className="font-black text-charcoal text-xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Sermon recordings coming soon
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              We are working on making our Sunday sermons available online.
              In the meantime, join us in person — or send a WhatsApp message to receive sermon notes directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
