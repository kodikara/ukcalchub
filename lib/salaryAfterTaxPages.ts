import type { Metadata } from "next";
import { calculateSalary, valueForPeriod } from "@/lib/calculations/salary";
import { formatCurrency } from "@/lib/format";

export type SalaryAfterTaxPageData = {
  annualSalary: number;
  description: string;
  about: string;
  commonQuestions: string[];
};

const pageData: SalaryAfterTaxPageData[] = [
  {
    annualSalary: 25000,
    description:
      "See a simple UK take-home pay example for a £25,000 salary, including estimated tax, National Insurance and net monthly pay.",
    about:
      "£25,000 sits below the UK median full-time salary and is a common level for early-career roles, support positions and smaller-business jobs. At this income, all taxable earnings stay inside the basic rate band once the personal allowance is applied. That keeps the deduction pattern relatively simple and makes it a useful benchmark for everyday budgeting.",
    commonQuestions: [
      "Is £25,000 a good salary in the UK? It can be workable in many parts of the UK, but housing pressure and transport costs will make a big difference to how comfortable it feels.",
      "How much is £25,000 after tax per month? Using the standard assumptions on this page, the estimated take-home pay is {monthlyTakeHome} per month.",
      "What tax band is £25,000 in? It remains fully within the basic rate band after the personal allowance is used.",
    ],
  },
  {
    annualSalary: 28000,
    description:
      "Check an estimated UK take-home pay breakdown for a £28,000 salary, including income tax, National Insurance and monthly net pay.",
    about:
      "£28,000 is still within the basic rate band and is a typical salary point for progressing admin, operations, customer success and skilled support roles. It often represents the stage where monthly budgeting becomes less about minimum affordability and more about balancing rent, travel and saving. The tax structure is still straightforward because higher-rate tax does not apply at this level.",
    commonQuestions: [
      "Is £28,000 above the UK average? It is still below some published full-time averages, but it is a meaningful step above many entry-level salaries.",
      "How much is £28,000 after tax each month? Under the standard assumptions used here, take-home pay is about {monthlyTakeHome} per month.",
      "Does £28,000 trigger higher-rate tax? No. The taxable income stays within the basic rate band.",
    ],
  },
  {
    annualSalary: 30000,
    description:
      "See a simple UK take-home pay example for a £30,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£30,000 is close to the national full-time median in many UK conversations, which makes it one of the most searched salary examples. It is a common benchmark for graduate progression, public sector roles and established office jobs outside the highest-cost areas. At this income the tax position is still basic-rate only, so the main question for most people is how far the monthly take-home stretches against housing and bills.",
    commonQuestions: [
      "Is £30,000 a good salary in the UK? It is a reasonable benchmark salary in many parts of the UK, although London and other high-cost areas can still make it feel tight.",
      "How much is £30,000 after tax per month? Using the standard assumptions here, the estimated take-home pay is {monthlyTakeHome} per month.",
      "What tax band is £30,000 in? It falls fully inside the basic rate band once the personal allowance has been applied.",
    ],
  },
  {
    annualSalary: 32000,
    description:
      "Estimate take-home pay for a £32,000 salary in the UK, with a simple breakdown of tax, National Insurance and monthly net income.",
    about:
      "£32,000 is a common salary point for people moving beyond entry-level work into more established professional roles. It still sits comfortably inside the basic rate band, so the deduction profile remains relatively predictable. For many households, the bigger question at this level is not the tax band itself but how the resulting monthly pay compares with rent, council tax and commuting costs.",
    commonQuestions: [
      "Is £32,000 after tax enough for renting alone? It can be, but location matters a lot, especially once council tax and transport are added into the monthly picture.",
      "How much is £32,000 after tax per month? Under the standard assumptions on this page, the estimate is {monthlyTakeHome} per month.",
      "Does £32,000 go into higher-rate tax? No. It is still fully inside the basic rate band after the personal allowance is used.",
    ],
  },
  {
    annualSalary: 35000,
    description:
      "See a simple UK take-home pay example for a £35,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£35,000 is a very common reference salary for people comparing progression from early-career into established mid-level roles. It remains fully within the basic rate band, which keeps the headline deduction pattern easier to follow than higher incomes. At this point many people start comparing not only monthly take-home pay, but also pension contributions and the trade-off between salary and housing costs.",
    commonQuestions: [
      "Is £35,000 a good salary outside London? In many parts of the UK it can provide a more comfortable base than entry-level pay, though housing costs still matter a lot.",
      "How much is £35,000 after tax each month? With the standard assumptions used here, take-home pay is about {monthlyTakeHome} per month.",
      "Will £35,000 trigger higher-rate tax? No. It remains inside the basic rate band after the personal allowance is applied.",
    ],
  },
  {
    annualSalary: 38000,
    description:
      "Check the estimated UK take-home pay on a £38,000 salary, with tax, National Insurance and net monthly pay clearly broken down.",
    about:
      "£38,000 often sits in the range of experienced professional, technical and public sector roles outside the top salary brackets. It is still taxed fully at the basic rate after allowance, so the overall deduction structure remains quite clean. What changes at this level is usually lifestyle planning rather than tax complexity, especially when comparing savings goals with housing costs.",
    commonQuestions: [
      "Is £38,000 enough for a higher rent budget? It can improve flexibility, but affordability still depends heavily on council tax, bills and local transport costs.",
      "How much is £38,000 after tax per month? On the standard assumptions here, the estimated take-home pay is {monthlyTakeHome} per month.",
      "What income tax band is £38,000 in? It still falls within the basic rate band after the personal allowance is accounted for.",
    ],
  },
  {
    annualSalary: 40000,
    description:
      "See a simple UK take-home pay example for a £40,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£40,000 is a popular search point because it often marks the move into more established mid-level professional pay. It still sits below the higher-rate threshold, so all taxable income is charged at the basic rate under standard assumptions. For many households, this is the level where pension choices, rent affordability and family budgeting become more important than the tax band itself.",
    commonQuestions: [
      "Is £40,000 a good salary in the UK? It is a solid salary level in many parts of the UK, though it still feels very different in London compared with lower-cost regions.",
      "How much is £40,000 after tax per month? Using the standard assumptions here, the estimated take-home pay is {monthlyTakeHome} per month.",
      "Does £40,000 fall into higher-rate tax? No. It still sits below the higher-rate threshold under the standard UK bands used here.",
    ],
  },
  {
    annualSalary: 42000,
    description:
      "Estimate take-home pay for a £42,000 salary in the UK, with a simple view of tax, National Insurance and monthly net pay.",
    about:
      "£42,000 is still below the higher-rate threshold, but it is close enough that many people start paying more attention to how future salary growth will change deductions. It is a common salary point for experienced individual contributors and lower-management roles. The tax setup remains straightforward, but take-home planning often becomes more detailed around pension contributions and housing trade-offs.",
    commonQuestions: [
      "Is £42,000 close to higher-rate tax? Yes, it is getting nearer to the threshold, but under the standard assumptions used here it is still basic-rate only.",
      "How much is £42,000 after tax per month? With the standard assumptions on this page, take-home pay is about {monthlyTakeHome} per month.",
      "Should I look at pension contributions on £42,000? It is often a good point to compare salary growth with pension saving because the monthly budgeting impact becomes more noticeable.",
    ],
  },
  {
    annualSalary: 45000,
    description:
      "See a simple UK take-home pay example for a £45,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£45,000 is a strong benchmark for experienced professional or team-lead roles and is one of the last common salary examples before higher-rate tax becomes more relevant. It still sits below the main higher-rate threshold under standard assumptions, so the entire taxable amount stays at the basic rate. At this level people often start comparing salary growth with mortgage affordability, pension saving and childcare costs.",
    commonQuestions: [
      "Is £45,000 after tax enough for a mortgage budget? It can support a stronger housing budget than lower salaries, but lender rules and other monthly costs still make a big difference.",
      "How much is £45,000 after tax per month? Using the assumptions on this page, the estimate is {monthlyTakeHome} per month.",
      "Does £45,000 pay higher-rate tax? Under the standard setup here, it remains below the higher-rate threshold.",
    ],
  },
  {
    annualSalary: 50000,
    description:
      "See a simple UK take-home pay example for a £50,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£50,000 is one of the most important salary thresholds in UK personal finance because it sits right at the top of the basic rate band and around the point where the high-income child benefit charge starts to matter for some households. It is also a common salary level for mid-management and specialist roles. Small changes above or below this level can have a noticeable effect on both deductions and family planning decisions.",
    commonQuestions: [
      "Why is £50,000 an important salary point? It sits at the top of the basic rate band and is a key reference point for higher-rate tax and child benefit planning.",
      "How much is £50,000 after tax per month? With the standard assumptions used here, estimated take-home pay is {monthlyTakeHome} per month.",
      "Will all of £50,000 be basic-rate taxed? Under the standard 2026/27 assumptions used here, it is effectively right at the point before higher-rate tax starts to matter materially.",
    ],
  },
  {
    annualSalary: 55000,
    description:
      "Estimate UK take-home pay on a £55,000 salary with a clear breakdown of tax, National Insurance and monthly net pay.",
    about:
      "£55,000 moves beyond the basic rate threshold, so part of the taxable income is charged at the higher rate. This makes it a useful salary example for people who want to see the effect of crossing that line without moving into the highest earners. It is also a common level where pension contributions and salary sacrifice start to feel more strategic rather than optional.",
    commonQuestions: [
      "Does £55,000 pay higher-rate tax? Yes. Part of the taxable income above the main threshold falls into the higher-rate band.",
      "How much is £55,000 after tax per month? Using the standard assumptions here, the estimated monthly take-home pay is {monthlyTakeHome}.",
      "Why do people look at salary sacrifice around £55,000? Because reducing adjusted income can soften the effect of higher-rate tax and improve pension contributions.",
    ],
  },
  {
    annualSalary: 60000,
    description:
      "See a simple UK take-home pay example for a £60,000 salary, including estimated tax, National Insurance and net pay.",
    about:
      "£60,000 is well into the higher-rate tax range and is a common reference point for senior individual contributor and mid-management roles. At this level, tax planning questions often become more visible because extra earnings above the threshold no longer convert into take-home pay at the same pace as before. Pension contributions, childcare decisions and housing commitments all tend to get more attention around this salary band.",
    commonQuestions: [
      "Is £60,000 a high salary in the UK? It is above many national averages and usually represents a solid professional income, though it still feels very different depending on location and family costs.",
      "How much is £60,000 after tax per month? Under the standard assumptions here, the estimated take-home pay is {monthlyTakeHome} per month.",
      "Why does take-home growth slow above £50,000? Because part of your taxable income moves into the 40% higher-rate band.",
    ],
  },
  {
    annualSalary: 70000,
    description:
      "Check the estimated UK take-home pay for a £70,000 salary, including tax, National Insurance and net monthly income.",
    about:
      "£70,000 sits firmly in the higher-rate tax band and is often associated with senior technical, specialist and management roles. At this salary, each extra pound earned above the threshold is reduced more sharply by tax, which makes net pay planning more important. People at this level often compare pension contributions, childcare costs and mortgage affordability more carefully because the gross figure can overstate real disposable income.",
    commonQuestions: [
      "Is £70,000 a high salary in the UK? Yes, it is comfortably above average, though the value still depends heavily on region, family costs and housing.",
      "How much is £70,000 after tax per month? On the standard assumptions used here, estimated take-home pay is {monthlyTakeHome} per month.",
      "Should I look at pension planning on £70,000? Many people do, because higher-rate tax makes pension saving more financially meaningful at this level.",
    ],
  },
  {
    annualSalary: 80000,
    description:
      "Estimate UK take-home pay on an £80,000 salary with a clear breakdown of income tax, National Insurance and monthly net pay.",
    about:
      "£80,000 is well into higher-rate tax territory and often represents a senior professional or leadership salary. By this point the gap between headline pay and true monthly take-home becomes much more noticeable, especially once pension saving and housing costs are included. It is also a salary band where structured financial decisions tend to matter more than simple rule-of-thumb budgeting.",
    commonQuestions: [
      "How much is £80,000 after tax per month? Using the standard assumptions on this page, the estimated take-home pay is {monthlyTakeHome} per month.",
      "Is £80,000 close to the personal allowance taper? It is still below the £100,000 level where the personal allowance starts to be withdrawn.",
      "Why can £80,000 feel less dramatic than the headline suggests? Because a significant share of extra earnings above the threshold is reduced by higher-rate tax and other deductions.",
    ],
  },
  {
    annualSalary: 100000,
    description:
      "See the estimated UK take-home pay for a £100,000 salary, including tax, National Insurance and monthly net pay under standard assumptions.",
    about:
      "£100,000 is one of the most watched UK tax thresholds because it is the point where the personal allowance starts to be withdrawn by £1 for every £2 of income above the limit. That creates a well-known effective 60% marginal rate between £100,000 and £125,140. This is also the salary level where pension contributions or salary sacrifice are most commonly discussed as a way to bring adjusted net income back below the threshold.",
    commonQuestions: [
      "How much is £100,000 after tax per month? Under the standard assumptions on this page, estimated take-home pay is {monthlyTakeHome} per month.",
      "Why is £100,000 such an important tax threshold? Because the personal allowance starts to taper away above this level.",
      "Do people use pension contributions to manage £100,000 income? Yes, that is a common planning topic because it can reduce adjusted net income and soften the allowance taper.",
    ],
  },
];

export const salaryAfterTaxPageData = pageData;

export const salaryAfterTaxValues = pageData.map((entry) => entry.annualSalary);

export function getSalaryAfterTaxPageData(annualSalary: number) {
  const match = pageData.find((entry) => entry.annualSalary === annualSalary);

  if (!match) {
    throw new Error(`Missing salary-after-tax content for £${annualSalary.toLocaleString()}`);
  }

  return match;
}

export function createSalaryAfterTaxMetadata(annualSalary: number): Metadata {
  const match = getSalaryAfterTaxPageData(annualSalary);

  return {
    title: `£${annualSalary.toLocaleString()} Salary After Tax UK | Take-Home Pay Guide | UK Calculator Hub`,
    description: match.description,
    alternates: {
      canonical: `/salary-after-tax-${annualSalary}-uk`,
    },
  };
}

export function getSalaryAfterTaxCommonQuestions(annualSalary: number) {
  const match = getSalaryAfterTaxPageData(annualSalary);
  const result = calculateSalary({
    annualSalary,
    pensionPercent: 0,
    pensionMethod: "netPay",
    studentLoanPlan: "none",
    hasPostgraduateLoan: false,
    taxRegion: "rUK",
    taxCode: "1257L",
  });

  const monthlyTakeHome = formatCurrency(valueForPeriod(result.takeHomeAnnual, "monthly"), true);

  return match.commonQuestions.map((item) => item.replaceAll("{monthlyTakeHome}", monthlyTakeHome));
}
