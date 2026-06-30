export type CookieCategory = "necessary" | "analytics" | "functional";

export type CookieEntry = {
  name: string; // e.g. "_ga" or "tt-cookie-consent"
  provider: string; // "Google", "Calendly", "TechTrinity (first-party)"
  category: CookieCategory;
  purpose: string;
  type: "Cookie" | "Local storage" | "Third-party cookie";
  duration: string; // human string, e.g. "2 years", "Until you clear it"
  policyUrl?: string; // provider policy link where relevant
};

/**
 * Ground-truth cookie / tracking surface, verified against the running site.
 * Single-sourced so the policy table is testable and cannot drift from reality.
 */
export const COOKIE_INVENTORY: readonly CookieEntry[] = [
  {
    name: "tt-cookie-consent",
    provider: "TechTrinity (first-party)",
    category: "necessary",
    purpose: "Remembers your cookie choice",
    type: "Local storage",
    duration: "Until you clear it",
  },
  {
    name: "_ga",
    provider: "Google",
    category: "analytics",
    purpose: "Tells visitors apart",
    type: "Cookie",
    duration: "2 years",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "_ga_Z337R58187",
    provider: "Google",
    category: "analytics",
    purpose: "Keeps GA4 session state",
    type: "Cookie",
    duration: "2 years",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Calendly cookies",
    provider: "Calendly",
    category: "functional",
    purpose: "Runs the embedded scheduler",
    type: "Third-party cookie",
    duration: "See Calendly's cookie policy",
    policyUrl: "https://calendly.com/legal/privacy-notice",
  },
];
