import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(30000);

export default function SalaryAfterTax30000Page() {
  return <SalaryAfterTaxLanding annualSalary={30000} />;
}
