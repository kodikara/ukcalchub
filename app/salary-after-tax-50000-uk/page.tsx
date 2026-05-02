import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(50000);

export default function SalaryAfterTax50000Page() {
  return <SalaryAfterTaxLanding annualSalary={50000} />;
}
