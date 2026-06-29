export const CONSENT_STORAGE_KEY = "tt-cookie-consent";
export const CONSENT_VERSION = 1;
export const COOKIE_OPEN_EVENT = "cookie:open";

export type ConsentValue = "granted" | "denied";

export type StoredConsent = {
  analytics: ConsentValue;
  version: number;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Validate and parse a raw localStorage value into a StoredConsent.
 * Returns null for missing, corrupt, wrong-shape, or version-mismatched
 * data — all of which the caller treats as "no decision yet". Hand-rolled
 * (no Zod) so the same rules can be mirrored by the inline init script,
 * which cannot import modules.
 */
export function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    if (typeof parsed.timestamp !== "number") return null;
    return {
      analytics: parsed.analytics,
      version: parsed.version,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

/** Read the stored decision. Never throws (private mode / blocked storage → null). */
export function readConsent(): StoredConsent | null {
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Persist a new decision immutably and return the record. Never throws. */
export function writeConsent(value: ConsentValue, now: number = Date.now()): StoredConsent {
  const record: StoredConsent = {
    analytics: value,
    version: CONSENT_VERSION,
    timestamp: now,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the in-memory decision still drives the UI this session.
  }
  return record;
}

/** Flip the live GA consent state for analytics. No-op if gtag is not present. */
export function updateConsent(value: ConsentValue): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: value });
}

/**
 * Source for the beforeInteractive inline script. Runs before gtag.js: defines
 * dataLayer/gtag, then sets the consent DEFAULT from the stored choice. The
 * parse logic mirrors parseStoredConsent in plain JS because an inline browser
 * script cannot import this module; the storage key and version are interpolated
 * so the format stays single-sourced.
 */
export function consentInitScript(): string {
  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
window.gtag('js', new Date());
var stored = 'denied';
try {
  var raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
  if (raw) {
    var parsed = JSON.parse(raw);
    if (parsed && parsed.version === ${CONSENT_VERSION} && parsed.analytics === 'granted' && typeof parsed.timestamp === 'number') {
      stored = 'granted';
    }
  }
} catch (e) {}
window.gtag('consent', 'default', {
  analytics_storage: stored,
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
`.trim();
}
