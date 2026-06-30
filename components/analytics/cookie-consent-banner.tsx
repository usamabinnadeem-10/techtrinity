"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/home/button";
import {
  COOKIE_OPEN_EVENT,
  readConsent,
  updateConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Floating, non-blocking consent panel. Docks to the bottom-right on large
 * screens and centers along the bottom on smaller ones. A diffused primary halo
 * rings the panel so the notice is easy to spot against the near-black page.
 *
 * Renders nothing on the server and decides visibility after mount (avoids
 * hydration mismatch): visible only when no decision exists, and reopenable via
 * the `cookie:open` window event.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Intentional SSR-safe reveal: a one-shot post-mount decision from a
    // client-only localStorage read, not a render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (readConsent() === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_OPEN_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_OPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    writeConsent(value);
    updateConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-4 z-50 mx-auto max-w-100 lg:inset-x-auto lg:left-auto lg:bottom-7 lg:right-8 lg:mx-0 lg:w-95"
    >
      <div className="consent-enter relative">
        <div
          aria-hidden
          className="consent-halo pointer-events-none absolute -inset-2 rounded-[26px]"
        />
        <div className="relative overflow-hidden rounded-[20px] border border-primary/15 bg-card-elevated/90 p-5 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgb(184_255_87/0.85)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Cookies
            </span>
          </div>

          <p className="mt-3 text-[15px] font-medium leading-snug text-foreground">
            Analytics and embedded tools stay off until you accept.
          </p>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted">
            We use cookies for analytics and for embedded tools like our Calendly
            scheduler — both stay off until you choose. Read more in our{"  "}
            <Link
              href="/privacy"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </p>

          <div className="mt-5 flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 justify-center"
              onClick={() => decide("denied")}
            >
              Reject
            </Button>
            <Button
              variant="accent"
              className="flex-1 justify-center"
              onClick={() => decide("granted")}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
