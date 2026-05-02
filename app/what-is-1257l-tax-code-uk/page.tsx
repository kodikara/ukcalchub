import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "What Is the 1257L Tax Code? | UK Calculator Hub",
  description:
    "Learn what the 1257L tax code means, who usually gets it, why your code might differ, and how it affects take-home pay in the UK.",
  alternates: {
    canonical: "/what-is-1257l-tax-code-uk",
  },
};

export default function TaxCode1257LPage() {
  return (
    <ContentPageShell
      eyebrow="Tax code guide"
      title="What is the 1257L tax code?"
      intro="1257L is the most common UK tax code for employees with one main job and no major tax adjustments, but it is still worth understanding what it really means."
    >
      <article className="space-y-7">
        <p>
          In simple terms, the 1257L tax code usually means your employer is giving you the standard personal
          allowance through payroll. For the 2026/27 tax year, that allowance is £12,570, so the code broadly tells
          payroll to leave that slice of income untaxed before income tax is applied. It is the code many employees see
          when they have one main source of pay and no special adjustments.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What the numbers and letter mean</h2>
          <p>
            The number part, 1257, reflects the £12,570 allowance with the final zero removed. The letter L is used
            for most people who qualify for the standard allowance without unusual restrictions. That does not mean your
            tax is always perfect, only that payroll is starting from the normal baseline. If you have other benefits,
            a second job or tax due from previous years, your code can change.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Who usually gets 1257L?</h2>
          <p>
            A lot of full-time employees with one main job will see 1257L, especially if they do not have company
            benefits or other taxable income that needs to be reflected in payroll. It is common for straightforward
            employment situations, but it is not universal. People with a company car, large taxable benefits, a second
            income source or a recent job change may see a different code even if their salary is otherwise ordinary.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your code might be different</h2>
          <p>
            Your tax code can change because of benefits in kind, underpaid tax carried forward, a second job, pension
            income or emergency tax treatment when payroll records are incomplete. Codes such as BR, 0T or K codes
            usually mean your allowance is being handled differently or reduced. That is why two people on similar
            salaries can still see different payslips. A public salary calculator can estimate pay well, but your real
            tax code remains one of the biggest reasons an employer payslip may not match a simple example exactly.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How it affects take-home pay</h2>
          <p>
            The tax code affects how much of your salary is taxed and therefore changes your net pay. If you move from a
            normal 1257L code to a code with a smaller allowance, your monthly take-home pay can drop even if your
            gross salary stays the same. If you think your code is wrong, the best approach is to compare your payslip
            with your tax notice and then use a salary calculator as a planning tool rather than the final authority.
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
