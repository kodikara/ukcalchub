import type { Metadata } from "next";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "About UK Calculator Hub",
  description: "Learn more about UK Calculator Hub and the goal behind its UK-focused money calculators.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <ContentPageShell
      eyebrow="About"
      title="About UK Calculator Hub"
      intro="UK Calculator Hub is designed to make everyday money questions easier to understand with modern, UK-focused tools and clear visual results."
    >
      <p>
        The aim is to build useful calculators that feel simple, trustworthy, and fast to use on both desktop and mobile.
        The first version focuses on salary, pension, rent affordability, mortgage affordability, hourly pay, and cost of living.
      </p>
      <p>
        Version 1 keeps things lightweight on purpose: no accounts, no database, and no paid APIs. Calculations are handled with
        local TypeScript logic so the site stays fast, affordable to run, and easy to improve over time.
      </p>
      <p>
        If you spot an issue or want a new calculator added, the contact page is the best place to get in touch.
      </p>
    </ContentPageShell>
  );
}
