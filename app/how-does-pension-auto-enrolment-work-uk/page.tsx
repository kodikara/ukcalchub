import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { pensionAutoEnrolmentGuide } from "@/lib/guideReadingContent";

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
      <GuideReading {...pensionAutoEnrolmentGuide} />

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
