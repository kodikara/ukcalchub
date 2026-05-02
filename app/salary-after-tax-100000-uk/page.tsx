import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(100000);

export default function SalaryAfterTax100000Page() {
  return <SalaryAfterTaxLanding annualSalary={100000} />;
}
