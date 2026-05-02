import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "How Does Pension Auto-Enrolment Work in the UK? | UK Calculator Hub",
  description:
    "Learn how UK pension auto-enrolment works, including qualifying earnings, minimum contributions, opt-out rules and workplace pension basics.",
  alternates: {
    canonical: "/how-does-pension-auto-enrolment-work-uk",
  },
};

export default function PensionAutoEnrolmentPage() {
  return (
    <ContentPageShell
      eyebrow="Pension guide"
      title="How does pension auto-enrolment work in the UK?"
      intro="Auto-enrolment is the system that brings many UK employees into a workplace pension automatically, but the way contributions are shown on payslips can still be confusing."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Pension auto-enrolment" },
      ]}
      showAuthor
    >
      <article className="space-y-7">
        <p>
          Auto-enrolment means eligible workers are placed into a workplace pension by their employer without having to
          sign up manually. You can usually opt out, but the default is that contributions start unless you choose
          otherwise. This matters for salary calculators because pension deductions are one of the most common reasons a
          simple gross salary does not match what actually lands in your bank account.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Who is usually auto-enrolled?</h2>
          <p>
            In broad terms, eligible employees who meet the age and earnings rules are automatically placed into a
            workplace pension scheme. Exact eligibility details can vary by situation, but for many people the main
            practical effect is simply that pension contributions begin through payroll. If you are newly enrolled, your
            take-home pay can drop compared with a pre-enrolment salary estimate even though the overall value of your
            package may be improving.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What are qualifying earnings and minimum contributions?</h2>
          <p>
            Minimum contribution rules are often based on qualifying earnings rather than the whole salary. That is why
            workplace pension percentages can sometimes look smaller or more complicated than a simple headline figure.
            Employer and employee contributions may both apply, and the exact method can depend on the scheme rules.
            This is one reason pension calculators work best as planning tools rather than exact replicas of every
            workplace pension setup.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Can you opt out?</h2>
          <p>
            Yes, many workers can opt out after being enrolled, but that means losing the employer contribution unless
            the scheme has different rules. From a long-term planning perspective, employer pension contributions are a
            valuable part of the package, which is why public calculators often show both the take-home impact and the
            total pension value added. The short-term monthly cash benefit of opting out can look tempting, but the
            long-term trade-off is usually much larger.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why pension method still matters</h2>
          <p>
            Even when auto-enrolment applies, your payslip can still look different depending on whether the scheme uses
            net pay, relief at source or salary sacrifice. That is why pension deduction estimates can differ from one
            employer to another. If you want a planning view, it helps to use the pension method that matches your
            scheme rather than assuming every workplace pension is treated the same way.
          </p>
        </div>

        <section className="grid gap-3 md:grid-cols-2">
          <Link
            href="/pension-contribution-calculator-uk"
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
          >
            Open the Pension Calculator
          </Link>
          <Link
            href="/salary-calculator-uk"
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
          >
            Open the Salary Calculator
          </Link>
        </section>
      </article>
    </ContentPageShell>
  );
}
