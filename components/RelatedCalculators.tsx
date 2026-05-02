import Link from "next/link";

type RelatedCalculator = {
  title: string;
  description: string;
  href: string;
};

type RelatedCalculatorsProps = {
  title?: string;
  description?: string;
  links: RelatedCalculator[];
};

export function RelatedCalculators({
  title = "Related calculators",
  description = "Explore the next calculator that usually helps after this one.",
  links,
}: RelatedCalculatorsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 transition hover:border-cyan-400/30 hover:bg-white/6"
          >
            <div className="text-sm font-semibold text-white">{link.title}</div>
            <p className="mt-1 text-sm leading-6 text-slate-400">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
