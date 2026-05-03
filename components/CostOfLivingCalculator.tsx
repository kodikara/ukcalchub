"use client";

import Link from "next/link";
import { BarChart } from "@/components/BarChart";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DonutChart } from "@/components/DonutChart";
import { FAQ } from "@/components/FAQ";
import { FaqSchema } from "@/components/FaqSchema";
import { InputField, SearchableSelectField, SelectField } from "@/components/FormField";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ResultCard } from "@/components/ResultCard";
import { RealWorldScenarioCard } from "@/components/RealWorldScenarioCard";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { councilTaxBandOptions, councilTaxValueForBand, type CouncilTaxBand } from "@/lib/councilTax";
import { calculateCostOfLiving, type HouseholdType, type LocationType } from "@/lib/calculations/costOfLiving";
import { formatCurrency } from "@/lib/format";
import { decimalField, enumField, useShareableCalculatorState } from "@/lib/shareableCalculatorState";

const faqs = [
  {
    question: "Is council tax included in this calculator?",
    answer:
      "Yes. You can enter your monthly council tax directly or use the optional council tax band dropdown to auto-fill a simple monthly estimate.",
  },
  {
    question: "How much is council tax in the UK?",
    answer:
      "Council tax varies by local authority and band, so there is no single UK-wide amount. Band D is often used as a broad reference point, but your local bill may be higher or lower.",
  },
  {
    question: "Do all cost-of-living calculators include council tax?",
    answer:
      "No. Many budget tools leave council tax inside a general bills or other category, which can make the total look lower than the real monthly picture.",
  },
  {
    question: "Why does my real cost differ from this estimate?",
    answer:
      "Local council tax rates, household size, transport needs, lifestyle choices and the exact mix of your regular bills can all shift the final monthly total.",
  },
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
  {
    question: "Why is this a planning total instead of just my entered total?",
    answer:
      "The planning total compares your entries with a simple location benchmark and uses the higher figure in each category to give a more cautious estimate.",
  },
  {
    question: "Can I use this for London and other UK regions?",
    answer:
      "Yes. The location profile is broad rather than postcode-specific, but it is designed to highlight how costs can shift between London, the South East and other parts of the UK.",
  },
  {
    question: "Is this meant for exact budgeting?",
    answer:
      "It is best used for planning and comparison. Exact budgets still depend on your tenancy, mortgage, commuting pattern, family setup and lifestyle.",
  },
];

const locationOptions = [
  { label: "London", value: "london" },
  { label: "South East", value: "southEast" },
  { label: "Other UK city", value: "city" },
  { label: "Town / rural", value: "rural" },
] as const;

const relatedLinks = [
  {
    title: "Take-Home Pay Calculator",
    description: "Compare your estimated monthly net pay with the living-cost total from this page.",
    href: "/take-home-pay-calculator-uk",
  },
  {
    title: "Salary Calculator",
    description: "Useful if you still need to convert gross salary into a broader deduction breakdown first.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Rent Affordability Calculator",
    description: "See whether housing costs feel comfortable once council tax and your other monthly costs are included.",
    href: "/rent-affordability-calculator-uk",
  },
  {
    title: "Mortgage Affordability Calculator",
    description: "Helpful if you want to compare a possible mortgage with wider monthly household spending.",
    href: "/mortgage-affordability-calculator-uk",
  },
] as const;

type CostOfLivingState = {
  householdType: HouseholdType;
  locationType: LocationType;
  councilTaxBand: CouncilTaxBand;
  rent: number;
  councilTax: number;
  bills: number;
  food: number;
  transport: number;
  childcare: number;
  other: number;
};

const locationTypes: LocationType[] = ["london", "southEast", "city", "rural"];
const householdTypes: HouseholdType[] = ["single", "couple", "family"];
const councilTaxBands = councilTaxBandOptions.map((option) => option.value) as CouncilTaxBand[];

const costOfLivingFields = {
  householdType: enumField<HouseholdType>("single", householdTypes, "household"),
  locationType: enumField<LocationType>("city", locationTypes, "location"),
  councilTaxBand: enumField<CouncilTaxBand>("", councilTaxBands, "councilBand"),
  rent: decimalField(900, "rent"),
  councilTax: decimalField(0, "councilTax"),
  bills: decimalField(240, "bills"),
  food: decimalField(300, "food"),
  transport: decimalField(160, "transport"),
  childcare: decimalField(0, "childcare"),
  other: decimalField(220, "other"),
} as const;

export function CostOfLivingCalculator() {
  const { state, setField } = useShareableCalculatorState<CostOfLivingState>(costOfLivingFields);
  const { householdType, locationType, councilTaxBand, rent, councilTax, bills, food, transport, childcare, other } = state;

  const result = calculateCostOfLiving({
    householdType,
    locationType,
    rent,
    councilTax,
    bills,
    food,
    transport,
    childcare,
    other,
  });

  const donutData = [
    { name: "Rent or mortgage", value: Math.max(rent, result.categoryBreakdown[0]?.benchmark ?? 0), color: "#3b82f6" },
    { name: "Council Tax", value: Math.max(councilTax, result.categoryBreakdown[1]?.benchmark ?? 0), color: "#64748b" },
    { name: "Bills", value: Math.max(bills, result.categoryBreakdown[2]?.benchmark ?? 0), color: "#38bdf8" },
    { name: "Food", value: Math.max(food, result.categoryBreakdown[3]?.benchmark ?? 0), color: "#6366f1" },
    { name: "Transport", value: Math.max(transport, result.categoryBreakdown[4]?.benchmark ?? 0), color: "#8b5cf6" },
    { name: "Childcare", value: Math.max(childcare, result.categoryBreakdown[5]?.benchmark ?? 0), color: "#f59e0b" },
    { name: "Other", value: Math.max(other, result.categoryBreakdown[6]?.benchmark ?? 0), color: "#f97316" },
  ];

  const barData = [
    { label: "Monthly", value: result.adjustedMonthlyTotal, color: "#14b8a6" },
    { label: "Yearly", value: result.yearlyTotal, color: "#2563eb" },
  ];

  return (
    <>
      <FaqSchema faqs={faqs} id="faq-schema-cost-of-living" />
      <CalculatorShell
      title="UK Cost of Living Calculator"
      intro="Estimate monthly UK living costs for individuals and families."
      experienceLine="Built using real UK scenarios including rent, council tax, bills and everyday expenses."
      trustNote="This calculator includes council tax and common UK household costs to give a more realistic monthly estimate."
      taxYearBadge="Updated for UK tax year 2026/27"
      methodologyNote="Based on HMRC tax bands, National Insurance thresholds and typical UK cost ranges. The spending side is designed for realistic planning rather than an exact forecast."
      form={
        <div className="space-y-5">
          <SelectField
            label="Household type"
            hint="Who the estimate is for"
            value={householdType}
            onChange={(event) => setField("householdType", event.target.value as HouseholdType)}
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
            onChange={(value) => setField("locationType", value as LocationType)}
            placeholder="Choose a location profile"
          />
          {[
            ["Rent/mortgage", rent, "rent"],
          ].map(([label, value, key]) => (
            <InputField
              key={label as string}
              label={label as string}
              prefix="£"
              type="number"
              min="0"
              step="50"
              inputMode="decimal"
              value={value as number}
              onChange={(event) => setField(key as keyof CostOfLivingState, Number(event.target.value) as never)}
            />
          ))}
          <SelectField
            label="Council Tax Band (optional)"
            hint="Auto-fills a simple monthly estimate"
            value={councilTaxBand}
            onChange={(event) => {
              const band = event.target.value as CouncilTaxBand;
              setField("councilTaxBand", band);
              setField("councilTax", councilTaxValueForBand(band));
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
            onChange={(event) => setField("councilTax", Number(event.target.value))}
          />
          {[
            ["Bills", bills, "bills"],
            ["Food", food, "food"],
            ["Transport", transport, "transport"],
            ["Childcare", childcare, "childcare"],
            ["Other", other, "other"],
          ].map(([label, value, key]) => (
            <InputField
              key={label as string}
              label={label as string}
              prefix="£"
              type="number"
              min="0"
              step="50"
              inputMode="decimal"
              value={value as number}
              onChange={(event) => setField(key as keyof CostOfLivingState, Number(event.target.value) as never)}
            />
          ))}
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            This version applies a broad location and household adjustment so you can compare everyday scenarios quickly, with council tax included as its own monthly cost.
          </div>
        </div>
      }
      results={
        <>
          <ResultCard
            eyebrow="Estimated total"
            title="Suggested monthly planning cost"
            value={formatCurrency(result.adjustedMonthlyTotal, true)}
            detail="This planning total compares your own monthly figures with a simple UK benchmark for your household and location, then uses the higher number in each category."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Your monthly total" value={formatCurrency(result.monthlyTotal, true)} hint="Based only on the amounts you entered" />
            <StatCard label="Benchmark monthly total" value={formatCurrency(result.benchmarkMonthlyTotal, true)} hint="A broad UK reference for this household and location" />
            <StatCard label="Planning monthly total" value={formatCurrency(result.adjustedMonthlyTotal, true)} hint="Uses the higher of your figure or the benchmark in each category" />
            <StatCard label="Planning yearly total" value={formatCurrency(result.yearlyTotal, true)} hint="Planning monthly total multiplied by 12" />
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
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
            <h3 className="text-xl font-semibold tracking-tight text-white">What this means in real life</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              At salaries around £40k to £50k, take-home pay typically sits somewhere between roughly £2,600 and
              £3,000 per month in many UK cases.
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              <li>Housing often takes 30% to 45% of the monthly budget.</li>
              <li>Council tax and bills commonly add another £250 to £400.</li>
              <li>Food and transport can easily exceed £500 once commuting and grocery prices are counted.</li>
              <li>This often leaves less flexibility than the headline salary first suggests.</li>
            </ul>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4">
            <h3 className="text-xl font-semibold tracking-tight text-white">Common patterns we see</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              <li>Many users underestimate council tax and utility costs when first sketching a monthly budget.</li>
              <li>Rent or mortgage almost always consumes the largest share of household spending.</li>
              <li>Small pension contributions reduce take-home slightly, but they often improve the longer-term financial position.</li>
              <li>Overseas commitments or family support can materially affect affordability in real scenarios.</li>
            </ul>
          </div>
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
          <RealWorldScenarioCard
            title="Real UK Example"
            intro="A single professional in the UK with a realistic spread of recurring monthly costs."
            items={[
              { label: "Rent", value: "£1,325 / month", note: "Shared contribution can still bring the direct burden closer to around £675 in some situations." },
              { label: "Bills", value: "£230 / month", note: "Electricity, gas, water and other household utilities." },
              { label: "Council tax", value: "£260 / month", note: "Often forgotten in simpler online budget tools." },
              { label: "Fuel / transport", value: "£160 / month" },
              { label: "Groceries", value: "£400 / month" },
              { label: "Overseas support", value: "£300 / month" },
              { label: "Online purchases", value: "£100 / month" },
              { label: "Leisure / entertainment", value: "£150 / month" },
            ]}
            summary={
              <>
                Total typical monthly outgoings often land around <strong>£2,000 to £2,300</strong> depending on
                lifestyle. This shows why a decent income can still leave limited disposable room once the full monthly
                picture is counted.
              </>
            }
          />
        </div>
      }
      differences={
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why your real result may differ</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-400">
            <li>Actual housing costs and council tax can vary a lot even within the same broad region.</li>
            <li>Childcare, commuting, energy usage and household size can change monthly costs dramatically.</li>
            <li>This version uses broad UK planning benchmarks rather than postcode-level prices.</li>
            <li>It is designed to help with planning, not to predict exact future bills.</li>
          </ul>
          <div className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 text-sm leading-6 text-slate-300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Practical note</h3>
            <p className="mt-2">
              In real situations, it is usually safer to budget slightly above the calculated values, especially for
              energy and council tax because both can change by season and by location.
            </p>
            <div className="mt-3 flex flex-wrap gap-4">
              <Link href="/salary-calculator-uk" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                Compare costs with your salary
              </Link>
              <Link href="/rent-affordability-calculator-uk" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                See what rent you can afford on your salary
              </Link>
            </div>
          </div>
        </div>
      }
      related={
        <RelatedCalculators
          links={[...relatedLinks]}
          description="These related tools help once you want to compare living costs with income, rent or mortgage choices."
        />
      }
      faq={<><h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">FAQ</h2><FAQ items={faqs} /></>}
      disclaimer="This cost of living calculator is a simplified planning estimate. Actual household costs vary by tenancy, mortgage terms, family setup, lifestyle and local prices."
      />
    </>
  );
}
