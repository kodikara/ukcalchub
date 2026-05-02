import type { GuideReadingProps } from "@/components/GuideReading";

type ReadingGuide = GuideReadingProps;

export const payslipDifferenceGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "Why the numbers often do not match exactly",
          paragraphs: [
            "A public salary calculator is designed to give you a strong planning estimate, not to copy every rule inside your employer's payroll software line by line. Real payroll systems work from your exact tax code, the pay period you are in, any earlier pay in the same tax year, and the way your employer has configured pension and benefit deductions.",
            "That means a small difference does not automatically mean the calculator is wrong. A few pence usually come from rounding at payroll stage, while a larger difference often comes from one specific setting such as salary sacrifice, a different student loan plan, or a temporary emergency tax code.",
          ],
          bullets: [
            "Use the calculator to understand the shape of your pay: gross salary, tax, National Insurance, pension and loan deductions.",
            "Use the payslip to check the exact payroll treatment your employer has actually applied this month.",
            "If there is a large gap, compare one line at a time rather than assuming the whole estimate is wrong.",
          ],
        },
        {
          heading: "Tax codes are usually the first thing to check",
          paragraphs: [
            "Your tax code tells payroll how much tax-free allowance to apply and whether any special adjustments are needed. If the calculator assumes a normal 1257L code but your payslip shows BR, 0T, K, an emergency code or a code with adjustments for benefits, the result can move quickly.",
            "This is especially common when somebody starts a new job, changes jobs during the year, has a second income source, or is repaying an earlier tax balance through payroll. In those situations, the calculator can still be directionally useful, but your live payslip should be treated as the exact monthly result.",
          ],
        },
        {
          heading: "Pension method changes the take-home result",
          paragraphs: [
            "Many people look only at the pension percentage, but the pension method matters just as much. Net pay, relief at source and salary sacrifice can all lead to slightly different take-home outcomes even when the headline contribution percentage is identical.",
            "If your employer uses salary sacrifice, part of your gross salary is reduced before some deductions are calculated. That can lower both taxable pay and employee National Insurance, which is why the same pension percentage can look cheaper on one payslip than another.",
          ],
        },
        {
          heading: "One-off pay can distort a single month",
          paragraphs: [
            "Bonuses, overtime, unpaid leave, arrears, back pay, commission and one-off deductions can all make a single monthly payslip look unusual. Payroll software may apply cumulative tax treatment, student loan deductions or pension contributions differently in that specific period because the gross pay is temporarily higher or lower than normal.",
            "If you want the cleanest comparison, compare the calculator with a plain month that has no bonus, overtime or special adjustment. That gives you a much fairer read on whether the underlying estimate is close.",
          ],
        },
        {
          heading: "Practical way to troubleshoot a payslip difference",
          paragraphs: [
            "Start with the gross salary and taxable pay, then check the tax code, pension method and student loan plan. After that, compare income tax, National Insurance and pension one line at a time. This usually shows the real source of the gap much faster than looking only at the final net pay.",
            "If the numbers still feel off, look for benefits in kind, emergency tax, a starter checklist issue, Scottish tax bands, or a mid-year job change. Those are the situations most likely to produce a visible difference between a planning tool and a real payroll outcome.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "ඔබගේ payslip එකේ අගයන් calculator එකට වඩා වෙනස් වන්නේ ඇයි",
          paragraphs: [
            "Salary calculator එකක් සාමාන්‍ය සැලසුම් කිරීම සඳහා හොඳ estimate එකක් දෙයි, නමුත් employer payroll system එක ඔබගේ tax code, pay period, pension method සහ payroll history අනුව වැඩ කරයි.",
            "ඒ නිසා කුඩා වෙනසක් තිබුණාම calculator එක වැරදියි කියලා අදහස් නොවේ. පෙන්ස් කිහිපයක වෙනස rounding නිසා විය හැකි අතර, වැඩි වෙනසක් tax code, salary sacrifice, student loan plan හෝ emergency tax නිසා විය හැක.",
          ],
        },
        {
          heading: "පළමුව tax code එක බලන්න",
          paragraphs: [
            "Calculator එක 1257L වගේ සාමාන්‍ය code එකක් assume කළත් payslip එකේ BR, 0T, K code එකක් හෝ emergency code එකක් තිබේ නම් take-home pay එක වෙනස් වෙයි.",
            "නව job එකක්, දෙවන income source එකක් හෝ year මැද job change එකක් ඇතිවිට මේක බහුලවම පේන දෙයක්.",
          ],
        },
        {
          heading: "Pension method එකත් වැදගත්",
          paragraphs: [
            "Same pension percentage එක තිබුණත් net pay, relief at source සහ salary sacrifice අතර take-home pay වෙනස් විය හැක.",
            "Salary sacrifice නම් gross pay එකෙන් කොටසක් tax සහ NI ගණනයට පෙර අඩු කරන නිසා final payslip එක calculator estimate එකට වඩා වෙනස් විය හැක.",
          ],
        },
        {
          heading: "Bonus, overtime සහ special payments බලපායි",
          paragraphs: [
            "Bonus, overtime, unpaid leave, arrears, commission වගේ දේවල් එක month එකේ payslip එක අසාමාන්‍ය ලෙස පෙනෙන්න හේතුවක්.",
            "Calculator compare කරන්න හොඳම ක්‍රමය special payment නැති සාමාන්‍ය month එකක් තෝරන එකයි.",
          ],
        },
        {
          heading: "සරල troubleshooting ක්‍රමය",
          paragraphs: [
            "Gross salary, taxable pay, tax code, pension method, student loan plan එකින් එක compare කරන්න. ඊට පස්සේ income tax, NI සහ pension amounts line by line බලන්න.",
            "තවමත් වෙනසක් පැහැදිලි නොවුණොත් benefits in kind, Scottish tax, emergency tax හෝ mid-year employment change වගේ කරුණු පරීක්ෂා කරන්න.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "உங்கள் payslip எதனால் calculator முடிவுடன் மாறுபடும்",
          paragraphs: [
            "Salary calculator ஒன்று திட்டமிட உதவும் ஒரு நல்ல estimate தரும். ஆனால் உண்மையான payroll system உங்கள் tax code, pay period, pension method மற்றும் payroll history அடிப்படையில் வேலை செய்கிறது.",
            "அதனால் சிறிய வேறுபாடு இருந்தால் calculator தவறு என்று அர்த்தமில்லை. சில பைசா வேறுபாடு rounding காரணமாக இருக்கலாம்; பெரிய வேறுபாடு tax code, salary sacrifice, student loan plan அல்லது emergency tax காரணமாக இருக்கும்.",
          ],
        },
        {
          heading: "முதலில் tax code ஐ சரிபார்க்கவும்",
          paragraphs: [
            "Calculator 1257L போன்ற சாதாரண code ஐ assume செய்தாலும், payslip இல் BR, 0T, K அல்லது emergency code இருந்தால் take-home pay மாறும்.",
            "புதிய வேலை, mid-year job change அல்லது இரண்டாவது income source உள்ளவர்களுக்கு இது பொதுவாக ஏற்படும்.",
          ],
        },
        {
          heading: "Pension method கூட முக்கியம்",
          paragraphs: [
            "ஒரே pension percentage இருந்தாலும் net pay, relief at source மற்றும் salary sacrifice காரணமாக முடிவு மாறலாம்.",
            "Salary sacrifice இருப்பின் gross pay இல் ஒரு பகுதி tax மற்றும் NI கணக்கிடும் முன் குறைக்கப்படும். அதனால் payslip calculator ஐவிட வேறுபடும்.",
          ],
        },
        {
          heading: "Bonus அல்லது overtime ஒரு மாதத்தை மாற்றிவிடும்",
          paragraphs: [
            "Bonus, overtime, unpaid leave, arrears, commission போன்றவை ஒரு மாத payslip ஐ சாதாரண மாதத்திலிருந்து வேறுபடுத்தும்.",
            "Calculator உடன் ஒப்பிடும்போது special payment இல்லாத சாதாரண மாதத்தை பயன்படுத்துவது நல்லது.",
          ],
        },
        {
          heading: "சரிபார்க்கும் நடைமுறை",
          paragraphs: [
            "Gross salary, taxable pay, tax code, pension method, student loan plan ஆகியவற்றை ஒன்றன்பின் ஒன்றாக ஒப்பிடுங்கள். அதன் பிறகு income tax, NI, pension deduction ஐ line by line பாருங்கள்.",
            "இன்னும் வேறுபாடு இருந்தால் benefits in kind, Scottish tax, emergency tax அல்லது mid-year employment change போன்ற காரணிகளை பார்க்கவும்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "Income Tax rates and allowances",
      href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
      note: "Official GOV.UK guidance on current income tax bands and allowances.",
    },
    {
      label: "National Insurance: how much you pay",
      href: "https://www.gov.uk/national-insurance/how-much-you-pay",
      note: "Useful for checking how NI is normally treated alongside income tax.",
    },
    {
      label: "Student loan repayment amounts",
      href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay",
      note: "Official repayment thresholds and rates for the main student loan plans.",
    },
  ],
};

export const taxCodeGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "What 1257L means in plain English",
          paragraphs: [
            "1257L is the most common UK employee tax code because it usually tells payroll to apply the standard personal allowance through your payslip. For the 2026/27 tax year, that standard allowance is £12,570, so the code broadly signals that the first slice of income should not be charged to income tax.",
            "The code is common, but it is not a promise that your tax position is perfectly simple. It is a starting point used by payroll, and it can still be adjusted later if HMRC needs to reflect benefits, underpaid tax, multiple jobs or other income.",
          ],
        },
        {
          heading: "How to read the numbers and letter",
          paragraphs: [
            "The number 1257 maps to the £12,570 allowance with the final zero removed. The letter L is used for many employees who are entitled to the standard allowance with no unusual restriction. In day-to-day terms, it means payroll is treating you like a fairly standard single-main-job employee.",
            "That does not mean every payslip on 1257L will look identical. Pension method, student loans, National Insurance and any extra pay can still move take-home pay around from one person to the next.",
          ],
        },
        {
          heading: "When your code might be different",
          paragraphs: [
            "A different code often appears when HMRC needs to make an adjustment. Examples include a company car, private medical cover, tax due from an earlier year, a second job, pension income or temporary emergency tax treatment after a job change.",
            "Codes such as BR, 0T and K usually tell you straight away that the standard allowance is not being applied in the normal way. If your salary calculator assumes 1257L but your actual code is different, a noticeable difference in take-home pay is completely normal.",
          ],
        },
        {
          heading: "How to use this in practice",
          paragraphs: [
            "If you are checking a new job offer, 1257L is often a sensible starting assumption because it reflects the most common payroll setup. If you are checking an existing payslip, use the tax code shown by your employer rather than assuming 1257L just because it is common.",
            "If the code on your payslip does not make sense, compare it with your HMRC notice, then use the salary calculator as a planning tool to see how a different code changes your monthly take-home pay.",
          ],
        },
        {
          heading: "Why it matters for rankings and calculators",
          paragraphs: [
            "Many people search for 1257L because it sits at the centre of the most common UK salary questions: why the tax number looks the way it does, why two people on similar salaries can still take home different amounts, and how tax code changes flow through to monthly pay.",
            "Understanding that link makes salary calculators more useful because you stop treating them like black boxes and start using them as comparison tools with real payroll assumptions behind them.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "1257L කියන්නේ මොකක්ද",
          paragraphs: [
            "1257L කියන්නේ බොහෝ employees ලාට යෙදෙන සාමාන්‍ය UK tax code එක. ඒකෙන් payroll system එක standard personal allowance එක apply කරයි.",
            "2026/27 tax year එකට personal allowance එක £12,570. ඒ නිසා ආදායමේ පළමු කොටස income tax ගණනයට කලින් tax-free ලෙස සලකනවා.",
          ],
        },
        {
          heading: "Number එක සහ letter එක කියවන්නේ කොහොමද",
          paragraphs: [
            "1257 කියන්නේ £12,570 allowance එකෙන් අවසාන බිංදුව ඉවත් කරපු form එක. L letter එක සාමාන්‍ය allowance එක ලබන බොහෝ employees සඳහා භාවිතා වෙනවා.",
            "එහෙත් same 1257L code එක තිබුණත් pension, student loan, NI සහ extra pay නිසා take-home pay වෙනස් වෙන්න පුළුවන්.",
          ],
        },
        {
          heading: "Tax code වෙනස් වන්නේ කවදාද",
          paragraphs: [
            "Benefits, second job, earlier tax underpayment, pension income හෝ emergency tax වගේ දේවල් tax code එක වෙනස් කරයි.",
            "Calculator එක 1257L assume කළත් payslip එකේ code වෙනස් නම් take-home pay වෙනසක් සාමාන්‍ය දෙයක්.",
          ],
        },
        {
          heading: "ප්‍රායෝගිකව භාවිතා කරන්නේ කොහොමද",
          paragraphs: [
            "New job offer එකක් බලනකොට 1257L හොඳ starting assumption එකක්. නමුත් existing payslip එකක් compare කරනකොට employer දක්වන actual tax code එක භාවිතා කරන්න.",
            "Code එක අසාමාන්‍යයි නම් HMRC notice එක compare කරලා salary calculator එකෙන් impact එක බලන්න.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "1257L என்பதன் அர்த்தம் என்ன",
          paragraphs: [
            "1257L என்பது பல UK employees க்கு பயன்படுத்தப்படும் பொதுவான tax code. இது payroll இல் standard personal allowance ஐ பயன்படுத்தச் சொல்கிறது.",
            "2026/27 tax year க்கு personal allowance £12,570. அதனால் income tax கணக்கிடும் முன் முதல் பகுதி tax-free ஆக கருதப்படும்.",
          ],
        },
        {
          heading: "எண் மற்றும் எழுத்தை எப்படி படிப்பது",
          paragraphs: [
            "1257 என்பது £12,570 allowance இலிருந்து கடைசி zero நீக்கப்பட்ட வடிவம். L என்பது சாதாரண allowance பெறும் பல employees க்கு பயன்படுத்தப்படும் எழுத்து.",
            "ஆனால் 1257L இருந்தாலும் pension, student loan, NI மற்றும் extra pay காரணமாக take-home pay மாறலாம்.",
          ],
        },
        {
          heading: "Tax code ஏன் மாறும்",
          paragraphs: [
            "Benefits, second job, earlier tax underpayment, pension income அல்லது emergency tax போன்ற காரணிகள் code ஐ மாற்றலாம்.",
            "Calculator 1257L assume செய்தாலும் actual payslip code வேறாக இருந்தால் take-home pay வேறுபாடு சாதாரணம்.",
          ],
        },
        {
          heading: "இதை நடைமுறையில் எப்படி பயன்படுத்துவது",
          paragraphs: [
            "புதிய வேலை offer ஐ பார்க்கும்போது 1257L ஒரு நல்ல starting assumption. ஆனால் actual payslip ஐ compare செய்யும்போது employer காட்டும் code ஐ பயன்படுத்த வேண்டும்.",
            "Code சரியாகத் தெரியவில்லை என்றால் HMRC notice உடன் compare செய்து salary calculator மூலம் impact ஐ பாருங்கள்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "Tax codes",
      href: "https://www.gov.uk/tax-codes",
      note: "Official GOV.UK explanation of what tax codes mean and why they change.",
    },
    {
      label: "Check your Income Tax",
      href: "https://www.gov.uk/check-income-tax-current-year",
      note: "Use HMRC guidance to review the tax you have paid in the current year.",
    },
    {
      label: "Income Tax rates and allowances",
      href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
      note: "Useful background when comparing a tax code with a salary estimate.",
    },
  ],
};

export const salarySacrificeGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "What salary sacrifice actually changes",
          paragraphs: [
            "Salary sacrifice means you agree to give up part of your cash salary in exchange for a non-cash benefit, most often an extra employer pension contribution. Because that sacrificed amount is removed before some payroll deductions are worked out, your taxable salary can be lower than your headline salary.",
            "That is why salary sacrifice often surprises people. Two workers can look as if they are contributing the same pension percentage, but one can still take home more because their employer is using salary sacrifice rather than a standard post-salary deduction method.",
          ],
        },
        {
          heading: "Why it can reduce tax and National Insurance",
          paragraphs: [
            "If your contractual salary is reduced before income tax and employee National Insurance are calculated, there is simply less pay left to tax. In practical terms, that often means the same pension contribution costs less from a monthly cash-flow point of view.",
            "This does not create free money, but it can improve tax efficiency. That is one reason salary sacrifice becomes more interesting as earnings rise or as somebody gets closer to an important threshold such as higher-rate tax or the personal allowance taper zone.",
          ],
        },
        {
          heading: "Salary sacrifice vs net pay and relief at source",
          paragraphs: [
            "The terms can sound interchangeable, but they are not. A net pay arrangement usually reduces taxable pay for income tax, while relief at source works differently again. Salary sacrifice goes a step further by reducing contractual pay before some deductions are calculated, which can affect National Insurance as well as tax.",
            "If a calculator asks which pension method applies, it is trying to avoid exactly this confusion. Using the wrong method is one of the quickest ways to end up with a take-home estimate that feels off compared with a real payslip.",
          ],
        },
        {
          heading: "When it is worth checking more carefully",
          paragraphs: [
            "Salary sacrifice deserves extra attention when you are near a tax threshold, close to the £100,000 personal allowance taper, or comparing two different job offers. It can also matter if you are checking maternity pay, statutory benefits or borrowing applications, because the salary figure used in those processes may be defined differently.",
            "That does not automatically make salary sacrifice better in every situation, but it does mean the detail matters. If an employer advertises salary sacrifice, it is worth checking how the pension appears on the payslip and whether quoted salary figures are before or after the arrangement.",
          ],
        },
        {
          heading: "Practical calculator tip",
          paragraphs: [
            "If you know your employer uses salary sacrifice, choose that method in the pension or salary calculator instead of using a generic pension deduction assumption. Then compare the resulting taxable pay and monthly take-home with a clean payslip month.",
            "That one step usually explains why a real payslip can look more efficient than a simple salary breakdown that treats pension as an ordinary deduction.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "Salary sacrifice එකෙන් වෙනස් වෙන්නේ මොනවාද",
          paragraphs: [
            "Salary sacrifice කියන්නේ cash salary එකෙන් කොටසක් අඩු කර non-cash benefit එකකට, වැඩිපුර workplace pension contribution එකකට, මාරු කරන arrangement එකක්.",
            "ඒ amount එක tax හා NI ගණනයට පෙර අඩු කරන නිසා taxable salary එක headline salary එකට වඩා අඩු විය හැක.",
          ],
        },
        {
          heading: "Tax සහ NI අඩු වන්නේ ඇයි",
          paragraphs: [
            "Tax සහ employee NI ගණනයට පෙර salary එක අඩු වුවහොත් tax කරන income එකද අඩුවෙනවා. ඒ නිසා same pension contribution එක monthly take-home pay අනුව බලනකොට අඩු වියදමක් වගේ පේනවා.",
            "මෙය free money නොවෙයි, නමුත් tax efficiency වැඩි කරයි.",
          ],
        },
        {
          heading: "Net pay සහ relief at source එකෙන් වෙනස",
          paragraphs: [
            "Net pay, relief at source සහ salary sacrifice එකට එකම ප්‍රතිඵල නැහැ. Salary sacrifice එක NI වලටත් බලපාන්න පුළුවන්.",
            "Calculator එක pension method එක අහන්නේ ඒ වෙනස නිවැරදිව reflect කරන්නයි.",
          ],
        },
        {
          heading: "ප්‍රායෝගික tip",
          paragraphs: [
            "Employer salary sacrifice භාවිතා කරනවා නම් calculator එකේ ඒ option එකම තෝරන්න. එවිට estimate එක payslip එකට වැඩි සමාන වෙයි.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "Salary sacrifice என்ன மாற்றுகிறது",
          paragraphs: [
            "Salary sacrifice என்பது உங்கள் cash salary இன் ஒரு பகுதியை non-cash benefit க்கு, பொதுவாக employer pension contribution க்கு, மாற்றும் arrangement ஆகும்.",
            "அந்த amount tax மற்றும் NI கணக்கிடும் முன் குறைக்கப்படுவதால் taxable salary headline salary ஐவிட குறையலாம்.",
          ],
        },
        {
          heading: "Tax மற்றும் NI ஏன் குறையும்",
          paragraphs: [
            "Tax மற்றும் employee NI கணக்கிடும் முன் salary குறைந்தால் tax செய்யப்படும் income குறையும். அதனால் அதே pension contribution monthly take-home pay பார்வையில் மலிவாகத் தோன்றலாம்.",
            "இது free money அல்ல, ஆனால் tax efficiency அதிகரிக்கலாம்.",
          ],
        },
        {
          heading: "Net pay மற்றும் relief at source உடன் வித்தியாசம்",
          paragraphs: [
            "Net pay, relief at source, salary sacrifice எல்லாம் ஒரே மாதிரி இல்லை. Salary sacrifice NI யையும் பாதிக்கலாம்.",
            "அதனால்தான் calculator pension method ஐ கேட்கிறது.",
          ],
        },
        {
          heading: "நடைமுறை ஆலோசனை",
          paragraphs: [
            "Employer salary sacrifice பயன்படுத்தினால் calculator லும் அதையே தேர்வு செய்யுங்கள். அப்போது estimate payslip க்கு மேலும் நெருக்கமாக இருக்கும்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "Workplace pensions",
      href: "https://www.gov.uk/workplace-pensions",
      note: "Overview of how workplace pensions work and how contributions are handled.",
    },
    {
      label: "Tax on your private pension contributions",
      href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief",
      note: "Useful background on pension tax relief and common contribution treatment.",
    },
    {
      label: "National Insurance: how much you pay",
      href: "https://www.gov.uk/national-insurance/how-much-you-pay",
      note: "Helpful when checking why salary sacrifice can change NI as well as tax.",
    },
  ],
};

export const personalAllowanceGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "Why the personal allowance matters so much",
          paragraphs: [
            "The personal allowance is one of the core building blocks of a UK salary calculation because it decides how much income can usually be received before income tax starts. For the 2026/27 tax year, the standard allowance is £12,570.",
            "That does not remove National Insurance, pension deductions or student loans, but it does shape the income tax part of almost every payslip. This is why so many salary examples start by separating gross income from taxable income rather than treating the whole salary as immediately taxable.",
          ],
        },
        {
          heading: "How it works in a normal salary calculation",
          paragraphs: [
            "Once the allowance is applied, the remaining taxable income is split across the relevant tax bands. For many employees outside Scotland, that means 20% basic-rate tax is paid on the next slice of taxable income until higher-rate tax becomes relevant.",
            "In practical terms, this is why a salary does not lose the same percentage of tax from the first pound to the last. The allowance softens the early part of the calculation and makes lower and mid-range salaries more efficient than a flat-rate tax assumption would suggest.",
          ],
        },
        {
          heading: "What happens after £100,000",
          paragraphs: [
            "Once adjusted net income rises above £100,000, the personal allowance starts to be withdrawn at £1 for every £2 of income above that level. That is the reason people talk about an effective 60% marginal rate between £100,000 and £125,140.",
            "This matters because the allowance is not just a passive tax feature. It can become a planning issue, especially for people considering pension contributions or salary sacrifice to bring adjusted income back below the taper threshold.",
          ],
        },
        {
          heading: "Why adjusted net income matters",
          paragraphs: [
            "People often focus only on headline salary, but the allowance taper uses adjusted net income rather than just the simple contractual salary figure. Pension contributions and salary sacrifice can therefore affect whether the taper applies and how much of the allowance is lost.",
            "That is why salary and pension calculators sometimes ask questions that appear more detailed than you expect. The goal is not to complicate the estimate, but to reflect the places where the tax result changes materially.",
          ],
        },
        {
          heading: "Practical tip for using calculators",
          paragraphs: [
            "If your income is well below £100,000, the standard allowance assumption is often a good planning baseline unless your tax code says otherwise. If your income is near or above £100,000, it becomes much more important to use the right pension and salary-sacrifice settings so the allowance taper is handled realistically.",
            "That is also the salary range where a headline pay rise can produce a smaller-than-expected jump in monthly take-home pay, simply because more tax and allowance tapering are happening at the same time.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "Personal allowance එක වැදගත් වන්නේ ඇයි",
          paragraphs: [
            "UK salary calculation එකක මුල්ම වැදගත් කොටස්වලින් එකක් personal allowance එකයි. 2026/27 tax year එකට standard allowance එක £12,570.",
            "ඒක income tax පටන් ගන්නේ කවදාද කියලා තීරණය කරන නිසා salary example බොහොමයක් gross income එක සහ taxable income එක වෙන වෙනම බලනවා.",
          ],
        },
        {
          heading: "සාමාන්‍ය calculation එකක ඒක වැඩ කරන විදිහ",
          paragraphs: [
            "Allowance එක apply කළාට පස්සේ ඉතිරි taxable income එක tax bands වලට බෙදෙනවා. බොහෝ employees සඳහා basic rate band එකෙන් 20% tax පටන් ගනී.",
            "ඒ නිසා whole salary එකට එකම tax percentage එකක් apply වෙනවා කියලා හිතන්න බෑ.",
          ],
        },
        {
          heading: "£100,000 ඉක්මවූ විට",
          paragraphs: [
            "Adjusted net income £100,000 ඉක්මවූ විට allowance එක £1 for every £2 ලෙස අඩුවෙන්න පටන් ගනී. ඒක 60% effective marginal rate කතාවට හේතුවයි.",
            "Pension contribution හෝ salary sacrifice planning එක මෙහිදී වඩා වැදගත් වෙනවා.",
          ],
        },
        {
          heading: "ප්‍රායෝගික tip",
          paragraphs: [
            "£100,000 ට අඩු ආදායමක් නම් standard allowance assumption එක හොඳ baseline එකක්. ඒ සීමාවට ලඟ හෝ ඉහළ නම් pension සහ salary sacrifice settings නිවැරදිව දාන්න.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "Personal allowance ஏன் முக்கியம்",
          paragraphs: [
            "UK salary calculation இன் முக்கிய அடிப்படை அம்சங்களில் ஒன்று personal allowance. 2026/27 tax year க்கு standard allowance £12,570.",
            "இது income tax எப்போது ஆரம்பிக்கிறது என்பதை தீர்மானிப்பதால் gross income மற்றும் taxable income தனித்தனியாக பார்க்கப்படுகிறது.",
          ],
        },
        {
          heading: "சாதாரண calculation இல் இது எப்படி வேலை செய்கிறது",
          paragraphs: [
            "Allowance பயன்படுத்திய பிறகு மீதமுள்ள taxable income tax bands க்கு பிரிக்கப்படுகிறது. பல employees க்கு basic rate band இல் 20% tax ஆரம்பமாகிறது.",
            "அதனால் முழு salary க்கும் ஒரே tax percentage பொருந்தும் என்று எண்ண முடியாது.",
          ],
        },
        {
          heading: "£100,000 ஐ தாண்டிய பிறகு",
          paragraphs: [
            "Adjusted net income £100,000 ஐ தாண்டினால் allowance £1 for every £2 என்ற விகிதத்தில் குறையத் தொடங்கும். அதுவே 60% effective marginal rate பற்றி பேசப்படும் காரணம்.",
            "அதனால் pension contribution அல்லது salary sacrifice planning இங்கு முக்கியமாகிறது.",
          ],
        },
        {
          heading: "நடைமுறை tip",
          paragraphs: [
            "£100,000 க்குக் கீழ் income இருந்தால் standard allowance assumption நல்ல baseline. அதற்கு அருகில் அல்லது மேல் இருந்தால் pension மற்றும் salary sacrifice settings சரியாக உள்ளனவா என்பதை கவனிக்க வேண்டும்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "Income Tax rates and allowances",
      href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
      note: "Official rates and allowance reference for the current tax year.",
    },
    {
      label: "Personal Allowances",
      href: "https://www.gov.uk/income-tax-rates",
      note: "GOV.UK summary of the main income tax bands and personal allowance rules.",
    },
    {
      label: "Tax on your private pension contributions",
      href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief",
      note: "Helpful when checking how pension contributions can affect adjusted income.",
    },
  ],
};

export const pensionAutoEnrolmentGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "What auto-enrolment means in practice",
          paragraphs: [
            "Auto-enrolment means many eligible UK employees are placed into a workplace pension automatically rather than having to sign up manually. The practical effect is simple: pension deductions begin through payroll unless the worker chooses to opt out during the relevant window.",
            "This is one of the most common reasons people are surprised by their first payslip in a new job. The gross salary looks fine, but the cash hitting the bank is lower because pension contributions have started straight away.",
          ],
        },
        {
          heading: "Why the payslip can still look confusing",
          paragraphs: [
            "Even though auto-enrolment is a standard system, workplace pensions are not all displayed in exactly the same way. Contributions can be based on qualifying earnings rather than the whole salary, and the scheme can use a different deduction method from the one somebody expects.",
            "That means two workers with similar salaries may still see different-looking pension lines on the payslip. The broad rule is easy to explain, but the monthly payroll detail can still vary from employer to employer.",
          ],
        },
        {
          heading: "Minimum contributions and qualifying earnings",
          paragraphs: [
            "Minimum contribution rules are often discussed using qualifying earnings rather than total salary. This catches many people out because the pension percentage they think they are paying does not always map neatly onto the full salary number they have in mind.",
            "In practical terms, this is why calculator outputs should be read as informed estimates unless they are matched closely to the exact workplace scheme rules. The direction is useful, but the final payroll contribution line may still differ slightly.",
          ],
        },
        {
          heading: "Opting out and the trade-off involved",
          paragraphs: [
            "Many people can opt out, but the immediate monthly gain comes with a clear cost: you usually lose the employer contribution as well. From a long-term value perspective, that employer contribution is one of the strongest reasons not to look only at the short-term cash flow.",
            "A better question is often not 'Can I avoid this deduction?' but 'How much total pension value am I giving up if I opt out?' That framing makes the decision more realistic, especially for younger workers who only see the lower take-home pay at first.",
          ],
        },
        {
          heading: "How to use a calculator alongside auto-enrolment",
          paragraphs: [
            "If you know your contribution percentage and your employer's contribution rate, a pension or salary calculator can show the monthly take-home impact and the total annual value being added. That helps turn a confusing payslip line into something more understandable.",
            "If the result still feels off, check whether your workplace scheme is using qualifying earnings, net pay, relief at source or salary sacrifice. Those details usually explain the gap much faster than changing the salary number alone.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "Auto-enrolment කියන්නේ ප්‍රායෝගිකව මොකක්ද",
          paragraphs: [
            "Auto-enrolment කියන්නේ eligible UK employees ලා workplace pension එකට automatic ලෙස ඇතුළත් කරන පද්ධතියක්. Opt out නොකළොත් pension deduction payroll එකෙන් පටන් ගන්නවා.",
            "New job එකක පළමු payslip එකේ take-home pay අඩු පේන ප්‍රධාන හේතු වලින් එකක් මේකයි.",
          ],
        },
        {
          heading: "Pension line එකට ඇයි confusion තියෙන්නේ",
          paragraphs: [
            "හැම workplace pension scheme එකක්ම එකම විදිහට deduction පෙන්නන්නේ නැහැ. Qualifying earnings, scheme rules සහ pension method වෙනස් වෙන්න පුළුවන්.",
            "ඒ නිසා same salary වගේ පේන දෙදෙනාටත් different payslip pension lines දකින්න පුළුවන්.",
          ],
        },
        {
          heading: "Opt out ගැන practical view එක",
          paragraphs: [
            "Opt out කළ හැකි අවස්ථා තිබුණත් employer contribution එකත් අහිමි වෙනවා. Short-term cash benefit එකට වඩා long-term value loss එක බොහෝවිට වැඩියි.",
          ],
        },
        {
          heading: "Calculator එක භාවිතා කිරීම",
          paragraphs: [
            "Your contribution %, employer contribution % සහ pension method එක දාලා calculator එකෙන් monthly take-home impact එක සහ total annual value එක බලන්න.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "Auto-enrolment நடைமுறையில் என்ன",
          paragraphs: [
            "Auto-enrolment என்பது eligible UK employees பலரை workplace pension இல் தானாக சேர்க்கும் அமைப்பு. Opt out செய்யாவிட்டால் payroll மூலம் pension deduction துவங்கும்.",
            "புதிய வேலையில் முதல் payslip இல் take-home pay குறைவாகத் தோன்றுவதற்கான முக்கிய காரணங்களில் இதுவும் ஒன்று.",
          ],
        },
        {
          heading: "Pension line ஏன் குழப்பமாகத் தோன்றும்",
          paragraphs: [
            "ஒவ்வொரு workplace pension scheme ம் ஒரே மாதிரி deduction காட்டாது. Qualifying earnings, scheme rules, pension method ஆகியவை மாறலாம்.",
            "அதனால் ஒரே salary போலத் தோன்றினாலும் இரண்டு பேரின் payslip இல் pension line வேறுபடலாம்.",
          ],
        },
        {
          heading: "Opt out பற்றிய நடைமுறை பார்வை",
          paragraphs: [
            "Opt out செய்ய முடிந்தாலும் employer contribution இழக்கப்படும். குறுகியகால cash benefit விட நீண்டகால value loss பெரும்பாலும் அதிகமாக இருக்கும்.",
          ],
        },
        {
          heading: "Calculator ஐ எப்படி பயன்படுத்துவது",
          paragraphs: [
            "Contribution %, employer contribution %, pension method ஆகியவற்றை கொண்டு calculator இல் monthly take-home impact மற்றும் annual pension value ஐ பாருங்கள்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "Workplace pensions",
      href: "https://www.gov.uk/workplace-pensions",
      note: "Official GOV.UK overview of auto-enrolment and workplace pension basics.",
    },
    {
      label: "Workplace pension contributions",
      href: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay",
      note: "Explains how worker and employer contributions can be shared.",
    },
    {
      label: "Workplace pensions - MoneyHelper",
      href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/building-your-retirement-pot/workplace-pensions",
      note: "Clear plain-English background if you want a less technical overview.",
    },
  ],
};

export const nationalInsuranceGuide: ReadingGuide = {
  translations: {
    en: {
      sections: [
        {
          heading: "What National Insurance is really doing",
          paragraphs: [
            "National Insurance is a payroll deduction connected to the UK social security system. For employees, the most common version is Class 1 National Insurance, and it is one of the main reasons gross pay and take-home pay are not the same number.",
            "Many people understand income tax reasonably well but feel less confident about NI because it does not always get explained clearly. In practice, it is best to think of NI as a separate deduction with its own thresholds and rates rather than just an extra line of tax.",
          ],
        },
        {
          heading: "How it differs from income tax",
          paragraphs: [
            "Income tax and National Insurance often move in the same direction when salary rises, but they are not the same calculation. Each has its own thresholds and treatment, which is why a salary calculator usually shows them on separate lines.",
            "This matters because somebody can understand their income tax band and still be surprised by the total reduction in monthly pay once NI is included. It also explains why a simple '20% tax' idea never tells the whole story for take-home pay.",
          ],
        },
        {
          heading: "Why NI becomes more noticeable over time",
          paragraphs: [
            "At lower pay levels, NI may be small or absent. Once earnings move comfortably above the relevant threshold, it becomes a regular and visible deduction on every payslip. That is when people start to notice the gap between headline salary and real monthly cash much more clearly.",
            "This is also the point where pension method and salary sacrifice become more interesting, because in some situations they can change NI as well as income tax.",
          ],
        },
        {
          heading: "When NI causes comparison mistakes",
          paragraphs: [
            "A common mistake is comparing two jobs based only on gross salary and income tax. NI, pension deductions, student loans and benefits can make one offer look better on paper than it feels in the bank. A proper take-home comparison should always include NI separately.",
            "This is especially useful when somebody is moving from one salary band to another and expects the monthly difference to be larger than it really is. The extra deductions, including NI, often explain the disappointment.",
          ],
        },
        {
          heading: "How to use this in calculators",
          paragraphs: [
            "If you are checking affordability, use a calculator that splits out income tax and NI so you can see where the money is actually going. That makes it easier to judge rent, mortgage or pension decisions from a realistic net-pay base.",
            "If the NI figure on a real payslip still looks odd, compare the pay frequency, the taxable pay in that period and any salary sacrifice arrangement before assuming the estimate is broken.",
          ],
        },
      ],
    },
    si: {
      sections: [
        {
          heading: "National Insurance කියන්නේ මොකක්ද",
          paragraphs: [
            "National Insurance කියන්නේ UK social security system එකට සම්බන්ධ payroll deduction එකක්. Employees සඳහා බහුලවම පේන්නේ Class 1 NI.",
            "Gross pay සහ take-home pay එකම නොවීමට ඇති ප්‍රධාන හේතු වලින් එකක් මේකයි.",
          ],
        },
        {
          heading: "Income tax එකෙන් වෙනස",
          paragraphs: [
            "Income tax සහ NI salary වැඩිවූ විට දෙකම වැඩිවෙයි, නමුත් ඒවා වෙනම calculations දෙකක්. ඒ නිසා salary calculator එකේ ඒවා වෙනම lines වලින් පෙන්වයි.",
            "20% tax කියලා සරලව හිතුවොත් full picture එක ලැබෙන්නේ නැහැ.",
          ],
        },
        {
          heading: "NI එක ප්‍රායෝගිකව දැනෙන්නේ කවදාද",
          paragraphs: [
            "Low pay levels වලදී NI අඩු හෝ නොතිබිය හැක. Income threshold එකට ඉහළ ගියාම එය monthly payslip එකේ හොඳට පේන deduction එකක් වෙනවා.",
            "එවිට pension method හෝ salary sacrifice නිසා NI ද වෙනස් විය හැකි බව වැදගත් වෙනවා.",
          ],
        },
        {
          heading: "Calculator භාවිතයේ tip",
          paragraphs: [
            "Affordability හෝ take-home compare කරනකොට income tax සහ NI වෙනම පෙන්වන calculator එකක් භාවිතා කරන්න. එය money going out එක පැහැදිලි කරයි.",
          ],
        },
      ],
    },
    ta: {
      sections: [
        {
          heading: "National Insurance என்றால் என்ன",
          paragraphs: [
            "National Insurance என்பது UK social security system உடன் இணைந்த payroll deduction. Employees க்கு பொதுவாக Class 1 NI தான் முக்கியமானது.",
            "Gross pay மற்றும் take-home pay ஒன்று அல்லாததற்கான முக்கிய காரணங்களில் இதுவும் ஒன்று.",
          ],
        },
        {
          heading: "Income tax உடன் வித்தியாசம்",
          paragraphs: [
            "Income tax மற்றும் NI salary உயரும் போது இரண்டும் கூடலாம், ஆனால் அவை தனித்தனி calculations. அதனால்தான் salary calculator இல் அவை தனி lines ஆக காட்டப்படும்.",
            "வெறும் 20% tax என்று நினைத்தால் முழுப் படம் தெரியாது.",
          ],
        },
        {
          heading: "NI எப்போது அதிகமாகத் தெரியும்",
          paragraphs: [
            "குறைந்த income இல் NI சிறியது அல்லது இல்லாமலும் இருக்கலாம். Threshold ஐத் தாண்டிய பிறகு அது ஒவ்வொரு payslip இலும் தெரியும் deduction ஆகும்.",
            "அப்போது pension method அல்லது salary sacrifice காரணமாக NI கூட மாறக்கூடும்.",
          ],
        },
        {
          heading: "Calculator நடைமுறை tip",
          paragraphs: [
            "Affordability அல்லது take-home compare செய்யும்போது income tax மற்றும் NI ஐ தனியாகக் காட்டும் calculator ஐ பயன்படுத்துங்கள். அதனால் பணம் எங்கு செல்கிறது என்பது தெளிவாகும்.",
          ],
        },
      ],
    },
  },
  furtherReading: [
    {
      label: "National Insurance: how much you pay",
      href: "https://www.gov.uk/national-insurance/how-much-you-pay",
      note: "Official GOV.UK rates and thresholds page for employee National Insurance.",
    },
    {
      label: "National Insurance overview",
      href: "https://www.gov.uk/national-insurance",
      note: "General background on what NI is and when it applies.",
    },
    {
      label: "Check your State Pension forecast",
      href: "https://www.gov.uk/check-state-pension",
      note: "Helpful context if you want to understand why NI contributions matter over the long term.",
    },
  ],
};
