import type { ReactNode } from "react";

type ContentPageShellProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function ContentPageShell({ eyebrow, title, intro, children }: ContentPageShellProps) {
  return (
    <div className="container-shell px-0 py-8 md:py-12">
      <section className="max-w-4xl space-y-4">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="section-title font-semibold text-white">{title}</h1>
        <p className="body-copy max-w-3xl text-lg leading-9 md:text-[1.45rem] md:leading-[2.4rem]">{intro}</p>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:mt-10 md:p-8">
        <div className="space-y-7 text-lg leading-9 text-slate-200 md:text-[1.12rem] md:leading-[2.15rem]">{children}</div>
      </section>
    </div>
  );
}
