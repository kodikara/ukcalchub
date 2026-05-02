import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RentAffordabilityCalculator } from "@/components/RentAffordabilityCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator UK | How Much Rent Can I Afford?",
  description:
    "Use UKCalcHub’s rent affordability calculator to compare monthly take-home income with rent, council tax, bills, food, transport, childcare and other expenses.",
  alternates: {
    canonical: "/rent-affordability-calculator-uk",
  },
};

export default function RentAffordabilityCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Rent Affordability Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/rent-affordability-calculator-uk`,
          description:
            "A UK rent affordability calculator for comparing monthly take-home pay with rent, council tax and everyday living costs.",
        }}
      />
      <RentAffordabilityCalculator />
    </>
  );
}
