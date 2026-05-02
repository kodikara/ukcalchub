export type MortgageInputs = {
  annualIncome: number;
  secondIncome?: number;
  deposit: number;
  monthlyDebtPayments: number;
  interestRate: number;
  termYears: number;
};

export type MortgageResult = {
  totalIncome: number;
  maxLoanByIncome: number;
  maxLoanByPayment: number;
  recommendedLoan: number;
  recommendedPropertyPrice: number;
  estimatedMonthlyPayment: number;
  monthlyBudget: number;
  incomeMultiple: number;
  debtToIncomeRatio: number;
  status: "Strong" | "Cautious" | "Stretch";
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function presentValueOfAnnuity(payment: number, monthlyRate: number, months: number) {
  if (payment <= 0 || months <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return payment * months;
  }

  return payment * ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate);
}

function monthlyPaymentForLoan(principal: number, monthlyRate: number, months: number) {
  if (principal <= 0 || months <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return principal / months;
  }

  return principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
}

export function calculateMortgageAffordability(inputs: MortgageInputs): MortgageResult {
  const annualIncome = Math.max(0, inputs.annualIncome);
  const secondIncome = Math.max(0, inputs.secondIncome ?? 0);
  const totalIncome = annualIncome + secondIncome;
  const deposit = Math.max(0, inputs.deposit);
  const monthlyDebtPayments = Math.max(0, inputs.monthlyDebtPayments);
  const interestRate = Math.max(0, inputs.interestRate);
  const termYears = Math.max(1, inputs.termYears);

  const grossMonthlyIncome = totalIncome / 12;
  const debtToIncomeRatio = grossMonthlyIncome > 0 ? monthlyDebtPayments / grossMonthlyIncome : 0;

  let incomeMultiple = 4.5;
  if (debtToIncomeRatio > 0.18) {
    incomeMultiple = 3.8;
  } else if (debtToIncomeRatio > 0.1) {
    incomeMultiple = 4.2;
  }

  const monthlyBudget = Math.max(0, grossMonthlyIncome * 0.28 - monthlyDebtPayments);
  const monthlyRate = interestRate / 100 / 12;
  const months = termYears * 12;
  const maxLoanByIncome = totalIncome * incomeMultiple;
  const maxLoanByPayment = presentValueOfAnnuity(monthlyBudget, monthlyRate, months);
  const recommendedLoan = Math.max(0, Math.min(maxLoanByIncome, maxLoanByPayment));
  const recommendedPropertyPrice = recommendedLoan + deposit;
  const estimatedMonthlyPayment = monthlyPaymentForLoan(recommendedLoan, monthlyRate, months);

  let status: MortgageResult["status"] = "Strong";
  if (debtToIncomeRatio > 0.18 || recommendedLoan === maxLoanByIncome) {
    status = "Stretch";
  } else if (debtToIncomeRatio > 0.1 || interestRate >= 5.5) {
    status = "Cautious";
  }

  return {
    totalIncome: roundMoney(totalIncome),
    maxLoanByIncome: roundMoney(maxLoanByIncome),
    maxLoanByPayment: roundMoney(maxLoanByPayment),
    recommendedLoan: roundMoney(recommendedLoan),
    recommendedPropertyPrice: roundMoney(recommendedPropertyPrice),
    estimatedMonthlyPayment: roundMoney(estimatedMonthlyPayment),
    monthlyBudget: roundMoney(monthlyBudget),
    incomeMultiple,
    debtToIncomeRatio,
    status,
  };
}
