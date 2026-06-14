import type { Metadata } from "next";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const settings = getSettings();

  const infoItems = [
    { icon: "📍", label: "Address", value: settings.address },
    { icon: "📞", label: "Phone", value: settings.phone },
    { icon: "✉️", label: "Email", value: settings.email },
    { icon: "💬", label: "WhatsApp", value: settings.whatsapp },
  ];

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative bg-cream py-24 px-6 overflow-hidden">
        <div
          className="absolute left-1/2 bottom-0 rounded-full pointer-events-none"
          style={{ width: 360, height: 360, background: "#C05C35", opacity: 0.06, transform: "translate(-20%, 40%)" }}
        />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="kicker mb-4">Connect with us</div>
          <h1
            className="text-charcoal font-black mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Contact & prayer requests
          </h1>
          <p className="text-warm-gray text-lg max-w-xl leading-relaxed">
            We would love to hear from you — whether it is a question, a prayer request, or to plan your first visit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
        {/* Left: info */}
        <div className="flex flex-col gap-5">
          <Card white className="p-8">
            <h2
              className="font-black text-charcoal text-2xl mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Church information
            </h2>
            <div className="flex flex-col divide-y divide-cream-darker">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="kicker mb-0.5">{item.label}</div>
                    <div className="font-semibold text-charcoal text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Service times */}
          <Card className="p-6" style={{ borderLeft: "4px solid #C05C35" }}>
            <div className="kicker mb-4">Service times</div>
            <div className="flex flex-col gap-3">
              {settings.serviceTimes.map((s) => (
                <div key={s.day} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{s.label}</div>
                    <div className="text-warm-gray text-xs">{s.day}</div>
                  </div>
                  <span className="text-terracotta font-black text-sm"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
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
            <span>💬</span> Chat on WhatsApp
          </a>
        </div>

        {/* Right: form */}
        <Card white className="p-8">
          <h2
            className="font-black text-charcoal text-2xl mb-2"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Send a message
          </h2>
          <p className="text-warm-gray text-sm mb-7 leading-relaxed">
            Whether it is a prayer request, a question, or just a hello — we will respond as soon as we can.
          </p>
          <ContactForm />
        </Card>
      </section>
    </>
  );
}
