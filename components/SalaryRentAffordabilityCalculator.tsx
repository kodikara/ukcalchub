"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { FaqSchema } from "@/components/FaqSchema";
import { InputField, SelectField } from "@/components/FormField";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ResultCard } from "@/components/ResultCard";
import { RealWorldScenarioCard } from "@/components/RealWorldScenarioCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateRentAffordability } from "@/lib/calculations/rent";
import { calculateSalary, type StudentLoanPlan, valueForPeriod } from "@/lib/calculations/salary";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";
import { decimalField, enumField, useShareableCalculatorState } from "@/lib/shareableCalculatorState";

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

type SalaryRentState = {
  annualSalary: number;
  pensionPercent: number;
  studentLoanPlan: StudentLoanPlan;
  rent: number;
  bills: number;
  food: number;
  transport: number;
  other: number;
};

const salaryRentFields = {
  annualSalary: decimalField(36_000, "salary"),
  pensionPercent: decimalField(5, "pension"),
  studentLoanPlan: enumField<StudentLoanPlan>("plan2", ["none", "plan1", "plan2", "plan4", "plan5"], "loan"),
  rent: decimalField(950, "rent"),
  bills: decimalField(240, "bills"),
  food: decimalField(320, "food"),
  transport: decimalField(160, "transport"),
  other: decimalField(220, "other"),
} as const;

export function SalaryRentAffordabilityCalculator() {
  const { state, setField } = useShareableCalculatorState<SalaryRentState>(salaryRentFields);
  const { annualSalary, pensionPercent, studentLoanPlan, rent, bills, food, transport, other } = state;

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
    <>
      <FaqSchema faqs={faqs} id="faq-schema-salary-rent-affordability" />
      <CalculatorShell
      title="Salary Rent Affordability Calculator UK"
      intro="Estimate monthly take-home pay from your salary, then compare it with rent and essential monthly costs in one place."
      experienceLine="Built using real UK scenarios including rent, council tax, bills and everyday expenses."
      taxYearBadge={CURRENT_TAX_YEAR_LABEL}
      methodologyNote="Updated for UK tax year 2026/27. Based on HMRC tax bands, National Insurance thresholds and typical UK cost ranges people commonly compare against rent decisions."
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
            onChange={(event) => setField("annualSalary", Number(event.target.value))}
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
            onChange={(event) => setField("pensionPercent", Number(event.target.value))}
          />
          <SelectField
            label="Student loan plan"
            hint="Choose if relevant"
            value={studentLoanPlan}
            onChange={(event) => setField("studentLoanPlan", event.target.value as StudentLoanPlan)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
          </SelectField>
          <InputField label="Monthly rent" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={rent} onChange={(event) => setField("rent", Number(event.target.value))} />
          <InputField label="Monthly bills" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={bills} onChange={(event) => setField("bills", Number(event.target.value))} />
          <InputField label="Food / groceries" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={food} onChange={(event) => setField("food", Number(event.target.value))} />
          <InputField label="Transport" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={transport} onChange={(event) => setField("transport", Number(event.target.value))} />
          <InputField label="Other expenses" prefix="£" type="number" min="0" step="50" inputMode="decimal" value={other} onChange={(event) => setField("other", Number(event.target.value))} />
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
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
            <h3 className="text-xl font-semibold tracking-tight text-white">What this means in real life</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This kind of combined view is often where a salary starts to feel real. A headline pay rise can still
              leave only a modest monthly margin once rent, bills, food and transport are all counted together.
            </p>
          </div>
        </div>
      }
      example={
        <div className="space-y-4">
          <RealWorldScenarioCard
            title="Real UK Example"
            intro="A single professional comparing salary, rent and other everyday commitments in one monthly view."
            items={[
              { label: "Rent", value: "£1,325 / month" },
              { label: "Bills", value: "£230 / month" },
              { label: "Council tax", value: "£260 / month" },
              { label: "Fuel / transport", value: "£160 / month" },
              { label: "Groceries", value: "£400 / month" },
              { label: "Overseas support", value: "£300 / month" },
              { label: "Online purchases", value: "£100 / month" },
              { label: "Leisure", value: "£150 / month" },
            ]}
            summary={
              <>
                A setup like this can easily consume <strong>£2,000 to £2,300 a month</strong>, which is why the
                combined salary-and-rent view is useful for judging whether a salary change really improves everyday flexibility.
              </>
            }
          />
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
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm leading-6 text-slate-300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Practical note</h3>
            <p className="mt-2">
              It is usually safer to budget slightly above the calculated values, particularly for energy, council tax
              and variable monthly spending that often arrives in uneven patterns.
            </p>
            <div className="mt-3 flex flex-wrap gap-4">
              <Link href="/rent-affordability-calculator-uk" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                See what rent you can afford on your salary
              </Link>
              <Link href="/cost-of-living-calculator-uk" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                Compare with real UK living costs
              </Link>
            </div>
          </div>
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
    </>
  );
}
