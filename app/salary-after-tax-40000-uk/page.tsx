import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(40000);

export default function SalaryAfterTax40000Page() {
  return <SalaryAfterTaxLanding annualSalary={40000} />;
}
