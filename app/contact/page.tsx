import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ContentPageShell } from "@/components/ContentPageShell";
import { founderProfile } from "@/lib/author";

export const metadata: Metadata = {
  title: "Contact UK Calculator Hub",
  description: "Report an issue, suggest a calculator, or contact UK Calculator Hub.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <ContentPageShell
      eyebrow="Contact"
      title="Contact UK Calculator Hub"
      intro="Report an issue, suggest a calculator, or contact UK Calculator Hub."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_36px_rgba(2,6,23,0.24)]">
          <div className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-300">Email</div>
          <div className="mt-3 text-lg font-semibold text-white">
            <Link href={`mailto:${founderProfile.email}`} className="text-cyan-300 hover:text-cyan-200">
              {founderProfile.email}
            </Link>
          </div>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Use email for bug reports, calculator suggestions, partnership enquiries, or general feedback.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            A branded domain mailbox can be added later through email hosting, but for now the most direct contact
            route is the founder email above.
          </p>
          <div className="mt-4 text-sm leading-6 text-slate-400">
            Founder:{" "}
            <Link href={founderProfile.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">
              {founderProfile.name}
            </Link>
            {" "}• {founderProfile.currentRole}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            UKCalcHub is built by a real person, not by an anonymous content network. That means feedback can directly
            shape clearer wording, new calculators and fixes where a result feels confusing.
          </p>
        </div>

        <ContactForm />
      </div>
    </ContentPageShell>
  );
}
