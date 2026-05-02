import test from "node:test";
import assert from "node:assert/strict";

import { calculateCostOfLiving } from "../lib/calculations/costOfLiving.js";
import { calculateHourlyRate } from "../lib/calculations/hourly.js";
import { calculateMortgageAffordability } from "../lib/calculations/mortgage.js";
import { calculatePensionContribution } from "../lib/calculations/pension.js";
import { calculateRentAffordability } from "../lib/calculations/rent.js";
import { calculateSalary, valueForPeriod } from "../lib/calculations/salary.js";

test("salary calculation returns stable 2026/27-style breakdown", () => {
  const result = calculateSalary({
    annualSalary: 45000,
    pensionPercent: 5,
    pensionMethod: "netPay",
    studentLoanPlan: "plan2",
    hasPostgraduateLoan: false,
    taxRegion: "rUK",
    taxCode: "1257L",
  });

  assert.equal(result.grossAnnual, 45000);
  assert.equal(result.pensionAnnual, 2250);
  assert.equal(result.incomeTaxAnnual, 6036);
  assert.equal(result.nationalInsuranceAnnual, 2594.4);
  assert.equal(result.studentLoanAnnual, 1405.35);
  assert.equal(result.takeHomeAnnual, 32714.25);
  assert.equal(valueForPeriod(result.takeHomeAnnual, "monthly"), 2726.1875);
});

test("rent affordability includes council tax and savings goal separately", () => {
  const result = calculateRentAffordability({
    monthlyIncome: 2800,
    rent: 950,
    councilTax: 135,
    bills: 260,
    food: 320,
    transport: 160,
    childcare: 0,
    other: 250,
    savingsGoal: 200,
  });

  assert.equal(result.totalExpenses, 2075);
  assert.equal(result.remaining, 725);
  assert.equal(result.remainingAfterSavingsGoal, 525);
  assert.equal(result.status, "Tight");
});

test("cost of living calculation includes council tax benchmark and planning total", () => {
  const result = calculateCostOfLiving({
    householdType: "single",
    locationType: "city",
    rent: 900,
    councilTax: 120,
    bills: 240,
    food: 300,
    transport: 160,
    childcare: 0,
    other: 220,
  });

  assert.equal(result.monthlyTotal, 1940);
  assert.equal(result.benchmarkMonthlyTotal, 1780);
  assert.equal(result.adjustedMonthlyTotal, 1970);
  assert.equal(result.yearlyTotal, 23640);
  assert.equal(result.categoryBreakdown[1]?.label, "Council Tax");
  assert.equal(result.categoryBreakdown[1]?.benchmark, 150);
});

test("hourly calculator converts annual salary into hourly and monthly pay", () => {
  const result = calculateHourlyRate({
    annualSalary: 30000,
    hoursPerWeek: 37.5,
    weeksWorkedPerYear: 52,
  });

  assert.equal(result.annualSalary, 30000);
  assert.equal(result.monthlySalary, 2500);
  assert.equal(result.weeklySalary, 576.92);
  assert.equal(result.hourlyRate, 15.38);
});

test("mortgage affordability returns consistent borrowing estimate", () => {
  const result = calculateMortgageAffordability({
    annualIncome: 55000,
    secondIncome: 0,
    deposit: 30000,
    monthlyDebtPayments: 250,
    interestRate: 4.9,
    termYears: 30,
  });

  assert.equal(result.totalIncome, 55000);
  assert.equal(result.maxLoanByIncome, 247500);
  assert.equal(result.monthlyBudget, 1033.33);
  assert.equal(result.recommendedLoan, 194701.58);
  assert.equal(result.recommendedPropertyPrice, 224701.58);
  assert.equal(result.estimatedMonthlyPayment, 1033.33);
  assert.equal(result.status, "Strong");
});

test("pension contribution calculator compares with and without pension deductions", () => {
  const result = calculatePensionContribution({
    annualSalary: 45000,
    employeePercent: 5,
    employerPercent: 3,
    pensionMethod: "netPay",
    studentLoanPlan: "plan2",
    hasPostgraduateLoan: false,
    taxRegion: "rUK",
    taxCode: "1257L",
  });

  assert.equal(result.employeeAnnual, 2250);
  assert.equal(result.employerAnnual, 1350);
  assert.equal(result.totalAnnual, 3600);
  assert.equal(result.totalMonthly, 300);
  assert.equal(result.takeHomeImpactAnnual, 1800);
  assert.equal(result.taxSavedAnnual, 450);
  assert.equal(result.niSavedAnnual, 0);
  assert.equal(result.studentLoanSavedAnnual, 0);
});
