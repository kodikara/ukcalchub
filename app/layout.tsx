import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "UK Salary & Cost Calculators | Simple UK Money Tools",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "UK Salary & Cost Calculators | Simple UK Money Tools",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Salary & Cost Calculators | Simple UK Money Tools",
    description: siteConfig.description,
  },
  verification: {
    google: googleVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="shell">
        {googleAnalyticsId ? <GoogleAnalytics measurementId={googleAnalyticsId} /> : null}
        <div className="relative min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
