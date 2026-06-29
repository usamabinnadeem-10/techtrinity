"use client";

import { COOKIE_OPEN_EVENT } from "@/lib/consent";

/**
 * Tiny client leaf that reopens the consent banner. Lets the surrounding footer
 * stay a server component — only this control needs the browser event.
 */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_OPEN_EVENT))}
      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
