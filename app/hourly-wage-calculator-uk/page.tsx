import type { Metadata } from "next";
import { HourlyWageCalculator } from "@/components/HourlyWageCalculator";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hourly Wage Calculator UK | Annual Salary to Hourly Pay",
  description:
    "Convert annual salary into hourly, weekly, monthly and yearly pay with a simple UK hourly wage calculator.",
  alternates: {
    canonical: "/hourly-wage-calculator-uk",
  },
};

export default function HourlyWageCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Hourly Wage Calculator UK",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "GBP",
          },
          url: `${siteConfig.url}/hourly-wage-calculator-uk`,
          description:
            "A UK hourly wage calculator for converting salary into hourly, weekly, monthly and yearly gross pay equivalents.",
        }}
      />
      <HourlyWageCalculator />
    </>
  );
}
