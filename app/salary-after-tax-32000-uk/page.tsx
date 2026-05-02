import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(32000);

export default function SalaryAfterTax32000Page() {
  return <SalaryAfterTaxLanding annualSalary={32000} />;
}
