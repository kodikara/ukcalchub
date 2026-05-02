import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0f1a]/80 backdrop-blur-xl">
      <div className="container-shell space-y-8 py-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">About</div>
            <p className="text-sm leading-6 text-slate-400">
              UK-focused calculators built to make everyday money decisions clearer and easier to compare.
            </p>
            <Link href="/about" className="text-sm text-slate-300 hover:text-white">
              About page
            </Link>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Tools</div>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/salary-calculator-uk">Salary Calculator</Link>
              <Link href="/take-home-pay-calculator-uk">Take-Home Pay Calculator</Link>
              <Link href="/salary-rent-affordability-calculator-uk">Salary + Rent Calculator</Link>
              <Link href="/pension-contribution-calculator-uk">Pension Contribution Calculator</Link>
              <Link href="/hourly-wage-calculator-uk">Hourly Wage Calculator</Link>
              <Link href="/mortgage-affordability-calculator-uk">Mortgage Affordability Calculator</Link>
              <Link href="/rent-affordability-calculator-uk">Rent Affordability Calculator</Link>
              <Link href="/cost-of-living-calculator-uk">Cost of Living Calculator</Link>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Contact</div>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-slate-300 hover:text-white">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm text-slate-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/why-is-my-payslip-different-from-salary-calculator-uk" className="text-sm text-slate-300 hover:text-white">
                Why payslips differ
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Guides</div>
            <div className="flex flex-col gap-2">
              <Link href="/what-is-1257l-tax-code-uk" className="text-sm text-slate-300 hover:text-white">
                1257L tax code guide
              </Link>
              <Link href="/what-is-salary-sacrifice-uk" className="text-sm text-slate-300 hover:text-white">
                Salary sacrifice guide
              </Link>
              <Link href="/uk-personal-allowance-2026-27" className="text-sm text-slate-300 hover:text-white">
                Personal allowance 2026/27
              </Link>
              <Link href="/how-does-pension-auto-enrolment-work-uk" className="text-sm text-slate-300 hover:text-white">
                Pension auto-enrolment guide
              </Link>
              <Link href="/what-is-national-insurance-uk" className="text-sm text-slate-300 hover:text-white">
                National Insurance guide
              </Link>
              <Link href="/disclaimer" className="text-sm text-slate-300 hover:text-white">
                Read full disclaimer
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 text-sm text-slate-500">
          These calculators provide estimates only and should not be treated as financial, tax, legal, or
          professional advice.
        </div>
      </div>
    </footer>
  );
}
