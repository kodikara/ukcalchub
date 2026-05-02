"use client";

import { useState } from "react";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FAQ } from "@/components/FAQ";
import { InputField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { SourceLinks } from "@/components/SourceLinks";
import { StatCard } from "@/components/StatCard";
import { calculateMortgageAffordability } from "@/lib/calculations/mortgage";
import { formatCurrency, formatPercent } from "@/lib/format";
import { RelatedCalculators } from "@/components/RelatedCalculators";

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
  {
    question: "Does deposit size change borrowing as well as property price?",
    answer:
      "Yes. Deposit mainly changes the property price you may target, and in real life it can also affect lender choice, rate offers and affordability tests.",
  },
  {
    question: "Why is this only a rough estimate?",
    answer:
      "Real lenders use their own affordability models, credit checks, stress testing and product rules, so no public calculator can guarantee the same result.",
  },
  {
    question: "Can I include a second income?",
    answer:
      "Yes. Add it if you expect a joint application or another household income to be part of the borrowing case.",
  },
];

const statusTone = {
  Strong: "teal" as const,
  Cautious: "amber" as const,
  Stretch: "rose" as const,
};

const guidanceLinks = [
  {
    label: "Mortgage Charter",
    href: "https://www.gov.uk/government/publications/mortgage-charter/mortgage-charter",
    note: "Useful background if you want to understand current lender support options and mortgage pressure guidance.",
  },
  {
    label: "MoneyHelper: buying a home and mortgages",
    href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home",
    note: "A practical UK guide to affordability, deposits, fees and the wider mortgage process.",
  },
  {
    label: "Support for Mortgage Interest",
    href: "https://www.gov.uk/support-for-mortgage-interest",
    note: "Relevant if you are researching safety nets alongside general affordability planning.",
  },
] as const;

const relatedLinks = [
  {
    title: "Rent Affordability Calculator",
    description: "Useful if you are comparing the monthly cost of renting with a possible mortgage budget.",
    href: "/rent-affordability-calculator-uk",
  },
  {
    title: "Salary Calculator",
    description: "See your broader pay breakdown if you still need to estimate income after tax and deductions.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Take-Home Pay Calculator",
    description: "Helpful when you want to compare mortgage cost with net monthly income instead of gross salary.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare a possible mortgage payment with wider monthly household costs.",
    href: "/cost-of-living-calculator-uk",
  },
] as const;

export function MortgageAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(55_000);
  const [secondIncome, setSecondIncome] = useState(0);
  const [deposit, setDeposit] = useState(30_000);
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState(250);
  const [interestRate, setInterestRate] = useState(4.9);
  const [termYears, setTermYears] = useState(30);

  const result = calculateMortgageAffordability({
    annualIncome,
    secondIncome,
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
            hint="Primary gross yearly income"
            prefix="£"
            type="number"
            min="0"
            step="1000"
            inputMode="decimal"
            value={annualIncome}
            onChange={(event) => setAnnualIncome(Number(event.target.value))}
          />
          <InputField
            label="Second income"
            hint="Optional"
            prefix="£"
            type="number"
            min="0"
            step="1000"
            inputMode="decimal"
            value={secondIncome}
            onChange={(event) => setSecondIncome(Number(event.target.value))}
          />
          <InputField
            label="Deposit"
            prefix="£"
            type="number"
            min="0"
            step="1000"
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
            step="50"
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
            suffix="%"
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
            detail={`Estimated maximum loan: ${formatCurrency(result.recommendedLoan, true)} with an approximate monthly payment of ${formatCurrency(result.estimatedMonthlyPayment, true)} on this simplified model.`}
            tone={statusTone[result.status]}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Affordability status" value={result.status} />
            <StatCard label="Total income used" value={formatCurrency(result.totalIncome, true)} />
            <StatCard label="Income multiple used" value={`${result.incomeMultiple.toFixed(1)}x`} />
            <StatCard label="Monthly budget" value={formatCurrency(result.monthlyBudget, true)} />
            <StatCard label="Debt-to-income" value={formatPercent(result.debtToIncomeRatio)} />
            <StatCard label="Deposit impact" value={formatCurrency(deposit, true)} />
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
      example={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Example calculation</h2>
          <p className="text-sm leading-6 text-slate-400">
            If a household earns £55,000 a year, has a £30,000 deposit and pays £250 a month toward existing debts,
            this calculator gives a rough borrowing range and a possible property budget. It is useful for planning,
            not for replacing a lender decision.
          </p>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Lenders use their own affordability checks, credit scoring and stress testing rules.</li>
            <li>Deposit size, product type and fixed-rate length can change the lending result.</li>
            <li>Dependants, childcare, travel costs and committed spending may reduce real borrowing power.</li>
            <li>This calculator does not replace a broker, lender decision or formal mortgage illustration.</li>
          </ul>
        </div>
      }
      resources={
        <SourceLinks
          title="Useful guidance"
          description="Mortgage affordability is not set by one official formula, so these UK guidance pages are more useful here than a single rule source."
          links={[...guidanceLinks]}
        />
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These related tools help once you start comparing mortgage borrowing with monthly living costs."
        />
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
