import type { Metadata } from "next";
import Card from "@/components/Card";
import { getEvents, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  const events = getEvents();
  const settings = getSettings();

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "65vh", background: "#14100C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=85&auto=format&fit=crop"
          alt="Community gathering"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.50) 55%, rgba(28,24,20,0.92) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl w-full px-6 pb-14 pt-24">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Church calendar</div>
          <h1
            className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Upcoming events
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Life at Grace Community is about more than Sunday mornings. Here is what is coming up — and there is always room for one more.
          </p>
        </div>
      </section>

      {/* ── EVENT LIST ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {events.length === 0 ? (
          <Card white className="p-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="font-black text-charcoal text-2xl mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              No upcoming events
            </h2>
            <p className="text-warm-gray">Check back soon — we always have something in the works.</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-5">
            {events.map((ev, i) => {
              const d = new Date(ev.date);
              return (
                <Card key={ev.title + ev.date} white className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Date sidebar */}
                    <div
                      className="flex flex-col items-center justify-center px-8 py-6 sm:w-28 shrink-0 text-center"
                      style={{
                        background: i % 2 === 0 ? "#C05C35" : "#2B5740",
                        minHeight: "100px",
                      }}
                    >
                      <div className="text-white/80 text-xs font-bold uppercase tracking-widest">
                        {d.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div
                        className="text-white font-black leading-none"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.8rem" }}
                      >
                        {d.getDate()}
                      </div>
                      <div className="text-white/70 text-xs">{d.getFullYear()}</div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 p-6 sm:p-8">
                      <h2
                        className="font-black text-charcoal text-2xl mb-3"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        {ev.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-warm-gray mb-4">
                        <span className="flex items-center gap-1.5">
                          <span>🕐</span> {ev.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span>📍</span> {ev.location}
                        </span>
                      </div>
                      <p className="text-charcoal/70 text-sm leading-relaxed max-w-2xl">{ev.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ── REGULAR SERVICES ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">Every week</div>
          <h2
            className="text-charcoal font-black mb-10 text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Regular gatherings
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {settings.serviceTimes.map((s, i) => (
              <Card key={s.day} white className="p-7"
                style={{ borderTop: `4px solid ${i === 0 ? "#C05C35" : i === 1 ? "#2B5740" : "#C8943A"}` }}>
                <div className="kicker mb-2">{s.day}</div>
                <div
                  className="font-black text-charcoal mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.8rem", lineHeight: 1 }}
                >
                  {s.time}
                </div>
                <div className="font-semibold text-charcoal text-sm">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
