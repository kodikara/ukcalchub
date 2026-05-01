import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CostOfLivingCalculator } from "@/components/CostOfLivingCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UK Cost of Living Calculator | Monthly Living Cost Estimator",
  description:
    "Estimate monthly and yearly UK living costs with a clean calculator for singles, couples and families.",
  alternates: {
    canonical: "/cost-of-living-uk",
  },
};

export default function CostOfLivingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why does location affect the estimate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Different parts of the UK typically come with different housing and lifestyle costs, so this version applies a simple multiplier to help show that effect.",
              },
            },
            {
              "@type": "Question",
              name: "Does this include family costs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You can choose a family household type and include childcare or other monthly costs to build a more realistic estimate.",
              },
            },
          ],
          url: `${siteConfig.url}/cost-of-living-uk`,
        }}
      />
      <CostOfLivingCalculator />
    </>
  );
}
