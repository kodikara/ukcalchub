"use client";

import Link from "next/link";
import { useState } from "react";
import { founderProfile } from "@/lib/author";

export function CalculatorFeedback() {
  const [helpful, setHelpful] = useState<"yes" | "no" | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");

  async function handleShare() {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "UK Calculator Hub",
          text: "Thought this UK calculator scenario might be useful.",
          url: shareUrl,
        });
        setShareState("shared");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareState("copied");
    } catch {
      setShareState("idle");
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:p-6">
      <h2 className="section-heading text-xl font-semibold">Found a mistake or want a new calculator? Tell us.</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Send a quick note to help improve UKCalcHub. Feedback goes straight to email, which is the most useful option
        while the site stays lightweight and account-free.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-300">Was this page helpful?</span>
        <button
          type="button"
          onClick={() => setHelpful("yes")}
          className={
            helpful === "yes"
              ? "rounded-full border border-emerald-400/30 bg-emerald-400/12 px-4 py-2 text-sm font-medium text-emerald-200"
              : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          }
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setHelpful("no")}
          className={
            helpful === "no"
              ? "rounded-full border border-rose-400/30 bg-rose-400/12 px-4 py-2 text-sm font-medium text-rose-200"
              : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          }
        >
          No
        </button>
        {helpful ? (
          <span className="text-sm text-slate-400">
            {helpful === "yes" ? "Good to know. Thanks." : "Thanks. That helps us spot what needs work."}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`mailto:${founderProfile.email}?subject=UKCalcHub%20feedback`}
          className="action-button inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(34,211,238,0.22)]"
        >
          Email feedback
        </Link>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          {founderProfile.email}
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
        >
          {shareState === "copied" ? "Link copied" : shareState === "shared" ? "Shared" : "Share this scenario"}
        </button>
      </div>
    </div>
  );
}
