import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";

const tools = [
  {
    title: "Salary Calculator",
    description: "Estimate take-home pay after tax, National Insurance, pension and student loan deductions.",
    href: "/salary-calculator-uk",
    badge: "Popular",
  },
  {
    title: "Pension Calculator",
    description: "See how employee and employer contributions can change your monthly pay and long-term pension value.",
    href: "/pension-contribution-calculator-uk",
    badge: "Planning",
  },
  {
    title: "Hourly Pay Calculator",
    description: "Convert hourly wages into weekly, monthly and yearly earnings with clear UK-style comparisons.",
    href: "/hourly-wage-calculator-uk",
    badge: "Quick check",
  },
  {
    title: "Mortgage Affordability",
    description: "Compare income, deposit and debt payments to explore a realistic property budget.",
    href: "/mortgage-affordability-uk",
    badge: "Home buying",
  },
  {
    title: "Rent Affordability",
    description: "Check whether rent fits your income once bills, groceries, transport and childcare are included.",
    href: "/rent-affordability-uk",
    badge: "Budgeting",
  },
  {
    title: "Cost of Living",
    description: "Estimate monthly and yearly household costs across common UK living situations.",
    href: "/cost-of-living-uk",
    badge: "Lifestyle",
  },
] as const;

const highlights = [
  "Clear UK-focused assumptions",
  "Mobile-friendly calculator layouts",
  "Visual breakdowns instead of dense tables",
  "Built to be fast, simple and trustworthy",
] as const;

const dashboardStats = [
  { label: "Monthly take-home", value: "£2,726", tone: "text-emerald-300" },
  { label: "Income tax", value: "£503", tone: "text-rose-300" },
  { label: "National Insurance", value: "£216", tone: "text-cyan-300" },
  { label: "Pension", value: "£188", tone: "text-amber-300" },
] as const;

export const metadata: Metadata = {
  title: "UK Calculator Hub | Salary, Pension, Rent and Mortgage Tools",
  description:
    "Simple UK calculators for salary, rent, mortgage, pension, hourly pay and cost of living in a premium dashboard experience.",
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_32%),linear-gradient(180deg,#070B14_0%,#0B0F1A_58%,#0B0F1A_100%)]" />
        <div className="container-shell px-4 py-12 sm:px-6 sm:py-16 lg:px-0 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-12">
            <div className="space-y-7">
              <div className="eyebrow">Premium UK money tools</div>
              <div className="space-y-5">
                <h1 className="section-title max-w-4xl text-white">UK Calculator Hub</h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Simple UK calculators for salary, rent, mortgage, pension, hourly pay and cost of living.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/salary-calculator-uk"
                  className="action-button rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-white shadow-[0_22px_60px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
                >
                  Try salary calculator
                </Link>
                <Link
                  href="#tools"
                  className="action-button rounded-full border border-white/10 bg-white/5 px-6 text-slate-100 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-white"
                >
                  Explore all calculators
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.65)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2.25rem] bg-cyan-400/10 blur-3xl" />
              <div className="glass-card glow-card rounded-[2rem] p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    Monthly snapshot
                  </div>
                  <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Estimated
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-6 text-white shadow-[0_28px_70px_rgba(34,211,238,0.24)]">
                  <div className="text-sm font-medium text-blue-50/90">Take-home pay per month</div>
                  <div className="mt-4 text-5xl font-black tracking-tight text-emerald-200 drop-shadow-[0_0_16px_rgba(110,231,183,0.35)] sm:text-6xl">
                    £2,726
                  </div>
                  <div className="mt-4 max-w-md text-sm leading-6 text-blue-50/90">
                    Clear, fast estimates for UK salary deductions with a dashboard-style breakdown that is easy to
                    scan on desktop and mobile.
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {dashboardStats.map((stat) => (
                    <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {stat.label}
                      </div>
                      <div className={`mt-3 text-2xl font-bold tracking-tight text-white ${stat.tone}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
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
                        <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-blue-500 to-cyan-400 shadow-[0_12px_28px_rgba(34,211,238,0.22)]" style={{ height: "92%" }} />
                        <span className="text-xs font-medium text-slate-400">Gross</span>
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-3">
                        <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-rose-500 to-orange-400 shadow-[0_12px_28px_rgba(251,113,133,0.18)]" style={{ height: "34%" }} />
                        <span className="text-xs font-medium text-slate-400">Deductions</span>
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-3">
                        <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-emerald-500 to-cyan-400 shadow-[0_12px_28px_rgba(52,211,153,0.2)]" style={{ height: "67%" }} />
                        <span className="text-xs font-medium text-slate-400">Take-home</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold text-white">Deduction mix</div>
                    <div className="mt-1 text-sm text-slate-400">A quick visual of where pay is allocated.</div>
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
          </div>
        </div>
      </section>

      <section id="tools" className="container-shell px-4 py-6 sm:px-6 sm:py-10 lg:px-0 lg:py-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">All calculators</div>
            <h2 className="section-heading mt-4">Everything you need for everyday UK money decisions</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Start with the tool you need most, then compare the impact across pay, housing, pensions and monthly
              costs in the same clear dashboard style.
            </p>
          </div>
          <Link
            href="/salary-calculator-uk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Start with the salary calculator
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="container-shell px-4 pb-14 pt-2 sm:px-6 lg:px-0 lg:pb-20">
        <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-4">
              <div className="eyebrow">Why people use it</div>
              <h2 className="section-heading">A cleaner way to understand pay, housing and living costs</h2>
              <p className="text-base leading-7 text-slate-300">
                UK Calculator Hub is built to feel more like a premium finance app than a cluttered calculator site,
                with modern visuals, practical assumptions and mobile-friendly layouts that stay easy to read.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Fast clarity</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Large numbers, simple breakdowns and visual summaries help people understand the result quickly.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Built for the UK</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Salary, pension, housing and cost calculators are tailored to common UK use cases and language.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Mobile first</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Cards stack cleanly, actions stay tappable, and the design remains readable on smaller screens.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Ready to grow</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  The project is structured for future SEO, analytics, saved calculations and monetisation layers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
