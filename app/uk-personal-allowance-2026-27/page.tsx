import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "UK Personal Allowance 2026/27 | Income Tax Threshold Explained | UK Calculator Hub",
  description:
    "Understand the UK personal allowance for 2026/27, how the £12,570 threshold works, and why it starts to taper above £100,000.",
  alternates: {
    canonical: "/uk-personal-allowance-2026-27",
  },
};

export default function PersonalAllowancePage() {
  return (
    <ContentPageShell
      eyebrow="Allowance guide"
      title="UK personal allowance 2026/27"
      intro="The personal allowance is one of the most important building blocks of take-home pay, because it decides how much salary can usually be received before income tax starts."
    >
      <article className="space-y-7">
        <p>
          For the 2026/27 UK tax year, the standard personal allowance is £12,570. In simple terms, that means most
          people can earn up to that amount before income tax is charged. It does not remove National Insurance or
          other deductions, but it does shape how the income tax part of a salary breakdown starts. This is why almost
          every UK salary calculator uses the personal allowance right at the beginning of the calculation.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What the allowance does in practice</h2>
          <p>
            Once the personal allowance is applied, the remaining taxable income is split across the UK tax bands. For
            many employees, that means the next slice of taxable pay is charged at the 20% basic rate until higher-rate
            tax becomes relevant. The allowance is one reason your gross salary and taxable salary are not the same
            thing. It is also why a normal tax code such as 1257L maps closely to the £12,570 allowance through payroll.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What happens above £100,000?</h2>
          <p>
            Once adjusted net income goes above £100,000, the personal allowance starts to taper away at a rate of £1
            for every £2 earned over that threshold. That creates the well-known effective 60% marginal tax band
            between £100,000 and £125,140, because you are both paying higher-rate tax and losing allowance at the same
            time. This is why the £100,000 line matters so much in salary planning, pension discussions and salary
            sacrifice conversations.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why calculators talk about adjusted income</h2>
          <p>
            Public calculators sometimes ask about pension contributions or salary sacrifice because they can affect the
            income figure used for allowance tapering. Reducing adjusted income can make a visible difference to take-home
            pay and long-term tax efficiency, especially around the £100,000 threshold. That does not make the
            calculator a substitute for advice, but it does explain why these settings matter.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why the personal allowance matters for net pay</h2>
          <p>
            The personal allowance is one of the biggest reasons a headline salary does not convert directly into a flat
            percentage of tax. Smaller salaries may stay entirely inside the allowance and basic rate range, while
            larger salaries move across more bands or lose the allowance entirely. That is why understanding the
            allowance helps you read payslips more confidently and compare salaries more realistically.
          </p>
        </div>

        <section className="grid gap-3 md:grid-cols-2">
          <Link
            href="/salary-calculator-uk"
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
          >
            Open the Salary Calculator
          </Link>
          <Link
            href="/take-home-pay-calculator-uk"
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
          >
            Open the Take-Home Pay Calculator
          </Link>
        </section>
      </article>
    </ContentPageShell>
  );
}
