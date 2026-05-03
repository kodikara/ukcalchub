import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BarChart } from "@/components/BarChart";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { calculateSalary, valueForPeriod } from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";
import { getSalaryAfterTaxCommonQuestions, getSalaryAfterTaxPageData } from "@/lib/salaryAfterTaxPages";

type SalaryAfterTaxLandingProps = {
  annualSalary: number;
};

export function SalaryAfterTaxLanding({ annualSalary }: SalaryAfterTaxLandingProps) {
  const content = getSalaryAfterTaxPageData(annualSalary);
  const commonQuestions = getSalaryAfterTaxCommonQuestions(annualSalary);
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
  const is45000Example = annualSalary === 45_000;
  const realExampleCurrent = is45000Example
    ? calculateSalary({
        annualSalary: 45_000,
        pensionPercent: 2,
        pensionMethod: "netPay",
        studentLoanPlan: "none",
        hasPostgraduateLoan: false,
        taxRegion: "rUK",
        taxCode: "1257L",
      })
    : null;
  const realExamplePrevious = is45000Example
    ? calculateSalary({
        annualSalary: 43_000,
        pensionPercent: 0,
        pensionMethod: "netPay",
        studentLoanPlan: "none",
        hasPostgraduateLoan: false,
        taxRegion: "rUK",
        taxCode: "1257L",
      })
    : null;

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
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Salary after tax guide" },
          ]}
        />
        <span className="eyebrow">Salary after tax guide</span>
        <h1 className="section-title font-semibold text-white">£{annualSalary.toLocaleString()} Salary After Tax UK</h1>
        <p className="body-copy max-w-3xl text-base leading-7 md:text-lg md:leading-8">
          {is45000Example
            ? "This page uses a real-world style example to show how a £45,000 salary looks with a small 2% pension contribution, alongside a previous £43,000 no-pension comparison."
            : `This example shows a simple UK take-home pay estimate for a £${annualSalary.toLocaleString()} salary using a standard 1257L tax code, no student loan, no pension deduction, and the rest-of-UK tax bands.`}
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-100">
            Estimate only. UK-focused. No sign-up required.
          </div>
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 text-sm font-medium text-emerald-100">
            {CURRENT_TAX_YEAR_LABEL}
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
            Based on HMRC tax bands and National Insurance thresholds
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
            <h2 className="text-2xl font-semibold tracking-tight text-white">About this salary</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">{content.about}</p>
          </div>

          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Common questions at this salary</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              {commonQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {is45000Example && realExampleCurrent && realExamplePrevious ? (
          <>
            <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Real Example: £45,000 Salary with 2% Pension</h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <p>
                  This example uses a gross salary of <strong>£45,000</strong> with a <strong>2% employee pension contribution</strong>,
                  standard <strong>1257L</strong> tax code, no student loan and the rest-of-UK tax bands. On those assumptions,
                  monthly take-home pay comes out at around <strong>{formatCurrency(valueForPeriod(realExampleCurrent.takeHomeAnnual, "monthly"), true)}</strong>,
                  after income tax, National Insurance and pension are taken off.
                </p>
                <p>
                  The pension deduction itself is small in monthly terms at about <strong>{formatCurrency(valueForPeriod(realExampleCurrent.pensionAnnual, "monthly"), true)}</strong>.
                  That means the immediate hit to monthly take-home is noticeable but not dramatic, while still building pension value in the background.
                </p>
                <p>
                  If you previously earned <strong>£43,000 with no pension</strong>, your take-home pay would look slightly stronger as a percentage of salary because
                  nothing extra is being diverted into retirement saving. Moving to <strong>£45,000 with a 2% pension</strong> means slightly less spendable money today,
                  but better long-term saving and a more rounded pay package.
                </p>
              </div>
            </div>

            <SectionCard
              title="£43,000 vs £45,000 comparison"
              description="A side-by-side view of how a modest salary increase can still feel softer in take-home terms once pension contributions are switched on."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Previous salary</div>
                  <div className="mt-3 text-3xl font-bold tracking-tight text-white">£43,000</div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <StatCard
                      label="Monthly take-home"
                      value={formatCurrency(valueForPeriod(realExamplePrevious.takeHomeAnnual, "monthly"), true)}
                    />
                    <StatCard
                      label="Pension contribution"
                      value={formatCurrency(valueForPeriod(realExamplePrevious.pensionAnnual, "monthly"), true)}
                    />
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-cyan-400/25 bg-cyan-400/8 p-5 shadow-[0_18px_44px_rgba(34,211,238,0.12)]">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan-200">Current salary</div>
                  <div className="mt-3 text-3xl font-bold tracking-tight text-white">£45,000</div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <StatCard
                      label="Monthly take-home"
                      value={formatCurrency(valueForPeriod(realExampleCurrent.takeHomeAnnual, "monthly"), true)}
                    />
                    <StatCard
                      label="Pension contribution"
                      value={formatCurrency(valueForPeriod(realExampleCurrent.pensionAnnual, "monthly"), true)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-emerald-400/20 bg-emerald-400/8 px-4 py-4 text-sm leading-6 text-emerald-100">
                Net monthly difference:{" "}
                <strong>
                  {formatCurrency(
                    valueForPeriod(realExampleCurrent.takeHomeAnnual, "monthly") -
                      valueForPeriod(realExamplePrevious.takeHomeAnnual, "monthly"),
                    true,
                  )}
                </strong>
                . Small pension contributions can slightly reduce take-home as a share of gross pay, but improve the long-term financial position.
              </div>
            </SectionCard>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">What this means in real life</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  On a £45,000 salary with roughly {formatCurrency(valueForPeriod(realExampleCurrent.takeHomeAnnual, "monthly"), true)} per month coming in, a
                  realistic UK monthly budget might include:
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  <li>Rent: £800 to £1,200</li>
                  <li>Council tax: £100 to £180</li>
                  <li>Bills: £150 to £250</li>
                </ul>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  After those essentials, many people would still have roughly <strong>£800 to £1,200</strong> left for groceries, transport, subscriptions,
                  savings and day-to-day life, depending on location and lifestyle.
                </p>
                <div className="mt-5">
                  <Link
                    href="/rent-affordability-calculator-uk"
                    className="text-cyan-300 transition hover:text-cyan-200"
                  >
                    See what rent you can afford on £45,000
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="/cost-of-living-calculator-uk"
                    className="text-cyan-300 transition hover:text-cyan-200"
                  >
                    Compare £45,000 with wider UK living costs
                  </Link>
                </div>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Insight</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  At salaries around £40,000 to £50,000, small changes in pension contributions or tax settings can
                  noticeably affect monthly take-home pay.
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Many people underestimate how even a 2% to 5% pension contribution changes the monthly figure,
                  especially once that sits alongside tax thresholds, council tax, rent and transport costs.
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  That is why a salary increase can feel smaller than expected in the bank account, even when it is still
                  a financially positive move overall.
                </p>
              </div>
            </div>

            <SectionCard
              title="Why your actual payslip may differ"
              description="A salary example is useful for planning, but real payroll can still move around depending on settings and timing."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ul className="space-y-3 text-sm leading-6 text-slate-400">
                  <li>Tax code changes</li>
                  <li>Pension type, especially salary sacrifice vs net pay</li>
                  <li>Bonuses or overtime</li>
                </ul>
                <ul className="space-y-3 text-sm leading-6 text-slate-400">
                  <li>Student loans</li>
                  <li>Mid-year salary changes</li>
                  <li>Payroll timing and employer-specific rounding</li>
                </ul>
              </div>
              <div className="mt-5">
                <BarChart
                  data={[
                    {
                      label: "£43k no pension",
                      value: valueForPeriod(realExamplePrevious.takeHomeAnnual, "monthly"),
                      color: "#3b82f6",
                    },
                    {
                      label: "£45k with 2% pension",
                      value: valueForPeriod(realExampleCurrent.takeHomeAnnual, "monthly"),
                      color: "#14b8a6",
                    },
                    {
                      label: "Monthly pension",
                      value: valueForPeriod(realExampleCurrent.pensionAnnual, "monthly"),
                      color: "#8b5cf6",
                    },
                  ]}
                />
              </div>
            </SectionCard>
          </>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">How this example is worked out</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {is45000Example
                ? "This page uses the same salary calculator logic as the main tool, but applies a standard 1257L tax code, no student loan and a 2% employee pension contribution for the featured £45,000 example. It then compares that with a simpler £43,000 no-pension setup to show how a small pension contribution changes the monthly picture."
                : "This page uses the main salary calculator logic with a standard 1257L tax code, no student loan, no pension deduction and the default rest-of-UK tax bands. It is designed to answer a common search quickly while still linking to the fuller calculator if your circumstances are different."}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <li>Tax year used: 6 April 2026 to 5 April 2027.</li>
              <li>Pension contributions are assumed to be {is45000Example ? "2% on the featured £45,000 comparison and 0% on the previous £43,000 comparison." : "0% for this example."}</li>
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
                See what rent you can afford on £45,000
              </Link>
              <Link
                href="/take-home-pay-calculator-uk"
                className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                Focus on monthly take-home pay
              </Link>
              <Link
                href="/cost-of-living-calculator-uk"
                className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                Compare with real UK living costs
              </Link>
            </div>
          </div>
        </div>

        <section className="body-copy mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 shadow-[0_14px_32px_rgba(2,6,23,0.24)] backdrop-blur-xl">
          These results are estimates only and should not be treated as financial, tax, legal or professional advice.
        </section>

        <section className="mt-8">
          <AuthorCard />
        </section>
      </section>
    </div>
  );
}
