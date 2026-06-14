import type { Metadata } from "next";
import Card from "@/components/Card";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = { title: "Sermons" };

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
        <div className="mx-auto max-w-6xl relative z-10">
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
      <section className="mx-auto max-w-4xl px-6 py-16">
        {sermons.length === 0 ? (
          <Card white className="p-12 text-center">
            <div className="text-5xl mb-4">📖</div>
            <h2 className="font-black text-charcoal text-2xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Sermons coming soon
            </h2>
            <p className="text-warm-gray">Check back after Sunday service.</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-10">
            {sermons.map((s, i) => {
              const d = new Date(s.date);
              const isFeatured = i === 0;

              return (
                <Card key={s.title + s.date} white className="overflow-hidden">
                  {/* Top bar: date + featured badge */}
                  <div
                    className="flex items-center gap-4 px-8 py-4"
                    style={{ borderBottom: `3px solid ${isFeatured ? "#C05C35" : "#EDE8DE"}`, background: isFeatured ? "#FBF0EB" : "#F9F5EE" }}
                  >
                    <div style={{ fontFamily: "var(--font-playfair), Georgia, serif" }} className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-charcoal leading-none">{d.getDate()}</span>
                      <span className="text-sm font-bold text-warm-gray uppercase tracking-wider">
                        {d.toLocaleDateString("en-US", { month: "short" })} {d.getFullYear()}
                      </span>
                    </div>
                    {isFeatured && (
                      <span className="ml-auto text-xs font-bold text-terracotta uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-terracotta/20">
                        Most Recent
                      </span>
                    )}
                  </div>

                  <div className="p-8">
                    {/* Title + meta */}
                    <h2
                      className="font-black text-charcoal mb-2"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1 }}
                    >
                      {s.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                      <span className="font-semibold text-charcoal">{s.speaker}</span>
                      <span className="bg-cream-dark text-charcoal/70 px-3 py-0.5 rounded-full text-xs font-semibold">
                        {s.scripture}
                      </span>
                      {s.mediaUrl && (
                        <a href={s.mediaUrl} target="_blank" rel="noopener noreferrer" className="btn-terra text-xs ml-auto">
                          ▶ Watch
                        </a>
                      )}
                    </div>
                    <p className="text-charcoal/70 leading-relaxed mb-8">{s.description}</p>

                    {/* Rich content: 3-column grid */}
                    {(s.keyPoints?.length || s.discussionQuestions?.length || s.prayerPoints?.length) ? (
                      <div className="grid md:grid-cols-3 gap-6 pt-6" style={{ borderTop: "1px solid #EDE8DE" }}>

                        {/* Key points */}
                        {s.keyPoints && s.keyPoints.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-1 h-4 rounded-full shrink-0" style={{ background: "#C05C35" }} />
                              <span className="kicker">Key Points</span>
                            </div>
                            <ol className="flex flex-col gap-3">
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
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-1 h-4 rounded-full shrink-0" style={{ background: "#2B5740" }} />
                              <span className="kicker" style={{ color: "#2B5740" }}>Discussion</span>
                            </div>
                            <ul className="flex flex-col gap-3">
                              {s.discussionQuestions.map((q, idx) => (
                                <li key={idx} className="text-sm text-charcoal/80 leading-snug pl-3" style={{ borderLeft: "2px solid #2B5740" }}>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Prayer points */}
                        {s.prayerPoints && s.prayerPoints.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-1 h-4 rounded-full shrink-0" style={{ background: "#C8943A" }} />
                              <span className="kicker" style={{ color: "#C8943A" }}>Prayer</span>
                            </div>
                            <ul className="flex flex-col gap-3">
                              {s.prayerPoints.map((p, idx) => (
                                <li key={idx} className="flex gap-2.5 text-sm text-charcoal/80 leading-snug">
                                  <span className="shrink-0 text-gold mt-0.5">✦</span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-warm-gray italic pt-4" style={{ borderTop: "1px solid #EDE8DE" }}>
                        Notes and discussion questions will be added after the service.
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ── NOTICE ── */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <Card className="p-8 flex gap-5 items-start" style={{ borderLeft: "4px solid #C8943A" }}>
          <div className="shrink-0 text-2xl">📡</div>
          <div>
            <h3 className="font-black text-charcoal text-xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Sermon recordings coming soon
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              We are working on making our Sunday sermons available online.
              In the meantime, join us in person — or send a WhatsApp message to receive sermon notes directly.
            </p>
          </div>
        </Card>
      </section>
    </>
  );
}
