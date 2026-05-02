import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(55000);

export default function SalaryAfterTax55000Page() {
  return <SalaryAfterTaxLanding annualSalary={55000} />;
}
