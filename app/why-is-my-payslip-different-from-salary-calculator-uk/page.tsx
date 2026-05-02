import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { payslipDifferenceGuide } from "@/lib/guideReadingContent";

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
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Why payslips differ" },
      ]}
      showAuthor
    >
      <GuideReading {...payslipDifferenceGuide} />

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
