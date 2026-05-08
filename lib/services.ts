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
      "Fill in the contact form or book a call directly. Tell us what you're building and what you need.",
  },
  {
    num: "02",
    title: "Discovery call",
    description:
      "A free 30-minute call. We learn your product, timeline, and constraints. Honest fit assessment — we'll tell you if we're not the right team.",
  },
  {
    num: "03",
    title: "Proposal",
    description:
      "A written document within 5 business days. Scope, timeline, price, and what's explicitly not included. Nothing starts without your sign-off.",
  },
  {
    num: "04",
    title: "Kick-off",
    description:
      "A 60-minute session to align on tools, communication, and first deliverables. Then we build.",
  },
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "product-sprint",
    num: "01",
    title: "Product Sprint",
    headlineLead: "Product Sprint.",
    headlineTail: "Design + Build.",
    meta: [
      { label: "Starting at", value: "$20,000" },
      { label: "Timeline", value: "8–16 weeks" },
      { label: "Stack", value: "React/Next.js + Node or Django" },
    ],
    overview: [
      "You have an idea. You need a working product. Product Sprint is our flagship engagement — we handle everything from UX design to deployment. You show up with a vision and leave with software your users can actually use.",
      "This service is for founders who don't have Figma files yet and want a single partner responsible for the entire product.",
    ],
    included: [
      "Discovery & scoping (1–2 weeks)",
      "UX wireframes in Figma",
      "Full UI design — component system included",
      "Frontend: React / Next.js",
      "Backend: Node/NestJS or Django",
      "Database design and auth",
      "Cloud deployment setup",
      "2 weeks post-launch support",
    ],
    notIncluded: [
      "Ongoing feature development (that's the Growth Retainer)",
      "Third-party service costs (hosting, APIs, subscriptions)",
      "Marketing or SEO content",
      "Mobile apps unless scoped separately",
    ],
    process: SHARED_PROCESS,
    idealFor:
      "Non-technical founders at pre-seed or seed stage who have validated their idea and are ready to invest in the first version of their product properly.",
    priceDetail: [
      "Projects start at $20,000. Final price depends on product complexity and scope.",
      "All pricing is agreed in writing before work begins.",
      "50% deposit required to start. 50% on delivery.",
    ],
    ctaPrompt: "Ready to build your product?",
    ctaLabel: "Book a Discovery Call",
  },
  {
    slug: "build-only",
    num: "02",
    title: "Build-Only",
    headlineLead: "Build-Only.",
    headlineTail: "You design. We build.",
    meta: [
      { label: "Starting at", value: "$12,000" },
      { label: "Timeline", value: "6–12 weeks" },
      { label: "Stack", value: "React/Next.js + Node or Django" },
    ],
    overview: [
      "You already have Figma designs. You need an engineering team that can execute them cleanly — without inventing their own interpretation of your product. That's Build-Only.",
      "We take your designs and build them into production-ready software. Fast, clean, and maintainable.",
    ],
    included: [
      "Frontend: React / Next.js from your Figma files",
      "Backend: Node/NestJS or Django",
      "Database design and auth",
      "API integrations as scoped",
      "Cloud deployment setup",
      "2 weeks post-launch support",
    ],
    notIncluded: [
      "UI/UX design or design revisions",
      "Changes to the Figma scope mid-build (these are treated as change requests)",
      "Third-party service costs",
      "Mobile apps unless scoped separately",
    ],
    callout: {
      label: "Requirement",
      title: "Production-ready Figma files.",
      body: "Complete, production-ready Figma files must be provided before the project starts. Designs that are incomplete or require significant interpretation will be flagged in the proposal.",
    },
    idealFor:
      "Founders who have already worked with a designer and have complete Figma files ready for development.",
    priceDetail: [
      "Projects start at $12,000. Final price depends on scope and backend complexity.",
      "50% deposit required to start. 50% on delivery.",
    ],
    ctaPrompt: "Have your designs ready?",
    ctaLabel: "Book a Discovery Call",
  },
  {
    slug: "growth-retainer",
    num: "03",
    title: "Growth Retainer",
    headlineLead: "Growth Retainer.",
    headlineTail: "Your team. Monthly.",
    meta: [
      { label: "Starting at", value: "$4,500/month" },
      { label: "Minimum", value: "3 months" },
      { label: "Stack", value: "React/Next.js + Node or Django" },
    ],
    overview: [
      "You've launched. Now you need to keep building — new features, bug fixes, performance improvements, integrations. The Growth Retainer gives you a dedicated development team every month without the overhead of hiring.",
      "The same people. Every month. No re-briefing, no handoffs, no strangers in your codebase.",
    ],
    included: [
      "Dedicated development hours per month",
      "Feature development and iteration",
      "Bug fixes and performance work",
      "Weekly sync call",
      "Async communication (Slack or equivalent)",
      "Direct access to the same developer throughout",
      "Monthly progress summary",
    ],
    notIncluded: [
      "UI/UX design (can be added as a scoped add-on)",
      "Infrastructure management beyond basics",
      "24/7 on-call support",
    ],
    callout: {
      label: "Minimum Commitment",
      title: "Three months, then monthly.",
      body: "This is not a one-month arrangement — meaningful product progress requires continuity. After 3 months, continue monthly with 30 days notice to end.",
    },
    idealFor:
      "Founders who have a live product and need consistent, reliable development capacity without the cost and complexity of hiring full-time engineers.",
    priceDetail: [
      "Retainers start at $4,500/month.",
      "Price scales with hours required.",
      "Invoiced monthly in advance.",
    ],
    ctaPrompt: "Already live and need to keep building?",
    ctaLabel: "Book a Discovery Call",
  },
  {
    slug: "technical-audit",
    num: "04",
    title: "Technical Audit",
    headlineLead: "Technical Audit.",
    headlineTail: "Know what you have.",
    meta: [
      { label: "Starting at", value: "$1,500" },
      { label: "Turnaround", value: "1 week" },
    ],
    overview: [
      "You've inherited a codebase — or had one built by someone else. Before you invest more money into it, you need an honest assessment of what you're actually working with.",
      "The Technical Audit gives you a written report from a senior engineer who has no incentive to tell you it's fine when it isn't.",
    ],
    included: [
      "Code quality and architecture review",
      "Security vulnerability assessment",
      "Scalability and performance red flags",
      "Dependency audit (outdated, risky packages)",
      "Database schema review",
      "Deployment and infrastructure assessment",
      "Written report with prioritised findings",
      "30-minute debrief call to walk through results",
    ],
    notIncluded: [
      "Fixing the issues found (that's a separate engagement)",
      "Penetration testing",
      "Legal or compliance advice",
    ],
    callout: {
      label: "Deliverable",
      title: "A prioritised written report.",
      body: "Delivered within 5 business days of receiving codebase access. Findings are prioritised: Critical, High, Medium, Low. Each finding includes what it is, why it matters, and what to do about it.",
    },
    idealFor:
      "Founders who have a product built by a previous team or agency and want an honest second opinion before investing further. Also useful before a fundraising round.",
    priceDetail: [
      "Starts at $1,500 for codebases up to ~50,000 lines.",
      "Larger codebases scoped individually.",
      "Full payment upfront given the short engagement window.",
    ],
    ctaPrompt: "Not sure what's in your codebase?",
    ctaLabel: "Book a Discovery Call",
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_DETAILS.map((service) => service.slug);
}
