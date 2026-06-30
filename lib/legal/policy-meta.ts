import { ORG_CONTACT_EMAIL, ORG_LEGAL_NAME } from "@/lib/site";

export type Processor = {
  name: string;
  role: string; // "What it does"
  policyUrl: string;
};

/**
 * Controller details and publish date. Name and email are single-sourced from
 * the site's organisation constants so the policy cannot disagree with structured
 * data elsewhere on the site.
 */
export const POLICY_META = {
  controllerName: ORG_LEGAL_NAME,
  contactEmail: ORG_CONTACT_EMAIL,
  lastUpdated: "30 June 2026",
} as const;

/** Named sub-processors, single-sourced for both the processors and cookie tables. */
export const PROCESSORS: readonly Processor[] = [
  {
    name: "Google Analytics",
    role: "Website analytics (only with consent)",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Calendly",
    role: "Embedded call scheduling (only when loaded)",
    policyUrl: "https://calendly.com/legal/privacy-notice",
  },
  {
    name: "Resend",
    role: "Delivers your enquiry to us by email",
    policyUrl: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Vercel",
    role: "Hosting and server logs",
    policyUrl: "https://vercel.com/legal/privacy-policy",
  },
];
