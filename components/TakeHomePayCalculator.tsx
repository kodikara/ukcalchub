"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { InputField, SelectField } from "@/components/FormField";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { SourceLinks } from "@/components/SourceLinks";
import { StatCard } from "@/components/StatCard";
import {
  calculateSalary,
  type PensionMethod,
  type StudentLoanPlan,
  type TaxRegion,
  valueForPeriod,
} from "@/lib/calculations/salary";
import { taxCodeOptions } from "@/lib/taxCodes";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";

const faqs = [
  {
    question: "What does take-home pay mean?",
    answer:
      "Take-home pay is the money left after deductions such as income tax, National Insurance, pension contributions and any student loan repayments.",
  },
  {
    question: "Is monthly take-home pay always salary divided by 12?",
    answer:
      "Not exactly. Gross salary divides neatly by 12, but net pay can vary in real life because payroll uses tax codes, pension methods, overtime, bonuses and cumulative deductions.",
  },
  {
    question: "Why is this different from my payslip by a few pence?",
    answer:
      "Small gaps are usually caused by payroll rounding or how deductions are rounded in each pay period rather than a major issue with the estimate.",
  },
  {
    question: "Can I use this for weekly pay too?",
    answer:
      "Yes. The page focuses on monthly take-home pay first, but it also shows weekly and yearly equivalents so you can compare them easily.",
  },
  {
    question: "Does this include pension contributions?",
    answer:
      "Yes. You can add a pension percentage and the estimate adjusts both the deduction total and your likely net pay.",
  },
  {
    question: "Does this include student loan deductions?",
    answer:
      "Yes. Choose the relevant plan and the calculator applies the simplified annual threshold and repayment rate for that plan.",
  },
];

const officialSourceLinks = [
  {
    label: "Income Tax rates and allowances",
    href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
    note: "Useful for checking the broad tax bands and allowances behind take-home pay estimates.",
  },
  {
    label: "National Insurance: how much you pay",
    href: "https://www.gov.uk/national-insurance/how-much-you-pay",
    note: "Explains how employee National Insurance contributions are worked out in broad terms.",
  },
  {
    label: "Student loan repayments: what you pay",
    href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay",
    note: "Helpful for confirming the simplified student loan thresholds and repayment rates used here.",
  },
] as const;

const relatedLinks = [
  {
    title: "UK Salary Calculator",
    description: "See the broader yearly salary breakdown with tax, NI, pension and loan deductions together.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Pension Contribution Calculator",
    description: "Check how changing pension percentages may alter both take-home pay and pension value.",
    href: "/pension-contribution-calculator-uk",
  },
  {
    title: "Salary + Rent Calculator",
    description: "Useful when you want to compare estimated net pay with rent and other monthly costs in one view.",
    href: "/salary-rent-affordability-calculator-uk",
  },
  {
    title: "Rent Affordability Calculator",
    description: "Use your monthly take-home estimate to judge whether rent still feels comfortable after other costs.",
    href: "/rent-affordability-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare your likely net pay with broader monthly household costs across common UK scenarios.",
    href: "/cost-of-living-calculator-uk",
  },
] as const;

export function TakeHomePayCalculator() {
  const [annualSalary, setAnnualSalary] = useState(36_000);
  const [pensionPercent, setPensionPercent] = useState(5);
  const [pensionMethod, setPensionMethod] = useState<PensionMethod>("netPay");
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>("plan2");
  const [taxRegion, setTaxRegion] = useState<TaxRegion>("rUK");
  const [taxCode, setTaxCode] = useState("1257L");

  const breakdown = calculateSalary({
    annualSalary,
    pensionPercent,
    pensionMethod,
    studentLoanPlan,
    hasPostgraduateLoan: false,
    taxRegion,
    taxCode,
  });

  const monthlyTakeHome = valueForPeriod(breakdown.takeHomeAnnual, "monthly");
  const weeklyTakeHome = valueForPeriod(breakdown.takeHomeAnnual, "weekly");
  const monthlyGross = valueForPeriod(breakdown.grossAnnual, "monthly");
  const monthlyTax = valueForPeriod(breakdown.incomeTaxAnnual, "monthly");
  const monthlyNi = valueForPeriod(breakdown.nationalInsuranceAnnual, "monthly");
  const monthlyPension = valueForPeriod(breakdown.pensionAnnual, "monthly");
  const monthlyLoan = valueForPeriod(breakdown.studentLoanAnnual, "monthly");
  const netPayRatio = breakdown.grossAnnual > 0 ? breakdown.takeHomeAnnual / breakdown.grossAnnual : 0;

  const donutData = [
    { name: "Take-home pay", value: monthlyTakeHome, color: "#34d399" },
    { name: "Income tax", value: monthlyTax, color: "#fb7185" },
    { name: "National Insurance", value: monthlyNi, color: "#22d3ee" },
    { name: "Pension", value: monthlyPension, color: "#8b5cf6" },
    { name: "Student loan", value: monthlyLoan, color: "#f59e0b" },
  ];

  const comparisonData = [
    { label: "Gross monthly", value: monthlyGross, color: "#3b82f6" },
    { label: "Net monthly", value: monthlyTakeHome, color: "#14b8a6" },
    { label: "Difference", value: monthlyGross - monthlyTakeHome, color: "#fb7185" },
  ];

  return (
    <CalculatorShell
      title="Take-Home Pay Calculator UK"
      intro="Estimate your monthly and weekly UK take-home pay after tax, National Insurance, pension and student loan deductions."
      taxYearBadge={CURRENT_TAX_YEAR_LABEL}
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
            label="Pension percentage"
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
            hint="Affects the net pay estimate"
            value={pensionMethod}
            onChange={(event) => setPensionMethod(event.target.value as PensionMethod)}
          >
            <option value="netPay">Net pay arrangement</option>
            <option value="salarySacrifice">Salary sacrifice</option>
          </SelectField>
          <SelectField
            label="Student loan plan"
            hint="Choose your repayment plan if relevant"
            value={studentLoanPlan}
            onChange={(event) => setStudentLoanPlan(event.target.value as StudentLoanPlan)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
          </SelectField>
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
            hint="Default 1257L for many employees"
            value={taxCode}
            onChange={(event) => setTaxCode(event.target.value)}
          >
            {taxCodeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated net pay"
            title="Monthly take-home pay"
            value={formatCurrency(monthlyTakeHome, true)}
            detail={`Weekly take-home estimate: ${formatCurrency(weeklyTakeHome, true)}. Gross monthly pay is ${formatCurrency(monthlyGross, true)} before deductions.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Gross monthly pay" value={formatCurrency(monthlyGross, true)} />
            <StatCard label="Net monthly pay" value={formatCurrency(monthlyTakeHome, true)} />
            <StatCard label="Weekly take-home" value={formatCurrency(weeklyTakeHome, true)} />
            <StatCard label="Net pay ratio" value={formatPercent(netPayRatio)} />
            <StatCard label="Income tax per month" value={formatCurrency(monthlyTax, true)} />
            <StatCard label="NI per month" value={formatCurrency(monthlyNi, true)} />
            <StatCard label="Pension per month" value={formatCurrency(monthlyPension, true)} />
            <StatCard label="Student loan per month" value={formatCurrency(monthlyLoan, true)} />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard
              title="Monthly deduction split"
              description="See how gross monthly pay is divided between net pay and the main deductions."
            >
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard
              title="Gross vs net pay"
              description="A quick monthly comparison between gross pay, final net pay and the gap between them."
            >
              <BarChart data={comparisonData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What the result means in plain English</h2>
          <p className="text-sm leading-6 text-slate-400">
            Your take-home pay is the money left from your salary after the main payroll deductions. This page focuses
            on the monthly result first because that is usually the figure people compare with rent, bills and daily
            spending.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Gross pay is your salary before deductions.</li>
            <li>Net pay is what is left after tax, National Insurance, pension and any selected student loan.</li>
            <li>Weekly and yearly net figures help you compare jobs, overtime value and budgeting over different time frames.</li>
          </ul>
        </div>
      }
      example={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Example calculation</h2>
          <p className="text-sm leading-6 text-slate-400">
            If your salary is £35,000 per year, this calculator estimates your monthly take-home pay after income tax,
            National Insurance, pension contributions and student loan deductions. That gives you a fast net-pay figure
            you can compare with rent, household bills or saving goals.
          </p>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Tax code changes can raise or lower the allowance used by your employer.</li>
            <li>Pension method matters because salary sacrifice and net pay arrangements affect deductions differently.</li>
            <li>Bonus pay, overtime and one-off payments can change the deduction pattern in a single pay period.</li>
            <li>Student loan plan selection changes both the threshold and the repayment rate applied.</li>
            <li>Scottish income tax bands differ from the rest of the UK.</li>
          </ul>
          <a
            href="/why-is-my-payslip-different-from-salary-calculator-uk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Read why a payslip can differ
            <span aria-hidden="true">→</span>
          </a>
        </div>
      }
      resources={
        <SourceLinks
          title="Official sources"
          description="These GOV.UK pages are useful if you want to compare the estimate with the official rules behind the main payroll deductions."
          links={[...officialSourceLinks]}
        />
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These calculators usually help next if you are working from net pay into housing or pension decisions."
        />
      }
      faq={
        <>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <FAQ items={faqs} />
        </>
      }
      disclaimer="These results are estimates only and should not be treated as financial, tax, legal or professional advice."
    />
  );
}
