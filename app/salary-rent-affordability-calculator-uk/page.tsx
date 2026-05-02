import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SalaryRentAffordabilityCalculator } from "@/components/SalaryRentAffordabilityCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salary Rent Affordability Calculator UK | Can I Afford This Rent?",
  description:
    "Estimate monthly take-home pay from your salary, then compare it with rent and everyday costs in one UK affordability calculator.",
  alternates: {
    canonical: "/salary-rent-affordability-calculator-uk",
  },
};

export default function SalaryRentAffordabilityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Salary Rent Affordability Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/salary-rent-affordability-calculator-uk`,
          description:
            "A UK calculator that combines salary deductions and rent affordability in one monthly planning view.",
        }}
      />
      <SalaryRentAffordabilityCalculator />
    </>
  );
}
