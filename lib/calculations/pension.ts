import {
  calculateSalary,
  type PensionMethod,
  type StudentLoanPlan,
  type TaxRegion,
} from "@/lib/calculations/salary";

export type PensionContributionInputs = {
  annualSalary: number;
  employeePercent: number;
  employerPercent: number;
  pensionMethod: PensionMethod;
  studentLoanPlan: StudentLoanPlan;
  hasPostgraduateLoan: boolean;
  taxRegion: TaxRegion;
  taxCode: string;
};

export type PensionContributionResult = {
  grossAnnual: number;
  employeeAnnual: number;
  employerAnnual: number;
  totalAnnual: number;
  totalMonthly: number;
  takeHomeWithPensionAnnual: number;
  takeHomeWithoutPensionAnnual: number;
  takeHomeImpactAnnual: number;
  takeHomeImpactMonthly: number;
  taxSavedAnnual: number;
  niSavedAnnual: number;
  studentLoanSavedAnnual: number;
  effectiveBoostRate: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculatePensionContribution(inputs: PensionContributionInputs): PensionContributionResult {
  const grossAnnual = Math.max(0, inputs.annualSalary);
  const employeePercent = Math.max(0, inputs.employeePercent);
  const employerPercent = Math.max(0, inputs.employerPercent);
  const employeeAnnual = roundMoney(grossAnnual * employeePercent / 100);
  const employerAnnual = roundMoney(grossAnnual * employerPercent / 100);
  const totalAnnual = roundMoney(employeeAnnual + employerAnnual);

  const withPension = calculateSalary({
    annualSalary: grossAnnual,
    pensionPercent: employeePercent,
    pensionMethod: inputs.pensionMethod,
    studentLoanPlan: inputs.studentLoanPlan,
    hasPostgraduateLoan: inputs.hasPostgraduateLoan,
    taxRegion: inputs.taxRegion,
    taxCode: inputs.taxCode,
  });

  const withoutPension = calculateSalary({
    annualSalary: grossAnnual,
    pensionPercent: 0,
    pensionMethod: inputs.pensionMethod,
    studentLoanPlan: inputs.studentLoanPlan,
    hasPostgraduateLoan: inputs.hasPostgraduateLoan,
    taxRegion: inputs.taxRegion,
    taxCode: inputs.taxCode,
  });

  const takeHomeImpactAnnual = roundMoney(withoutPension.takeHomeAnnual - withPension.takeHomeAnnual);
  const taxSavedAnnual = roundMoney(withoutPension.incomeTaxAnnual - withPension.incomeTaxAnnual);
  const niSavedAnnual = roundMoney(withoutPension.nationalInsuranceAnnual - withPension.nationalInsuranceAnnual);
  const studentLoanSavedAnnual = roundMoney(
    withoutPension.studentLoanAnnual +
      withoutPension.postgraduateLoanAnnual -
      withPension.studentLoanAnnual -
      withPension.postgraduateLoanAnnual,
  );
  const effectiveBoostRate =
    takeHomeImpactAnnual > 0 ? (totalAnnual - takeHomeImpactAnnual) / takeHomeImpactAnnual : 0;

  return {
    grossAnnual,
    employeeAnnual,
    employerAnnual,
    totalAnnual,
    totalMonthly: roundMoney(totalAnnual / 12),
    takeHomeWithPensionAnnual: withPension.takeHomeAnnual,
    takeHomeWithoutPensionAnnual: withoutPension.takeHomeAnnual,
    takeHomeImpactAnnual,
    takeHomeImpactMonthly: roundMoney(takeHomeImpactAnnual / 12),
    taxSavedAnnual,
    niSavedAnnual,
    studentLoanSavedAnnual,
    effectiveBoostRate: roundMoney(effectiveBoostRate),
  };
}
