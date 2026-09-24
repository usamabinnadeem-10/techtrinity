"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One document-level listener that turns clicks on any element carrying
 * `data-cta-label` into a `cta_click` event. Lets server components opt in to
 * tracking with plain data attributes (see `ctaAttrs`) instead of becoming
 * client components. Links to the booking section additionally fire
 * `booking_intent` — a click is intent, never a completed booking.
 */
export function CtaClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.<HTMLElement>("[data-cta-label]");
      if (!el) return;
      const { ctaLabel, ctaSection, ctaService } = el.dataset;
      const props = {
        cta_label: ctaLabel,
        cta_section: ctaSection,
        service: ctaService,
      };
      trackEvent("cta_click", props);
      const href = el.getAttribute("href") ?? "";
      if (href.endsWith("#book")) trackEvent("booking_intent", props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
