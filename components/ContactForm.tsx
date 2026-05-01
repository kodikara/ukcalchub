"use client";

import { useMemo, useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("UK Calculator Hub Feedback");
    const body = encodeURIComponent(
      `Name: ${name || "-"}\nEmail: ${email || "-"}\n\nMessage:\n${message || "-"}`,
    );

    return `mailto:hello@ukcalchub.co.uk?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_36px_rgba(2,6,23,0.24)]">
      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-300">Message draft</div>
      <div className="mt-4 grid gap-4">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="input-shell"
        />
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="input-shell"
          type="email"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          placeholder="Tell us what happened, what calculator you want, or what could be improved."
          className="w-full rounded-2xl border border-white/10 bg-[#121826] px-4 py-3 text-base leading-7 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <a
          href={mailtoHref}
          className="action-button w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(34,211,238,0.22)] sm:w-auto"
        >
          Open email draft
        </a>
        <div className="text-base leading-7 text-slate-400">
          This form does not send through the website yet. It prepares an email draft using your default mail app.
        </div>
      </div>
    </div>
  );
}
