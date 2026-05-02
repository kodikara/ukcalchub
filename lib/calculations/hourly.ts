export type HourlyInputs = {
  annualSalary?: number;
  hourlyRate?: number;
  hoursPerWeek: number;
  weeksWorkedPerYear: number;
};

export type HourlyResult = {
  annualSalary: number;
  monthlySalary: number;
  weeklySalary: number;
  hourlyRate: number;
  weeksWorkedPerYear: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateHourlyRate(inputs: HourlyInputs): HourlyResult {
  const hoursPerWeek = Math.max(1, inputs.hoursPerWeek);
  const weeksWorkedPerYear = Math.max(1, inputs.weeksWorkedPerYear);
  const annualSalary =
    inputs.annualSalary !== undefined
      ? Math.max(0, inputs.annualSalary)
      : Math.max(0, (inputs.hourlyRate ?? 0) * hoursPerWeek * weeksWorkedPerYear);
  const weeklySalary = annualSalary / weeksWorkedPerYear;
  const hourlyRate =
    inputs.hourlyRate !== undefined ? Math.max(0, inputs.hourlyRate) : weeklySalary / hoursPerWeek;

  return {
    annualSalary: roundMoney(annualSalary),
    monthlySalary: roundMoney(annualSalary / 12),
    weeklySalary: roundMoney(weeklySalary),
    hourlyRate: roundMoney(hourlyRate),
    weeksWorkedPerYear: Math.round(weeksWorkedPerYear),
  };
}
