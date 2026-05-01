"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const CONSENT_KEY = "ukcalchub_cookie_consent_v1";

type ConsentState = {
  analytics: boolean;
  updatedAt: string;
};

type CookieConsentProps = {
  measurementId?: string;
};

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CONSENT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

export function CookieConsent({ measurementId }: CookieConsentProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const savedConsent = readConsent();
    setConsent(savedConsent);
    setAnalyticsEnabled(savedConsent?.analytics ?? false);
    setReady(true);
  }, []);

  const shouldLoadAnalytics = useMemo(() => {
    return Boolean(measurementId && consent?.analytics);
  }, [consent?.analytics, measurementId]);

  function applyConsent(nextAnalyticsValue: boolean) {
    const nextConsent = {
      analytics: nextAnalyticsValue,
      updatedAt: new Date().toISOString(),
    };

    storeConsent(nextConsent);
    setConsent(nextConsent);
    setAnalyticsEnabled(nextAnalyticsValue);
    setShowSettings(false);
  }

  if (!ready) {
    return null;
  }

  return (
    <>
      {shouldLoadAnalytics ? <GoogleAnalytics measurementId={measurementId!} /> : null}

      {consent ? null : (
        <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6">
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-[#121a2c]/95 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.55)] ring-1 ring-cyan-400/10 backdrop-blur-xl sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl space-y-2">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan-300">Privacy choices</div>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-[1.35rem]">
                    Optional analytics, your choice
                  </h2>
                  <p className="text-sm leading-6 text-slate-200">
                    We only use analytics if you allow it. Essential site storage is used only to remember this choice.
                  </p>
                  <p className="text-sm leading-6 text-slate-400">
                    Read more in the{" "}
                    <Link href="/privacy-policy" className="font-medium text-cyan-300 hover:text-cyan-200">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
                  <button
                    type="button"
                    onClick={() => applyConsent(false)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 text-sm font-semibold text-slate-50 transition hover:border-white/20 hover:bg-white/10"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings((current) => !current)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/12 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/45 hover:bg-cyan-400/18"
                  >
                    Cookie settings
                  </button>
                  <button
                    type="button"
                    onClick={() => applyConsent(true)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(34,211,238,0.2)] transition hover:-translate-y-0.5"
                  >
                    Accept
                  </button>
                </div>
              </div>

              {showSettings ? (
                <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-[#0d1322] p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">Analytics cookies</div>
                      <p className="text-sm leading-6 text-slate-400">
                        Helps us measure visits and improve the calculators. Leave this off if you do not want
                        analytics tracking.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-100">
                      <span className="min-w-20 text-right">{analyticsEnabled ? "Enabled" : "Disabled"}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={analyticsEnabled}
                        onClick={() => setAnalyticsEnabled((current) => !current)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                          analyticsEnabled ? "bg-cyan-400/80" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white transition ${
                            analyticsEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => applyConsent(analyticsEnabled)}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Save choices
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
