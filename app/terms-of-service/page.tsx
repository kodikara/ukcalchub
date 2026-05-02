import type { Metadata } from "next";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the basic terms for using UK Calculator Hub and its estimate-based UK money calculators.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <ContentPageShell
      eyebrow="Terms"
      title="Terms of Service"
      intro="These terms explain the basic conditions for using UK Calculator Hub and its estimate-based tools."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms of service" },
      ]}
    >
      <p>
        UK Calculator Hub is provided as an informational website with practical UK-focused calculators and guides.
        By using the site, you accept that the calculators are intended for planning and comparison rather than as a
        substitute for regulated advice or official decision-making.
      </p>
      <p>
        The site aims to keep calculator logic current and useful, but no guarantee is given that every estimate will
        match a live employer payroll system, lender affordability model, council tax bill or personal financial
        situation. Users should verify important decisions with official sources or qualified professionals.
      </p>
      <p>
        You should not rely on the site as financial, tax, legal, mortgage or investment advice. Use of the site is at
        your own discretion, and the site owner is not responsible for losses arising from reliance on an estimate or
        planning example.
      </p>
      <p>
        The site may evolve over time, including updates to calculators, content, contact methods or privacy handling.
        Continued use of the site after updates means you accept the latest published version of these terms.
      </p>
    </ContentPageShell>
  );
}
