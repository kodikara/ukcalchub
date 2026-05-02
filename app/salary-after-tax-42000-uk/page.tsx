import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(42000);

export default function SalaryAfterTax42000Page() {
  return <SalaryAfterTaxLanding annualSalary={42000} />;
}
