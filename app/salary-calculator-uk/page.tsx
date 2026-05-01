import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UK Salary Calculator | Simple Take-Home Pay Calculator",
  description:
    "Estimate UK take-home pay after income tax, National Insurance, pension and student loan with a clean visual calculator.",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this UK salary calculator exact?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. It is designed as a useful estimate using simplified UK tax, National Insurance, pension and student loan logic for the tax year from 6 April 2026 to 5 April 2027 rather than a full payroll engine.",
              },
            },
            {
              "@type": "Question",
              name: "Why is my payslip different from the calculator?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Real payroll can differ because of tax code adjustments, salary sacrifice, payroll timing, overtime, benefits, pension method and other employer-specific settings.",
              },
            },
          ],
          url: `${siteConfig.url}/salary-calculator-uk`,
        }}
      />
      <SalaryCalculator />
    </>
  );
}
