"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { InputField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateRentAffordability } from "@/lib/calculations/rent";
import { formatCurrency, formatPercent } from "@/lib/format";

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
      "Yes. For a more realistic picture, include all recurring housing-related costs you expect to pay each month.",
  },
];

const statusTone = {
  Comfortable: "teal" as const,
  Tight: "amber" as const,
  Risky: "rose" as const,
};

export function RentAffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(2800);
  const [rent, setRent] = useState(950);
  const [bills, setBills] = useState(260);
  const [food, setFood] = useState(320);
  const [transport, setTransport] = useState(160);
  const [childcare, setChildcare] = useState(0);
  const [other, setOther] = useState(250);
  const [savingsGoal, setSavingsGoal] = useState(200);

  const result = calculateRentAffordability({
    monthlyIncome,
    rent,
    bills,
    food,
    transport,
    childcare,
    other,
    savingsGoal,
  });

  const donutData = [
    { name: "Rent", value: rent, color: "#0f766e" },
    { name: "Bills", value: bills, color: "#38bdf8" },
    { name: "Food", value: food, color: "#3b82f6" },
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
              inputMode="decimal"
              value={value as number}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
            />
          ))}
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            Tip: enter the take-home income from your payslip or from the salary calculator for a more realistic result.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Affordability status"
            title="Your current rent picture"
            value={result.status}
            detail={`Remaining after listed expenses and savings goal: ${formatCurrency(result.remainingAfterSavingsGoal, true)}`}
            tone={statusTone[result.status]}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Remaining money" value={formatCurrency(result.remaining, true)} />
            <StatCard label="Rent share" value={formatPercent(result.rentPercent)} />
            <StatCard label="Total monthly expenses" value={formatCurrency(result.totalExpenses, true)} />
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
        </div>
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="This rent calculator is a planning tool only. Real affordability depends on deposit requirements, debt, location, lifestyle, credit history and unexpected expenses."
    />
  );
}
