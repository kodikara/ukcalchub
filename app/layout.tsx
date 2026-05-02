import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

function normaliseGoogleVerification(value?: string) {
  if (!value) {
    return undefined;
  }

  const contentMatch = value.match(/content=["']([^"']+)["']/i);
  if (contentMatch?.[1]) {
    return contentMatch[1];
  }

  return value.trim();
}

const googleVerification = normaliseGoogleVerification(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "UK Calculator Hub | Simple UK Money Calculators",
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
    title: "UK Calculator Hub | Simple UK Money Calculators",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Calculator Hub | Simple UK Money Calculators",
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
        <CookieConsent measurementId={googleAnalyticsId} />
        <div className="relative min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
