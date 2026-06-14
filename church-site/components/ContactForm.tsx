"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Replace with your Web3Forms access key from web3forms.com */}
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
      <input type="hidden" name="subject" value="New message / prayer request from church website" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

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
        <div className="rounded-xl px-5 py-4 text-sm font-semibold text-white bg-forest">
          ✓ Thank you — your message has been received. We will be in touch soon.
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
