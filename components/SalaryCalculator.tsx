"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { CheckboxField, InputField, SelectField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { CalculatorShell } from "@/components/CalculatorShell";
import {
  calculateSalary,
  type PensionMethod,
  type ResultPeriod,
  type StudentLoanPlan,
  type TaxRegion,
  valueForPeriod,
} from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";

const faqs = [
  {
    question: "Is this UK salary calculator exact?",
    answer:
      "No. It is designed as a useful estimate using simplified UK tax, National Insurance, pension and student loan logic rather than a full payroll engine.",
  },
  {
    question: "Why is my payslip different from the calculator?",
    answer:
      "Real payroll can differ because of tax code adjustments, salary sacrifice, payroll timing, overtime, benefits, pension method and other employer-specific settings.",
  },
  {
    question: "Does this include pension contributions?",
    answer:
      "Yes. You can add a pension contribution percentage and the calculator includes that amount in the deductions breakdown.",
  },
  {
    question: "Does this include student loan deductions?",
    answer:
      "Yes. Choose the relevant plan and the estimate applies the current simplified yearly threshold and repayment rate for that plan.",
  },
  {
    question: "Does this work for Scotland?",
    answer:
      "Yes. You can switch the tax region to Scotland and the calculator will use Scottish income tax bands while keeping National Insurance UK-wide.",
  },
];

const taxCodeOptions = [
  { label: "1257L - Standard allowance", value: "1257L" },
  { label: "0T - No personal allowance", value: "0T" },
  { label: "BR - Basic rate", value: "BR" },
  { label: "D0 - Higher rate", value: "D0" },
  { label: "D1 - Additional rate", value: "D1" },
  { label: "NT - No tax", value: "NT" },
  { label: "K497 - Extra taxable pay", value: "K497" },
  { label: "K1257 - Higher taxable adjustment", value: "K1257" },
  { label: "S1257L - Scotland standard", value: "S1257L" },
  { label: "S0T - Scotland no allowance", value: "S0T" },
  { label: "SBR - Scotland basic rate", value: "SBR" },
  { label: "SD0 - Scotland intermediate rate", value: "SD0" },
  { label: "SD1 - Scotland higher rate", value: "SD1" },
  { label: "SD2 - Scotland advanced rate", value: "SD2" },
  { label: "SD3 - Scotland top rate", value: "SD3" },
  { label: "C1257L - Wales standard", value: "C1257L" },
  { label: "C0T - Wales no allowance", value: "C0T" },
  { label: "CBR - Wales basic rate", value: "CBR" },
  { label: "CD0 - Wales higher rate", value: "CD0" },
  { label: "CD1 - Wales additional rate", value: "CD1" },
] as const;

export function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState(45_000);
  const [pensionPercent, setPensionPercent] = useState(5);
  const [pensionMethod, setPensionMethod] = useState<PensionMethod>("netPay");
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>("plan2");
  const [hasPostgraduateLoan, setHasPostgraduateLoan] = useState(false);
  const [taxRegion, setTaxRegion] = useState<TaxRegion>("rUK");
  const [taxCode, setTaxCode] = useState("1257L");
  const [period, setPeriod] = useState<ResultPeriod>("monthly");

  const breakdown = calculateSalary({
    annualSalary,
    pensionPercent,
    pensionMethod,
    studentLoanPlan,
    hasPostgraduateLoan,
    taxRegion,
    taxCode,
  });

  const mainValue = formatCurrency(valueForPeriod(breakdown.takeHomeAnnual, period), true);
  const labelSuffix = period === "yearly" ? "per year" : period === "monthly" ? "per month" : "per week";

  const donutData = [
    { name: "Take-home pay", value: breakdown.takeHomeAnnual, color: "#10b981" },
    { name: "Income tax", value: breakdown.incomeTaxAnnual, color: "#fb7185" },
    { name: "National Insurance", value: breakdown.nationalInsuranceAnnual, color: "#22d3ee" },
    { name: "Pension", value: breakdown.pensionAnnual, color: "#8b5cf6" },
    { name: "Student loan", value: breakdown.studentLoanAnnual, color: "#f59e0b" },
    { name: "Postgraduate loan", value: breakdown.postgraduateLoanAnnual, color: "#ef4444" },
  ];

  const barData = [
    { label: "Gross income", value: breakdown.grossAnnual, color: "#0ea5e9" },
    { label: "Deductions", value: breakdown.totalDeductionsAnnual, color: "#fb7185" },
    { label: "Take-home", value: breakdown.takeHomeAnnual, color: "#14b8a6" },
  ];

  return (
    <CalculatorShell
      title="UK Salary Calculator"
      intro="Estimate your UK take-home pay after income tax, National Insurance, pension contributions and student loan deductions."
      form={
        <div className="space-y-5">
          <InputField
            label="Annual salary"
            hint="Gross yearly pay"
            prefix="£"
            type="number"
            min="0"
            step="1000"
            inputMode="decimal"
            value={annualSalary}
            onChange={(event) => setAnnualSalary(Number(event.target.value))}
          />
          <InputField
            label="Pension contribution percentage"
            hint="Employee contribution"
            type="number"
            min="0"
            max="100"
            step="0.5"
            suffix="%"
            inputMode="decimal"
            value={pensionPercent}
            onChange={(event) => setPensionPercent(Number(event.target.value))}
          />
          <SelectField
            label="Pension method"
            hint="Changes how deductions affect take-home pay"
            value={pensionMethod}
            onChange={(event) => setPensionMethod(event.target.value as PensionMethod)}
          >
            <option value="netPay">Net pay arrangement</option>
            <option value="salarySacrifice">Salary sacrifice</option>
          </SelectField>
          <SelectField
            label="Student loan plan"
            hint="Undergraduate repayment plan"
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
            hint="Adds a separate 6% deduction above the postgraduate threshold."
            checked={hasPostgraduateLoan}
            onChange={setHasPostgraduateLoan}
          />
          <SelectField
            label="Tax region"
            hint="Income tax bands"
            value={taxRegion}
            onChange={(event) => setTaxRegion(event.target.value as TaxRegion)}
          >
            <option value="rUK">England, Wales and Northern Ireland</option>
            <option value="scotland">Scotland</option>
          </SelectField>
          <SelectField
            label="Tax code"
            hint="Choose a common UK tax code"
            value={taxCode}
            onChange={(event) => setTaxCode(event.target.value)}
          >
            {taxCodeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <div>
            <label className="mb-3 block text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Result view</label>
            <div className="pill-toggle">
              {(["yearly", "monthly", "weekly"] as ResultPeriod[]).map((value) => (
                <button key={value} type="button" data-active={period === value} onClick={() => setPeriod(value)}>
                  {value[0].toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            Assumptions: simplified UK payroll logic for the current tax year from 6 April 2026 to 5 April 2027, using local TypeScript functions with no external API calls.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated take-home pay"
            title={`Your take-home pay ${labelSuffix}`}
            value={mainValue}
            detail="This is a simplified estimate using local TypeScript logic, intended to give a quick, visual picture of your likely net pay."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Gross salary" value={formatCurrency(valueForPeriod(breakdown.grossAnnual, period), true)} />
            <StatCard label="Income tax" value={formatCurrency(valueForPeriod(breakdown.incomeTaxAnnual, period), true)} />
            <StatCard
              label="National Insurance"
              value={formatCurrency(valueForPeriod(breakdown.nationalInsuranceAnnual, period), true)}
            />
            <StatCard label="Pension" value={formatCurrency(valueForPeriod(breakdown.pensionAnnual, period), true)} />
            <StatCard
              label="Student loan"
              value={formatCurrency(valueForPeriod(breakdown.studentLoanAnnual, period), true)}
            />
            <StatCard
              label="Postgraduate loan"
              value={formatCurrency(valueForPeriod(breakdown.postgraduateLoanAnnual, period), true)}
            />
            <StatCard
              label="Total deductions"
              value={formatCurrency(valueForPeriod(breakdown.totalDeductionsAnnual, period), true)}
            />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard title="Breakdown" description="See where your gross income goes across your main deductions.">
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard title="Income vs deductions" description="A quick annual comparison between earnings, deductions and net pay.">
              <BarChart data={barData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your payslip may be different</h2>
          <p className="text-sm leading-6 text-slate-400">
            This tool aims to be useful and transparent, but payroll can vary because real payslips depend on details beyond a basic estimate.
          </p>
          <ul className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            <li>Current model: UK tax year 6 April 2026 to 5 April 2027.</li>
            <li>Supported tax codes include standard codes, `K` codes, `0T`, `BR`, `D0`, `D1` and `NT`.</li>
            <li>Pension method can be modelled as net pay or salary sacrifice.</li>
            <li>Postgraduate loan can be added alongside an undergraduate repayment plan.</li>
          </ul>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Tax code differences can increase or reduce the allowance used by your employer.</li>
            <li>Pension method matters because salary sacrifice and net pay arrangements affect deductions differently.</li>
            <li>Salary sacrifice changes taxable pay before some deductions are calculated.</li>
            <li>Bonus or overtime can push individual pay periods into different deduction levels.</li>
            <li>Payroll timing can create differences between monthly and cumulative tax treatment.</li>
            <li>Benefits or company perks may affect taxable pay.</li>
            <li>Student loan plan choice directly changes the deduction threshold and rate.</li>
            <li>Scottish income tax bands differ from the rest of the UK.</li>
          </ul>
        </div>
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="These estimates use simplified UK tax assumptions for the tax year running from 6 April 2026 to 5 April 2027 and are for guidance only. They are not a substitute for payroll software, employer payslips or professional advice."
    />
  );
}
