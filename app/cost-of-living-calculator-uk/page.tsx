import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CostOfLivingCalculator } from "@/components/CostOfLivingCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cost of Living Calculator UK | Monthly Expenses Estimator",
  description:
    "Estimate monthly and yearly UK living costs with a simple calculator for household type, location and everyday expenses.",
  alternates: {
    canonical: "/cost-of-living-calculator-uk",
  },
};

export default function CostOfLivingCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Cost of Living Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/cost-of-living-calculator-uk`,
          description:
            "A UK cost of living calculator for estimating monthly and yearly household costs across common scenarios.",
        }}
      />
      <CostOfLivingCalculator />
    </>
  );
}
