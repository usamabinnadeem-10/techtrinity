/**
 * Enquiry-funnel analytics (brief TT-14), sent through the existing gtag.js /
 * Google Consent Mode v2 setup. No second analytics platform.
 *
 * Consent: events are pushed to gtag, which honours the current Consent Mode
 * state (analytics_storage denied → cookieless pings only). We never bypass it.
 *
 * Privacy: only allowlisted, bounded, non-personal properties are sent. Names,
 * emails, free-text enquiry content, and raw query strings must never be
 * passed in — `sanitizeProps` drops anything not on the allowlist.
 */

export type AnalyticsEvent =
  | "service_view"
  | "case_study_view"
  | "cta_click"
  | "contact_form_start"
  | "contact_form_success"
  | "contact_form_error"
  | "booking_intent"
  | "booking_complete";

const ALLOWED_PROPS = [
  "service",
  "slug",
  "cta_label",
  "cta_section",
  "error_category",
] as const;

export type AnalyticsProps = Partial<
  Record<(typeof ALLOWED_PROPS)[number], string>
>;

const MAX_PROP_LENGTH = 64;
const SAFE_VALUE = /^[\w\s&/.,'’—–-]*$/;

export function sanitizeProps(props: Record<string, unknown> = {}): AnalyticsProps {
  const out: AnalyticsProps = {};
  for (const key of ALLOWED_PROPS) {
    const value = props[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim().slice(0, MAX_PROP_LENGTH);
    if (!trimmed || trimmed.includes("@") || !SAFE_VALUE.test(trimmed)) continue;
    out[key] = trimmed;
  }
  return out;
}

export function trackEvent(
  name: AnalyticsEvent,
  props: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, sanitizeProps(props));
}

// Page-lifetime dedupe so re-renders / StrictMode double effects don't
// double-count one-shot events (views, form start).
const fired = new Set<string>();

/** Fires `name` at most once per `dedupeKey` for the lifetime of the page. */
export function trackOnce(
  name: AnalyticsEvent,
  dedupeKey: string,
  props: Record<string, unknown> = {},
): void {
  const key = `${name}:${dedupeKey}`;
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(name, props);
}

/** Test helper. */
export function __resetAnalyticsDedupe(): void {
  fired.clear();
}
