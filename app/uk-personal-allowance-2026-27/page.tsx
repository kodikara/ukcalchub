import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { personalAllowanceGuide } from "@/lib/guideReadingContent";

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
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Personal allowance 2026/27" },
      ]}
      showAuthor
    >
      <GuideReading {...personalAllowanceGuide} />

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
