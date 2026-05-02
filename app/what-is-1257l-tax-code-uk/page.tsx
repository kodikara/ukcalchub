import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { GuideReading } from "@/components/GuideReading";
import { taxCodeGuide } from "@/lib/guideReadingContent";

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
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "1257L tax code" },
      ]}
      showAuthor
    >
      <GuideReading {...taxCodeGuide} />

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
