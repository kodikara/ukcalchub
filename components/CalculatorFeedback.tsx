"use client";

import { useState } from "react";

export function CalculatorFeedback() {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm leading-6 text-emerald-200">
        Thanks for the feedback. It helps improve UK Calculator Hub.
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:p-6">
      <h2 className="section-heading text-xl font-semibold">Was this calculator helpful?</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Rate the calculator and optionally leave a note. Feedback is not stored permanently in this version.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          const value = index + 1;
          const active = value <= rating;

          return (
            <button
              key={value}
              type="button"
              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
                active
                  ? "border-cyan-300 bg-cyan-400/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.14)]"
                  : "border-white/10 bg-white/5 text-slate-500 hover:border-cyan-400/30 hover:text-cyan-300"
              }`}
            >
              ★
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-300">
          Optional feedback
        </label>
        <textarea
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          rows={4}
          placeholder="Tell us what was useful or what could be improved."
          className="w-full rounded-2xl border border-white/10 bg-[#121826] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      <button
        type="button"
        onClick={() => setSubmitted(true)}
        className="action-button mt-5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(34,211,238,0.22)] sm:w-auto"
      >
        Submit feedback
      </button>
    </div>
  );
}
