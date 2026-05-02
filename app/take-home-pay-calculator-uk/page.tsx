import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { TakeHomePayCalculator } from "@/components/TakeHomePayCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator UK | Monthly Net Pay Estimator",
  description:
    "Estimate monthly and weekly UK take-home pay after tax, National Insurance, pension and student loan deductions.",
  alternates: {
    canonical: "/take-home-pay-calculator-uk",
  },
};

export default function TakeHomePayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Take-Home Pay Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/take-home-pay-calculator-uk`,
          description:
            "A UK-focused take-home pay calculator that estimates monthly and weekly net pay after common payroll deductions.",
        }}
      />
      <TakeHomePayCalculator />
    </>
  );
}
