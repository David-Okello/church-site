import Link from "next/link";
import Card from "@/components/Card";
import { getSettings, getSermons, getEvents, getAnnouncements, getMinistries, getHomeContent, getYouTubeThumbnail } from "@/lib/content";
import { getYouTubeId } from "@/lib/youtube";
import VideoThumbnail from "@/components/VideoThumbnail";

export default function HomePage() {
  const settings = getSettings();
  const sermons = getSermons();
  const events = getEvents().slice(0, 4);
  const announcements = getAnnouncements().slice(0, 3);
  const featured = sermons[0];
  const featuredThumb = getYouTubeThumbnail(featured?.mediaUrl);
  const featuredVideoId = getYouTubeId(featured?.mediaUrl);
  const recent = sermons.slice(1, 4);
  const home = getHomeContent();
  const ministriesList = getMinistries().map((m) => m.title);

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: "#14100C" }}>
        {/* Full-bleed photo, replace with a real photo of the cathedral / congregation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1444664361762-afba083a4d77?w=1800&q=85&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        {/* Dark overlay: slightly lighter top, darker bottom for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(20,16,12,0.50) 0%, rgba(20,16,12,0.72) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 py-24 grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {settings.denomination} · Aweil East, South Sudan
            </div>
            <h1
              className="font-black mb-6 hero-headline"
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.6rem, 5.2vw, 4.8rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
              }}
            >
              {home.heroTitleLine1}<br />
              <span style={{ color: "#E8A85A" }}>{home.heroTitleLine2}</span>
            </h1>
            <p
              className="text-lg leading-relaxed mb-10 max-w-lg hero-sub"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              {home.heroSubtext}
            </p>
            <div className="flex flex-wrap gap-4 hero-ctas">
              <Link href="/contact" className="btn-white">Plan a Visit</Link>
              <Link href="/about" className="btn-outline-white">Our Story</Link>
            </div>
          </div>

          {/* Right: gatherings, white on dark overlay, works at all sizes */}
          <div className="mt-10 lg:mt-0">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              When we gather
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
              {settings.serviceTimes.slice(0, 5).map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-4 py-3.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <div className="min-w-0">
                    <div
                      className="font-semibold text-sm truncate"
                      style={{ color: "rgba(255,255,255,0.90)" }}
                    >
                      {s.label}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.48)" }}>{s.day}</div>
                  </div>
                  <span
                    className="font-black shrink-0"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "1.35rem",
                      lineHeight: 1,
                      color: "#E8A85A",
                    }}
                  >
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              …and more through the week. {settings.address}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. STORY PARAGRAPH ── */}
      <section className="bg-cream-dark py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-charcoal/80 leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)", lineHeight: 1.75 }}
          >
            {home.storyParagraph}
          </p>
        </div>
      </section>

      {/* ── 3. MISSION STRIP ── */}
      <section className="px-6 py-20" style={{ background: "#1F5C99" }}>
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-white font-bold leading-relaxed mb-8"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
              lineHeight: 1.4,
            }}
          >
            {home.missionText}
          </p>
          <Link href="/about" className="btn-outline-white">
            Who we are →
          </Link>
        </div>
      </section>

      {/* ── 4. FEATURED SERMON ── */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="kicker mb-2">From the pulpit</div>
              <h2
                className="text-charcoal font-black"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                Latest Sermons
              </h2>
            </div>
            <Link href="/sermons" className="text-terracotta font-semibold text-sm hover:underline shrink-0">
              All sermons →
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
            {/* Featured */}
            <Card className="p-8 flex flex-col justify-between" style={{ borderLeft: "5px solid #1F5C99" }}>
              <div>
                {featuredThumb && featuredVideoId && (
                  <VideoThumbnail
                    videoId={featuredVideoId}
                    thumb={featuredThumb}
                    title={featured.title}
                    playSize={56}
                    className="rounded-xl overflow-hidden mb-6"
                  />
                )}
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
              {recent.map((s, i) => (
                <Card key={s.title + s.date + i} white className="p-5 flex items-start gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-terracotta font-black text-xs text-center leading-tight"
                    style={{ background: "#EAF2FA", fontFamily: "var(--font-playfair), Georgia, serif" }}
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
      <section className="px-6 py-20" style={{ background: "#EDE8DE" }}>
        <div className="mx-auto max-w-4xl">
          <div className="kicker mb-3">Every week</div>
          <h2
            className="text-charcoal font-black mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Gatherings through the week
          </h2>
          <div className="flex flex-col divide-y divide-[#D4CCBC] border-y border-[#D4CCBC]">
            {settings.serviceTimes.map((s, i) => (
              <div key={s.label} className="flex items-center justify-between gap-6 py-5">
                <div className="flex items-center gap-5 min-w-0">
                  <div
                    className="shrink-0 w-1.5 h-8 rounded-full"
                    style={{ background: i % 3 === 0 ? "#1F5C99" : i % 3 === 1 ? "#2B5740" : "#C8943A" }}
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-charcoal">{s.label}</div>
                    <div className="text-warm-gray text-sm">{s.day}</div>
                  </div>
                </div>
                <span
                  className="font-black shrink-0"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    color: i % 3 === 0 ? "#1F5C99" : i % 3 === 1 ? "#2B5740" : "#C8943A",
                  }}
                >
                  {s.time}
                </span>
              </div>
            ))}
          </div>
          <p className="text-warm-gray text-sm mt-6">{settings.address}</p>
        </div>
      </section>

      {/* ── 6. MINISTRIES ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div>
            <div className="kicker mb-3">Community life</div>
            <h2
              className="text-charcoal font-black mb-5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
            >
              Find your place
            </h2>
            <p className="text-charcoal/75 leading-relaxed mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>
              From the Mothers&apos; Union to youth ministry, cell groups to evangelism: there is a place
              for everyone to belong, grow in faith, and serve across the Diocese.
            </p>
            <Link href="/about" className="btn-terra">Explore ministries →</Link>
          </div>
          <div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {ministriesList.map((name, i) => (
                <li key={name} className="flex items-center gap-3 text-charcoal/80 font-medium">
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: i % 3 === 0 ? "#1F5C99" : i % 3 === 1 ? "#2B5740" : "#C8943A" }}
                  />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. A WORD FROM THE BISHOP ── */}
      <section className="px-6 py-20" style={{ background: "#EDE8DE" }}>
        <div className="mx-auto max-w-5xl grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          {/* Bishop portrait: save the photo to church-site/public/uploads/bishop-joseph.jpg */}
          <div className="mx-auto md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/bishop-joseph.jpg"
              alt={settings.pastorName}
              className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover"
              style={{ boxShadow: "0 12px 40px rgba(60,40,20,0.18)", background: "#D4CCBC", objectPosition: "center 20%" }}
            />
          </div>
          <div>
            <div className="kicker mb-6">A word from the Bishop</div>
            <div className="w-10 h-px mb-8" style={{ background: "#1F5C99" }} />
            <blockquote
              className="text-charcoal font-medium leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                lineHeight: 1.7,
              }}
            >
              {settings.pastorQuote}
            </blockquote>
            <div className="text-terracotta font-bold text-sm uppercase tracking-widest">
              {settings.pastorName}, Diocesan Bishop
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. ANNOUNCEMENTS ── */}
      {announcements.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="kicker mb-3">Notice board</div>
          <h2
            className="text-charcoal font-black mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Announcements
          </h2>
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
              <div className="kicker mb-2">Diocesan calendar</div>
              <h2
                className="text-charcoal font-black"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                Upcoming events
              </h2>
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
      <section className="px-6 py-24" style={{ background: "#2B5740" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="kicker mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>Our vision</div>
          <blockquote
            className="text-white italic font-bold leading-snug mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;{settings.verseText}&rdquo;
          </blockquote>
          <cite
            className="not-italic font-bold uppercase tracking-widest text-sm"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {settings.verseReference}
          </cite>
        </div>
      </section>

      {/* ── 11. CLOSING CTA ── */}
      <section className="px-6 py-24" style={{ background: "#1F5C99" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-white font-black mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
            }}
          >
            {home.ctaTitle}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            {home.ctaSubtext}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-white">Get in Touch</Link>
            <Link href="/about" className="btn-outline-white">Learn About Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
