type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="soft-panel flex min-h-[132px] flex-col rounded-[1.35rem] p-4 backdrop-blur-xl">
      <div className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</div>
      <div className="display-font mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
      {hint ? <div className="mt-2 text-xs leading-5 text-slate-500">{hint}</div> : null}
    </div>
  );
}
