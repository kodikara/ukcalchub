import type { Metadata } from "next";
import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "£45,000 Salary After Tax UK (2026/27) – Take Home Pay & Example",
  description:
    "See how a £45,000 salary compares with and without pension contributions. Real UK example with monthly take-home, tax, and living costs.",
  alternates: {
    canonical: "/salary-after-tax-45000-uk",
  },
  openGraph: {
    title: "£45,000 Salary After Tax UK (2026/27) – Take Home Pay & Example",
    description:
      "See how a £45,000 salary compares with and without pension contributions. Real UK example with monthly take-home, tax, and living costs.",
    url: `${siteConfig.url}/salary-after-tax-45000-uk`,
    type: "article",
  },
};

export default function SalaryAfterTax45000Page() {
  return <SalaryAfterTaxLanding annualSalary={45000} />;
}
