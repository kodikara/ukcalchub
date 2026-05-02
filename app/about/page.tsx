import type { Metadata } from "next";
import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
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
      <AuthorCard title="Meet the founder" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Who built the site?</h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          {founderProfile.name} built UK Calculator Hub after seeing how often practical money questions are answered
          either with dense spreadsheets or with old-looking tools that feel harder to trust on mobile. His background
          is in engineering rather than regulated financial advice, so the goal is not to present the site as an
          authority figure with hidden formulas. The goal is to give people a cleaner, more inspectable way to think
          through salary, rent, mortgage, pension and cost-of-living questions.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-300">
          That is why the site leans on current UK tax-year references, plain-English explanations, official source
          links and clear disclaimers. The tools are meant to help people plan better and ask better questions, not to
          replace an accountant, mortgage adviser or financial planner.
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
