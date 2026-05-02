"use client";

import Link from "next/link";
import { useState } from "react";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TranslationContent = {
  sections: GuideSection[];
};

export type GuideReadingProps = {
  translations: {
    en: TranslationContent;
    si: TranslationContent;
    ta: TranslationContent;
  };
  furtherReading?: {
    label: string;
    href: string;
    note: string;
  }[];
};

const languageOptions = [
  { value: "en", label: "English" },
  { value: "si", label: "සිංහල" },
  { value: "ta", label: "தமிழ்" },
] as const;

type LanguageKey = (typeof languageOptions)[number]["value"];

export function GuideReading({ translations, furtherReading = [] }: GuideReadingProps) {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const content = translations[language];

  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
              Reading language
            </div>
            <p className="text-sm leading-6 text-slate-400">
              Only the long explanation section changes language. Page labels and calculator links stay in English.
            </p>
          </div>
          <label className="block min-w-[220px]">
            <span className="sr-only">Select reading language</span>
            <div className="relative">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageKey)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-[#121826] px-4 pr-11 text-base text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-7">
        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-white">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.heading}-${index}`}>{paragraph}</p>
            ))}
            {section.bullets?.length ? (
              <ul className="space-y-3 pl-5 text-slate-200">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="list-disc">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {furtherReading.length ? (
        <section className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Further reading</h2>
          <p className="mt-3 text-base leading-8 text-slate-300">
            These links are mainly official or evergreen UK guidance so the page stays useful over time rather than
            relying on fast-dating news coverage.
          </p>
          <div className="mt-5 grid gap-3">
            {furtherReading.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/6 hover:text-white"
              >
                <div className="font-semibold text-white">{item.label}</div>
                <div className="mt-2 leading-6 text-slate-400">{item.note}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
