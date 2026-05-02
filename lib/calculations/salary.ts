export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5";
export type TaxRegion = "rUK" | "scotland";
export type ResultPeriod = "yearly" | "monthly" | "weekly";
export type PensionMethod = "netPay" | "salarySacrifice";

type TaxBand = {
  upTo: number;
  rate: number;
};

type TaxCodeMode = "standard" | "noTax" | "basicRate" | "higherRate" | "additionalRate" | "noAllowance";

export type SalaryInputs = {
  annualSalary: number;
  pensionPercent: number;
  pensionMethod: PensionMethod;
  studentLoanPlan: StudentLoanPlan;
  hasPostgraduateLoan: boolean;
  taxRegion: TaxRegion;
  taxCode: string;
};

export type SalaryBreakdown = {
  grossAnnual: number;
  taxableAnnual: number;
  niableAnnual: number;
  personalAllowance: number;
  incomeTaxAnnual: number;
  nationalInsuranceAnnual: number;
  pensionAnnual: number;
  studentLoanAnnual: number;
  postgraduateLoanAnnual: number;
  totalDeductionsAnnual: number;
  takeHomeAnnual: number;
  effectiveTaxCode: string;
};

const STANDARD_PERSONAL_ALLOWANCE = 12_570;

const REST_OF_UK_BANDS: TaxBand[] = [
  { upTo: 37_700, rate: 0.2 },
  { upTo: 125_140, rate: 0.4 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.45 },
];

const SCOTLAND_BANDS: TaxBand[] = [
  { upTo: 3_967, rate: 0.19 },
  { upTo: 16_956, rate: 0.2 },
  { upTo: 31_092, rate: 0.21 },
  { upTo: 62_430, rate: 0.42 },
  { upTo: 125_140, rate: 0.45 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.48 },
];

const STUDENT_LOAN_THRESHOLDS: Record<StudentLoanPlan, { threshold: number; rate: number }> = {
  none: { threshold: Number.POSITIVE_INFINITY, rate: 0 },
  plan1: { threshold: 26_900, rate: 0.09 },
  plan2: { threshold: 29_385, rate: 0.09 },
  plan4: { threshold: 33_795, rate: 0.09 },
  plan5: { threshold: 25_000, rate: 0.09 },
};

const POSTGRADUATE_THRESHOLD = 21_000;
const POSTGRADUATE_RATE = 0.06;

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function normaliseTaxCode(taxCode: string) {
  return taxCode.trim().toUpperCase().replace(/\s+/g, "");
}

function parseTaxCode(rawTaxCode: string): { allowance: number; mode: TaxCodeMode; code: string } {
  const raw = normaliseTaxCode(rawTaxCode);
  const taxCode = raw.replace(/(W1|M1|X|NONCUM)$/g, "");
  const regionalCode = taxCode.startsWith("S") || taxCode.startsWith("C") ? taxCode.slice(1) : taxCode;

  if (regionalCode === "NT") {
    return { allowance: 0, mode: "noTax", code: taxCode || "NT" };
  }

  if (regionalCode === "BR") {
    return { allowance: 0, mode: "basicRate", code: taxCode || "BR" };
  }

  if (regionalCode === "D0" || regionalCode === "SD0") {
    return { allowance: 0, mode: "higherRate", code: taxCode || "D0" };
  }

  if (regionalCode === "D1" || regionalCode === "SD1" || regionalCode === "SD2" || regionalCode === "SD3") {
    return { allowance: 0, mode: "additionalRate", code: taxCode || "D1" };
  }

  if (regionalCode === "0T") {
    return { allowance: 0, mode: "noAllowance", code: taxCode || "0T" };
  }

  const isKCode = regionalCode.startsWith("K");
  const digits = Number.parseInt(regionalCode.replace(/\D/g, ""), 10);

  if (Number.isNaN(digits) || digits <= 0) {
    return { allowance: STANDARD_PERSONAL_ALLOWANCE, mode: "standard", code: "1257L" };
  }

  return {
    allowance: isKCode ? digits * -10 : digits * 10,
    mode: "standard",
    code: taxCode || "1257L",
  };
}

function calculatePersonalAllowance(adjustedNetIncome: number, taxCodeAllowance: number, taxCodeMode: TaxCodeMode) {
  if (taxCodeMode !== "standard" || taxCodeAllowance <= 0) {
    return taxCodeAllowance;
  }

  if (adjustedNetIncome <= 100_000) {
    return taxCodeAllowance;
  }

  const taperedReduction = Math.floor((adjustedNetIncome - 100_000) / 2);
  return Math.max(0, Math.min(taxCodeAllowance, STANDARD_PERSONAL_ALLOWANCE) - taperedReduction);
}

function calculateBandTax(taxableIncome: number, bands: TaxBand[]) {
  let remaining = Math.max(0, taxableIncome);
  let lowerBound = 0;
  let totalTax = 0;

  for (const band of bands) {
    if (remaining <= 0) {
      break;
    }

    const bandWidth = band.upTo - lowerBound;
    const taxableInBand = Math.min(remaining, bandWidth);
    totalTax += taxableInBand * band.rate;
    remaining -= taxableInBand;
    lowerBound = band.upTo;
  }

  return roundMoney(totalTax);
}

function calculateIncomeTax(
  taxableAnnual: number,
  personalAllowance: number,
  taxRegion: TaxRegion,
  taxCodeMode: TaxCodeMode,
) {
  if (taxCodeMode === "noTax") {
    return 0;
  }

  if (taxCodeMode === "basicRate") {
    return roundMoney(Math.max(0, taxableAnnual) * 0.2);
  }

  if (taxCodeMode === "higherRate") {
    return roundMoney(Math.max(0, taxableAnnual) * 0.4);
  }

  if (taxCodeMode === "additionalRate") {
    return roundMoney(Math.max(0, taxableAnnual) * 0.45);
  }

  const taxableIncome = Math.max(0, taxableAnnual - personalAllowance);
  return calculateBandTax(taxableIncome, taxRegion === "scotland" ? SCOTLAND_BANDS : REST_OF_UK_BANDS);
}

function calculateNationalInsurance(niableAnnual: number) {
  const primaryThreshold = 12_570;
  const upperEarningsLimit = 50_270;

  if (niableAnnual <= primaryThreshold) {
    return 0;
  }

  const basicBand = Math.min(niableAnnual, upperEarningsLimit) - primaryThreshold;
  const upperBand = Math.max(0, niableAnnual - upperEarningsLimit);

  return roundMoney(basicBand * 0.08 + upperBand * 0.02);
}

function calculateStudentLoan(loanableAnnual: number, plan: StudentLoanPlan) {
  const { threshold, rate } = STUDENT_LOAN_THRESHOLDS[plan];
  return roundMoney(Math.max(0, loanableAnnual - threshold) * rate);
}

function calculatePostgraduateLoan(loanableAnnual: number, hasPostgraduateLoan: boolean) {
  if (!hasPostgraduateLoan) {
    return 0;
  }

  return roundMoney(Math.max(0, loanableAnnual - POSTGRADUATE_THRESHOLD) * POSTGRADUATE_RATE);
}

export function calculateSalary(inputs: SalaryInputs): SalaryBreakdown {
  const grossAnnual = Math.max(0, inputs.annualSalary);
  const pensionAnnual = roundMoney(grossAnnual * Math.max(0, inputs.pensionPercent) / 100);
  const salarySacrificePension = inputs.pensionMethod === "salarySacrifice" ? pensionAnnual : 0;
  const taxRelievedPension = pensionAnnual;
  const taxableBaseAnnual = Math.max(0, grossAnnual - salarySacrificePension);
  const incomeTaxableAnnual =
    inputs.pensionMethod === "netPay"
      ? Math.max(0, taxableBaseAnnual - taxRelievedPension)
      : taxableBaseAnnual;
  const parsedTaxCode = parseTaxCode(inputs.taxCode);
  const personalAllowance = calculatePersonalAllowance(
    incomeTaxableAnnual,
    parsedTaxCode.allowance,
    parsedTaxCode.mode,
  );
  const incomeTaxAnnual = calculateIncomeTax(
    incomeTaxableAnnual,
    personalAllowance,
    inputs.taxRegion,
    parsedTaxCode.mode,
  );
  const nationalInsuranceAnnual = calculateNationalInsurance(taxableBaseAnnual);
  const studentLoanAnnual = calculateStudentLoan(taxableBaseAnnual, inputs.studentLoanPlan);
  const postgraduateLoanAnnual = calculatePostgraduateLoan(taxableBaseAnnual, inputs.hasPostgraduateLoan);
  const totalDeductionsAnnual = roundMoney(
    incomeTaxAnnual + nationalInsuranceAnnual + pensionAnnual + studentLoanAnnual + postgraduateLoanAnnual,
  );
  const takeHomeAnnual = roundMoney(Math.max(0, grossAnnual - totalDeductionsAnnual));

  return {
    grossAnnual: roundMoney(grossAnnual),
    taxableAnnual: roundMoney(incomeTaxableAnnual),
    niableAnnual: roundMoney(taxableBaseAnnual),
    personalAllowance: roundMoney(personalAllowance),
    incomeTaxAnnual,
    nationalInsuranceAnnual,
    pensionAnnual,
    studentLoanAnnual,
    postgraduateLoanAnnual,
    totalDeductionsAnnual,
    takeHomeAnnual,
    effectiveTaxCode: parsedTaxCode.code,
  };
}

export function valueForPeriod(value: number, period: ResultPeriod) {
  if (period === "monthly") {
    return value / 12;
  }

  if (period === "weekly") {
    return value / 52;
  }

  return value;
}
