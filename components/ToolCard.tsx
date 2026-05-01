import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export function ToolCard({ title, description, href, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="glass-card shine-border group rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(34,211,238,0.16)] md:rounded-[2rem]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Calculator
        </div>
        {badge ? <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] font-semibold text-slate-400">{badge}</div> : null}
      </div>
      <h3 className="display-font text-[1.65rem] font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
        Open tool →
      </div>
    </Link>
  );
}
