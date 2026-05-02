"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CURRENT_TAX_YEAR_LABEL } from "@/lib/taxYear";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/salary-calculator-uk", label: "Salary" },
  { href: "/take-home-pay-calculator-uk", label: "Take-home" },
  { href: "/salary-rent-affordability-calculator-uk", label: "Salary + Rent" },
  { href: "/pension-contribution-calculator-uk", label: "Pension" },
  { href: "/hourly-wage-calculator-uk", label: "Hourly" },
  { href: "/mortgage-affordability-calculator-uk", label: "Mortgage" },
  { href: "/rent-affordability-calculator-uk", label: "Rent" },
  { href: "/cost-of-living-calculator-uk", label: "Cost of Living" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center">
              <Image src="/icon.png" alt="UK Calculator Hub logo" width={44} height={44} className="h-11 w-11" priority />
            </div>
            <div className="min-w-0">
              <div className="hidden text-sm font-semibold text-slate-500 sm:block">Simple Money Tools</div>
              <div className="display-font truncate text-base font-bold tracking-tight text-white sm:text-[1.05rem]">
                UK Calculator Hub
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
              {CURRENT_TAX_YEAR_LABEL}
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "rounded-full border border-cyan-400/30 bg-cyan-400/12 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_10px_24px_rgba(34,211,238,0.12)]"
                      : "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 shadow-[0_10px_24px_rgba(2,6,23,0.22)] transition hover:border-cyan-400/30 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <>
                  <path d="M3.5 5.5H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3.5 10H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3.5 14.5H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen ? (
          <nav className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-3 shadow-[0_18px_40px_rgba(2,6,23,0.32)] backdrop-blur-xl md:hidden">
            <div className="mb-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200">
              {CURRENT_TAX_YEAR_LABEL}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={
                      active
                        ? "rounded-2xl border border-cyan-400/30 bg-cyan-400/12 px-4 py-3 text-sm font-semibold text-cyan-200 shadow-[0_10px_24px_rgba(34,211,238,0.12)]"
                        : "rounded-2xl border border-white/10 bg-[#121826] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/20 hover:text-white"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
