import type { Metadata } from "next";
import { ContentPageShell } from "@/components/ContentPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy for UK Calculator Hub.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains the privacy and cookie position for the current version of UK Calculator Hub."
    >
      <p>
        UK Calculator Hub is designed to provide calculator tools without requiring an account or permanent storage of
        calculator submissions in version 1.
      </p>
      <p>
        Calculator inputs are processed in your browser for the current session experience. The temporary feedback form
        on calculator pages does not save feedback permanently in this version.
      </p>
      <p>
        UK Calculator Hub uses a small consent setting so you can choose whether optional analytics is allowed. If you
        accept analytics, Google Analytics may collect information such as page views, general device or browser data,
        and high-level usage patterns to help improve the calculators and content.
      </p>
      <p>
        If you reject analytics, the site should continue to work normally and optional analytics tracking should remain
        off. Essential site storage may still be used to remember your privacy choice.
      </p>
      <p>
        If you contact UK Calculator Hub directly by email, your message and email address may be used to respond to
        your enquiry.
      </p>
      <p>
        Future versions may add advertising, saved calculations, or broader contact workflows. If that happens, this
        privacy policy should be updated before those features go live.
      </p>
    </ContentPageShell>
  );
}
