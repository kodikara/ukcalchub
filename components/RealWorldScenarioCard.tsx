import type { ReactNode } from "react";

type ScenarioItem = {
  label: string;
  value: string;
  note?: string;
};

type RealWorldScenarioCardProps = {
  title?: string;
  intro?: string;
  items: ScenarioItem[];
  summary: ReactNode;
};

export function RealWorldScenarioCard({
  title = "Real UK Example",
  intro,
  items,
  summary,
}: RealWorldScenarioCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#0f1728]/70 p-5 shadow-[0_16px_34px_rgba(2,6,23,0.22)]">
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      {intro ? <p className="mt-2 text-sm leading-6 text-slate-400">{intro}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            {item.note ? <p className="mt-1 text-sm leading-6 text-slate-400">{item.note}</p> : null}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-cyan-400/12 bg-cyan-400/[0.06] px-4 py-3 text-sm leading-6 text-slate-200">
        {summary}
      </div>
    </div>
  );
}
