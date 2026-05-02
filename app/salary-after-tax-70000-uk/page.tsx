import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(70000);

export default function SalaryAfterTax70000Page() {
  return <SalaryAfterTaxLanding annualSalary={70000} />;
}
