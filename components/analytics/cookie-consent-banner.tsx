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
 * Non-blocking bottom bar. Renders nothing on the server and decides visibility
 * after mount (avoids hydration mismatch). Visible only when no decision exists,
 * and reopenable via the `cookie:open` window event.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="max-w-[640px] text-[13px] leading-[1.6] text-muted-foreground">
          We use cookies to understand how visitors use our site. Analytics stays
          off until you accept. See our{" "}
          <Link href="/privacy" className="text-foreground underline underline-offset-2">
            Privacy &amp; Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" onClick={() => decide("denied")}>
            Reject
          </Button>
          <Button variant="accent" onClick={() => decide("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
