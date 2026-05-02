import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UK Salary Calculator | Salary After Tax & Take-Home Pay",
  description:
    "Use UKCalcHub’s simple UK salary calculator to estimate take-home pay after tax, National Insurance, pension and student loan deductions.",
  alternates: {
    canonical: "/salary-calculator-uk",
  },
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "UK Salary Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/salary-calculator-uk`,
          description:
            "A UK salary calculator for estimating take-home pay after tax, National Insurance, pension and student loan deductions.",
        }}
      />
      <SalaryCalculator />
    </>
  );
}
