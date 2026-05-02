import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(60000);

export default function SalaryAfterTax60000Page() {
  return <SalaryAfterTaxLanding annualSalary={60000} />;
}
