"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FAQ } from "@/components/FAQ";
import { FaqSchema } from "@/components/FaqSchema";
import { InputField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { RelatedCalculators } from "@/components/RelatedCalculators";
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
  {
    question: "Can I compare two jobs with this?",
    answer:
      "Yes. It is useful when one role is salaried and another is hourly, or when contracted hours are different.",
  },
  {
    question: "Why does this matter if I only care about monthly pay?",
    answer:
      "Seeing the hourly and weekly equivalent can make job comparisons and overtime decisions much easier to understand.",
  },
  {
    question: "Does holiday change the result?",
    answer:
      "It can. If you work fewer weeks in a year than a standard full-time pattern, adjust the weekly hours or annual pay assumptions to reflect that reality.",
  },
];

const relatedLinks = [
  {
    title: "Salary Calculator",
    description: "Move from gross hourly or annual figures into a fuller UK deduction breakdown.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Take-Home Pay Calculator",
    description: "Use this next if you want to understand what a headline salary might leave after deductions.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "Pension Contribution Calculator",
    description: "Useful if you are comparing how pension choices change the value of a salary package.",
    href: "/pension-contribution-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare pay equivalents with monthly household expenses in common UK living situations.",
    href: "/cost-of-living-calculator-uk",
  },
] as const;

export function HourlyWageCalculator() {
  const [mode, setMode] = useState<"salary" | "hourly">("salary");
  const [annualSalary, setAnnualSalary] = useState(35_000);
  const [hourlyRateInput, setHourlyRateInput] = useState(18);
  const [hoursPerWeek, setHoursPerWeek] = useState(37.5);
  const [weeksWorkedPerYear, setWeeksWorkedPerYear] = useState(52);

  const result =
    mode === "salary"
      ? calculateHourlyRate({ annualSalary, hoursPerWeek, weeksWorkedPerYear })
      : calculateHourlyRate({ hourlyRate: hourlyRateInput, hoursPerWeek, weeksWorkedPerYear });

  const chartData = [
    { label: "Hourly", value: result.hourlyRate, color: "#0f766e" },
    { label: "Weekly", value: result.weeklySalary, color: "#14b8a6" },
    { label: "Monthly", value: result.monthlySalary, color: "#f59e0b" },
    { label: "Annual", value: result.annualSalary, color: "#3b82f6" },
  ];

  return (
    <>
      <FaqSchema faqs={faqs} id="faq-schema-hourly-wage" />
      <CalculatorShell
      title="Hourly Wage Calculator UK"
      intro="Convert annual salary to hourly pay or hourly rate to salary with a simple UK-friendly calculator."
      form={
        <div className="space-y-5">
          <div>
            <label className="mb-3 block text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Conversion mode</label>
            <div className="pill-toggle">
              {[
                { value: "salary", label: "Salary to hourly" },
                { value: "hourly", label: "Hourly to salary" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  data-active={mode === item.value}
                  onClick={() => setMode(item.value as "salary" | "hourly")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {mode === "salary" ? (
            <InputField
              label="Annual salary"
              hint="Gross salary"
              prefix="£"
              type="number"
              min="0"
              step="1000"
              inputMode="decimal"
              value={annualSalary}
              onChange={(event) => setAnnualSalary(Number(event.target.value))}
            />
          ) : (
            <InputField
              label="Hourly rate"
              hint="Gross hourly pay"
              prefix="£"
              type="number"
              min="0"
              step="0.5"
              inputMode="decimal"
              value={hourlyRateInput}
              onChange={(event) => setHourlyRateInput(Number(event.target.value))}
            />
          )}
          <InputField
            label="Hours per week"
            hint="Typical contract hours"
            type="number"
            min="1"
            step="0.5"
            inputMode="decimal"
            value={hoursPerWeek}
            onChange={(event) => setHoursPerWeek(Number(event.target.value))}
          />
          <InputField
            label="Weeks worked per year"
            hint="Usually 52"
            type="number"
            min="1"
            max="52"
            step="1"
            inputMode="numeric"
            value={weeksWorkedPerYear}
            onChange={(event) => setWeeksWorkedPerYear(Number(event.target.value))}
          />
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated gross hourly rate"
            title={mode === "salary" ? "Your hourly equivalent" : "Your annual salary equivalent"}
            value={mode === "salary" ? formatCurrency(result.hourlyRate, true) : formatCurrency(result.annualSalary, true)}
            detail={
              mode === "salary"
                ? "Useful for comparing job offers, freelance rates, or overtime value from a salaried role."
                : `Estimated monthly gross pay: ${formatCurrency(result.monthlySalary, true)} based on ${result.weeksWorkedPerYear} weeks worked per year.`
            }
            tone="blue"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Hourly rate" value={formatCurrency(result.hourlyRate, true)} />
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
            <li>Hourly rate uses your yearly salary divided by your selected weeks worked per year and weekly hours.</li>
            <li>If you start from an hourly rate, the calculator works back into weekly, monthly and annual gross pay.</li>
            <li>This version shows gross figures before tax and deductions.</li>
          </ul>
        </div>
      }
      example={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Example calculation</h2>
          <p className="text-sm leading-6 text-slate-400">
            A £30,000 salary with 37.5 hours per week works out to a rough gross hourly equivalent. In the other
            direction, an hourly rate can be turned back into weekly, monthly and annual gross pay using your expected
            hours and weeks worked.
          </p>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>This tool shows gross pay before tax and other deductions.</li>
            <li>Overtime rates, unpaid breaks and irregular schedules can change real hourly value.</li>
            <li>Some people work fewer weeks each year because of term-time or seasonal patterns.</li>
            <li>Employer pension, bonus or benefits can make one salary package stronger than another even at the same hourly equivalent.</li>
          </ul>
        </div>
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These calculators help turn a gross pay comparison into a fuller monthly money decision."
        />
      }
      faq={
        <>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <FAQ items={faqs} />
        </>
      }
      disclaimer="This hourly wage calculator provides simplified gross equivalents only and should not be treated as payroll, legal or financial advice."
      />
    </>
  );
}
