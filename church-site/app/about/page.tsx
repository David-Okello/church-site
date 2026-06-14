import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import { getSettings, getLeadership } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

const ministries = [
  { title: "Youth Ministry", accent: "#C05C35", desc: "Raising up the next generation through discipleship, worship, and peer mentoring." },
  { title: "Women's Fellowship", accent: "#2B5740", desc: "Empowering women through prayer, teaching, and community support." },
  { title: "Men's Ministry", accent: "#C8943A", desc: "Building Godly men who lead their families and communities with integrity." },
  { title: "Worship Team", accent: "#C05C35", desc: "Leading the congregation into the presence of God through music and praise." },
  { title: "Community Outreach", accent: "#2B5740", desc: "Serving the local community with practical love and the Gospel message." },
  { title: "Children's Church", accent: "#C8943A", desc: "Giving children a solid biblical foundation in a safe and fun environment." },
];

export default function AboutPage() {
  const settings = getSettings();
  const leaders = getLeadership();

  return (
    <>
      {/* ── OPENING — full photo bg with statement overlay ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "75vh" }}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1689844759889-f8d92bd8a03a?w=1600&q=85&auto=format&fit=crop"
          alt="Members of the congregation in worship"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 25%" }}
        />
        {/* Dark overlay — heavier at bottom where text sits */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.25) 0%, rgba(28,24,20,0.55) 50%, rgba(28,24,20,0.88) 100%)",
          }}
        />
        {/* Statement — pinned to bottom */}
        <div className="relative z-10 w-full mx-auto max-w-5xl px-6 pb-16 pt-32">
          <p
            className="text-white font-black"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            We are not a perfect church.<br />
            <span style={{ color: "#C8943A" }}>But we are a real one.</span>
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="kicker mb-8">Our story</div>
        <div
          className="flex flex-col gap-7 text-charcoal/80 leading-relaxed"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", lineHeight: 1.8 }}
        >
          <p>
            The first time Grace Community Church met, there were just a handful of people. No building
            of their own, no budget, no programme — just a shared conviction that the Gospel was worth
            gathering around.
          </p>
          <p>
            That was {settings.foundedYear}. Since then, the church has grown through seasons of revival and
            seasons of hardship — through South Sudan&apos;s own turbulent history, through floods and
            uncertainty and the ordinary miracles of children growing up into faith.
          </p>
          <p>
            Today we are an {settings.denomination} congregation in Wau, Western Bahr el Ghazal. We meet
            three times a week. We have walked people through grief, through new beginnings, through the
            full range of what life brings. We are, in other words, a real church — imperfect, growing,
            and deeply grateful for every person who walks through the door.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">What we believe</div>
          <h2
            className="text-charcoal font-black mb-10"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Our core values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { v: "Faith", desc: "Trusting God's word above our circumstances, always." },
              { v: "Love", desc: "Loving God and one another as the foundation of everything we do." },
              { v: "Service", desc: "Serving our community as a practical expression of the Gospel." },
              { v: "Prayer", desc: "A church that prays together stays together and grows together." },
              { v: "Biblical Truth", desc: "Anchored in Scripture — our map for life, faith, and community." },
              { v: "Unity", desc: "One body, many parts, united around Jesus Christ." },
            ].map((item, i) => (
              <Card key={item.v} white className="p-6"
                style={{ borderLeft: `4px solid ${i % 3 === 0 ? "#C05C35" : i % 3 === 1 ? "#2B5740" : "#C8943A"}` }}>
                <h3
                  className="font-black text-charcoal text-xl mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {item.v}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="kicker mb-3">The team</div>
        <h2
          className="text-charcoal font-black mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          The people who lead
        </h2>
        <p className="text-warm-gray mb-14 max-w-xl leading-relaxed">
          Servant leaders committed to guiding this church with wisdom, humility, and a heart for God and people.
        </p>

        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
          {leaders.map((l, i) => (
            <div
              key={l.name}
              className="flex flex-col gap-1 pb-10 border-b border-cream-darker last:border-0 last:pb-0"
            >
              <div className="flex items-baseline gap-4 mb-1">
                <h3
                  className="font-black text-charcoal"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.4rem", lineHeight: 1.1 }}
                >
                  {l.name}
                </h3>
                <span
                  className="text-xs font-bold uppercase tracking-widest shrink-0"
                  style={{ color: i % 3 === 0 ? "#C05C35" : i % 3 === 1 ? "#2B5740" : "#C8943A" }}
                >
                  {l.role}
                </span>
              </div>
              <p className="text-charcoal/70 text-sm leading-relaxed">{l.bio}</p>
              {l.tag && (
                <span className="mt-2 self-start text-xs font-bold text-warm-gray bg-cream-dark px-3 py-1 rounded-full">
                  {l.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MINISTRIES ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">Get involved</div>
          <h2
            className="text-charcoal font-black mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Ministries
          </h2>
          <p className="text-warm-gray mb-10 max-w-xl leading-relaxed">
            There is a place for everyone to belong, grow, and serve in this church family.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ministries.map((m) => (
              <Card key={m.title} white className="p-6" style={{ borderLeft: `4px solid ${m.accent}` }}>
                <h3
                  className="font-black text-charcoal text-xl mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {m.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center">
        <h2
          className="text-charcoal font-black mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Ready to be part of this family?
        </h2>
        <p className="text-warm-gray mb-8 max-w-sm mx-auto">
          Get in touch and let us know you are coming. We will be glad to see you.
        </p>
        <Link href="/contact" className="btn-terra">Plan Your Visit</Link>
      </section>
    </>
  );
}
