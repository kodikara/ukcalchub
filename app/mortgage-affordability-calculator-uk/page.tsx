import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MortgageAffordabilityCalculator } from "@/components/MortgageAffordabilityCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator UK | How Much Mortgage Can I Borrow?",
  description:
    "Estimate borrowing range, monthly payment and deposit impact with a simple UK mortgage affordability calculator.",
  alternates: {
    canonical: "/mortgage-affordability-calculator-uk",
  },
};

export default function MortgageAffordabilityCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mortgage Affordability Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/mortgage-affordability-calculator-uk`,
          description:
            "A UK mortgage affordability calculator for rough borrowing, payment and deposit planning.",
        }}
      />
      <MortgageAffordabilityCalculator />
    </>
  );
}
