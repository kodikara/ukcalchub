"use client";

import Link from "next/link";
import { BarChart } from "@/components/BarChart";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { FaqSchema } from "@/components/FaqSchema";
import { CheckboxField, InputField, SelectField } from "@/components/FormField";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RealWorldScenarioCard } from "@/components/RealWorldScenarioCard";
import {
  calculateSalary,
  type PensionMethod,
  type ResultPeriod,
  type StudentLoanPlan,
  type TaxRegion,
  valueForPeriod,
} from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";
import { SourceLinks } from "@/components/SourceLinks";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { taxCodeOptions } from "@/lib/taxCodes";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";
import { booleanField, decimalField, enumField, stringField, useShareableCalculatorState } from "@/lib/shareableCalculatorState";

const faqs = [
  {
    question: "Is this UK salary calculator exact?",
    answer:
      "No. It is designed as a useful estimate using simplified UK tax, National Insurance, pension and student loan logic rather than a full payroll engine.",
  },
  {
    question: "Why is my payslip different from the calculator?",
    answer:
      "Real payroll can differ because of tax code adjustments, salary sacrifice, payroll timing, overtime, benefits, pension method and other employer-specific settings.",
  },
  {
    question: "Does this include pension contributions?",
    answer:
      "Yes. You can add a pension contribution percentage and the calculator includes that amount in the deductions breakdown.",
  },
  {
    question: "Does this include student loan deductions?",
    answer:
      "Yes. Choose the relevant plan and the estimate applies the current simplified yearly threshold and repayment rate for that plan.",
  },
  {
    question: "Does this work for Scotland?",
    answer:
      "Yes. You can switch the tax region to Scotland and the calculator will use Scottish income tax bands while keeping National Insurance UK-wide.",
  },
  {
    question: "Can I use this salary calculator for weekly pay?",
    answer:
      "Yes. Switch the result view to weekly if you want a rough weekly equivalent of the annual breakdown.",
  },
  {
    question: "Does this cover every tax code situation?",
    answer:
      "No. It supports common standard, K, 0T, BR, D0, D1 and NT-style tax code patterns, but real payroll can still include additional employer-specific adjustments.",
  },
];

const officialSourceLinks = [
  {
    label: "Income Tax rates and allowances",
    href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
    note: "Useful for checking the broad tax bands and allowances that underpin take-home pay estimates.",
  },
  {
    label: "National Insurance: how much you pay",
    href: "https://www.gov.uk/national-insurance/how-much-you-pay",
    note: "Explains who pays National Insurance and how employee contributions work.",
  },
  {
    label: "Student loan repayments: what you pay",
    href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay",
    note: "Helps confirm plan thresholds and repayment rates for student loan deductions.",
  },
  {
    label: "Scottish Income Tax",
    href: "https://www.gov.uk/scottish-income-tax",
    note: "Relevant if you are comparing Scottish tax treatment with the rest of the UK.",
  },
] as const;

const relatedLinks = [
  {
    title: "Take-Home Pay Calculator",
    description: "Focus on monthly net pay if you mainly care about what lands in your bank account.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "Salary + Rent Calculator",
    description: "See whether a given rent still looks workable once your estimated take-home pay is compared with monthly costs.",
    href: "/salary-rent-affordability-calculator-uk",
  },
  {
    title: "Pension Contribution Calculator",
    description: "See how different pension percentages can affect take-home pay and total pension value.",
    href: "/pension-contribution-calculator-uk",
  },
  {
    title: "Rent Affordability Calculator",
    description: "Use your estimated take-home pay to judge whether rent feels comfortable after council tax and other costs.",
    href: "/rent-affordability-calculator-uk",
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare salary take-home with broader monthly household costs including council tax and real UK expenses.",
    href: "/cost-of-living-calculator-uk",
  },
] as const;

type SalaryCalculatorState = {
  annualSalary: number;
  pensionPercent: number;
  pensionMethod: PensionMethod;
  studentLoanPlan: StudentLoanPlan;
  hasPostgraduateLoan: boolean;
  taxRegion: TaxRegion;
  taxCode: string;
  period: ResultPeriod;
};

const salaryCalculatorFields = {
  annualSalary: decimalField(45_000, "salary"),
  pensionPercent: decimalField(5, "pension"),
  pensionMethod: enumField<PensionMethod>("netPay", ["netPay", "salarySacrifice"], "pensionMethod"),
  studentLoanPlan: enumField<StudentLoanPlan>("plan2", ["none", "plan1", "plan2", "plan4", "plan5"], "loan"),
  hasPostgraduateLoan: booleanField(false, "pg"),
  taxRegion: enumField<TaxRegion>("rUK", ["rUK", "scotland"], "region"),
  taxCode: stringField("1257L", "code"),
  period: enumField<ResultPeriod>("monthly", ["yearly", "monthly", "weekly"], "view"),
} as const;

export function SalaryCalculator() {
  const { state, setField } = useShareableCalculatorState<SalaryCalculatorState>(salaryCalculatorFields);
  const { annualSalary, pensionPercent, pensionMethod, studentLoanPlan, hasPostgraduateLoan, taxRegion, taxCode, period } = state;

  const breakdown = calculateSalary({
    annualSalary,
    pensionPercent,
    pensionMethod,
    studentLoanPlan,
    hasPostgraduateLoan,
    taxRegion,
    taxCode,
  });

  const mainValue = formatCurrency(valueForPeriod(breakdown.takeHomeAnnual, period), true);
  const labelSuffix = period === "yearly" ? "per year" : period === "monthly" ? "per month" : "per week";

  const donutData = [
    { name: "Take-home pay", value: breakdown.takeHomeAnnual, color: "#10b981" },
    { name: "Income tax", value: breakdown.incomeTaxAnnual, color: "#fb7185" },
    { name: "National Insurance", value: breakdown.nationalInsuranceAnnual, color: "#22d3ee" },
    { name: "Pension", value: breakdown.pensionAnnual, color: "#8b5cf6" },
    { name: "Student loan", value: breakdown.studentLoanAnnual, color: "#f59e0b" },
    { name: "Postgraduate loan", value: breakdown.postgraduateLoanAnnual, color: "#ef4444" },
  ];

  const barData = [
    { label: "Gross income", value: breakdown.grossAnnual, color: "#0ea5e9" },
    { label: "Deductions", value: breakdown.totalDeductionsAnnual, color: "#fb7185" },
    { label: "Take-home", value: breakdown.takeHomeAnnual, color: "#14b8a6" },
  ];

  const salaryNotes = [
    annualSalary > 50_270
      ? "Part of this salary sits above the basic-rate threshold, so a slice of your income is being taxed at the higher rate."
      : "This salary stays fully inside the basic-rate band after the personal allowance is applied, so no higher-rate tax is being estimated.",
    pensionMethod === "salarySacrifice"
      ? "Salary sacrifice is lowering taxable pay before some deductions are worked out, which usually makes the take-home result a bit more efficient."
      : "The estimate is treating pension as a net pay arrangement, so it reduces taxable pay for income tax but not in the same way as salary sacrifice.",
    studentLoanPlan !== "none"
      ? `A ${studentLoanPlan.replace("plan", "Plan ")} student loan deduction is included, which is one of the most common reasons take-home pay looks lower than a simple tax-only example.`
      : "No undergraduate student loan deduction is included here, so the result reflects only tax, National Insurance and pension settings.",
    taxCode !== "1257L"
      ? `This estimate uses the ${taxCode} tax code rather than the common 1257L baseline, so the final take-home figure is being adjusted away from the standard allowance pattern.`
      : "The result is using the common 1257L baseline, which is a sensible planning assumption for many employees with one main job.",
  ];

  return (
    <>
      <FaqSchema faqs={faqs} id="faq-schema-salary-calculator" />
      <CalculatorShell
      title="UK Salary Calculator"
      intro="Estimate your UK take-home pay after income tax, National Insurance, pension contributions and student loan deductions."
      experienceLine="Built using real UK scenarios including rent, council tax, bills and everyday expenses."
      taxYearBadge={CURRENT_TAX_YEAR_LABEL}
      methodologyNote="Updated for UK tax year 2026/27. Based on HMRC tax bands, National Insurance thresholds and commonly seen UK living-cost patterns people compare against their take-home pay."
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
            label="Pension contribution percentage"
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
            label="Pension method"
            hint="Changes how deductions affect take-home pay"
            value={pensionMethod}
            onChange={(event) => setField("pensionMethod", event.target.value as PensionMethod)}
          >
            <option value="netPay">Net pay arrangement</option>
            <option value="salarySacrifice">Salary sacrifice</option>
          </SelectField>
          <SelectField
            label="Student loan plan"
            hint="Undergraduate repayment plan"
            value={studentLoanPlan}
            onChange={(event) => setField("studentLoanPlan", event.target.value as StudentLoanPlan)}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
          </SelectField>
          <CheckboxField
            label="Also repay a postgraduate loan"
            hint="Adds a separate 6% deduction above the postgraduate threshold."
            checked={hasPostgraduateLoan}
            onChange={(value) => setField("hasPostgraduateLoan", value)}
          />
          <SelectField
            label="Tax region"
            hint="Income tax bands"
            value={taxRegion}
            onChange={(event) => setField("taxRegion", event.target.value as TaxRegion)}
          >
            <option value="rUK">England, Wales and Northern Ireland</option>
            <option value="scotland">Scotland</option>
          </SelectField>
          <SelectField
            label="Tax code"
            hint="Choose a common UK tax code"
            value={taxCode}
            onChange={(event) => setField("taxCode", event.target.value)}
          >
            {taxCodeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <div>
            <label className="mb-3 block text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Result view</label>
            <div className="pill-toggle">
              {(["yearly", "monthly", "weekly"] as ResultPeriod[]).map((value) => (
                <button key={value} type="button" data-active={period === value} onClick={() => setField("period", value)}>
                  {value[0].toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            Assumptions: simplified UK payroll logic for the current tax year from 6 April 2026 to 5 April 2027, using local TypeScript functions with no external API calls.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated take-home pay"
            title={`Your take-home pay ${labelSuffix}`}
            value={mainValue}
            detail="This is a simplified estimate using local TypeScript logic, intended to give a quick, visual picture of your likely net pay."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Gross salary" value={formatCurrency(valueForPeriod(breakdown.grossAnnual, period), true)} />
            <StatCard label="Income tax" value={formatCurrency(valueForPeriod(breakdown.incomeTaxAnnual, period), true)} />
            <StatCard
              label="National Insurance"
              value={formatCurrency(valueForPeriod(breakdown.nationalInsuranceAnnual, period), true)}
            />
            <StatCard label="Pension" value={formatCurrency(valueForPeriod(breakdown.pensionAnnual, period), true)} />
            <StatCard
              label="Student loan"
              value={formatCurrency(valueForPeriod(breakdown.studentLoanAnnual, period), true)}
            />
            <StatCard
              label="Postgraduate loan"
              value={formatCurrency(valueForPeriod(breakdown.postgraduateLoanAnnual, period), true)}
            />
            <StatCard
              label="Total deductions"
              value={formatCurrency(valueForPeriod(breakdown.totalDeductionsAnnual, period), true)}
            />
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SectionCard title="Breakdown" description="See where your gross income goes across your main deductions.">
              <DonutChart data={donutData} />
            </SectionCard>
            <SectionCard title="Income vs deductions" description="A quick annual comparison between earnings, deductions and net pay.">
              <BarChart data={barData} />
            </SectionCard>
          </div>
        </>
      }
      explanation={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What this salary result means</h2>
          <p className="text-sm leading-6 text-slate-400">
            This calculator starts with your gross annual salary, then estimates the main payroll deductions so you can
            compare yearly, monthly or weekly take-home pay more confidently.
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Gross salary is your pay before deductions.</li>
            <li>Take-home pay is the amount left after estimated tax, National Insurance, pension and student loan deductions.</li>
            <li>The period toggle lets you compare the same annual result as a yearly, monthly or weekly figure.</li>
            <li>Current model: UK tax year 6 April 2026 to 5 April 2027 using local TypeScript logic.</li>
          </ul>
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm leading-6 text-slate-300">
            Popular salary examples:
            {" "}
            <a className="text-cyan-300 hover:text-cyan-200" href="/salary-after-tax-30000-uk">£30,000</a>,
            {" "}
            <a className="text-cyan-300 hover:text-cyan-200" href="/salary-after-tax-40000-uk">£40,000</a>,
            {" "}
            <a className="text-cyan-300 hover:text-cyan-200" href="/salary-after-tax-50000-uk">£50,000</a>,
            {" "}
            <a className="text-cyan-300 hover:text-cyan-200" href="/salary-after-tax-60000-uk">£60,000</a>.
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Why this result looks like this</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              {salaryNotes.map((note) => (
                <li key={note} className="list-disc pl-1 ml-4">
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
            <h3 className="text-xl font-semibold tracking-tight text-white">What this means in real life</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              At salaries around £40k to £50k, take-home pay typically lands somewhere between about £2,600 and
              £3,000 per month depending on pension, tax code and student loan settings.
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              <li>Housing commonly takes 30% to 45% of net pay in many UK cases.</li>
              <li>Council tax and household bills often add another £250 to £400 per month.</li>
              <li>Food, commuting and day-to-day spending can easily push another £500 or more through the budget.</li>
              <li>This is why two people on a similar salary can experience very different financial flexibility.</li>
            </ul>
          </div>
        </div>
      }
      example={
        <div className="space-y-4">
          <RealWorldScenarioCard
            title="Real UK Example"
            intro="Single professional budgeting in the UK with the kind of monthly outgoings people commonly compare against take-home pay."
            items={[
              { label: "Rent", value: "£1,325 / month", note: "Shared contribution can still feel closer to about £675 in some households." },
              { label: "Bills", value: "£230 / month", note: "Electricity, gas, water and core utilities." },
              { label: "Council tax", value: "£260 / month", note: "Paid separately rather than hidden inside other costs." },
              { label: "Fuel / transport", value: "£160 / month" },
              { label: "Groceries", value: "£400 / month" },
              { label: "Overseas support", value: "£300 / month", note: "Family support is a real affordability factor in many cases." },
              { label: "Online purchases", value: "£100 / month" },
              { label: "Leisure", value: "£150 / month" },
            ]}
            summary={
              <>
                Total typical monthly outgoings often land around <strong>£2,000 to £2,300</strong> depending on
                lifestyle. This kind of scenario shows why a solid salary can still feel tighter than people expect
                once rent, council tax, transport and family commitments all arrive together.
              </>
            }
          />
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Common patterns we see</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              <li>Many users underestimate how quickly council tax and utility bills can narrow the gap after rent.</li>
              <li>Rent usually remains the single largest outgoing even before groceries, transport and subscriptions are counted.</li>
              <li>Small pension contributions reduce take-home slightly today, but they improve the long-term financial position.</li>
              <li>Overseas family support or other ongoing commitments can significantly change what feels affordable.</li>
            </ul>
          </div>
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Tax code differences can raise or lower the allowance used by your employer.</li>
            <li>Pension method matters because salary sacrifice and net pay arrangements affect deductions differently.</li>
            <li>Bonus or overtime can push individual pay periods into different deduction levels.</li>
            <li>Payroll timing can create differences between monthly and cumulative tax treatment.</li>
            <li>Benefits, post-tax deductions and employer-specific payroll settings can change the final payslip.</li>
            <li>Scottish income tax bands differ from the rest of the UK.</li>
            <li>In real situations, it is usually safer to budget slightly above the calculator output, especially for energy, council tax and transport.</li>
          </ul>
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm leading-6 text-slate-300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Practical note</h3>
            <p className="mt-2">
              If you are using this salary result to judge rent, lifestyle or savings goals, it often helps to compare
              it with our broader housing and living-cost tools rather than relying on the salary number in isolation.
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
          <Link
            href="/why-is-my-payslip-different-from-salary-calculator-uk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Read why your payslip may differ
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      }
      resources={
        <SourceLinks
          title="Official sources"
          description="These GOV.UK pages are useful if you want to compare the estimate with the official rules and guidance behind income tax, National Insurance and student loan deductions."
          links={[...officialSourceLinks]}
        />
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These calculators usually make the next step easier once you have a salary estimate."
        />
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="These estimates use simplified UK tax assumptions for the tax year running from 6 April 2026 to 5 April 2027 and are for guidance only. They are not a substitute for payroll software, employer payslips or professional advice."
      />
    </>
  );
}
