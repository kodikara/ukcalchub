import type { Metadata } from "next";
import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";

export const metadata: Metadata = {
  title: "£45,000 Salary After Tax UK | Take-Home Pay Guide",
  description:
    "See a simple UK take-home pay example for a £45,000 salary, including estimated tax, National Insurance and net pay.",
  alternates: {
    canonical: "/salary-after-tax-45000-uk",
  },
};

export default function SalaryAfterTax45000Page() {
  return <SalaryAfterTaxLanding annualSalary={45000} />;
}
