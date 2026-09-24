"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { trackOnce } from "@/lib/analytics";
import { CONSENT_CHANGED_EVENT, readFunctionalConsent } from "@/lib/consent";
import { serviceFromQuery } from "@/lib/contact";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/techtrinity/discovery";

/** Origin Calendly's inline widget posts its window messages from. */
export const CALENDLY_ORIGIN = "https://calendly.com";

const EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=0f0f0f&text_color=ede9e1&primary_color=b8ff57`;

/**
 * True only for Calendly's booking-confirmation message from Calendly's own
 * origin. Anything else (other origins, other event names, clicks) is ignored,
 * so nothing but a confirmed booking can count as `booking_complete`.
 */
export function isCalendlyBookingMessage(event: MessageEvent): boolean {
  if (event.origin !== CALENDLY_ORIGIN) return false;
  const data: unknown = event.data;
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { event?: unknown }).event === "calendly.event_scheduled"
  );
}

/**
 * Consent-gated Calendly embed. Renders a stable click-to-load placeholder on the
 * server and first paint (anti hydration-mismatch, mirroring the consent banner),
 * then after mount loads the live widget if functional consent is granted. The
 * visitor can also load it directly with one click — that click is per-use
 * consent. Accepting in the banner while on this page swaps the placeholder for
 * the live widget via the `consent:changed` event, no reload needed.
 *
 * Whenever the scheduler is not loaded (or fails to load), the message form and
 * plain email are offered as alternatives.
 */
export function ContactCalendly() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

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

  // booking_complete fires only on Calendly's verified confirmation message,
  // at most once per page. The intended service is the allowlisted
  // `?service=` label — never the raw query string.
  useEffect(() => {
    if (!loaded) return;
    const onMessage = (event: MessageEvent) => {
      if (!isCalendlyBookingMessage(event)) return;
      const service = serviceFromQuery(
        new URLSearchParams(window.location.search).get("service"),
      );
      trackOnce("booking_complete", "calendly", service ? { service } : {});
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [loaded]);

  if (!loaded || failed) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center md:h-[640px]">
        <p className="max-w-[320px] text-[15px] font-light leading-[1.7] text-muted">
          {failed
            ? "The scheduler couldn’t load right now."
            : "The scheduler is off until you allow it. Loading it runs Calendly and sets its cookies."}
        </p>
        {!failed && (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-[22px] py-2.5 text-sm font-medium tracking-tight text-foreground transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Load scheduler
          </button>
        )}
        <SchedulerAlternative />
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
      <SchedulerAlternative className="mt-4" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onError={() => setFailed(true)}
      />
    </>
  );
}

const altLink =
  "text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-primary";

/** The no-scheduler path: the message form on this page, or plain email. */
function SchedulerAlternative({ className }: { className?: string }) {
  return (
    <p
      className={[
        "max-w-[360px] text-[13px] font-light leading-[1.7] text-muted-foreground",
        className ?? "",
      ].join(" ")}
    >
      Rather not use the scheduler?{" "}
      <a href="#message" className={altLink}>
        Send a message
      </a>{" "}
      or email{" "}
      <a href="mailto:info@techtrinity.ai" className={altLink}>
        info@techtrinity.ai
      </a>
      .
    </p>
  );
}
