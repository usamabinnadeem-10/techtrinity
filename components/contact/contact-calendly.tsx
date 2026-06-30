"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGED_EVENT, readFunctionalConsent } from "@/lib/consent";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/techtrinity/discovery";

const EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=0f0f0f&text_color=ede9e1&primary_color=b8ff57`;

/**
 * Consent-gated Calendly embed. Renders a stable click-to-load placeholder on the
 * server and first paint (anti hydration-mismatch, mirroring the consent banner),
 * then after mount loads the live widget if functional consent is granted. The
 * visitor can also load it directly with one click — that click is per-use
 * consent. Accepting in the banner while on this page swaps the placeholder for
 * the live widget via the `consent:changed` event, no reload needed.
 */
export function ContactCalendly() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (readFunctionalConsent() === "granted") {
      // Intentional SSR-safe reveal: a one-shot post-mount decision from a
      // client-only localStorage read, not a render loop.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(true);
      return;
    }
    // Grant-only by design: reveals the widget when functional consent becomes
    // granted live. A later revoke is not torn down mid-session (the script is
    // already in the page); rejecting clears it on the next reload.
    const onConsentChange = () => {
      if (readFunctionalConsent() === "granted") setLoaded(true);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  }, []);

  if (!loaded) {
    return (
      <div className="flex h-[640px] min-w-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
        <p className="max-w-[320px] text-[15px] font-light leading-[1.7] text-muted">
          The scheduler is off until you allow it. Loading it runs Calendly and
          sets its cookies.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-[22px] py-2.5 text-sm font-medium tracking-tight text-foreground transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Load scheduler
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          className="calendly-inline-widget"
          data-url={EMBED_URL}
          style={{ minWidth: "320px", height: "640px" }}
        />
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
