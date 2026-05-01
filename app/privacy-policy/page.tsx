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
      intro="This page explains the basic privacy position for the current version of UK Calculator Hub."
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
        Future versions may add analytics, advertising, saved calculations, or contact workflows. If that happens, this
        privacy policy should be updated before those features go live.
      </p>
      <p>
        If you contact UK Calculator Hub directly by email, your message and email address may be used to respond to
        your enquiry.
      </p>
    </ContentPageShell>
  );
}
