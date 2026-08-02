"use client";

import { useState, FormEvent } from "react";

// ⬇️ Paste your Google Apps Script Web App URL here (see form-backend/google-apps-script.gs)
const FORM_ENDPOINT = "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Google Apps Script does not send CORS headers, so we use no-cors.
      // The row is still written; we just can't read the response body.
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot: hidden from people, catches bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" style={{ display: "none" }} />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Name</label>
        <input type="text" name="name" placeholder="Your name" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Email or Phone</label>
        <input type="text" name="contact" placeholder="Email address or phone number" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Message or Prayer Request</label>
        <textarea name="message" rows={5} placeholder="Write your prayer request or message here..." required />
      </div>

      {status === "sent" && (
        <div className="rounded-xl px-5 py-4 text-sm font-semibold text-white bg-forest flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Thank you. Your message has been received. We will be in touch soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-700">
          Something went wrong. Please try again or reach us directly by phone or WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-terra justify-center disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
