import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(80000);

export default function SalaryAfterTax80000Page() {
  return <SalaryAfterTaxLanding annualSalary={80000} />;
}
