import type { Metadata } from "next";
import { HourlyWageCalculator } from "@/components/HourlyWageCalculator";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hourly Wage Calculator UK | Convert Salary to Hourly Rate",
  description:
    "Convert annual salary into hourly, daily, weekly and monthly figures with a clean UK hourly wage calculator.",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why is hourly rate useful if I am salaried?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It helps compare offers, understand overtime value, and see how a salary translates into day-to-day earning power.",
              },
            },
            {
              "@type": "Question",
              name: "Does this include tax?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. This tool converts gross salary into hourly, daily, weekly and monthly equivalents before deductions.",
              },
            },
          ],
          url: `${siteConfig.url}/hourly-wage-calculator-uk`,
        }}
      />
      <HourlyWageCalculator />
    </>
  );
}
