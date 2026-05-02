"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { InputField, SearchableSelectField, SelectField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateCostOfLiving, type HouseholdType, type LocationType } from "@/lib/calculations/costOfLiving";
import { formatCurrency } from "@/lib/format";

const faqs = [
  {
    question: "Why does location affect the estimate?",
    answer:
      "Different parts of the UK typically come with different housing and lifestyle costs, so this version uses category benchmarks by location to help show that effect.",
  },
  {
    question: "Should I use actual spending or guesses?",
    answer:
      "Use your real expected monthly costs if you have them. The calculator is most useful when it reflects the way you actually live.",
  },
  {
    question: "Does this include family costs?",
    answer:
      "Yes. You can choose a family household type and include childcare or other monthly costs to build a more realistic estimate.",
  },
];

const locationOptions = [
  { label: "London", value: "london" },
  { label: "South East", value: "southEast" },
  { label: "Other UK city", value: "city" },
  { label: "Town / rural", value: "rural" },
] as const;

export function CostOfLivingCalculator() {
  const [householdType, setHouseholdType] = useState<HouseholdType>("single");
  const [locationType, setLocationType] = useState<LocationType>("city");
  const [rent, setRent] = useState(900);
  const [bills, setBills] = useState(240);
  const [food, setFood] = useState(300);
  const [transport, setTransport] = useState(160);
  const [childcare, setChildcare] = useState(0);
  const [other, setOther] = useState(220);

  const result = calculateCostOfLiving({
    householdType,
    locationType,
    rent,
    bills,
    food,
    transport,
    childcare,
    other,
  });

  const donutData = [
    { name: "Rent or mortgage", value: Math.max(rent, result.categoryBreakdown[0]?.benchmark ?? 0), color: "#0f766e" },
    { name: "Bills", value: Math.max(bills, result.categoryBreakdown[1]?.benchmark ?? 0), color: "#38bdf8" },
    { name: "Food", value: Math.max(food, result.categoryBreakdown[2]?.benchmark ?? 0), color: "#3b82f6" },
    { name: "Transport", value: Math.max(transport, result.categoryBreakdown[3]?.benchmark ?? 0), color: "#8b5cf6" },
    { name: "Childcare", value: Math.max(childcare, result.categoryBreakdown[4]?.benchmark ?? 0), color: "#f59e0b" },
    { name: "Other", value: Math.max(other, result.categoryBreakdown[5]?.benchmark ?? 0), color: "#f97316" },
  ];

  const barData = [
    { label: "Monthly", value: result.adjustedMonthlyTotal, color: "#14b8a6" },
    { label: "Yearly", value: result.yearlyTotal, color: "#2563eb" },
  ];

  return (
    <CalculatorShell
      title="UK Cost of Living Calculator"
      intro="Estimate monthly UK living costs for individuals and families."
      form={
        <div className="space-y-5">
          <SelectField
            label="Household type"
            hint="Who the estimate is for"
            value={householdType}
            onChange={(event) => setHouseholdType(event.target.value as HouseholdType)}
          >
            <option value="single">Single</option>
            <option value="couple">Couple</option>
            <option value="family">Family with child</option>
          </SelectField>
          <SearchableSelectField
            label="Location type"
            hint="Broad UK cost profile"
            value={locationType}
            options={locationOptions.map((option) => ({ label: option.label, value: option.value }))}
            onChange={(value) => setLocationType(value as LocationType)}
            placeholder="Choose a location profile"
          />
          {[
            ["Rent/mortgage", rent, setRent],
            ["Bills", bills, setBills],
            ["Food", food, setFood],
            ["Transport", transport, setTransport],
            ["Childcare", childcare, setChildcare],
            ["Other", other, setOther],
          ].map(([label, value, setter]) => (
            <InputField
              key={label as string}
              label={label as string}
              prefix="£"
              type="number"
              min="0"
              inputMode="decimal"
              value={value as number}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
            />
          ))}
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            This version applies a broad location and household adjustment so you can compare everyday scenarios quickly.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated total"
            title="Suggested monthly planning cost"
            value={formatCurrency(result.adjustedMonthlyTotal, true)}
            detail="This compares your entries with a simple UK benchmark for your household and location, then uses the higher figure in each category for planning."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Your entered total" value={formatCurrency(result.monthlyTotal, true)} />
            <StatCard label="Benchmark total" value={formatCurrency(result.benchmarkMonthlyTotal, true)} />
            <StatCard label="Planning total" value={formatCurrency(result.adjustedMonthlyTotal, true)} />
            <StatCard label="Estimated yearly total" value={formatCurrency(result.yearlyTotal, true)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {result.categoryBreakdown.map((item) => (
              <StatCard
                key={item.label}
                label={item.label}
                value={formatCurrency(Math.max(item.value, item.benchmark), true)}
                hint={`Entered ${formatCurrency(item.value, true)} • benchmark ${formatCurrency(item.benchmark, true)}`}
              />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard title="Category breakdown" description="Visualise which parts of your monthly budget carry the most weight.">
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard title="Monthly vs yearly" description="A clean comparison between recurring monthly cost and the bigger annual picture.">
              <BarChart data={barData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How this estimate is shaped</h2>
          <p className="text-sm leading-6 text-slate-400">
            This version now uses category benchmarks for each household type and location profile, then compares them with your own entries to create a safer planning total.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Housing carries the biggest location adjustment because it often varies most across the UK.</li>
            <li>Transport and childcare also shift by area because commuting patterns and local costs can differ significantly.</li>
            <li>Your planning total uses the higher of your own figure or the local benchmark in each category.</li>
            <li>This makes the result more useful for forward planning than a single multiplier on the total.</li>
          </ul>
        </div>
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="This cost of living calculator is a simplified planning estimate. Actual household costs vary by tenancy, mortgage terms, family setup, lifestyle and local prices."
    />
  );
}
