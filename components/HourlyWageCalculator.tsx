"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FAQ } from "@/components/FAQ";
import { InputField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateHourlyRate } from "@/lib/calculations/hourly";
import { formatCurrency } from "@/lib/format";

const faqs = [
  {
    question: "Why is hourly rate useful if I am salaried?",
    answer:
      "It helps compare offers, understand overtime value, and see how a salary translates into day-to-day earning power.",
  },
  {
    question: "Does this include tax?",
    answer:
      "No. This tool converts gross salary into hourly, daily, weekly and monthly equivalents before deductions.",
  },
  {
    question: "What hours should I enter?",
    answer:
      "Use your normal contracted weekly hours for the clearest comparison. If your schedule varies, use your typical average.",
  },
];

export function HourlyWageCalculator() {
  const [annualSalary, setAnnualSalary] = useState(35_000);
  const [weeklyHours, setWeeklyHours] = useState(37.5);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const result = calculateHourlyRate({ annualSalary, weeklyHours, daysPerWeek });

  const chartData = [
    { label: "Hourly", value: result.hourlyRate, color: "#0f766e" },
    { label: "Daily", value: result.dailyRate, color: "#3b82f6" },
    { label: "Weekly", value: result.weeklySalary, color: "#14b8a6" },
    { label: "Monthly", value: result.monthlySalary, color: "#f59e0b" },
  ];

  return (
    <CalculatorShell
      title="Hourly Wage Calculator UK"
      intro="Convert an annual salary into hourly, daily, weekly and monthly amounts with a simple UK-friendly calculator."
      form={
        <div className="space-y-5">
          <InputField
            label="Annual salary"
            hint="Gross salary"
            prefix="£"
            type="number"
            min="0"
            inputMode="decimal"
            value={annualSalary}
            onChange={(event) => setAnnualSalary(Number(event.target.value))}
          />
          <InputField
            label="Weekly hours"
            hint="Typical contract hours"
            type="number"
            min="1"
            step="0.5"
            inputMode="decimal"
            value={weeklyHours}
            onChange={(event) => setWeeklyHours(Number(event.target.value))}
          />
          <InputField
            label="Working days per week"
            hint="Usually 5"
            type="number"
            min="1"
            max="7"
            step="1"
            inputMode="numeric"
            value={daysPerWeek}
            onChange={(event) => setDaysPerWeek(Number(event.target.value))}
          />
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated gross hourly rate"
            title="Your hourly equivalent"
            value={formatCurrency(result.hourlyRate, true)}
            detail="Useful for comparing job offers, freelance rates, or overtime value from a salaried role."
            tone="blue"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Daily rate" value={formatCurrency(result.dailyRate, true)} />
            <StatCard label="Weekly pay" value={formatCurrency(result.weeklySalary, true)} />
            <StatCard label="Monthly pay" value={formatCurrency(result.monthlySalary, true)} />
            <StatCard label="Annual salary" value={formatCurrency(result.annualSalary, true)} />
          </div>
          <SectionCard
            title="Rate comparison"
            description="See how the same salary looks across different time frames."
          >
            <BarChart data={chartData} />
          </SectionCard>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How this calculator works</h2>
          <p className="text-sm leading-6 text-slate-400">
            The calculation is straightforward: yearly salary is converted into weekly pay, then split into daily and hourly amounts using your working pattern.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Hourly rate uses your yearly salary divided by 52 weeks and your weekly hours.</li>
            <li>Daily rate uses your weekly pay divided by your working days each week.</li>
            <li>This version shows gross figures before tax and deductions.</li>
          </ul>
        </div>
      }
      faq={
        <>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <FAQ items={faqs} />
        </>
      }
      disclaimer="This hourly wage calculator provides simplified gross equivalents only and should not be treated as payroll, legal or financial advice."
    />
  );
}
