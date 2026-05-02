"use client";

import { useMemo, useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { InputField, SelectField } from "@/components/FormField";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateRentAffordability } from "@/lib/calculations/rent";
import { calculateSalary, type StudentLoanPlan, valueForPeriod } from "@/lib/calculations/salary";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";

const faqs = [
  {
    question: "Is this using take-home pay or gross salary?",
    answer:
      "It starts with your annual salary, estimates monthly take-home pay, then compares that monthly net amount with rent and other listed monthly costs.",
  },
  {
    question: "Why can rent look affordable on gross salary but tight here?",
    answer:
      "Because affordability usually feels different after tax, National Insurance, pension and student loan deductions are taken off.",
  },
  {
    question: "Does this include every housing cost?",
    answer:
      "No. It includes the fields shown on the page, so you may still want to add council tax, insurance, subscriptions or savings goals separately in your own planning.",
  },
  {
    question: "Can landlords or letting agents use a different formula?",
    answer:
      "Yes. Real affordability checks can vary by landlord, letting agent or referencing company.",
  },
  {
    question: "Why is this only an estimate?",
    answer:
      "It combines a simplified salary model with a simplified spending model, so it is designed for planning rather than a formal financial decision.",
  },
];

const relatedLinks = [
  {
    title: "Take-Home Pay Calculator",
    description: "Use the standalone net-pay page if you want a more focused monthly take-home view first.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "Rent Affordability Calculator",
    description: "Useful if you already know your monthly take-home income and want a simpler housing check.",
    href: "/rent-affordability-calculator-uk",
  },
  {
    title: "UK Salary Calculator",
    description: "See the full salary breakdown with yearly, monthly and weekly deductions.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare rent with a wider monthly budget picture beyond the main essentials.",
    href: "/cost-of-living-calculator-uk",
  },
] as const;

const statusTone = {
  Comfortable: "teal" as const,
  Tight: "amber" as const,
  Risky: "rose" as const,
};

export function SalaryRentAffordabilityCalculator() {
  const [annualSalary, setAnnualSalary] = useState(36_000);
  const [pensionPercent, setPensionPercent] = useState(5);
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>("plan2");
  const [rent, setRent] = useState(950);
  const [bills, setBills] = useState(240);
  const [food, setFood] = useState(320);
  const [transport, setTransport] = useState(160);
  const [other, setOther] = useState(220);

  const salaryResult = useMemo(
    () =>
      calculateSalary({
        annualSalary,
        pensionPercent,
        pensionMethod: "netPay",
        studentLoanPlan,
        hasPostgraduateLoan: false,
        taxRegion: "rUK",
        taxCode: "1257L",
      }),
    [annualSalary, pensionPercent, studentLoanPlan],
  );

  const monthlyTakeHome = valueForPeriod(salaryResult.takeHomeAnnual, "monthly");
  const affordability = calculateRentAffordability({
    monthlyIncome: monthlyTakeHome,
    rent,
    councilTax: 0,
    bills,
    food,
    transport,
    childcare: 0,
    other,
    savingsGoal: 0,
  });

  const donutData = [
    { name: "Rent", value: rent, color: "#3b82f6" },
    { name: "Bills", value: bills, color: "#22d3ee" },
    { name: "Food", value: food, color: "#8b5cf6" },
    { name: "Transport", value: transport, color: "#f59e0b" },
    { name: "Other", value: other, color: "#f97316" },
    { name: "Remaining", value: Math.max(0, affordability.remaining), color: "#22c55e" },
  ];

  const barData = [
    { label: "Take-home", value: monthlyTakeHome, color: "#14b8a6" },
    { label: "Expenses", value: affordability.totalExpenses, color: "#fb7185" },
  ];

  return (
    <CalculatorShell
      title="Salary Rent Affordability Calculator UK"
      intro="Estimate monthly take-home pay from your salary, then compare it with rent and essential monthly costs in one place."
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
            label="Student loan plan"
            hint="Choose if relevant"
            value={studentLoanPlan}
            onChange={(event) => setStudentLoanPlan(event.target.value as StudentLoanPlan)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
          </SelectField>
          <InputField label="Monthly rent" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={rent} onChange={(event) => setRent(Number(event.target.value))} />
          <InputField label="Monthly bills" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={bills} onChange={(event) => setBills(Number(event.target.value))} />
          <InputField label="Food / groceries" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={food} onChange={(event) => setFood(Number(event.target.value))} />
          <InputField label="Transport" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={transport} onChange={(event) => setTransport(Number(event.target.value))} />
          <InputField label="Other expenses" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={other} onChange={(event) => setOther(Number(event.target.value))} />
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Combined salary + rent view"
            title="Money left after monthly expenses"
            value={formatCurrency(affordability.remaining, true)}
            detail={`Estimated monthly take-home: ${formatCurrency(monthlyTakeHome, true)}. Rent is ${formatPercent(affordability.rentPercent)} of take-home pay, which looks ${affordability.status.toLowerCase()} on this simplified model.`}
            tone={statusTone[affordability.status]}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Monthly take-home" value={formatCurrency(monthlyTakeHome, true)} hint="Estimated from your salary inputs" />
            <StatCard label="Rent share" value={formatPercent(affordability.rentPercent)} hint="Rent as a share of estimated take-home pay" />
            <StatCard label="Monthly expenses" value={formatCurrency(affordability.totalExpenses, true)} hint="Total of the monthly costs listed on this page" />
            <StatCard label="Money left" value={formatCurrency(affordability.remaining, true)} hint="Estimated take-home minus listed monthly expenses" />
            <StatCard label="Affordability status" value={affordability.status} />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard
              title="Monthly spending split"
              description="A quick visual of rent, essentials and what may be left after the listed costs."
            >
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard
              title="Take-home vs expenses"
              description="Compare estimated monthly take-home pay with the monthly spending total you entered."
            >
              <BarChart data={barData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How to read this result</h2>
          <p className="text-sm leading-6 text-slate-400">
            This tool starts with your gross salary, estimates monthly take-home pay after the main deductions, and
            then compares that monthly net figure with rent plus the other monthly costs you entered.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Comfortable means rent looks manageable alongside the other listed spending.</li>
            <li>Tight means the budget may still work, but there is less room for surprises or savings.</li>
            <li>Risky means rent is taking too much of take-home pay or the remaining budget is low or negative.</li>
          </ul>
        </div>
      }
      example={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Example calculation</h2>
          <p className="text-sm leading-6 text-slate-400">
            If your salary is £36,000 and your rent is £950 a month, this page estimates your monthly take-home pay and
            then compares it with rent, bills, food, transport and other expenses to show how much could be left.
          </p>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why affordability can vary</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Tax code, pension method and student loan plan can change the take-home estimate.</li>
            <li>Council tax, insurance, subscriptions and savings goals are not automatically included unless you add them to other expenses.</li>
            <li>Landlords and letting agents may use their own affordability rules or require a guarantor.</li>
            <li>Irregular pay, overtime and one-off costs can make a real monthly budget feel very different.</li>
          </ul>
        </div>
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These calculators help if you want to look at salary, net pay or rent decisions in more detail."
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
