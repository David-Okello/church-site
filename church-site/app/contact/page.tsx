import type { Metadata } from "next";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import { SocialIconLink } from "@/components/SocialIcons";
import { getSettings, getContactPageContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const settings = getSettings();
  const page = getContactPageContent();

  const infoItems = [
    { label: "Address", value: settings.address },
    { label: "Phone", value: settings.phone },
    { label: "Email", value: settings.email },
    { label: "WhatsApp", value: settings.whatsapp },
  ];

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "52vh", background: "#14100C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.heroImage}
          alt="A parish church building of the diocese"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.50) 50%, rgba(28,24,20,0.90) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 pt-24">
          <div className="kicker mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{page.heroKicker}</div>
          <h1
            className="text-white font-black mb-4"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {page.heroTitle}
          </h1>
          <p className="text-white/70 text-lg max-w-lg leading-relaxed">
            {page.heroSubtext}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
        {/* Left: info */}
        <div className="flex flex-col gap-5">
          <Card white className="p-8">
            <h2
              className="font-black text-charcoal text-2xl mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {page.infoHeading}
            </h2>
            <div className="flex flex-col divide-y divide-cream-darker">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <div className="kicker mb-0.5">{item.label}</div>
                    <div className="font-semibold text-charcoal text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Service times */}
          <Card className="p-6" style={{ borderLeft: "4px solid #1F5C99" }}>
            <div className="kicker mb-4">{page.serviceTimesLabel}</div>
            <div className="flex flex-col gap-3">
              {settings.serviceTimes.map((s) => (
                <div key={s.day} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{s.label}</div>
                    <div className="text-warm-gray text-xs">{s.day}</div>
                  </div>
                  <span
                    className="text-terracotta font-black text-sm"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-forest justify-center text-center"
          >
            Chat on WhatsApp
          </a>

          {/* Social links */}
          {(settings.facebookUrl || settings.youtubeUrl || settings.twitterUrl) && (
            <Card className="p-6" style={{ borderLeft: "4px solid #2B5740" }}>
              <div className="kicker mb-4">{page.followKicker}</div>
              <div className="flex flex-wrap gap-3">
                {settings.facebookUrl && <SocialIconLink href={settings.facebookUrl} label="Facebook" variant="light" />}
                {settings.youtubeUrl && <SocialIconLink href={settings.youtubeUrl} label="YouTube" variant="light" />}
                {settings.twitterUrl && <SocialIconLink href={settings.twitterUrl} label="X (Twitter)" variant="light" />}
              </div>
            </Card>
          )}
        </div>

        {/* Right: form */}
        <Card white className="p-8">
          <h2
            className="font-black text-charcoal text-2xl mb-2"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {page.formHeading}
          </h2>
          <p className="text-warm-gray text-sm mb-7 leading-relaxed">
            {page.formSubtext}
          </p>
          <ContactForm />
        </Card>
      </div>
      </section>
    </>
  );
}
