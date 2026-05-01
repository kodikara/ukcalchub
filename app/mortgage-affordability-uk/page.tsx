import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MortgageAffordabilityCalculator } from "@/components/MortgageAffordabilityCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator UK | How Much Could I Borrow?",
  description:
    "Estimate mortgage affordability, maximum loan size and possible property budget with a simple UK-focused mortgage calculator.",
  alternates: {
    canonical: "/mortgage-affordability-uk",
  },
};

export default function MortgageAffordabilityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this the same as a lender decision?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Real lenders also assess credit history, deposit size, dependants, committed spending, stress tests and their own internal rules.",
              },
            },
            {
              "@type": "Question",
              name: "Why use both an income multiple and a payment check?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "That gives a more balanced estimate. Some households look fine on income multiple alone but still feel stretched once debts and interest rates are included.",
              },
            },
          ],
          url: `${siteConfig.url}/mortgage-affordability-uk`,
        }}
      />
      <MortgageAffordabilityCalculator />
    </>
  );
}
