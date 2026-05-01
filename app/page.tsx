import Link from "next/link";

const tools = [
  {
    title: "Salary Calculator",
    description: "Estimate take-home pay after tax, National Insurance, pension and student loan deductions.",
    href: "/salary-calculator-uk",
  },
  {
    title: "Pension Calculator",
    description: "See how employee and employer contributions can change monthly pay and long-term pension value.",
    href: "/pension-contribution-calculator-uk",
  },
  {
    title: "Hourly Pay Calculator",
    description: "Convert hourly wages into weekly, monthly and yearly earnings with clear UK-style comparisons.",
    href: "/hourly-wage-calculator-uk",
  },
  {
    title: "Mortgage Affordability",
    description: "Explore a realistic property budget using income, deposit and debt commitments.",
    href: "/mortgage-affordability-uk",
  },
  {
    title: "Rent Affordability",
    description: "Check whether rent fits your monthly income once bills and living costs are included.",
    href: "/rent-affordability-uk",
  },
  {
    title: "Cost of Living",
    description: "Estimate monthly and yearly living costs for common UK household situations.",
    href: "/cost-of-living-uk",
  },
] as const;

const navItems = [
  { label: "Salary", href: "/salary-calculator-uk" },
  { label: "Pension", href: "/pension-contribution-calculator-uk" },
  { label: "Hourly", href: "/hourly-wage-calculator-uk" },
  { label: "Mortgage", href: "/mortgage-affordability-uk" },
  { label: "Rent", href: "/rent-affordability-uk" },
  { label: "Cost of Living", href: "/cost-of-living-uk" },
] as const;

const stats = [
  { label: "Monthly take-home", value: "£2,726", tone: "text-emerald-300" },
  { label: "Income tax", value: "£503", tone: "text-rose-300" },
  { label: "National Insurance", value: "£216", tone: "text-cyan-300" },
  { label: "Pension", value: "£188", tone: "text-amber-300" },
] as const;

const highlights = [
  "UK-focused assumptions",
  "Clear visual breakdowns",
  "Mobile-friendly layouts",
  "Fast and easy to understand",
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),linear-gradient(180deg,#070B14_0%,#0B0F1A_58%,#0B0F1A_100%)]" />

      <header className="border-b border-white/10 bg-[#0B0F1A]/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-[0_0_32px_rgba(34,211,238,0.26)]">
              UK
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-400">Simple Money Tools</div>
              <div className="text-lg font-bold tracking-tight text-white">UK Calculator Hub</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
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

        <nav className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:hidden lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="relative overflow-hidden">
        <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-8 lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
              Premium UK finance dashboard
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                UK Calculator Hub
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Simple UK calculators for salary, rent, mortgage, pension, hourly pay and cost of living.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/salary-calculator-uk"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-[0_22px_60px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
              >
                Try Salary Calculator
              </Link>
              <a
                href="#tools"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-semibold text-slate-100 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-white"
              >
                Explore Tools
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-[0_20px_55px_rgba(2,6,23,0.25)] backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.65)]" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.25rem] bg-cyan-400/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(2,6,23,0.38)] backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  Monthly snapshot
                </div>
                <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Estimate
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-6 text-white shadow-[0_28px_70px_rgba(34,211,238,0.24)]">
                <div className="text-sm font-medium text-blue-50/90">Take-home pay per month</div>
                <div className="mt-4 text-5xl font-black tracking-tight text-emerald-200 drop-shadow-[0_0_16px_rgba(110,231,183,0.35)] sm:text-6xl">
                  £2,726
                </div>
                <div className="mt-4 max-w-md text-sm leading-6 text-blue-50/90">
                  Clear, fast salary insights with a dashboard-style layout that feels more like a finance app than a
                  basic calculator page.
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {stat.label}
                    </div>
                    <div className={`mt-3 text-2xl font-bold tracking-tight ${stat.tone}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Income flow</div>
                      <div className="mt-1 text-sm text-slate-400">Gross pay versus deductions and net salary</div>
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Preview</div>
                  </div>

                  <div className="mt-6 flex h-40 items-end gap-4">
                    <div className="flex flex-1 flex-col items-center gap-3">
                      <div
                        className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-blue-500 to-cyan-400 shadow-[0_12px_28px_rgba(34,211,238,0.22)]"
                        style={{ height: "92%" }}
                      />
                      <span className="text-xs font-medium text-slate-400">Gross</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-3">
                      <div
                        className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-rose-500 to-orange-400 shadow-[0_12px_28px_rgba(251,113,133,0.18)]"
                        style={{ height: "34%" }}
                      />
                      <span className="text-xs font-medium text-slate-400">Tax + NI</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-3">
                      <div
                        className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-emerald-500 to-cyan-400 shadow-[0_12px_28px_rgba(52,211,153,0.2)]"
                        style={{ height: "67%" }}
                      />
                      <span className="text-xs font-medium text-slate-400">Take-home</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">Deduction mix</div>
                  <div className="mt-1 text-sm text-slate-400">A quick visual of where monthly pay is allocated.</div>
                  <div className="mt-6 flex justify-center">
                    <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#34d399_0_62%,#3b82f6_62%_77%,#22d3ee_77%_84%,#f59e0b_84%_92%,#fb7185_92%_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.45)]">
                      <div className="h-full w-full rounded-full bg-[#121826]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">Net pay</div>
                          <div className="mt-1 text-xl font-bold text-white">73%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      Take-home
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                      Tax
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      NI
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      Pension
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
                Calculator suite
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                Everyday UK money tools in one clean dashboard
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Start with the tool you need most, then compare pay, housing and living costs with the same premium
                design language across the site.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[1.85rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.3)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_26px_70px_rgba(34,211,238,0.14)]"
              >
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Calculator
                </div>
                <h3 className="text-[1.65rem] font-bold tracking-tight text-white">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{tool.description}</p>
                <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
                  Open tool →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
