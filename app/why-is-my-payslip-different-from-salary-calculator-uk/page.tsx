import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "Why Is My Payslip Different From a Salary Calculator UK?",
  description:
    "Learn why a real UK payslip can differ from a salary calculator, including tax codes, pensions, salary sacrifice, overtime and emergency tax.",
  alternates: {
    canonical: "/why-is-my-payslip-different-from-salary-calculator-uk",
  },
};

export default function PayslipDifferencePage() {
  return (
    <ContentPageShell
      eyebrow="Payslip guide"
      title="Why is my payslip different from a salary calculator?"
      intro="A salary calculator is useful for planning, but a real UK payslip can still look different for several practical payroll reasons."
    >
      <p>
        The biggest reason is that most public calculators use a simplified model, while your real payslip is produced
        by payroll software using your exact tax code, deductions, pay history and employer setup.
      </p>

      <div className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Common reasons your real payslip may differ</h2>
        <ul className="space-y-4 text-slate-200">
          <li>
            <strong>Tax code changes:</strong> a different tax code can raise or lower the allowance your employer uses.
          </li>
          <li>
            <strong>Pension method:</strong> net pay, relief at source and salary sacrifice can all affect deductions differently.
          </li>
          <li>
            <strong>Salary sacrifice:</strong> this changes taxable pay before some deductions are calculated.
          </li>
          <li>
            <strong>Bonus or overtime:</strong> extra pay can shift a single pay period into a different deduction pattern.
          </li>
          <li>
            <strong>Payroll timing:</strong> monthly payroll can treat cumulative tax differently depending on where you are in the tax year.
          </li>
          <li>
            <strong>Student loan plan:</strong> repayment thresholds and rates depend on the plan attached to you.
          </li>
          <li>
            <strong>Benefits in kind:</strong> some perks can affect taxable pay even if they are not cash salary.
          </li>
          <li>
            <strong>Scottish tax differences:</strong> Scottish income tax bands differ from the rest of the UK.
          </li>
          <li>
            <strong>Emergency tax:</strong> new jobs or missing payroll information can produce temporary emergency tax results.
          </li>
          <li>
            <strong>New job or mid-year employment:</strong> starting or changing jobs part way through the tax year can make cumulative deductions look unusual at first.
          </li>
        </ul>
      </div>

      <p>
        Small differences of a few pence are often just payroll rounding. Bigger differences are more likely to come
        from tax codes, pension treatment, bonuses, salary sacrifice or mid-year employment changes.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
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
        <Link
          href="/pension-contribution-calculator-uk"
          className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
        >
          Open the Pension Calculator
        </Link>
      </div>
    </ContentPageShell>
  );
}
