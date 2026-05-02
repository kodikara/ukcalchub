"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { InputField, SelectField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { SourceLinks } from "@/components/SourceLinks";
import { StatCard } from "@/components/StatCard";
import { councilTaxBandOptions, councilTaxValueForBand, type CouncilTaxBand } from "@/lib/councilTax";
import { calculateRentAffordability } from "@/lib/calculations/rent";
import { formatCurrency, formatPercent } from "@/lib/format";
import { RelatedCalculators } from "@/components/RelatedCalculators";

const faqs = [
  {
    question: "What is a comfortable rent percentage?",
    answer:
      "A common rule of thumb is to keep rent around 30% of take-home income, but what feels comfortable depends on your bills, transport, childcare and savings goals.",
  },
  {
    question: "Why does this status only show comfortable, tight or risky?",
    answer:
      "The first version is intentionally simple so the result is easy to understand at a glance, especially on mobile.",
  },
  {
    question: "Should I include council tax and utilities in bills?",
    answer:
      "This version gives council tax its own field, and you should also include utility bills for a more realistic monthly housing budget.",
  },
  {
    question: "What if my rent is above 30% but still feels manageable?",
    answer:
      "That can happen. The 30% to 35% rule is only a rough guide, so your own transport costs, debts, savings goals and lifestyle still matter.",
  },
  {
    question: "Can I use salary before tax here?",
    answer:
      "It is better to use take-home income, because rent affordability is usually about what is left after payroll deductions.",
  },
  {
    question: "Does this decide what a landlord will accept?",
    answer:
      "No. Landlords and letting agents may use their own affordability checks, reference standards or guarantor requirements.",
  },
];

const statusTone = {
  Comfortable: "teal" as const,
  Tight: "amber" as const,
  Risky: "rose" as const,
};

const guidanceLinks = [
  {
    label: "How to rent",
    href: "https://www.gov.uk/government/publications/how-to-rent",
    note: "A practical GOV.UK guide to renting in England, useful for the wider costs and commitments around a tenancy.",
  },
  {
    label: "Housing costs and Universal Credit",
    href: "https://www.gov.uk/housing-and-universal-credit",
    note: "Helpful if you need to understand how housing support can interact with rent costs.",
  },
  {
    label: "Council Tax support",
    href: "https://www.gov.uk/apply-council-tax-reduction",
    note: "Useful if you are estimating the full housing budget and want to check whether council tax help may apply.",
  },
] as const;

const relatedLinks = [
  {
    title: "Take-Home Pay Calculator",
    description: "Work out a monthly net-pay estimate first if you only know your salary before tax.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "UK Salary Calculator",
    description: "See the broader deduction breakdown before moving into rent planning.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare rent with a fuller monthly budget picture including council tax and broader UK household costs.",
    href: "/cost-of-living-calculator-uk",
  },
  {
    title: "Mortgage Affordability Calculator",
    description: "Useful if you are comparing renting with a possible future home-buying budget.",
    href: "/mortgage-affordability-calculator-uk",
  },
] as const;

export function RentAffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(2800);
  const [rent, setRent] = useState(950);
  const [councilTaxBand, setCouncilTaxBand] = useState<CouncilTaxBand>("");
  const [councilTax, setCouncilTax] = useState(0);
  const [bills, setBills] = useState(260);
  const [food, setFood] = useState(320);
  const [transport, setTransport] = useState(160);
  const [childcare, setChildcare] = useState(0);
  const [other, setOther] = useState(250);
  const [savingsGoal, setSavingsGoal] = useState(200);

  const result = calculateRentAffordability({
    monthlyIncome,
    rent,
    councilTax,
    bills,
    food,
    transport,
    childcare,
    other,
    savingsGoal,
  });

  const donutData = [
    { name: "Rent", value: rent, color: "#3b82f6" },
    { name: "Council Tax", value: councilTax, color: "#64748b" },
    { name: "Bills", value: bills, color: "#38bdf8" },
    { name: "Food", value: food, color: "#6366f1" },
    { name: "Transport", value: transport, color: "#8b5cf6" },
    { name: "Childcare", value: childcare, color: "#f59e0b" },
    { name: "Other", value: other, color: "#f97316" },
    { name: "Remaining", value: Math.max(0, result.remaining), color: "#22c55e" },
  ];

  const barData = [
    { label: "Income", value: monthlyIncome, color: "#14b8a6" },
    { label: "Expenses", value: result.totalExpenses, color: "#fb7185" },
  ];

  return (
    <CalculatorShell
      title="Rent Affordability Calculator UK"
      intro="Check how much rent may be affordable based on your income and monthly expenses."
      form={
        <div className="space-y-5">
          {[
            ["Monthly take-home income", monthlyIncome, setMonthlyIncome],
            ["Monthly rent", rent, setRent],
          ].map(([label, value, setter]) => (
            <InputField
              key={label as string}
              label={label as string}
              prefix="£"
              type="number"
              min="0"
              step="50"
              inputMode="decimal"
              value={value as number}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
            />
          ))}
          <SelectField
            label="Council Tax Band (optional)"
            hint="Auto-fills a simple monthly estimate"
            value={councilTaxBand}
            onChange={(event) => {
              const band = event.target.value as CouncilTaxBand;
              setCouncilTaxBand(band);
              setCouncilTax(councilTaxValueForBand(band));
            }}
          >
            {councilTaxBandOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <InputField
            label="Council Tax (£/month)"
            hint="Use your own monthly figure if you know it"
            prefix="£"
            type="number"
            min="0"
            step="10"
            inputMode="decimal"
            placeholder="e.g. 120"
            value={councilTax === 0 ? "" : councilTax}
            onChange={(event) => setCouncilTax(Number(event.target.value))}
          />
          {[
            ["Bills", bills, setBills],
            ["Food/groceries", food, setFood],
            ["Transport", transport, setTransport],
            ["Childcare", childcare, setChildcare],
            ["Other expenses", other, setOther],
            ["Monthly savings goal", savingsGoal, setSavingsGoal],
          ].map(([label, value, setter]) => (
            <InputField
              key={label as string}
              label={label as string}
              prefix="£"
              type="number"
              min="0"
              step="50"
              inputMode="decimal"
              value={value as number}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
            />
          ))}
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            This calculator includes council tax and common UK household costs to give a more realistic monthly estimate.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Affordability status"
            title="Your current rent picture"
            value={result.status}
            detail={`Money left before savings: ${formatCurrency(result.remaining, true)}. After your ${formatCurrency(savingsGoal, true)} monthly savings goal: ${formatCurrency(result.remainingAfterSavingsGoal, true)}.`}
            tone={statusTone[result.status]}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Before savings goal" value={formatCurrency(result.remaining, true)} />
            <StatCard label="Rent share" value={formatPercent(result.rentPercent)} />
            <StatCard label="Total monthly expenses" value={formatCurrency(result.totalExpenses, true)} />
            <StatCard label="Council tax" value={formatCurrency(councilTax, true)} />
            <StatCard label="After savings goal" value={formatCurrency(result.remainingAfterSavingsGoal, true)} />
            <StatCard label="Essential spend ratio" value={formatPercent(result.essentialSpendPercent)} />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard title="Monthly split" description="A simple visual of where your monthly take-home income is going.">
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard title="Income vs expenses" description="Quick comparison of monthly money in versus monthly money out.">
              <BarChart data={barData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How the affordability status works</h2>
          <p className="text-sm leading-6 text-slate-400">
            The first version keeps the logic simple so the result is fast and easy to understand:
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Comfortable if rent is 30% or less of take-home income and you still have money left after expenses.</li>
            <li>Tight if rent sits around 30% to 40% of take-home pay or your remaining money after savings is quite low.</li>
            <li>Risky if rent is above 40% of take-home pay, total essential spend is very heavy, or your remaining money drops below zero.</li>
          </ul>
          <h3 className="pt-2 text-xl font-semibold tracking-tight text-white">What&apos;s included in this estimate?</h3>
          <ul className="space-y-2 text-sm leading-6 text-slate-400">
            <li>Rent or mortgage</li>
            <li>Council tax</li>
            <li>Utility bills including electricity, gas and water</li>
            <li>Food and groceries</li>
            <li>Transport</li>
            <li>Other regular expenses</li>
          </ul>
          <h3 className="pt-2 text-xl font-semibold tracking-tight text-white">What&apos;s not included?</h3>
          <ul className="space-y-2 text-sm leading-6 text-slate-400">
            <li>One-off expenses</li>
            <li>Unexpected repairs</li>
            <li>Lifestyle choices such as holidays or luxury spending</li>
          </ul>
        </div>
      }
      example={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Example calculation</h2>
          <p className="text-sm leading-6 text-slate-400">
            If your monthly take-home income is £2,800 and your rent is £950, this calculator compares rent, council
            tax, bills, groceries, transport, childcare and other expenses to show whether that level of rent looks
            comfortable, tight or risky.
          </p>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>The 30% to 35% rent rule is only a rough guide and does not fit every household.</li>
            <li>Commuting, debt payments, irregular income and the exact council tax set by your local authority can change the picture quickly.</li>
            <li>Landlords and letting agents may use their own affordability formulas or require a guarantor.</li>
            <li>Your savings goal can make a rent level feel tighter even if the bare essentials are covered.</li>
          </ul>
        </div>
      }
      resources={
        <SourceLinks
          title="Useful guidance"
          description="These UK guidance pages are useful alongside the calculator if you are comparing rent with the wider reality of bills, support and tenancy obligations."
          links={[...guidanceLinks]}
        />
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These related tools help when you are turning pay figures into a fuller housing decision."
        />
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="This rent calculator is a planning tool only. Real affordability depends on deposit requirements, debt, location, lifestyle, credit history and unexpected expenses."
    />
  );
}
