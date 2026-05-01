import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RentAffordabilityCalculator } from "@/components/RentAffordabilityCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator UK | Can I Afford This Rent?",
  description:
    "Check how much rent may be affordable based on take-home income and monthly UK living expenses.",
  alternates: {
    canonical: "/rent-affordability-uk",
  },
};

export default function RentAffordabilityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a comfortable rent percentage?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A common rule of thumb is to keep rent around 30% of take-home income, but what feels comfortable depends on your bills, transport, childcare and savings goals.",
              },
            },
            {
              "@type": "Question",
              name: "Should I include council tax and utilities in bills?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. For a more realistic picture, include all recurring housing-related costs you expect to pay each month.",
              },
            },
          ],
          url: `${siteConfig.url}/rent-affordability-uk`,
        }}
      />
      <RentAffordabilityCalculator />
    </>
  );
}
