"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <Image src="/icon.png" alt="UK Calculator Hub logo" width={44} height={44} className="h-11 w-11" priority />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-500">Simple Money Tools</div>
              <div className="display-font text-base font-bold tracking-tight text-white">UK Calculator Hub</div>
            </div>
          </Link>

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
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/12 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_10px_24px_rgba(34,211,238,0.12)]"
                    : "shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 shadow-[0_10px_24px_rgba(2,6,23,0.22)]"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
