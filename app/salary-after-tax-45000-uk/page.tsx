import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(45000);

export default function SalaryAfterTax45000Page() {
  return <SalaryAfterTaxLanding annualSalary={45000} />;
}
