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
              <Link href="/pension-contribution-calculator-uk">Pension Contribution Calculator</Link>
              <Link href="/hourly-wage-calculator-uk">Hourly Wage Calculator</Link>
              <Link href="/mortgage-affordability-uk">Mortgage Affordability Calculator</Link>
              <Link href="/rent-affordability-uk">Rent Affordability</Link>
              <Link href="/cost-of-living-uk">Cost of Living</Link>
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
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Disclaimer</div>
            <p className="text-sm leading-6 text-slate-400">
              These calculators provide estimates only and should not be treated as financial, tax, legal, or
              professional advice.
            </p>
            <Link href="/disclaimer" className="text-sm text-slate-300 hover:text-white">
              Read full disclaimer
            </Link>
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
