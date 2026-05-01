"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FAQ } from "@/components/FAQ";
import { CheckboxField, InputField, SelectField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculatePensionContribution } from "@/lib/calculations/pension";
import type { PensionMethod, StudentLoanPlan, TaxRegion } from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";

const faqs = [
  {
    question: "Does this show tax relief effects?",
    answer:
      "Yes. The calculator compares take-home pay with and without the employee pension contribution using the same simplified salary engine, so you can see the estimated net cost.",
  },
  {
    question: "Why can employer contribution make pension feel better value?",
    answer:
      "Because money from your employer boosts the amount going into your pension without all of it coming from your take-home pay.",
  },
  {
    question: "Is this a retirement forecast?",
    answer:
      "No. This tool focuses on contribution impact today, not long-term investment growth or retirement income outcomes.",
  },
];

export function PensionContributionCalculator() {
  const [annualSalary, setAnnualSalary] = useState(45_000);
  const [employeePercent, setEmployeePercent] = useState(5);
  const [employerPercent, setEmployerPercent] = useState(3);
  const [pensionMethod, setPensionMethod] = useState<PensionMethod>("netPay");
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>("plan2");
  const [hasPostgraduateLoan, setHasPostgraduateLoan] = useState(false);
  const [taxRegion, setTaxRegion] = useState<TaxRegion>("rUK");
  const [taxCode, setTaxCode] = useState("1257L");

  const result = calculatePensionContribution({
    annualSalary,
    employeePercent,
    employerPercent,
    pensionMethod,
    studentLoanPlan,
    hasPostgraduateLoan,
    taxRegion,
    taxCode,
  });

  const chartData = [
    { label: "Employee", value: result.employeeAnnual, color: "#f59e0b" },
    { label: "Employer", value: result.employerAnnual, color: "#14b8a6" },
    { label: "Tax saved", value: result.taxSavedAnnual, color: "#3b82f6" },
    { label: "NI saved", value: result.niSavedAnnual, color: "#0ea5e9" },
    { label: "Net cost", value: result.takeHomeImpactAnnual, color: "#fb7185" },
  ];

  const comparisonData = [
    { label: "Take-home no pension", value: result.takeHomeWithoutPensionAnnual, color: "#3b82f6" },
    { label: "Take-home with pension", value: result.takeHomeWithPensionAnnual, color: "#14b8a6" },
    { label: "Pension added", value: result.totalAnnual, color: "#0f766e" },
  ];

  return (
    <CalculatorShell
      title="Pension Contribution Calculator UK"
      intro="See how employee and employer pension contributions can affect your take-home pay and how much may be going into your pension overall."
      form={
        <div className="space-y-5">
          <InputField
            label="Annual salary"
            hint="Gross yearly pay"
            prefix="£"
            type="number"
            min="0"
            inputMode="decimal"
            value={annualSalary}
            onChange={(event) => setAnnualSalary(Number(event.target.value))}
          />
          <InputField
            label="Employee contribution"
            hint="Percentage of salary"
            type="number"
            min="0"
            max="100"
            inputMode="decimal"
            value={employeePercent}
            onChange={(event) => setEmployeePercent(Number(event.target.value))}
          />
          <InputField
            label="Employer contribution"
            hint="Percentage of salary"
            type="number"
            min="0"
            max="100"
            inputMode="decimal"
            value={employerPercent}
            onChange={(event) => setEmployerPercent(Number(event.target.value))}
          />
          <SelectField
            label="Pension method"
            hint="Affects tax and NI treatment"
            value={pensionMethod}
            onChange={(event) => setPensionMethod(event.target.value as PensionMethod)}
          >
            <option value="netPay">Net pay arrangement</option>
            <option value="salarySacrifice">Salary sacrifice</option>
          </SelectField>
          <SelectField
            label="Student loan plan"
            hint="Optional repayment effect"
            value={studentLoanPlan}
            onChange={(event) => setStudentLoanPlan(event.target.value as StudentLoanPlan)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
          </SelectField>
          <CheckboxField
            label="Also repay a postgraduate loan"
            hint="Useful if you want the pension impact to reflect both loan deductions."
            checked={hasPostgraduateLoan}
            onChange={setHasPostgraduateLoan}
          />
          <SelectField
            label="Tax region"
            value={taxRegion}
            onChange={(event) => setTaxRegion(event.target.value as TaxRegion)}
          >
            <option value="rUK">England, Wales and Northern Ireland</option>
            <option value="scotland">Scotland</option>
          </SelectField>
          <InputField
            label="Tax code"
            hint="Default 1257L"
            value={taxCode}
            onChange={(event) => setTaxCode(event.target.value.toUpperCase())}
          />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            This tool uses the same simplified current-year salary logic as the salary calculator, then compares pay with and without pension contributions.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated pension value"
            title="Total going into your pension each month"
            value={formatCurrency(result.totalMonthly, true)}
            detail={`Estimated monthly take-home impact: ${formatCurrency(result.takeHomeImpactMonthly, true)}. Employer contribution can materially increase the total value added.`}
            tone="amber"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Employee yearly contribution" value={formatCurrency(result.employeeAnnual, true)} />
            <StatCard label="Employer yearly contribution" value={formatCurrency(result.employerAnnual, true)} />
            <StatCard label="Total yearly contribution" value={formatCurrency(result.totalAnnual, true)} />
            <StatCard label="Yearly take-home impact" value={formatCurrency(result.takeHomeImpactAnnual, true)} />
            <StatCard label="Estimated tax saved" value={formatCurrency(result.taxSavedAnnual, true)} />
            <StatCard label="Estimated NI saved" value={formatCurrency(result.niSavedAnnual, true)} />
            <StatCard label="Estimated loan saved" value={formatCurrency(result.studentLoanSavedAnnual, true)} />
            <StatCard label="Boost on net cost" value={`${result.effectiveBoostRate.toFixed(2)}x`} />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard
              title="Contribution and savings mix"
              description="See how employee input, employer input, and estimated deduction savings compare."
            >
              <BarChart data={chartData} />
            </SectionCard>
            <SectionCard
              title="Take-home vs pension added"
              description="Compare take-home pay with and without pension contributions alongside the amount added to pension."
            >
              <BarChart data={comparisonData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How to read the result</h2>
          <p className="text-sm leading-6 text-slate-400">
            Pension contributions often cost less in take-home pay than the headline amount suggests because tax, National Insurance, and sometimes student loan deductions can fall too.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Employee contribution is what comes from your salary.</li>
            <li>Employer contribution is additional money going into the pension from your employer.</li>
            <li>Take-home impact is the estimated reduction in your net pay after accounting for simplified deduction changes.</li>
            <li>Salary sacrifice can increase the savings effect because NI and some loan deductions may also reduce.</li>
          </ul>
        </div>
      }
      faq={
        <>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <FAQ items={faqs} />
        </>
      }
      disclaimer="This pension contribution calculator provides simplified estimates only. Real pension treatment depends on scheme rules, employer setup, tax relief method, payroll configuration and investment performance."
    />
  );
}
