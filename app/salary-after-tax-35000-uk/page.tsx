import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(35000);

export default function SalaryAfterTax35000Page() {
  return <SalaryAfterTaxLanding annualSalary={35000} />;
}
