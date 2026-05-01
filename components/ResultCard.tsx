type ResultCardProps = {
  eyebrow?: string;
  title: string;
  value: string;
  detail?: string;
  tone?: "teal" | "blue" | "amber";
};

const toneClasses = {
  teal: "from-blue-600 to-cyan-500",
  blue: "from-blue-700 to-cyan-500",
  amber: "from-blue-600 to-cyan-500",
};

export function ResultCard({ eyebrow, title, value, detail, tone = "teal" }: ResultCardProps) {
  return (
    <div className={`glow-card rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${toneClasses[tone]} p-6 shadow-[0_24px_64px_rgba(59,130,246,0.25)] md:rounded-[2rem] md:p-7`}>
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </div>
      ) : null}
      <div className="text-sm font-medium text-blue-50/90">{title}</div>
      <div
        className={`display-font mt-3 text-4xl font-bold tracking-tight md:text-6xl ${tone === "teal" ? "text-emerald-200" : tone === "blue" ? "text-cyan-100" : "text-white"}`}
        style={{ textShadow: "0 0 28px rgba(255,255,255,0.22)" }}
      >
        {value}
      </div>
      {detail ? <p className="mt-4 max-w-xl text-sm leading-6 text-blue-50/80">{detail}</p> : null}
    </div>
  );
}
