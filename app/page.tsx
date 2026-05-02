import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { founderProfile } from "@/lib/author";
import { siteConfig } from "@/lib/site";

const tools = [
  {
    title: "UK Salary Calculator",
    description: "Estimate salary after tax, National Insurance, pension and student loan deductions.",
    href: "/salary-calculator-uk",
    badge: "Popular",
  },
  {
    title: "Take-Home Pay Calculator",
    description: "Focus on monthly and weekly net pay with a clear gross-versus-net view.",
    href: "/take-home-pay-calculator-uk",
    badge: "Net pay",
  },
  {
    title: "Rent Affordability Calculator",
    description: "Check whether rent still feels workable once council tax, bills, food and transport are included.",
    href: "/rent-affordability-calculator-uk",
    badge: "Budgeting",
  },
  {
    title: "Mortgage Affordability Calculator",
    description: "Explore a rough borrowing range, deposit impact and possible monthly mortgage cost.",
    href: "/mortgage-affordability-calculator-uk",
    badge: "Home buying",
  },
  {
    title: "Hourly Wage Calculator",
    description: "Convert salary to hourly pay or compare hourly rates with weekly, monthly and annual income.",
    href: "/hourly-wage-calculator-uk",
    badge: "Quick check",
  },
  {
    title: "Pension Contribution Calculator",
    description: "See how employee and employer pension contributions affect take-home pay and total pension value.",
    href: "/pension-contribution-calculator-uk",
    badge: "Planning",
  },
  {
    title: "Cost of Living Calculator",
    description: "Estimate monthly and yearly household costs including council tax and real UK living expenses.",
    href: "/cost-of-living-calculator-uk",
    badge: "Lifestyle",
  },
  {
    title: "Salary + Rent Calculator",
    description: "Check whether a given rent still looks workable once your estimated take-home pay is compared with monthly costs.",
    href: "/salary-rent-affordability-calculator-uk",
    badge: "Combined view",
  },
] as const;

const popularLinks = [
  { href: "/salary-calculator-uk", label: "Salary after tax calculator" },
  { href: "/take-home-pay-calculator-uk", label: "Monthly take-home pay calculator" },
  { href: "/rent-affordability-calculator-uk", label: "How much rent can I afford?" },
  { href: "/mortgage-affordability-calculator-uk", label: "How much mortgage can I borrow?" },
  { href: "/salary-rent-affordability-calculator-uk", label: "Can I afford this rent on my salary?" },
] as const;

const whyUseCards = [
  {
    title: "Made for UK searches",
    text: "Each tool is built around practical UK questions such as salary after tax, rent affordability and workplace pension impact.",
  },
  {
    title: "Visual, not table-heavy",
    text: "Big result cards and clean charts help people understand the outcome quickly on mobile and desktop.",
  },
  {
    title: "No sign-up required",
    text: "You can use every calculator straight away without creating an account or saving personal data.",
  },
  {
    title: "Fast to crawl and fast to use",
    text: "The site stays lightweight with local TypeScript logic, static-friendly routes and clear internal linking.",
  },
] as const;

export const metadata: Metadata = {
  title: "UK Calculator Hub",
  description:
    "Simple UK calculators for salary, take-home pay, rent, mortgage, pension, hourly wage and cost of living.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/icon.png`,
            founder: {
              "@type": "Person",
              name: founderProfile.name,
              sameAs: founderProfile.linkedin,
            },
            sameAs: [founderProfile.linkedin],
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: founderProfile.email,
              },
            ],
          },
        ]}
      />

      <div className="overflow-hidden">
        <section className="relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),linear-gradient(180deg,#070B14_0%,#0B0F1A_60%,#0B0F1A_100%)]" />
          <div className="container-shell px-4 py-12 sm:px-6 sm:py-16 lg:px-0 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-12">
              <div className="space-y-7">
                <div className="eyebrow">UK-focused money tools</div>
                <div className="space-y-5">
                  <h1 className="section-title text-white">UK Calculator Hub</h1>
                  <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                    Simple UK calculators for salary, take-home pay, rent, mortgage, pension, hourly wage and cost of
                    living.
                  </p>
                  <p className="max-w-2xl text-base leading-7 text-slate-400">
                    Use clear UK-focused tools to understand what pay looks like after deductions, whether housing fits
                    your budget, and how monthly living costs compare across common scenarios.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/salary-calculator-uk"
                    className="action-button rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-white shadow-[0_22px_60px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
                  >
                    Calculate your take-home pay
                  </Link>
                  <Link
                    href="/rent-affordability-calculator-uk"
                    className="action-button rounded-full border border-white/10 bg-white/5 px-6 text-slate-100 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-white"
                  >
                    Check rent affordability
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {popularLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="glass-card rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[2.25rem] bg-cyan-400/10 blur-3xl" />
                <div className="glass-card glow-card rounded-[2rem] p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                      Premium preview
                    </div>
                    <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Estimate only
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-6 text-white shadow-[0_28px_70px_rgba(34,211,238,0.24)]">
                    <div className="text-sm font-medium text-blue-50/90">Monthly take-home estimate</div>
                    <div className="mt-4 text-5xl font-black tracking-tight text-emerald-200 drop-shadow-[0_0_16px_rgba(110,231,183,0.35)] sm:text-6xl">
                      £2,726
                    </div>
                    <div className="mt-4 max-w-md text-sm leading-6 text-blue-50/90">
                      Understand gross pay, tax, National Insurance and pension with the same clean dashboard style
                      across every calculator.
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Income tax", value: "£503", tone: "text-rose-300" },
                      { label: "National Insurance", value: "£216", tone: "text-cyan-300" },
                      { label: "Pension", value: "£188", tone: "text-violet-300" },
                      { label: "Net pay", value: "73%", tone: "text-emerald-300" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          {item.label}
                        </div>
                        <div className={`mt-3 text-2xl font-bold tracking-tight text-white ${item.tone}`}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold text-white">Gross vs deductions vs net</div>
                      <div className="mt-1 text-sm text-slate-400">A familiar salary snapshot in one glance.</div>
                      <div className="mt-6 flex h-40 items-end gap-4">
                        <div className="flex flex-1 flex-col items-center gap-3">
                          <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-blue-500 to-cyan-400" style={{ height: "94%" }} />
                          <span className="text-xs font-medium text-slate-400">Gross</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center gap-3">
                          <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-rose-500 to-orange-400" style={{ height: "36%" }} />
                          <span className="text-xs font-medium text-slate-400">Deductions</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center gap-3">
                          <div className="w-full rounded-t-[1.25rem] bg-gradient-to-t from-emerald-500 to-cyan-400" style={{ height: "68%" }} />
                          <span className="text-xs font-medium text-slate-400">Take-home</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-semibold text-white">Deduction mix</div>
                      <div className="mt-1 text-sm text-slate-400">A small dashboard-style split.</div>
                      <div className="mt-6 flex justify-center">
                        <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#34d399_0_62%,#fb7185_62%_76%,#22d3ee_76%_84%,#8b5cf6_84%_92%,#3b82f6_92%_100%)] p-4">
                          <div className="h-full w-full rounded-full bg-[#121826]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">Net pay</div>
                              <div className="mt-1 text-xl font-bold text-white">73%</div>
                            </div>
                          </div>
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
            <div className="max-w-3xl">
              <div className="eyebrow">Tool grid</div>
              <h2 className="section-heading mt-4">Choose the calculator that matches the decision you are making</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Every tool is designed for practical UK money questions, with clean visuals, plain-English explanations
                and internal links to the next calculator that usually helps.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        <section className="container-shell px-4 py-2 sm:px-6 lg:px-0">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="space-y-4">
                <div className="eyebrow">Popular UK calculators</div>
                <h2 className="section-heading">Start with the pages most people look for first</h2>
                <p className="text-base leading-7 text-slate-300">
                  Start with the most common money questions: what will I take home, what rent can I afford, and how
                  much could I borrow?
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {popularLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/pension-contribution-calculator-uk"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
                >
                  Workplace pension contribution calculator
                </Link>
                <Link
                  href="/hourly-wage-calculator-uk"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
                >
                  Hourly wage and salary conversion
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell px-4 py-8 sm:px-6 lg:px-0">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-4">
                <div className="eyebrow">Useful next clicks</div>
                <h2 className="section-heading">Popular salary examples and practical explainers</h2>
                <p className="text-base leading-7 text-slate-300">
                  If you already have a salary figure in mind, these quick guides help you compare common UK salary
                  levels, understand payslip differences, and move straight into rent planning.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { href: "/salary-after-tax-25000-uk", label: "£25,000 salary after tax" },
                  { href: "/salary-after-tax-28000-uk", label: "£28,000 salary after tax" },
                  { href: "/salary-after-tax-30000-uk", label: "£30,000 salary after tax" },
                  { href: "/salary-after-tax-32000-uk", label: "£32,000 salary after tax" },
                  { href: "/salary-after-tax-35000-uk", label: "£35,000 salary after tax" },
                  { href: "/salary-after-tax-38000-uk", label: "£38,000 salary after tax" },
                  { href: "/salary-after-tax-40000-uk", label: "£40,000 salary after tax" },
                  { href: "/salary-after-tax-42000-uk", label: "£42,000 salary after tax" },
                  { href: "/salary-after-tax-45000-uk", label: "£45,000 salary after tax" },
                  { href: "/salary-after-tax-50000-uk", label: "£50,000 salary after tax" },
                  { href: "/salary-after-tax-55000-uk", label: "£55,000 salary after tax" },
                  { href: "/salary-after-tax-60000-uk", label: "£60,000 salary after tax" },
                  { href: "/salary-after-tax-70000-uk", label: "£70,000 salary after tax" },
                  { href: "/salary-after-tax-80000-uk", label: "£80,000 salary after tax" },
                  { href: "/salary-after-tax-100000-uk", label: "£100,000 salary after tax" },
                  { href: "/why-is-my-payslip-different-from-salary-calculator-uk", label: "Why payslips differ from calculators" },
                  { href: "/salary-rent-affordability-calculator-uk", label: "Can I afford this rent on my salary?" },
                  { href: "/what-is-1257l-tax-code-uk", label: "What the 1257L tax code means" },
                  { href: "/what-is-salary-sacrifice-uk", label: "How salary sacrifice affects pay" },
                  { href: "/uk-personal-allowance-2026-27", label: "UK personal allowance 2026/27" },
                  { href: "/how-does-pension-auto-enrolment-work-uk", label: "How pension auto-enrolment works" },
                  { href: "/what-is-national-insurance-uk", label: "What National Insurance is for" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell px-4 py-2 sm:px-6 lg:px-0">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="space-y-4">
                <div className="eyebrow">Guides</div>
                <h2 className="section-heading">Short explainers for tax codes, salary sacrifice and pensions</h2>
                <p className="text-base leading-7 text-slate-300">
                  These plain-English guides support the calculators with context on payroll terms, tax thresholds and
                  pension rules that often confuse people when they compare salary examples.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { href: "/what-is-1257l-tax-code-uk", label: "What is the 1257L tax code?" },
                  { href: "/what-is-salary-sacrifice-uk", label: "What is salary sacrifice?" },
                  { href: "/uk-personal-allowance-2026-27", label: "UK personal allowance 2026/27" },
                  { href: "/how-does-pension-auto-enrolment-work-uk", label: "How pension auto-enrolment works" },
                  { href: "/what-is-national-insurance-uk", label: "What is National Insurance?" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell px-4 pb-10 pt-8 sm:px-6 lg:px-0 lg:pb-12">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-4">
                <div className="eyebrow">Why use UKCalcHub?</div>
                <h2 className="section-heading">Built to feel more like a finance app than an old calculator site</h2>
                <p className="text-base leading-7 text-slate-300">
                  The goal is to make everyday money decisions easier to understand without clutter, hidden forms or
                  confusing tables.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {whyUseCards.map((card) => (
                  <div key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{card.title}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell px-4 pb-14 sm:px-6 lg:px-0 lg:pb-20">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            These results are estimates only and should not be treated as financial, tax, legal or professional advice.
          </div>
        </section>
      </div>
    </>
  );
}
