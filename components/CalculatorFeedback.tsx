import Link from "next/link";

export function CalculatorFeedback() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:p-6">
      <h2 className="section-heading text-xl font-semibold">Found a mistake or want a new calculator? Tell us.</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Send a quick note to help improve UKCalcHub. Feedback goes straight to email, which is the most useful option
        while the site stays lightweight and account-free.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href="mailto:hello@ukcalchub.co.uk?subject=UKCalcHub%20feedback"
          className="action-button inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(34,211,238,0.22)]"
        >
          Email feedback
        </Link>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          hello@ukcalchub.co.uk
        </div>
      </div>
    </div>
  );
}
