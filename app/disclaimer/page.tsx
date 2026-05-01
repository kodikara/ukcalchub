import type { Metadata } from "next";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Read the disclaimer for UK Calculator Hub.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <ContentPageShell
      eyebrow="Disclaimer"
      title="Disclaimer"
      intro="UK Calculator Hub provides estimate-based tools intended to help with everyday planning, not professional advice."
    >
      <p>
        These calculators provide estimates only and should not be treated as financial, tax, legal, mortgage, payroll,
        or professional advice.
      </p>
      <p>
        Although care is taken to make the calculators useful and reasonable, the results may differ from lender
        decisions, payslips, tax calculations, or real household costs.
      </p>
      <p>
        You should verify important decisions with official sources or a qualified professional before acting on any
        result produced by the site.
      </p>
    </ContentPageShell>
  );
}
