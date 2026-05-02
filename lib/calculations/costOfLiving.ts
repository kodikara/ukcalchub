export type HouseholdType = "single" | "couple" | "family";
export type LocationType = "london" | "southEast" | "city" | "rural";

export type CostOfLivingInputs = {
  householdType: HouseholdType;
  locationType: LocationType;
  rent: number;
  councilTax: number;
  bills: number;
  food: number;
  transport: number;
  childcare: number;
  other: number;
};

export type CostOfLivingResult = {
  monthlyTotal: number;
  benchmarkMonthlyTotal: number;
  yearlyTotal: number;
  adjustedMonthlyTotal: number;
  categoryBreakdown: {
    label: string;
    value: number;
    benchmark: number;
  }[];
};

const householdBaseCosts: Record<
  HouseholdType,
  { rent: number; councilTax: number; bills: number; food: number; transport: number; childcare: number; other: number }
> = {
  single: { rent: 850, councilTax: 150, bills: 220, food: 260, transport: 120, childcare: 0, other: 180 },
  couple: { rent: 1_100, councilTax: 165, bills: 300, food: 430, transport: 220, childcare: 0, other: 280 },
  family: { rent: 1_450, councilTax: 175, bills: 380, food: 620, transport: 260, childcare: 650, other: 360 },
};

const locationCostAdjustments: Record<
  LocationType,
  { rent: number; councilTax: number; bills: number; food: number; transport: number; childcare: number; other: number }
> = {
  london: { rent: 1.5, councilTax: 0.96, bills: 1.05, food: 1.12, transport: 1.3, childcare: 1.15, other: 1.08 },
  southEast: { rent: 1.25, councilTax: 1.04, bills: 1.03, food: 1.05, transport: 1.1, childcare: 1.08, other: 1.03 },
  city: { rent: 1, councilTax: 1, bills: 1, food: 1, transport: 1, childcare: 1, other: 1 },
  rural: { rent: 0.9, councilTax: 1.06, bills: 1.02, food: 0.98, transport: 1.08, childcare: 0.95, other: 0.96 },
};

export function calculateCostOfLiving(inputs: CostOfLivingInputs): CostOfLivingResult {
  const householdBenchmarks = householdBaseCosts[inputs.householdType];
  const locationAdjustments = locationCostAdjustments[inputs.locationType];

  const categoryBreakdown = [
    {
      label: "Rent or mortgage",
      value: Math.max(0, inputs.rent),
      benchmark: householdBenchmarks.rent * locationAdjustments.rent,
    },
    {
      label: "Council Tax",
      value: Math.max(0, inputs.councilTax),
      benchmark: householdBenchmarks.councilTax * locationAdjustments.councilTax,
    },
    { label: "Bills", value: Math.max(0, inputs.bills), benchmark: householdBenchmarks.bills * locationAdjustments.bills },
    { label: "Food", value: Math.max(0, inputs.food), benchmark: householdBenchmarks.food * locationAdjustments.food },
    {
      label: "Transport",
      value: Math.max(0, inputs.transport),
      benchmark: householdBenchmarks.transport * locationAdjustments.transport,
    },
    {
      label: "Childcare",
      value: Math.max(0, inputs.childcare),
      benchmark: householdBenchmarks.childcare * locationAdjustments.childcare,
    },
    { label: "Other", value: Math.max(0, inputs.other), benchmark: householdBenchmarks.other * locationAdjustments.other },
  ];

  const monthlyTotal = categoryBreakdown.reduce((sum, item) => sum + item.value, 0);
  const benchmarkMonthlyTotal = categoryBreakdown.reduce((sum, item) => sum + item.benchmark, 0);
  const adjustedMonthlyTotal = Math.round(
    categoryBreakdown.reduce((sum, item) => sum + Math.max(item.value, item.benchmark), 0) * 100,
  ) / 100;

  return {
    monthlyTotal,
    benchmarkMonthlyTotal: Math.round(benchmarkMonthlyTotal * 100) / 100,
    yearlyTotal: adjustedMonthlyTotal * 12,
    adjustedMonthlyTotal,
    categoryBreakdown,
  };
}
