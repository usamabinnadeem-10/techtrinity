/**
 * Canonical commercial and identity copy shared across the homepage, services,
 * about, and contact surfaces (brief TT-02, TT-03, TT-13). Every surface that
 * describes the buying process, response time, support terms, or the founder's
 * identity must read from here so they tell the same story.
 */

// ── Founder identity (TT-02) ────────────────────────────────────────────────

export const FOUNDER_DISPLAY_NAME = "Usama Nadeem";
export const FOUNDER_TITLE = "Founder & CEO";
export const FOUNDER_LOCATION = "Lahore, Pakistan";
export const FOUNDER_CANONICAL_BADGE = "Engineering experience at Canonical";

export const FOUNDER_BIO =
  "I’m Usama Nadeem, Founder & CEO of TechTrinity. I built EasyAccounts for my family’s wholesale business and continue to work on the details that matter in daily use: stock movements, orders, reporting, permissions, and the exceptions real teams encounter. That experience shapes how we approach client software: understand the work, design for the people doing it, and build a system that can keep evolving.";

/** Card label for work the founder did as an employee (Canonical, Xenia, Hirecinch). */
export const EMPLOYMENT_WORK_LABEL = "Founder’s engineering work";
export const OWN_PRODUCT_LABEL = "Founder’s own product";

// ── Promises (TT-03) ────────────────────────────────────────────────────────

export const RESPONSE_PROMISE = "We aim to reply within one business day.";
export const CONTACT_SUCCESS_MESSAGE =
  "Thanks—your message has been received. We aim to reply within one business day.";

export const SCOPE_PROMISE =
  "Clear scope, agreed milestones, and changes approved before additional work begins.";

export const DESIGN_PROMISE =
  "Design and approve the key user journeys before building each phase.";

/** Current approved launch-support term. Do not change without owner approval. */
export const LAUNCH_SUPPORT_TERM = "two weeks";
export const LAUNCH_SUPPORT_COPY =
  "Two weeks of launch support are included. Ongoing maintenance and improvements are available separately under an agreement — no 24/7 cover, guaranteed uptime, or unlimited fixes.";

// ── Buying process (TT-03, homepage section 7) ──────────────────────────────

export type EngagementStep = {
  num: string;
  title: string;
  description: string;
  /** Whether the step is free, paid, or depends on the situation. */
  cost: "Free" | "Paid, if needed" | "Scoped & priced" | "Included";
};

export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    num: "01",
    title: "Introductory call",
    cost: "Free",
    description:
      "A free 30-minute conversation about your current process, what it costs you, and practical next steps — including whether an existing product would serve you better.",
  },
  {
    num: "02",
    title: "Scope review or workflow assessment",
    cost: "Paid, if needed",
    description:
      "If you already have an adequate specification, we review it and move to a proposal. If the workflow still has open questions, we recommend a paid, separately scoped workflow assessment first.",
  },
  {
    num: "03",
    title: "Scoped implementation",
    cost: "Scoped & priced",
    description:
      "A written proposal with clear scope, agreed milestones, and changes approved before additional work begins. We design and approve the key user journeys before building each phase.",
  },
  {
    num: "04",
    title: "Launch & support",
    cost: "Included",
    description:
      "Deployment and handover of agreed code, documentation, and access. Two weeks of launch support are included; ongoing maintenance is available separately.",
  },
];

// ── CTA destinations & service intents (TT-04, TT-10) ───────────────────────

/**
 * Allowlisted `?service=` values for /contact. Keys are the URL slugs; values
 * are the form's service labels. Anything not in this map is ignored.
 */
export const SERVICE_INTENTS = {
  operations: "Operations workflow",
  "workflow-assessment": "Operations workflow",
  "ai-automation": "AI automation",
  mvp: "MVP/product development",
  website: "Website",
  "system-review": "Existing system review",
  support: "Ongoing support",
  "not-sure": "Not sure yet",
} as const;

export type ServiceIntent = keyof typeof SERVICE_INTENTS;

export const BOOK_HREF = "/contact#book";
export const MESSAGE_HREF = "/contact#message";

export function messageHref(service?: ServiceIntent): string {
  return service ? `/contact?service=${service}#message` : MESSAGE_HREF;
}

export const PRIMARY_CTA_LABEL = "Book a Workflow Review";
export const PRIMARY_CTA_HELPER =
  "A free 30-minute conversation about your current process and practical next steps.";

// ── Buying-objection FAQ (TT-13) ────────────────────────────────────────────

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Optional link for a follow-up destination. */
  link?: { href: string; label: string };
};

export const BUYER_FAQ: FaqItem[] = [
  {
    id: "existing-software",
    question: "Can you work with our existing software?",
    answer:
      "Often, yes. Before committing, we check which integrations, exports, and access your current tools actually offer. Where a system can’t be connected reliably, we tell you and suggest a workable alternative.",
  },
  {
    id: "replace-everything",
    question: "Do we have to replace everything?",
    answer:
      "No. A single workflow or integration can be the first phase. Larger systems are delivered as agreed phases, so you only expand when the first piece is proving its value.",
  },
  {
    id: "how-to-start",
    question: "How do we start?",
    answer:
      "With a free introductory call. If your requirements are clear, we move to a scope review and proposal. Paid discovery — a workflow assessment — is only recommended when the process needs further investigation.",
    link: { href: "/services/workflow-assessment", label: "About the workflow assessment" },
  },
  {
    id: "ownership",
    question: "Do we own the work?",
    answer:
      "The bespoke code, documentation, and account access agreed in your contract are handed over so your business retains control. Third-party services and licences — hosting, SaaS subscriptions, paid APIs — stay under their own providers’ terms.",
  },
  {
    id: "after-launch",
    question: "What happens after launch?",
    answer:
      "Two weeks of launch support are included. After that, ongoing maintenance and improvements are available under a separate agreement. We don’t offer 24/7 cover or guaranteed uptime.",
    link: { href: "/services/growth-retainer", label: "Ongoing support & improvements" },
  },
  {
    id: "need-ai",
    question: "Do we need AI?",
    answer:
      "Only where it improves the workflow enough to justify the added complexity and running cost. When a standard integration or simple automation does the job, we recommend that instead.",
    link: { href: "/services/ai-workflow-automation", label: "Practical AI automation" },
  },
  {
    id: "mvp-websites",
    question: "Do you build MVPs and websites?",
    answer:
      "Yes. We build focused first versions of B2B products and business websites connected to your enquiry process. Both have their own pages with inclusions and boundaries.",
    link: { href: "/services/mvp-development", label: "MVP development" },
  },
];
