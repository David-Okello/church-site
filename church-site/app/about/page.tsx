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
      {/* ── PAGE HEADER ── */}
      <section className="relative bg-cream py-24 px-6 overflow-hidden">
        <div
          className="absolute -right-24 -top-24 rounded-full pointer-events-none"
          style={{ width: 400, height: 400, background: "#C05C35", opacity: 0.07 }}
        />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="kicker mb-4">Who we are</div>
          <h1
            className="text-charcoal font-black mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            About the church
          </h1>
          <p className="text-warm-gray text-lg max-w-2xl leading-relaxed">
            Learn who we are, what we believe, and what drives everything we do as a community of faith in South Sudan.
          </p>
        </div>
      </section>

      {/* ── STORY + FACTS ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
        <div>
          <div className="kicker mb-3">Our story</div>
          <h2
            className="text-charcoal font-black mb-6 text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Who we are
          </h2>
          <div className="flex flex-col gap-4 text-charcoal/80 leading-relaxed">
            <p>
              {settings.churchName} was founded in {settings.foundedYear} with a simple calling —
              to bring the love of Christ to our community and make disciples who make disciples.
              What began as a small gathering has grown into a vibrant, multi-generational church family.
            </p>
            <p>
              We are an {settings.denomination} congregation rooted in biblical truth, passionate about
              worship, and committed to seeing transformation in every area of life — personal, family, and community.
            </p>
            <p>{settings.missionStatement}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: "Founded", value: settings.foundedYear },
            { label: "Denomination", value: settings.denomination },
            { label: "Location", value: settings.address },
            { label: "Ministries", value: `${ministries.length} active ministries` },
          ].map((f) => (
            <Card key={f.label} white className="px-6 py-5 flex items-center justify-between gap-4">
              <span className="kicker">{f.label}</span>
              <span className="font-bold text-charcoal text-sm text-right">{f.value}</span>
            </Card>
          ))}

          <Card className="px-6 py-5" style={{ borderLeft: "4px solid #C05C35" }}>
            <div className="kicker mb-1">Vision</div>
            <p className="text-charcoal/80 text-sm leading-relaxed">
              To be a Spirit-filled community that raises disciples, strengthens families, and
              brings lasting hope and transformation to South Sudan and beyond.
            </p>
          </Card>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">What we believe</div>
          <h2
            className="text-charcoal font-black mb-10 text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
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
          className="text-charcoal font-black mb-3 text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Meet the leaders
        </h2>
        <p className="text-warm-gray mb-10 max-w-xl leading-relaxed">
          Servant leaders committed to guiding this church with wisdom, humility, and a heart for God and people.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leaders.map((l) => (
            <Card key={l.name} white className="p-6 text-center flex flex-col items-center">
              {/* Circular avatar placeholder */}
              <div
                className="w-20 h-20 rounded-full grid place-items-center text-3xl mb-4 shrink-0"
                style={{ background: "linear-gradient(135deg, #FBF0EB, #EDE8DE)", border: "3px solid #C05C35" }}
              >
                👤
              </div>
              <h3
                className="font-black text-charcoal text-base mb-0.5"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {l.name}
              </h3>
              <div className="text-terracotta text-xs font-bold uppercase tracking-wider mb-3">{l.role}</div>
              <p className="text-warm-gray text-sm leading-relaxed">{l.bio}</p>
              {l.tag && (
                <span className="mt-3 text-xs font-bold text-forest bg-cream-dark px-3 py-1 rounded-full">
                  {l.tag}
                </span>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* ── MINISTRIES ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">Get involved</div>
          <h2
            className="text-charcoal font-black mb-3 text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
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
      <section className="py-20 px-6 text-center">
        <h2
          className="text-charcoal font-black mb-4 text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Ready to be part of this family?
        </h2>
        <p className="text-warm-gray mb-8 max-w-sm mx-auto">Get in touch and let us know you are coming.</p>
        <Link href="/contact" className="btn-terra">Plan Your Visit</Link>
      </section>
    </>
  );
}
