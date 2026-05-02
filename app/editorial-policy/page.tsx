import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { founderProfile } from "@/lib/author";

export const metadata: Metadata = {
  title: "Editorial Policy | UK Calculator Hub",
  description:
    "Read how UK Calculator Hub builds, updates and checks its calculators, content sources and financial guidance disclaimers.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Editorial policy"
      title="How UK Calculator Hub builds and updates its calculators"
      intro="UK Calculator Hub is designed to be useful, transparent and easy to check. This page explains where the site’s figures come from, how the content is maintained, and what the calculators are and are not meant to do."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Editorial policy" },
      ]}
      showAuthor
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Who is behind the site</h2>
        <p>
          UK Calculator Hub is built and maintained by {founderProfile.name}. His background is in engineering and
          structured problem solving rather than regulated financial advice, which is why the site is deliberately
          open about assumptions, source links and limits. The goal is to turn common UK money questions into clear,
          practical calculators and plain-English explainers without pretending to be a substitute for a qualified
          accountant, mortgage adviser, tax adviser or financial planner.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={founderProfile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            LinkedIn profile
          </Link>
          <Link
            href={`mailto:${founderProfile.email}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            {founderProfile.email}
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Where the data and assumptions come from</h2>
        <p>
          The calculators use local TypeScript logic with no paid financial API. For tax, pension and student loan
          pages, the logic is built around published UK tax-year thresholds and broad payroll rules. The site links back
          to official or evergreen sources so users can inspect the underlying rules rather than simply trusting a black
          box.
        </p>
        <ul className="space-y-3 pl-5 text-slate-200">
          <li className="list-disc">GOV.UK pages for tax bands, personal allowance, National Insurance and student loan thresholds.</li>
          <li className="list-disc">GOV.UK and MoneyHelper guidance for workplace pensions, salary sacrifice and household budgeting context.</li>
          <li className="list-disc">Clearly stated planning assumptions where a tool uses averages, benchmarks or simplified ranges.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">How the site is updated</h2>
        <p>
          Calculator pages that depend on UK tax-year rules are reviewed and updated when published thresholds, bands
          or repayment limits change. That is why pages such as the salary and take-home pay tools show a visible tax
          year badge, for example “Updated for the 2026/27 UK tax year”.
        </p>
        <p>
          Explainer pages are reviewed when the underlying rules change or when a section needs to be clarified for
          readers. The aim is not to chase daily finance headlines, but to keep the site current on the practical rules
          that affect everyday calculations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">What the calculators are intended to do</h2>
        <p>
          Each calculator is meant to help with planning and comparison. For example, the salary calculator is designed
          to help someone understand how tax, National Insurance, pension and loan deductions affect net pay, while the
          rent and cost-of-living tools are designed to help with monthly affordability rather than formal underwriting.
        </p>
        <p>
          The goal is to give users a realistic starting point quickly, supported by visual breakdowns and clear
          next-step links to related tools and explainers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">What the calculators are not intended to do</h2>
        <p>
          UK Calculator Hub does not provide regulated financial advice, tax advice, legal advice or mortgage advice.
          The tools do not know every employer-specific payroll rule, lender-specific affordability model, or every
          local variation in council tax, rent or living costs.
        </p>
        <p>
          That is why every calculator includes a clear disclaimer and, where useful, a “Why results may differ”
          section. A real payslip, lender decision or professional recommendation may differ from a planning estimate.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">How to challenge or improve the content</h2>
        <p>
          If you spot a calculation issue, unclear wording or a UK rule that looks out of date, you are encouraged to
          get in touch. Reader feedback is one of the quickest ways to improve the site, especially when people can
          share the scenario that produced confusion.
        </p>
        <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Useful next pages</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link
              href="/about"
              className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
            >
              About UK Calculator Hub
            </Link>
            <Link
              href="/contact"
              className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
            >
              Contact and feedback
            </Link>
            <Link
              href="/disclaimer"
              className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
            >
              Full disclaimer
            </Link>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
}
