import Link from "next/link";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateSalary, valueForPeriod } from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";

type SalaryAfterTaxLandingProps = {
  annualSalary: number;
};

export function SalaryAfterTaxLanding({ annualSalary }: SalaryAfterTaxLandingProps) {
  const result = calculateSalary({
    annualSalary,
    pensionPercent: 0,
    pensionMethod: "netPay",
    studentLoanPlan: "none",
    hasPostgraduateLoan: false,
    taxRegion: "rUK",
    taxCode: "1257L",
  });

  const monthlyTakeHome = valueForPeriod(result.takeHomeAnnual, "monthly");
  const weeklyTakeHome = valueForPeriod(result.takeHomeAnnual, "weekly");
  const monthlyTax = valueForPeriod(result.incomeTaxAnnual, "monthly");
  const monthlyNi = valueForPeriod(result.nationalInsuranceAnnual, "monthly");
  const grossMonthly = valueForPeriod(result.grossAnnual, "monthly");

  const bars = [
    { label: "Gross", value: result.grossAnnual, color: "from-blue-500 to-cyan-400" },
    { label: "Tax", value: result.incomeTaxAnnual, color: "from-rose-500 to-orange-400" },
    { label: "NI", value: result.nationalInsuranceAnnual, color: "from-cyan-500 to-sky-400" },
    { label: "Take-home", value: result.takeHomeAnnual, color: "from-emerald-500 to-teal-400" },
  ];
  const maxBar = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="container-shell px-0 py-6 md:py-12">
      <section className="mb-8 max-w-4xl space-y-4 md:mb-10">
        <span className="eyebrow">Salary after tax guide</span>
        <h1 className="section-title font-semibold text-white">£{annualSalary.toLocaleString()} Salary After Tax UK</h1>
        <p className="body-copy max-w-3xl text-base leading-7 md:text-lg md:leading-8">
          This example shows a simple UK take-home pay estimate for a £{annualSalary.toLocaleString()} salary using a
          standard 1257L tax code, no student loan, no pension deduction, and the rest-of-UK tax bands.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-100">
            Estimate only. UK-focused. No sign-up required.
          </div>
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 text-sm font-medium text-emerald-100">
            {CURRENT_TAX_YEAR_LABEL}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <ResultCard
          eyebrow="Estimated take-home pay"
          title="Monthly take-home pay"
          value={formatCurrency(monthlyTakeHome, true)}
          detail={`That is about ${formatCurrency(weeklyTakeHome, true)} per week, with gross monthly pay around ${formatCurrency(grossMonthly, true)} before deductions.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Annual take-home" value={formatCurrency(result.takeHomeAnnual, true)} />
          <StatCard label="Monthly take-home" value={formatCurrency(monthlyTakeHome, true)} />
          <StatCard label="Weekly take-home" value={formatCurrency(weeklyTakeHome, true)} />
          <StatCard label="Income tax" value={formatCurrency(result.incomeTaxAnnual, true)} />
          <StatCard label="National Insurance" value={formatCurrency(result.nationalInsuranceAnnual, true)} />
        </div>

        <SectionCard
          title="Estimated breakdown"
          description={`A quick visual guide to how a £${annualSalary.toLocaleString()} salary is split between gross pay, tax, National Insurance and take-home pay.`}
        >
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex h-48 items-end gap-4">
              {bars.map((bar) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={`w-full rounded-t-[1.25rem] bg-gradient-to-t ${bar.color}`}
                    style={{ height: `${Math.max((bar.value / maxBar) * 100, 8)}%` }}
                  />
                  <span className="text-xs font-medium text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Monthly tax" value={formatCurrency(monthlyTax, true)} />
              <StatCard label="Monthly NI" value={formatCurrency(monthlyNi, true)} />
              <StatCard label="Gross yearly pay" value={formatCurrency(result.grossAnnual, true)} />
              <StatCard label="Total deductions" value={formatCurrency(result.totalDeductionsAnnual, true)} />
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">How this example is worked out</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              This page uses the main salary calculator logic with a standard 1257L tax code, no student loan, no
              pension deduction and the default rest-of-UK tax bands. It is designed to answer a common search quickly
              while still linking to the fuller calculator if your circumstances are different.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <li>Tax year used: 6 April 2026 to 5 April 2027.</li>
              <li>Pension contributions are assumed to be 0% for this example.</li>
              <li>Student loan deductions are assumed to be none for this example.</li>
              <li>Real payslips can differ because of tax code changes, pensions, overtime or mid-year adjustments.</li>
            </ul>
          </div>

          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Useful next steps</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              If your setup is not this simple, or you want to compare the result with housing costs, these pages are
              the most useful next click.
            </p>
            <div className="mt-5 grid gap-3">
              <Link
                href="/salary-calculator-uk"
                className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                Open the full UK Salary Calculator
              </Link>
              <Link
                href="/rent-affordability-calculator-uk"
                className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                Check rent affordability
              </Link>
              <Link
                href="/take-home-pay-calculator-uk"
                className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                Focus on monthly take-home pay
              </Link>
            </div>
          </div>
        </div>

        <section className="body-copy mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 shadow-[0_14px_32px_rgba(2,6,23,0.24)] backdrop-blur-xl">
          These results are estimates only and should not be treated as financial, tax, legal or professional advice.
        </section>
      </section>
    </div>
  );
}
