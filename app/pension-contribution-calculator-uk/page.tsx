import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PensionContributionCalculator } from "@/components/PensionContributionCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pension Contribution Calculator UK | Workplace Pension Estimate",
  description:
    "Estimate employee and employer workplace pension contributions and see how they may affect take-home pay.",
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
          "@type": "SoftwareApplication",
          name: "Pension Contribution Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/pension-contribution-calculator-uk`,
          description:
            "A UK workplace pension calculator for estimating employee contributions, employer contributions and the effect on take-home pay.",
        }}
      />
      <PensionContributionCalculator />
    </>
  );
}
