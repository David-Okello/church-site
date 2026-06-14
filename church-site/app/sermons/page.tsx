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
            Recordings will be added as they become available.
          </p>
        </div>
      </section>

      {/* ── SERMON LIST ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
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
          <div className="flex flex-col divide-y divide-cream-darker border-y border-cream-darker">
            {sermons.map((s, i) => {
              const d = new Date(s.date);
              const isFeatured = i === 0;
              return (
                <div
                  key={s.title + s.date}
                  className="flex flex-col sm:flex-row gap-6 py-8 items-start"
                  style={isFeatured ? { borderLeft: "4px solid #C05C35", paddingLeft: "1.5rem" } : {}}
                >
                  {/* Date block */}
                  <div
                    className="shrink-0 w-14 text-center"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    <div className="text-xs font-bold text-terracotta uppercase tracking-wider">
                      {d.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-3xl font-black text-charcoal leading-none">{d.getDate()}</div>
                    <div className="text-xs text-warm-gray">{d.getFullYear()}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {isFeatured && (
                      <span className="inline-block text-xs font-bold text-terracotta uppercase tracking-wider bg-terra-bg px-3 py-1 rounded-full mb-3">
                        Most Recent
                      </span>
                    )}
                    <h2
                      className="font-black text-charcoal mb-2"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: isFeatured ? "clamp(1.5rem, 2.5vw, 2rem)" : "1.25rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {s.title}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-warm-gray mb-3">
                      <span className="font-semibold text-charcoal">{s.speaker}</span>
                      <span className="bg-cream-dark text-charcoal/70 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {s.scripture}
                      </span>
                    </div>
                    <p className="text-charcoal/70 text-sm leading-relaxed max-w-2xl">{s.description}</p>
                  </div>

                  {/* Media badge */}
                  <div className="shrink-0 self-start sm:self-center">
                    {s.mediaUrl ? (
                      <a href={s.mediaUrl} target="_blank" rel="noopener noreferrer" className="btn-terra text-sm py-2.5! px-5!">
                        ▶ Watch
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-warm-gray bg-cream-dark px-3 py-2 rounded-full">
                        Text only
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── NOTICE ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
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
