import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(28000);

export default function SalaryAfterTax28000Page() {
  return <SalaryAfterTaxLanding annualSalary={28000} />;
}
