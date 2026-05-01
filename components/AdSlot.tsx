type AdSlotProps = {
  label?: string;
  className?: string;
};

export function AdSlot({ label = "Future ad slot", className = "" }: AdSlotProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 ${className}`.trim()}
    >
      {label}
      {/* Future Google AdSense code can be rendered here. */}
    </div>
  );
}
