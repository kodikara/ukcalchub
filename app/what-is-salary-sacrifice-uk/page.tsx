import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { salarySacrificeGuide } from "@/lib/guideReadingContent";

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
      <GuideReading {...salarySacrificeGuide} />

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
    </ContentPageShell>
  );
}
