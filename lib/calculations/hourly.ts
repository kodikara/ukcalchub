export type HourlyInputs = {
  annualSalary: number;
  weeklyHours: number;
  daysPerWeek: number;
};

export type HourlyResult = {
  annualSalary: number;
  monthlySalary: number;
  weeklySalary: number;
  dailyRate: number;
  hourlyRate: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateHourlyRate(inputs: HourlyInputs): HourlyResult {
  const annualSalary = Math.max(0, inputs.annualSalary);
  const weeklyHours = Math.max(1, inputs.weeklyHours);
  const daysPerWeek = Math.max(1, inputs.daysPerWeek);
  const weeklySalary = annualSalary / 52;
  const dailyRate = weeklySalary / daysPerWeek;
  const hourlyRate = weeklySalary / weeklyHours;

  return {
    annualSalary: roundMoney(annualSalary),
    monthlySalary: roundMoney(annualSalary / 12),
    weeklySalary: roundMoney(weeklySalary),
    dailyRate: roundMoney(dailyRate),
    hourlyRate: roundMoney(hourlyRate),
  };
}
