import Link from "next/link";
import { founderProfile } from "@/lib/author";

type AuthorCardProps = {
  title?: string;
};

export function AuthorCard({ title = "About the author" }: AuthorCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:p-6">
      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">{title}</div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{founderProfile.name}</h2>
      <p className="mt-1 text-sm font-medium text-slate-400">{founderProfile.role}</p>
      <p className="mt-4 text-sm leading-6 text-slate-300">{founderProfile.bio}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={founderProfile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
        >
          View LinkedIn profile
        </Link>
        <Link
          href={`mailto:${founderProfile.email}`}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
        >
          Contact by email
        </Link>
      </div>
    </section>
  );
}
