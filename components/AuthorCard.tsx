import Image from "next/image";
import Link from "next/link";
import { founderProfile } from "@/lib/author";

type AuthorCardProps = {
  title?: string;
};

export function AuthorCard({ title = "About the author" }: AuthorCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.34)] backdrop-blur-xl md:p-6">
      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">{title}</div>
      <div className="mt-4 grid gap-5 md:grid-cols-[148px_minmax(0,1fr)] md:items-start">
        <div className="relative mx-auto aspect-[4/5] w-36 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0f1728] shadow-[0_20px_40px_rgba(2,6,23,0.28)] md:mx-0">
          <Image
            src={founderProfile.photo}
            alt={`${founderProfile.name} portrait`}
            fill
            sizes="148px"
            className="object-cover object-top"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">{founderProfile.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-400">{founderProfile.role}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{founderProfile.currentRole}</p>
          <p className="mt-4 text-sm leading-6 text-slate-300">{founderProfile.bio}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {founderProfile.highlights.map((highlight) => (
              <div key={highlight} className="rounded-[1.2rem] border border-white/10 bg-[#0f1728]/70 px-4 py-3 text-sm leading-6 text-slate-300">
                {highlight}
              </div>
            ))}
          </div>

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
        </div>
      </div>
    </section>
  );
}
