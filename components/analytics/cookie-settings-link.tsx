"use client";

import { COOKIE_OPEN_EVENT } from "@/lib/consent";

const DEFAULT_CLASS_NAME =
  "text-[13px] text-muted transition-colors hover:text-primary";

/**
 * Tiny client leaf that reopens the consent banner. Lets the surrounding footer
 * stay a server component — only this control needs the browser event.
 *
 * Pass `className` to override the styling per placement (e.g. the footer matches
 * its sibling nav links rather than the inline prose link default).
 */
export function CookieSettingsLink({
  className = DEFAULT_CLASS_NAME,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
