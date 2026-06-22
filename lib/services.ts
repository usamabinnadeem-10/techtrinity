export type ServiceMeta = {
  label: string;
  value: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  description: string;
};

export type CalloutBlock = {
  label: string;
  title: string;
  body: string;
};

export type ServiceDetail = {
  slug: string;
  num: string;
  title: string;
  metaTitle?: string;
  headlineLead: string;
  headlineTail: string;
  meta: ServiceMeta[];
  overview: string[];
  included: string[];
  notIncluded: string[];
  process?: ProcessStep[];
  callout?: CalloutBlock;
  idealFor: string;
  priceDetail: string[];
  ctaPrompt: string;
  ctaLabel: string;
};

const SHARED_PROCESS: ProcessStep[] = [
  {
    num: "01",
    title: "You reach out",
    description:
      "Fill in the contact form or book a call. Tell us what's slowing your operation down and what you'd like to fix.",
  },
  {
    num: "02",
    title: "Discovery call",
    description:
      "A free 30-minute call. We learn how your business runs, your timeline, and your budget — and tell you honestly if we're not the right fit.",
  },
  {
    num: "03",
    title: "Proposal",
    description:
      "A written proposal within 5 business days. Scope, timeline, fixed price, and exactly what's not included. Nothing starts without your sign-off.",
  },
  {
    num: "04",
    title: "Kick-off",
    description:
      "A 60-minute session to map your workflows in detail and agree how we'll work together. Then we build.",
  },
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "product-sprint",
    num: "01",
    title: "Complete Operations System Build",
    metaTitle: "Complete Operations System Build",
    headlineLead: "Complete Operations",
    headlineTail: "System Build.",
    meta: [
      { label: "Starting at", value: "$20,000" },
      { label: "Timeline", value: "8–16 weeks" },
      { label: "Best for", value: "Your whole operation" },
    ],
    overview: [
      "You're running stock, orders, purchasing, reporting, and warehouse work across spreadsheets, accounting software, email, and a few things only one person knows how to do.",
      "The Complete Operations System Build replaces the fragile patchwork with one focused system built around how your business already works. We map the process first, design the screens your team will actually use, build the system, and support the launch.",
      "This is the right engagement when the problem is bigger than one screen or one report. You bring deep knowledge of the operation; we turn it into software that gives your team trusted data and clearer workflows.",
    ],
    included: [
      "Discovery and scoping — we map exactly how your operation runs (1–2 weeks)",
      "A clear design of how the system will look and work, agreed before we build",
      "The complete system, built to match your workflows",
      "A fast web app your team uses in a browser — nothing to install",
      "Secure logins with the right level of access for each person",
      "Hosting, backups, and setup so it's reachable from every location",
      "Two weeks of support after launch while your team settles in",
    ],
    notIncluded: [
      "Ongoing changes after launch — that's Ongoing Operations Improvements",
      "Third-party costs like hosting fees, subscriptions, or paid integrations",
      "Marketing, SEO, or content",
      "Mobile apps, unless we scope one in separately",
    ],
    process: SHARED_PROCESS,
    idealFor:
      "Owners of wholesale, distribution, light manufacturing, or multi-location businesses whose operation has outgrown spreadsheets, aging tools, or disconnected SaaS — and who want one system built properly around how the team actually works.",
    priceDetail: [
      "Projects start at $20,000. The final price depends on how much you need the system to do.",
      "The full price is agreed in writing before any work begins — no hourly surprises.",
      "50% to start, 50% on delivery.",
    ],
    ctaPrompt: "Ready to replace the spreadsheet patchwork?",
    ctaLabel: "Book a Workflow Review",
  },
  {
    slug: "build-only",
    num: "02",
    title: "Defined Workflow Build",
    metaTitle: "Defined Workflow Software Build",
    headlineLead: "Defined Workflow",
    headlineTail: "Build.",
    meta: [
      { label: "Starting at", value: "$12,000" },
      { label: "Timeline", value: "6–12 weeks" },
      { label: "Best for", value: "One defined system" },
    ],
    overview: [
      "Sometimes you already know exactly what needs to be fixed: a stock lookup tool, order tracking workflow, purchase planning screen, reporting dashboard, warehouse transfer process, or another specific part of the operation.",
      "Defined Workflow Build is for one clearly scoped system. We build it cleanly, connect it where needed, and put it into your team's hands without turning it into a full ERP project.",
    ],
    included: [
      "The system built to your agreed scope — clean and ready for daily use",
      "A fast web app your team uses in a browser",
      "Secure logins with the right level of access for each person",
      "Connections to the other tools you already use, where scoped",
      "Hosting, backups, and deployment set up for you",
      "Two weeks of support after launch",
    ],
    notIncluded: [
      "A full discovery phase to work out what to build — that's the Complete Operations System Build",
      "Reworking the plan once the scope is agreed (changes mid-build are quoted separately)",
      "Third-party costs like hosting fees or paid integrations",
      "Mobile apps, unless we scope one in separately",
    ],
    callout: {
      label: "Requirement",
      title: "A clearly defined workflow.",
      body: "This service works when the workflow is already understood. If the process still has open questions, hidden edge cases, or multiple teams disagreeing on how it should work, we'll flag that and recommend starting with a short workflow discovery instead.",
    },
    idealFor:
      "Owners or operations teams who can clearly describe one workflow that needs to be built or replaced — and want it delivered without paying for a full discovery phase.",
    priceDetail: [
      "Projects start at $12,000. The final price depends on how much the system has to do.",
      "The full price is agreed in writing before any work begins.",
      "50% to start, 50% on delivery.",
    ],
    ctaPrompt: "Know the exact workflow you need?",
    ctaLabel: "Book a Workflow Review",
  },
  {
    slug: "growth-retainer",
    num: "03",
    title: "Ongoing Operations Improvements",
    metaTitle: "Ongoing Operations Software Improvements",
    headlineLead: "Ongoing Operations",
    headlineTail: "Improvements.",
    meta: [
      { label: "Starting at", value: "$4,500/month" },
      { label: "Minimum", value: "3 months" },
      { label: "Best for", value: "Software that keeps growing" },
    ],
    overview: [
      "Your system is live and your team relies on it. But the business keeps changing — new locations, new product lines, new reports, new approval steps, new edge cases.",
      "Ongoing Operations Improvements gives you a senior team that already understands your system and keeps improving it month after month, without the cost and delay of hiring or re-explaining everything to a new developer.",
    ],
    included: [
      "A set block of development time every month",
      "New features and improvements as your operation changes",
      "Fixes and performance work, handled quickly",
      "A weekly check-in call",
      "Day-to-day access over chat or email",
      "The same developer who knows your system throughout",
      "A short monthly summary of what got done",
    ],
    notIncluded: [
      "Major new design work (we can add it as a scoped extra)",
      "Deep infrastructure management beyond the basics",
      "24/7 on-call or emergency cover",
    ],
    callout: {
      label: "Minimum Commitment",
      title: "Three months, then monthly.",
      body: "Keeping a system fitting your business takes continuity, not a one-month dip-in. We ask for three months to start; after that it runs monthly, with 30 days' notice to stop whenever you need.",
    },
    idealFor:
      "Owners with a live operations system who want it to keep improving as the business grows — without hiring a full-time developer or starting over with someone new each time.",
    priceDetail: [
      "Retainers start at $4,500/month.",
      "The price scales with how much time you need each month.",
      "Invoiced monthly, in advance.",
    ],
    ctaPrompt: "Already live and ready to keep improving?",
    ctaLabel: "Book a Workflow Review",
  },
  {
    slug: "technical-audit",
    num: "04",
    title: "Existing System Audit",
    metaTitle: "Existing Operations Software Audit",
    headlineLead: "Existing System",
    headlineTail: "Audit.",
    meta: [
      { label: "Starting at", value: "$1,500" },
      { label: "Turnaround", value: "1 week" },
    ],
    overview: [
      "You're running software someone else built, an old internal system, or an off-the-shelf tool that has been patched around your operation for years. You're not sure whether to fix it, replace it, or stop investing in it.",
      "The Existing System Audit gives you a plain-English assessment of the code, data, security, reliability, and workflow fit — so you know what is broken, what matters, and what to do next.",
    ],
    included: [
      "Review of current software structure and maintainability",
      "Security and data-risk check",
      "Review of database/data model where access is provided",
      "Workflow-fit assessment: where the software does not match how the team works",
      "Reliability and performance risks",
      "Integration risks",
      "Plain-English report ranked by urgency",
      "30-minute walkthrough call",
    ],
    notIncluded: [
      "Fixing what we find — that's a separate piece of work",
      "Formal security penetration testing",
      "Legal or compliance advice",
    ],
    callout: {
      label: "Deliverable",
      title: "A plain-English written report.",
      body: "Delivered within 5 business days of getting access. Every issue is ranked — Critical, High, Medium, Low — and each one explains what it is, why it matters to your business, and what to do about it.",
    },
    idealFor:
      "Owners who inherited, bought, or commissioned software that no longer fits the operation — and want an honest second opinion before spending more money on it.",
    priceDetail: [
      "Starts at $1,500 for most small to mid-size systems.",
      "Larger or more complex software is quoted individually.",
      "Paid in full upfront, given the short turnaround.",
    ],
    ctaPrompt: "Not sure what you're running?",
    ctaLabel: "Book a Workflow Review",
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_DETAILS.map((service) => service.slug);
}
