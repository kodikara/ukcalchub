import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { nationalInsuranceGuide } from "@/lib/guideReadingContent";

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
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "National Insurance" },
      ]}
      showAuthor
    >
      <GuideReading {...nationalInsuranceGuide} />

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
    </ContentPageShell>
  );
}
