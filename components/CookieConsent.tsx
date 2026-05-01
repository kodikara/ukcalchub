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
          <div className="container-shell">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0f1626]/92 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Privacy choices</div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Use a small, respectful cookie setup</h2>
                  <p className="text-sm leading-6 text-slate-300 sm:text-[0.95rem]">
                    UK Calculator Hub uses essential site storage to remember your privacy choice. Optional analytics
                    helps us understand which calculators people use, but it stays off unless you allow it.
                  </p>
                  <p className="text-sm leading-6 text-slate-400">
                    Read more in the <Link href="/privacy-policy" className="text-cyan-300 hover:text-cyan-200">privacy policy</Link>.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                  <button
                    type="button"
                    onClick={() => applyConsent(false)}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/8"
                  >
                    Reject analytics
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings((current) => !current)}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/14"
                  >
                    Manage choices
                  </button>
                  <button
                    type="button"
                    onClick={() => applyConsent(true)}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(34,211,238,0.2)] transition hover:-translate-y-0.5"
                  >
                    Accept analytics
                  </button>
                </div>
              </div>

              {showSettings ? (
                <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">Analytics cookies</div>
                      <p className="text-sm leading-6 text-slate-400">
                        Helps us measure visits and improve the calculators. Disabled by default until you opt in.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-200">
                      <span>{analyticsEnabled ? "On" : "Off"}</span>
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
