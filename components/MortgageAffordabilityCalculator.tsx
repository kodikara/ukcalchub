"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FAQ } from "@/components/FAQ";
import { InputField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateMortgageAffordability } from "@/lib/calculations/mortgage";
import { formatCurrency, formatPercent } from "@/lib/format";

const faqs = [
  {
    question: "Is this the same as a lender decision?",
    answer:
      "No. Real lenders also assess credit history, deposit size, dependants, committed spending, stress tests and their own internal rules.",
  },
  {
    question: "Why use both an income multiple and a payment check?",
    answer:
      "That gives a more balanced estimate. Some households look fine on income multiple alone but still feel stretched once debts and interest rates are included.",
  },
  {
    question: "Should I enter household income or just one salary?",
    answer:
      "Use the total annual gross income you expect to use for the mortgage application if you want a household estimate.",
  },
];

const statusTone = {
  Strong: "teal" as const,
  Cautious: "amber" as const,
  Stretch: "blue" as const,
};

export function MortgageAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(55_000);
  const [deposit, setDeposit] = useState(30_000);
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState(250);
  const [interestRate, setInterestRate] = useState(4.9);
  const [termYears, setTermYears] = useState(30);

  const result = calculateMortgageAffordability({
    annualIncome,
    deposit,
    monthlyDebtPayments,
    interestRate,
    termYears,
  });

  const chartData = [
    { label: "Loan by income", value: result.maxLoanByIncome, color: "#3b82f6" },
    { label: "Loan by payment", value: result.maxLoanByPayment, color: "#f59e0b" },
    { label: "Recommended", value: result.recommendedLoan, color: "#14b8a6" },
    { label: "Property price", value: result.recommendedPropertyPrice, color: "#0f766e" },
  ];

  return (
    <CalculatorShell
      title="Mortgage Affordability Calculator UK"
      intro="Estimate how much mortgage and property price may be realistic based on income, deposit, debts, interest rate and term."
      form={
        <div className="space-y-5">
          <InputField
            label="Annual household income"
            hint="Gross yearly income"
            prefix="£"
            type="number"
            min="0"
            inputMode="decimal"
            value={annualIncome}
            onChange={(event) => setAnnualIncome(Number(event.target.value))}
          />
          <InputField
            label="Deposit"
            prefix="£"
            type="number"
            min="0"
            inputMode="decimal"
            value={deposit}
            onChange={(event) => setDeposit(Number(event.target.value))}
          />
          <InputField
            label="Monthly debt payments"
            hint="Loans, cards, finance"
            prefix="£"
            type="number"
            min="0"
            inputMode="decimal"
            value={monthlyDebtPayments}
            onChange={(event) => setMonthlyDebtPayments(Number(event.target.value))}
          />
          <InputField
            label="Interest rate"
            hint="Example mortgage rate"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            value={interestRate}
            onChange={(event) => setInterestRate(Number(event.target.value))}
          />
          <InputField
            label="Mortgage term"
            hint="Years"
            type="number"
            min="1"
            max="40"
            inputMode="numeric"
            value={termYears}
            onChange={(event) => setTermYears(Number(event.target.value))}
          />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            This is a simplified planning estimate using an income multiple and an affordability payment check, not a lender decision.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated affordability"
            title="Possible maximum property price"
            value={formatCurrency(result.recommendedPropertyPrice, true)}
            detail={`Estimated maximum loan: ${formatCurrency(result.recommendedLoan, true)} at around ${formatCurrency(result.estimatedMonthlyPayment, true)} per month.`}
            tone={statusTone[result.status]}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Affordability status" value={result.status} />
            <StatCard label="Income multiple used" value={`${result.incomeMultiple.toFixed(1)}x`} />
            <StatCard label="Monthly budget" value={formatCurrency(result.monthlyBudget, true)} />
            <StatCard label="Debt-to-income" value={formatPercent(result.debtToIncomeRatio)} />
          </div>
          <SectionCard
            title="Loan and price comparison"
            description="Compare the income-based ceiling, the payment-based ceiling, and the combined recommendation."
          >
            <BarChart data={chartData} />
          </SectionCard>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How this estimate works</h2>
          <p className="text-sm leading-6 text-slate-400">
            The calculator compares two simplified checks and uses the lower result: an income multiple and a monthly affordability budget after debt payments.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Income multiple starts around 4.5x and reduces if existing monthly debts already take a bigger share of income.</li>
            <li>Monthly affordability uses 28% of gross monthly income as a simple mortgage payment cap before subtracting debts.</li>
            <li>The recommendation is designed to feel more cautious than a headline borrowing figure on its own.</li>
          </ul>
        </div>
      }
      faq={
        <>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <FAQ items={faqs} />
        </>
      }
      disclaimer="This mortgage affordability calculator provides an estimate only and should not be treated as mortgage advice, a lending decision or a substitute for speaking to a broker or lender."
    />
  );
}
