import Link from "next/link";
import Card from "@/components/Card";
import { getSettings, getSermons, getEvents, getAnnouncements } from "@/lib/content";

export default function HomePage() {
  const settings = getSettings();
  const sermons = getSermons();
  const events = getEvents().slice(0, 4);
  const announcements = getAnnouncements().slice(0, 3);
  const featured = sermons[0];
  const recent = sermons.slice(1, 4);

  const ministries = [
    { title: "Youth Ministry", desc: "Raising the next generation through discipleship, worship, and community.", color: "#C05C35" },
    { title: "Women's Fellowship", desc: "Empowering women through prayer, teaching, and sisterhood.", color: "#2B5740" },
    { title: "Community Outreach", desc: "Serving our city with practical love and the hope of the Gospel.", color: "#C8943A" },
  ];

  const stats = [
    { number: settings.foundedYear, label: "Year Founded" },
    { number: "6+", label: "Active Ministries" },
    { number: "Wau", label: "South Sudan" },
  ];

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-cream min-h-[92vh] flex items-center">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #C05C35 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.055,
          }}
        />

        {/* Large terracotta circle — right */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"
          style={{
            width: "clamp(400px, 52vw, 720px)",
            height: "clamp(400px, 52vw, 720px)",
            background: "radial-gradient(circle at 38% 38%, #D97045, #C05C35)",
            opacity: 0.14,
            filter: "blur(2px)",
          }}
        />

        {/* Forest circle — overlapping accent */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "clamp(180px, 20vw, 280px)",
            height: "clamp(180px, 20vw, 280px)",
            background: "#2B5740",
            opacity: 0.08,
            right: "clamp(120px, 20vw, 260px)",
            top: "18%",
            filter: "blur(1px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 py-28 grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="kicker mb-5">
              {settings.denomination} Church · {settings.address.split(",").slice(-2).join(",").trim()}
            </div>
            <h1
              className="text-charcoal mb-6 font-black hero-headline"
              style={{ fontSize: "clamp(3rem, 6vw, 5.4rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            >
              Come as you are.<br />
              <span style={{ color: "#C05C35" }}>Leave changed.</span>
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed mb-10 max-w-lg hero-sub">
              {settings.missionStatement}
            </p>
            <div className="flex flex-wrap gap-4 hero-ctas">
              <Link href="/contact" className="btn-terra">Plan a Visit</Link>
              <Link href="/sermons" className="btn-outline">View Sermons</Link>
            </div>
          </div>

          {/* Right: service times card */}
          <Card white className="p-8">
            <div className="kicker mb-4">Join us this week</div>
            <div className="flex flex-col gap-4">
              {settings.serviceTimes.map((s) => (
                <div key={s.day} className="flex items-center justify-between gap-4 pb-4 border-b border-cream-darker last:border-0 last:pb-0">
                  <div>
                    <div className="font-bold text-charcoal text-sm">{s.label}</div>
                    <div className="text-warm-gray text-sm">{s.day}</div>
                  </div>
                  <span
                    className="text-terracotta font-black text-xl"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-cream-darker text-sm text-warm-gray leading-relaxed">
              📍 {settings.address}
            </div>
          </Card>
        </div>
      </section>

      {/* ── 2. BY THE NUMBERS ── */}
      <section className="bg-cream-dark py-14 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-3 divide-x divide-cream-darker">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 py-2">
              <div
                className="font-black text-terracotta"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
              >
                {stat.number}
              </div>
              <div className="kicker mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. MISSION STRIP ── */}
      <section
        className="px-6 text-center"
        style={{
          background: "#C05C35",
          clipPath: "polygon(0 48px, 100% 0, 100% calc(100% - 48px), 0 100%)",
          padding: "calc(4.5rem + 48px) 1.5rem",
        }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="text-white font-black leading-tight mb-7"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              lineHeight: 1.15,
            }}
          >
            "A family rooted in faith, built for community,
            <br className="hidden sm:block" /> and open to all."
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm font-semibold">
            <span className="px-4 py-2 rounded-full border border-white/30">Est. {settings.foundedYear}</span>
            <span className="px-4 py-2 rounded-full border border-white/30">{settings.denomination}</span>
            <span className="px-4 py-2 rounded-full border border-white/30">South Sudan</span>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED SERMON ── */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="kicker mb-2">From the pulpit</div>
              <h2 className="text-charcoal text-4xl font-black">Latest Sermons</h2>
            </div>
            <Link href="/sermons" className="text-terracotta font-semibold text-sm hover:underline shrink-0">
              All sermons →
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
            {/* Featured */}
            <Card className="p-8 flex flex-col justify-between" style={{ borderLeft: "5px solid #C05C35" }}>
              <div>
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="text-xs font-bold text-terracotta uppercase tracking-wider bg-terra-bg px-3 py-1 rounded-full">
                    {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-xs font-semibold text-warm-gray bg-cream-dark px-3 py-1 rounded-full">
                    {featured.scripture}
                  </span>
                </div>
                <h3
                  className="text-charcoal font-black mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.1 }}
                >
                  {featured.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed mb-1">{featured.speaker}</p>
                <p className="text-charcoal/70 text-sm leading-relaxed mt-3">{featured.description}</p>
              </div>
              {featured.mediaUrl ? (
                <a href={featured.mediaUrl} target="_blank" rel="noopener noreferrer" className="btn-terra mt-6 self-start">
                  ▶ Watch / Listen
                </a>
              ) : (
                <span className="mt-6 self-start text-sm text-warm-gray">Recording coming soon</span>
              )}
            </Card>

            {/* Recent list */}
            <div className="flex flex-col gap-4">
              {recent.map((s) => (
                <Card key={s.title} white className="p-5 flex items-start gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-terracotta font-black text-xs text-center leading-tight"
                    style={{ background: "#FBF0EB", fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {new Date(s.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                    <br />
                    {new Date(s.date).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-charcoal text-sm leading-snug mb-1 line-clamp-2"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {s.title}
                    </div>
                    <div className="text-warm-gray text-xs">{s.speaker} · {s.scripture}</div>
                  </div>
                </Card>
              ))}
              <Link href="/sermons" className="btn-outline text-sm self-start mt-2">
                See all sermons
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. SCHEDULE ── */}
      <section
        className="px-6"
        style={{
          background: "#EDE8DE",
          clipPath: "polygon(0 40px, 100% 0, 100% 100%, 0 100%)",
          padding: "calc(5rem + 40px) 1.5rem 5rem",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">Every week</div>
          <h2 className="text-charcoal text-4xl font-black mb-10">We meet regularly</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {settings.serviceTimes.map((s, i) => (
              <Card key={s.day} white className="p-7"
                style={{ borderTop: `4px solid ${i === 0 ? "#C05C35" : i === 1 ? "#2B5740" : "#C8943A"}` }}>
                <div className="kicker mb-3">{s.day}</div>
                <div
                  className="font-black mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.4rem", lineHeight: 1, color: i === 0 ? "#C05C35" : i === 1 ? "#2B5740" : "#C8943A" }}
                >
                  {s.time}
                </div>
                <div className="font-semibold text-charcoal">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MINISTRIES ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <div className="kicker mb-3">Community life</div>
            <h2 className="text-charcoal text-4xl font-black mb-4">Find your place</h2>
            <p className="text-warm-gray leading-relaxed mb-6">
              There is a place for everyone in this church family — to belong, grow, and serve.
            </p>
            <Link href="/about" className="btn-terra">Learn more →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {ministries.map((m) => (
              <Card key={m.title} white className="p-6 flex gap-5 items-start"
                style={{ borderLeft: `4px solid ${m.color}` }}>
                <div>
                  <h3 className="font-black text-charcoal text-lg mb-1"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {m.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{m.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PASTOR QUOTE ── */}
      <section
        className="px-6 text-center"
        style={{
          background: "#EDE8DE",
          clipPath: "polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)",
          padding: "calc(5rem + 40px) 1.5rem",
        }}
      >
        <div className="mx-auto max-w-4xl relative">
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            style={{ fontSize: "9rem", lineHeight: 1, color: "#C8943A", opacity: 0.22, fontFamily: "Georgia, serif" }}
          >
            "
          </div>
          <div className="kicker mb-6 relative z-10">A word from the pastor</div>
          <blockquote
            className="text-charcoal font-bold italic relative z-10"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              lineHeight: 1.45,
              marginBottom: "1.75rem",
            }}
          >
            {settings.pastorQuote}
          </blockquote>
          <div className="font-bold text-terracotta text-sm uppercase tracking-widest relative z-10">
            — {settings.pastorName}
          </div>
        </div>
      </section>

      {/* ── 8. ANNOUNCEMENTS ── */}
      {announcements.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="kicker mb-3">Notice board</div>
          <h2 className="text-charcoal text-4xl font-black mb-8">Announcements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {announcements.map((a) => (
              <Card key={a.title} white className="p-6" style={{ borderTop: "4px solid #C8943A" }}>
                <div className="kicker mb-2">
                  {new Date(a.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </div>
                <h3
                  className="font-black text-charcoal text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {a.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{a.body}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ── 9. EVENTS ── */}
      {events.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="kicker mb-2">Church calendar</div>
              <h2 className="text-charcoal text-4xl font-black">Upcoming events</h2>
            </div>
            <Link href="/events" className="text-terracotta font-semibold text-sm hover:underline shrink-0">
              All events →
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-cream-darker border-y border-cream-darker">
            {events.map((ev) => {
              const d = new Date(ev.date);
              return (
                <div key={ev.title + ev.date} className="flex gap-6 items-start py-6">
                  <div
                    className="shrink-0 w-16 text-center"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    <div className="text-xs font-bold text-terracotta uppercase tracking-wider">
                      {d.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-4xl font-black text-charcoal leading-none">{d.getDate()}</div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-black text-charcoal text-lg mb-1"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {ev.title}
                    </h3>
                    <div className="text-warm-gray text-sm mb-2">{ev.time} · {ev.location}</div>
                    <p className="text-charcoal/70 text-sm leading-relaxed">{ev.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 10. SCRIPTURE VERSE ── */}
      <section
        className="px-6 text-center"
        style={{
          background: "#2B5740",
          clipPath: "polygon(0 44px, 100% 0, 100% calc(100% - 44px), 0 100%)",
          padding: "calc(5rem + 44px) 1.5rem",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="kicker mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Scripture</div>
          <blockquote
            className="text-white italic font-bold leading-snug mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
              lineHeight: 1.35,
            }}
          >
            "{settings.verseText}"
          </blockquote>
          <cite
            className="not-italic font-bold uppercase tracking-widest text-sm"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            — {settings.verseReference}
          </cite>
        </div>
      </section>

      {/* ── 11. CLOSING CTA ── */}
      <section
        className="px-6 text-center"
        style={{
          background: "#C05C35",
          clipPath: "polygon(0 44px, 100% 0, 100% 100%, 0 100%)",
          padding: "calc(5rem + 44px) 1.5rem 5rem",
        }}
      >
        <h2
          className="text-white font-black mb-4"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
          }}
        >
          You are welcome here.
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
          Join us this Sunday — no experience required, no dress code, just come as you are.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-white">Get in Touch</Link>
          <Link href="/about" className="btn-outline-white">Learn About Us</Link>
        </div>
      </section>
    </>
  );
}
