import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PensionContributionCalculator } from "@/components/PensionContributionCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pension Contribution Calculator UK | Pension vs Take-Home Pay",
  description:
    "See how employee and employer pension contributions can affect take-home pay and total pension value with a simple UK calculator.",
  alternates: {
    canonical: "/pension-contribution-calculator-uk",
  },
};

export default function PensionContributionCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Does this show tax relief effects?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The calculator compares take-home pay with and without the employee pension contribution using the same simplified salary engine, so you can see the estimated net cost.",
              },
            },
            {
              "@type": "Question",
              name: "Is this a retirement forecast?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. This tool focuses on contribution impact today, not long-term investment growth or retirement income outcomes.",
              },
            },
          ],
          url: `${siteConfig.url}/pension-contribution-calculator-uk`,
        }}
      />
      <PensionContributionCalculator />
    </>
  );
}
