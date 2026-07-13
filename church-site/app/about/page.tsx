import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import { getSettings, getLeadership } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

const ministries = [
  { title: "Men's Fellowship", accent: "#2B5740", desc: "Building godly men who lead their families and communities with integrity." },
  { title: "Mothers' Union", accent: "#C05C35", desc: "Women united in prayer, mentorship, and service across the Diocese." },
  { title: "Youth Ministry", accent: "#C8943A", desc: "Discipling the next generation through worship, teaching, and fellowship." },
  { title: "Sunday School & Children", accent: "#2B5740", desc: "Giving children a solid biblical foundation in a safe, joyful environment." },
  { title: "Outreach & Evangelism", accent: "#C05C35", desc: "Carrying the Gospel and practical love to the wider community." },
  { title: "Cell Groups", accent: "#C8943A", desc: "Smaller gatherings where believers grow together in the Word and in prayer." },
  { title: "Intercessory Group", accent: "#2B5740", desc: "Standing in the gap in prayer for the Church, the nation, and the world." },
  { title: "Praise & Worship", accent: "#C05C35", desc: "Leading the Diocese into God's presence through music and praise." },
];

// Diocesan administrative structure (from the official chart)
const provostBranch = {
  head: "Provost of the Cathedral",
  reports: ["Pastors for spiritual matters", "Archdeacons"],
};
const secretaryBranch = {
  head: "Diocesan Administrative Secretary",
  reports: ["Mothers' Union", "Fathers' Union", "Youth Ministry"],
};
const departments = [
  "Finance & Administration",
  "Mission & Evangelism",
  "Health Department",
  "Education Department",
  "Agriculture Department",
  "Development Department",
  "Communications Department",
  "Chaplaincy & Prison",
  "Bible School Department",
  "Sunday School & Children Ministry",
  "Prayers Group",
  "Praise & Worship",
];

export default function AboutPage() {
  const settings = getSettings();
  const leaders = getLeadership();

  return (
    <>
      {/* ── OPENING — full photo bg with statement overlay ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "75vh", background: "#14100C" }}>
        {/* Background photo — replace with a real photo of the cathedral / congregation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1689844759889-f8d92bd8a03a?w=1600&q=85&auto=format&fit=crop"
          alt="Members of the congregation in worship"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 25%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.25) 0%, rgba(28,24,20,0.55) 50%, rgba(28,24,20,0.88) 100%)",
          }}
        />
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
            One of the youngest dioceses in South Sudan.<br />
            <span style={{ color: "#C8943A" }}>And one of the fastest growing.</span>
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
            The Episcopal Diocese of Wanyjok is one of the youngest and fastest-growing dioceses in the
            Episcopal Church of South Sudan. It was created as an area diocese in {settings.foundedYear} and
            became an autonomous diocese on 28 April 2019, with Rt. Rev. Joseph Mamer Manot as its first bishop.
          </p>
          <p>
            Today the Diocese is home to more than 47,000 Christian members across Aweil East, in the internal
            province of Northern Bahr el Ghazal. From a single cathedral congregation it has grown into a
            network of parishes, archdeaconries, unions, and departments serving communities near and far.
          </p>
          <p>
            Christian mission has been present in this land since the nineteenth century, and the Church has
            become one of its most trusted institutions — playing a vital role not only in worship and
            discipleship, but in humanitarian and social services, peace, education, and health.
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
              { v: "Mission", desc: "Equipping the whole Church to carry the Gospel to all people." },
              { v: "Service", desc: "Serving our communities in health, education, peace, and relief." },
              { v: "Prayer", desc: "A Diocese that prays together stays together and grows together." },
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

      {/* ── DIOCESAN STRUCTURE ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="kicker mb-3">How we are organised</div>
        <h2
          className="text-charcoal font-black mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Diocesan structure
        </h2>
        <p className="text-warm-gray mb-12 max-w-xl leading-relaxed">
          The Diocese is led by the Bishop, supported by the cathedral and administrative offices, and served
          by a family of unions, archdeaconries, and departments.
        </p>

        {/* Tier 1 — Bishop */}
        <div className="flex justify-center">
          <div
            className="rounded-2xl px-8 py-5 text-center text-white"
            style={{ background: "#C05C35", boxShadow: "0 8px 24px rgba(192,92,53,0.25)" }}
          >
            <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Diocesan Bishop</div>
            <div className="font-black text-lg" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {settings.pastorName}
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className="w-px h-8" style={{ background: "#D4CCBC" }} />
        </div>

        {/* Tier 2 — Provost & Administrative Secretary, each with their reports */}
        <div className="grid md:grid-cols-2 gap-6">
          {[provostBranch, secretaryBranch].map((branch) => (
            <div key={branch.head} className="flex flex-col">
              <div
                className="rounded-xl px-6 py-4 text-center text-white"
                style={{ background: "#2B5740" }}
              >
                <div className="font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {branch.head}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-5" style={{ background: "#D4CCBC" }} />
              </div>
              <div className="flex flex-col gap-2.5">
                {branch.reports.map((r) => (
                  <div
                    key={r}
                    className="rounded-lg px-5 py-3 text-center text-charcoal text-sm font-semibold"
                    style={{ background: "#FDFCFB", border: "1px solid #EDE8DE" }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div className="mt-14">
          <div className="kicker mb-5" style={{ color: "#C8943A" }}>Diocesan departments</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {departments.map((d, i) => (
              <div
                key={d}
                className="rounded-lg px-4 py-3.5 text-charcoal text-sm font-semibold"
                style={{
                  background: "#FDFCFB",
                  borderTop: `3px solid ${i % 3 === 0 ? "#C05C35" : i % 3 === 1 ? "#2B5740" : "#C8943A"}`,
                  boxShadow: "0 1px 8px rgba(60,40,20,0.05)",
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="bg-cream-dark py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="kicker mb-3">The team</div>
          <h2
            className="text-charcoal font-black mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            The people who lead
          </h2>
          <p className="text-warm-gray mb-14 max-w-xl leading-relaxed">
            Servant leaders committed to guiding the Diocese with wisdom, humility, and a heart for God and people.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
            {leaders.map((l, i) => (
              <div
                key={l.name}
                className="flex flex-col gap-1 pb-10 border-b border-cream-darker last:border-0 last:pb-0"
              >
                <div className="flex items-baseline gap-4 mb-1 flex-wrap">
                  <h3
                    className="font-black text-charcoal"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.35rem", lineHeight: 1.1 }}
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
                  <span className="mt-2 self-start text-xs font-bold text-warm-gray bg-cream px-3 py-1 rounded-full">
                    {l.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINISTRIES ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="kicker mb-3">Get involved</div>
        <h2
          className="text-charcoal font-black mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Ministries
        </h2>
        <p className="text-warm-gray mb-10 max-w-xl leading-relaxed">
          There is a place for everyone to belong, grow, and serve in this Diocesan family.
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
          Get in touch and let us know you are coming. We will be glad to welcome you.
        </p>
        <Link href="/contact" className="btn-terra">Plan Your Visit</Link>
      </section>
    </>
  );
}
