import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSettings } from "@/lib/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  return {
    title: { default: s.churchName, template: `%s | ${s.churchName}` },
    description: s.missionStatement,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Netlify Identity widget — intercepts invite/reset tokens at the root URL */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function(user) {
              if (!user) {
                window.netlifyIdentity.on("login", function() {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
      </head>
      <body className="min-h-screen">
        <Navbar churchName={settings.churchName} />
        <main>{children}</main>

        {/* Footer */}
        <footer className="text-[#EDE8DE] py-14" style={{ background: "linear-gradient(to bottom, #3d2318 0%, #1C1814 55%)" }}>
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#C8943A] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>✝</span>
                <span className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {settings.churchName}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#A09080]">{settings.tagline}</p>
            </div>

            <div>
              <div className="kicker mb-3" style={{ color: "#C8943A" }}>Service Times</div>
              <div className="flex flex-col gap-2">
                {settings.serviceTimes.map((s) => (
                  <div key={s.day} className="text-sm">
                    <span className="text-white font-semibold">{s.day}</span>
                    <span className="text-[#A09080]"> — {s.label}, {s.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="kicker mb-3" style={{ color: "#C8943A" }}>Contact</div>
              <div className="flex flex-col gap-2 text-sm text-[#A09080]">
                <div>{settings.address}</div>
                <div>{settings.phone}</div>
                <div>{settings.email}</div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 mt-10 pt-6 border-t border-white/10 text-xs text-[#6B5E54]">
            © {new Date().getFullYear()} {settings.churchName}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
