import { ORG_ADDRESS_LINE, ORG_LEGAL_NAME, ORG_PRIVACY_EMAIL } from "@/lib/site";

export type Processor = {
  name: string;
  role: string; // "What it does"
  policyUrl: string;
};

/**
 * Controller details and publish date. Name and address are single-sourced from
 * the site's organisation constants so the policy cannot disagree with structured
 * data elsewhere on the site. The contact address is the dedicated privacy inbox
 * rather than the general enquiry one — see ORG_PRIVACY_EMAIL.
 */
export const POLICY_META = {
  controllerName: ORG_LEGAL_NAME,
  contactEmail: ORG_PRIVACY_EMAIL,
  postalAddress: ORG_ADDRESS_LINE,
  // TODO(publish): bump to the publish date. Held at the previous revision's
  // date while the Article 14 outreach section is with the solicitor.
  lastUpdated: "30 June 2026",
} as const;

/**
 * The Article 14 outreach notice names the registered company, not the trading
 * name: "TechTrinity" is a trading name of the Wyoming LLC, and Article 14(1)(a)
 * wants the controller's identity.
 *
 * Casing is intentional and differs from the brand: the entity is registered as
 * "Techtrinity LLC" (lowercase second t) while the trading name is styled
 * "TechTrinity". Do not "fix" this to match ORG_LEGAL_NAME.
 */
export const OUTREACH_CONTROLLER_LEGAL_NAME = "Techtrinity LLC";

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

/**
 * Processors for the business-development outreach described in the Article 14
 * section. Kept separate from PROCESSORS: those handle data visitors give us,
 * these handle contact details sourced without the individual's involvement, and
 * conflating the two would misstate who touches which data.
 *
 * TODO(confirm): MillionVerifier is in the tool stack as a top-up verifier for
 * manually-sourced / personal-domain contacts. If it processes any of these
 * contacts' data it belongs in this list — confirm before publishing.
 */
export const OUTREACH_PROCESSORS: readonly Pick<Processor, "name" | "role">[] = [
  { name: "Findymail", role: "Finds and verifies business email addresses" },
  { name: "Instantly", role: "Sends our email and manages the message sequence" },
  { name: "InboxKit", role: "Hosts our sending mailboxes and runs their warm-up" },
];
