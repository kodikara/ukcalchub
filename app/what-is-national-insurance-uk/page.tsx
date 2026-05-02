import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "What Is National Insurance? UK Rates and Thresholds Explained | UK Calculator Hub",
  description:
    "Understand what National Insurance is, what it funds, and how employee Class 1 NI affects take-home pay and salary calculations.",
  alternates: {
    canonical: "/what-is-national-insurance-uk",
  },
};

export default function NationalInsurancePage() {
  return (
    <ContentPageShell
      eyebrow="NI guide"
      title="What is National Insurance?"
      intro="National Insurance is one of the main deductions on a UK payslip, but many people understand income tax better than they understand NI."
    >
      <article className="space-y-7">
        <p>
          National Insurance, often shortened to NI, is a payroll deduction linked to the UK social security system.
          For employees, the main version is usually Class 1 National Insurance. It helps fund areas such as state
          benefits and the State Pension, and it is one of the key reasons gross pay and take-home pay are not the same
          thing. Even when income tax looks simple, National Insurance can still create a noticeable gap in monthly net
          pay.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How employee NI works</h2>
          <p>
            NI is usually charged only once earnings rise above the relevant threshold, rather than from the first
            pound of pay. That means a lower salary may show little or no NI, while a larger salary sees a regular
            deduction each pay period. Although income tax and NI are often grouped together in everyday conversation,
            they are separate calculations, which is why a salary calculator normally shows them as separate lines in
            the breakdown.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why NI matters for take-home pay</h2>
          <p>
            Once earnings are comfortably above the NI threshold, the deduction becomes a predictable part of the
            monthly payslip. This matters for job comparisons because two salaries with the same income tax band can
            still feel different after NI and pension deductions are included. It also matters for salary sacrifice,
            because reducing taxable salary through sacrifice can lower employee NI as well as income tax in some cases.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Is NI the same as income tax?</h2>
          <p>
            No. They are separate deductions with different thresholds and rules. People often think in terms of one
            combined tax burden because both reduce take-home pay, but a proper salary estimate needs to calculate them
            individually. That is also why payslip comparisons can be confusing when one deduction changes but the other
            does not change by the same amount.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why public calculators show NI separately</h2>
          <p>
            Breaking NI out from income tax makes it easier to understand what is really reducing your pay and which
            parts may change if your salary or pension method changes. It also helps when comparing employment with
            self-employment, since different National Insurance categories can apply. For most employees, seeing NI as
            its own line simply makes the payslip easier to read.
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
