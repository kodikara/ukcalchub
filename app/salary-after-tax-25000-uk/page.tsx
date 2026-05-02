import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(25000);

export default function SalaryAfterTax25000Page() {
  return <SalaryAfterTaxLanding annualSalary={25000} />;
}
