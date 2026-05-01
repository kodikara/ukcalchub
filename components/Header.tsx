import Link from "next/link";

const navItems = [
  { href: "/salary-calculator-uk", label: "Salary" },
  { href: "/pension-contribution-calculator-uk", label: "Pension" },
  { href: "/hourly-wage-calculator-uk", label: "Hourly" },
  { href: "/mortgage-affordability-uk", label: "Mortgage" },
  { href: "/rent-affordability-uk", label: "Rent" },
  { href: "/cost-of-living-uk", label: "Cost of Living" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-[0_0_28px_rgba(34,211,238,0.28)]">
              UK
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-500">Simple Money Tools</div>
              <div className="display-font text-base font-bold tracking-tight text-white">UK Calculator Hub</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 shadow-[0_10px_24px_rgba(2,6,23,0.22)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
