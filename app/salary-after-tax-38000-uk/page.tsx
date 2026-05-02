import { SalaryAfterTaxLanding } from "@/components/SalaryAfterTaxLanding";
import { createSalaryAfterTaxMetadata } from "@/lib/salaryAfterTaxPages";

export const metadata = createSalaryAfterTaxMetadata(38000);

export default function SalaryAfterTax38000Page() {
  return <SalaryAfterTaxLanding annualSalary={38000} />;
}
