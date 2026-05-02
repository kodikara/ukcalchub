import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "What Is Salary Sacrifice? How It Affects Take-Home Pay | UK Calculator Hub",
  description:
    "Learn what salary sacrifice means in the UK, how it can reduce tax and National Insurance, and why it affects take-home pay differently.",
  alternates: {
    canonical: "/what-is-salary-sacrifice-uk",
  },
};

export default function SalarySacrificePage() {
  return (
    <ContentPageShell
      eyebrow="Payroll guide"
      title="What is salary sacrifice?"
      intro="Salary sacrifice can make payslips look different from simple salary examples because part of your pay is exchanged before some deductions are worked out."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Salary sacrifice" },
      ]}
      showAuthor
    >
      <article className="space-y-7">
        <p>
          Salary sacrifice is an arrangement where you agree to give up part of your gross salary in exchange for a
          non-cash benefit, most commonly extra employer pension contribution. Because the sacrificed amount is removed
          before income tax and employee National Insurance are calculated, your taxable pay can fall even though the
          overall value of your package stays similar. This is why salary sacrifice often changes take-home pay in a way
          that feels different from a normal pension deduction.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How it changes tax and National Insurance</h2>
          <p>
            If your gross salary is reduced through salary sacrifice, there is less pay left for payroll to tax. That
            can lower both income tax and employee National Insurance compared with a standard deduction taken after
            gross pay is set. The effect is one reason salary sacrifice is often discussed alongside workplace pensions.
            It does not create free money, but it can make the same pension contribution feel cheaper from a take-home
            pay point of view.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Salary sacrifice vs net pay pension</h2>
          <p>
            A net pay arrangement reduces taxable pay for income tax, but it does not reduce employee National
            Insurance in the same way that salary sacrifice can. That is why two workers with the same gross salary and
            the same pension percentage may still end up with slightly different monthly net pay. Public calculators
            often ask for the pension method for exactly this reason. If your employer uses salary sacrifice, the
            headline salary and the taxable salary are not always the same number.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">When people use it</h2>
          <p>
            Pension salary sacrifice is the best-known example, but some employers also use salary sacrifice for cycle
            schemes or other workplace benefits. It tends to matter more once salaries rise and people look more
            closely at how much of each extra pound is lost to deductions. It can also be relevant around tax
            thresholds, because lowering adjusted income may help with higher-rate tax exposure or allowance-related
            planning. Even so, it depends on employer policy rather than being something every worker can choose
            freely.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why it matters for calculators</h2>
          <p>
            If your salary calculator assumes a normal pension deduction but your employer uses salary sacrifice, the
            estimate can look off even when the salary amount itself is right. That does not mean the calculator is
            broken; it means the deduction method matters. Using the correct pension method usually brings the estimate
            much closer to a real payslip.
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
