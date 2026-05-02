import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorFeedback } from "@/components/CalculatorFeedback";

type CalculatorShellProps = {
  title: string;
  intro: string;
  trustNote?: string;
  form: ReactNode;
  results: ReactNode;
  explanation: ReactNode;
  example?: ReactNode;
  differences?: ReactNode;
  resources?: ReactNode;
  related?: ReactNode;
  faq: ReactNode;
  disclaimer: string;
};

export function CalculatorShell({
  title,
  intro,
  trustNote = "Estimate only. UK-focused. No sign-up required.",
  form,
  results,
  explanation,
  example,
  differences,
  resources,
  related,
  faq,
  disclaimer,
}: CalculatorShellProps) {
  return (
    <div className="container-shell px-0 py-6 md:py-12">
      <section className="mb-8 max-w-4xl space-y-4 md:mb-10">
        <span className="eyebrow">UK-focused calculator</span>
        <h1 className="section-title font-semibold text-white">{title}</h1>
        <p className="body-copy max-w-3xl text-base leading-7 md:text-lg md:leading-8">{intro}</p>
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-100">
          {trustNote}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:items-start lg:gap-7">
        <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{form}</div>
        <div className="space-y-6">{results}</div>
      </section>

      <AdSlot label="Future ad slot below calculator results" className="mt-5" />

      <section className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
        <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{explanation}</div>
        <div className="space-y-5">
          {example ? <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{example}</div> : null}
          {differences ? <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{differences}</div> : null}
        </div>
      </section>

      <section className="mt-8">
        <AdSlot label="Future ad slot before FAQ" />
      </section>

      <section className="mt-8">
        <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{faq}</div>
      </section>

      {resources ? (
        <section className="mt-8">
          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{resources}</div>
        </section>
      ) : null}

      {related ? (
        <section className="mt-8">
          <div className="glass-card rounded-[1.75rem] p-5 md:rounded-[2rem] md:p-6">{related}</div>
        </section>
      ) : null}

      <section className="mt-8">
        <CalculatorFeedback />
      </section>

      <section className="body-copy mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 shadow-[0_14px_32px_rgba(2,6,23,0.24)] backdrop-blur-xl">
        {disclaimer}
      </section>
    </div>
  );
}
