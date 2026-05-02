export type RentInputs = {
  monthlyIncome: number;
  rent: number;
  councilTax: number;
  bills: number;
  food: number;
  transport: number;
  childcare: number;
  other: number;
  savingsGoal: number;
};

export type RentResult = {
  totalExpenses: number;
  remaining: number;
  remainingAfterSavingsGoal: number;
  rentPercent: number;
  essentialSpendPercent: number;
  status: "Comfortable" | "Tight" | "Risky";
};

export function calculateRentAffordability(inputs: RentInputs): RentResult {
  const monthlyIncome = Math.max(0, inputs.monthlyIncome);
  const totalExpenses =
    Math.max(0, inputs.rent) +
    Math.max(0, inputs.councilTax) +
    Math.max(0, inputs.bills) +
    Math.max(0, inputs.food) +
    Math.max(0, inputs.transport) +
    Math.max(0, inputs.childcare) +
    Math.max(0, inputs.other);
  const remaining = monthlyIncome - totalExpenses;
  const remainingAfterSavingsGoal = remaining - Math.max(0, inputs.savingsGoal);
  const rentPercent = monthlyIncome > 0 ? inputs.rent / monthlyIncome : 0;
  const essentialSpendPercent = monthlyIncome > 0 ? totalExpenses / monthlyIncome : 0;

  let status: RentResult["status"] = "Comfortable";

  if (rentPercent > 0.4 || remaining < 0 || remainingAfterSavingsGoal < -50) {
    status = "Risky";
  } else if (rentPercent > 0.3 || remainingAfterSavingsGoal < monthlyIncome * 0.1 || essentialSpendPercent > 0.85) {
    status = "Tight";
  }

  return {
    totalExpenses,
    remaining,
    remainingAfterSavingsGoal,
    rentPercent,
    essentialSpendPercent,
    status,
  };
}
