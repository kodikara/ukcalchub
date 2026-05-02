import type { Metadata } from "next";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Read how UK Calculator Hub uses essential site storage and optional analytics cookies.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Cookie policy"
      title="Cookie Policy"
      intro="This page explains the small amount of site storage and optional analytics behaviour used by UK Calculator Hub."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cookie policy" },
      ]}
    >
      <p>
        UK Calculator Hub uses a minimal cookie and site-storage approach. The aim is to keep the experience clean and
        privacy-aware while still letting people choose whether optional analytics is allowed.
      </p>
      <p>
        Essential site storage may be used to remember your cookie choice so the site does not repeatedly ask the same
        question on every page load. This storage is used to support the privacy setting itself rather than to profile
        users for advertising.
      </p>
      <p>
        If you accept analytics, Google Analytics may collect high-level usage information such as page views, browser
        type, general device information and navigation patterns. This is used to understand which calculators and
        guides are most useful and where people are getting stuck.
      </p>
      <p>
        If you reject analytics, optional tracking should stay off and the calculators should continue to work
        normally. The site does not currently require an account, and personal calculations are not saved to a user
        profile in this version.
      </p>
      <p>
        If cookie handling changes in future, for example because new analytics or advertising features are added, this
        policy should be updated before those features go live.
      </p>
    </ContentPageShell>
  );
}
