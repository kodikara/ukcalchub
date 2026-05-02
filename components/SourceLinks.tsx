type SourceLink = {
  label: string;
  href: string;
  note?: string;
};

type SourceLinksProps = {
  title: string;
  description?: string;
  links: SourceLink[];
};

export function SourceLinks({ title, description, links }: SourceLinksProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      <div className="grid gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.35rem] border border-white/10 bg-[#0f1728]/70 px-4 py-4 transition hover:border-cyan-400/30 hover:bg-white/6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{link.label}</div>
                {link.note ? <p className="mt-1 text-sm leading-6 text-slate-400">{link.note}</p> : null}
              </div>
              <span className="shrink-0 text-sm font-semibold text-cyan-300">Open</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
