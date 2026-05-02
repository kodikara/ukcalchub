import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/ContentPageShell";
import { founderProfile } from "@/lib/author";

export const metadata: Metadata = {
  title: "About UK Calculator Hub",
  description: "Learn more about UK Calculator Hub and the goal behind its UK-focused money calculators.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <ContentPageShell
      eyebrow="About"
      title="About UK Calculator Hub"
      intro="UK Calculator Hub is designed to make everyday money questions easier to understand with modern, UK-focused tools and clear visual results."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About" },
      ]}
    >
      <p>
        The aim is to build useful calculators that feel simple, trustworthy, and fast to use on both desktop and mobile.
        The first version focuses on salary, pension, rent affordability, mortgage affordability, hourly pay, and cost of living.
      </p>
      <p>
        Version 1 keeps things lightweight on purpose: no accounts, no database, and no paid APIs. Calculations are handled with
        local TypeScript logic so the site stays fast, affordable to run, and easy to improve over time.
      </p>
      <p>
        If you spot an issue or want a new calculator added, the contact page is the best place to get in touch.
      </p>
      <p>
        If you want to see how the site approaches updates, source links, assumptions and calculator limitations, read
        the editorial policy.
      </p>
      <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Who built the site?</h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          {founderProfile.name} builds and maintains UKCalcHub. The focus is on creating practical calculators with
          transparent assumptions, current UK tax-year references, clear explanations and a cleaner user experience
          than many old-style money tool sites.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/editorial-policy"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            Editorial policy
          </Link>
          <Link
            href={founderProfile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            LinkedIn profile
          </Link>
          <Link
            href={`mailto:${founderProfile.email}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            {founderProfile.email}
          </Link>
        </div>
      </div>
    </ContentPageShell>
  );
}
