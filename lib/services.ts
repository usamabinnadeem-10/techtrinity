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
    title: "Product Sprint",
    headlineLead: "Product Sprint.",
    headlineTail: "The complete system.",
    meta: [
      { label: "Starting at", value: "$20,000" },
      { label: "Timeline", value: "8–16 weeks" },
      { label: "Best for", value: "Your whole operation" },
    ],
    overview: [
      "You're running your operation on spreadsheets, a handful of tools, and a few things only one person knows how to do. Product Sprint replaces all of it with one system built around the way you already work — from the first discovery session to software your team logs into on day one.",
      "It's our most complete engagement. You bring deep knowledge of your business; we handle everything else — mapping your workflows, designing the system, building it, and supporting your team through launch.",
      "It's the same approach we used to build a live inventory and warehouse system for a wholesale business that had been losing data on USB sticks. It has run every day for over three years.",
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
      "Ongoing changes after launch — that's the Growth Retainer",
      "Third-party costs like hosting fees, subscriptions, or paid integrations",
      "Marketing, SEO, or content",
      "Mobile apps, unless we scope one in separately",
    ],
    process: SHARED_PROCESS,
    idealFor:
      "Owners of wholesale, distribution, or multi-location businesses whose operation has outgrown spreadsheets and aging software — and who want one system built properly around how they actually work.",
    priceDetail: [
      "Projects start at $20,000. The final price depends on how much you need the system to do.",
      "The full price is agreed in writing before any work begins — no hourly surprises.",
      "50% to start, 50% on delivery.",
    ],
    ctaPrompt: "Ready to replace the spreadsheets?",
    ctaLabel: "Book a Discovery Call",
  },
  {
    slug: "build-only",
    num: "02",
    title: "Build-Only",
    headlineLead: "Build-Only.",
    headlineTail: "Defined scope, built fast.",
    meta: [
      { label: "Starting at", value: "$12,000" },
      { label: "Timeline", value: "6–12 weeks" },
      { label: "Best for", value: "One defined system" },
    ],
    overview: [
      "Sometimes you already know exactly what you need — a single system to handle one part of your operation, clearly defined, with nothing left to figure out. Build-Only is for that. We take a tight, agreed scope and build it cleanly, without the time or cost of a full discovery phase.",
      "It's the fastest way to get one well-defined system into your team's hands — built properly, ready to use, and easy to extend later if you decide you want more.",
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
      "A full discovery phase to work out what to build — that's the Product Sprint",
      "Reworking the plan once the scope is agreed (changes mid-build are quoted separately)",
      "Third-party costs like hosting fees or paid integrations",
      "Mobile apps, unless we scope one in separately",
    ],
    callout: {
      label: "Requirement",
      title: "A clearly defined scope.",
      body: "Build-Only works because there's nothing left to figure out — you know what you need and we build it. If the scope still has open questions, we'll flag it in the proposal and suggest starting with a short discovery instead.",
    },
    idealFor:
      "Owners who already know exactly the one system they need built and can describe it clearly — and who want it done fast, without paying for discovery they don't need.",
    priceDetail: [
      "Projects start at $12,000. The final price depends on how much the system has to do.",
      "The full price is agreed in writing before any work begins.",
      "50% to start, 50% on delivery.",
    ],
    ctaPrompt: "Know exactly what you need?",
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
      { label: "Best for", value: "Software that keeps growing" },
    ],
    overview: [
      "Your system is live and your team relies on it. But your business keeps moving — you add a location, a product line, a new way of working — and the software has to keep up. The Growth Retainer gives you a dedicated team every month to do exactly that, without the cost and headache of hiring.",
      "The same people who know your system, month after month. No re-explaining how your business works, no handoffs, no strangers learning it from scratch.",
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
      "Owners with a live system who want it to keep improving as the business grows — without hiring a full-time developer or starting over with someone new each time.",
    priceDetail: [
      "Retainers start at $4,500/month.",
      "The price scales with how much time you need each month.",
      "Invoiced monthly, in advance.",
    ],
    ctaPrompt: "Already live and ready to grow?",
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
      "You're running software someone else built — or sold you — and you're not sure what you actually have. Before you spend another dollar on it, you need a straight answer: is it solid, is it costing you, and is it worth fixing or better to start over?",
      "The Technical Audit gives you that answer in plain English — a written assessment from a senior engineer who has no reason to tell you it's fine when it isn't.",
    ],
    included: [
      "A full review of how the software is built and held together",
      "A security check — where your data could be at risk",
      "Whether it can handle more orders, products, and users as you grow",
      "Out-of-date or risky parts that could fail or cost you later",
      "How your data is stored and whether it's safe",
      "A written report in plain English, with problems ranked by how urgent they are",
      "A 30-minute call to walk you through what we found and what to do next",
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
      "Owners who inherited or paid for software that isn't working the way it should — and who want an honest second opinion before they put more money into it.",
    priceDetail: [
      "Starts at $1,500 for most small to mid-size systems.",
      "Larger or more complex software is quoted individually.",
      "Paid in full upfront, given the short turnaround.",
    ],
    ctaPrompt: "Not sure what you're running?",
    ctaLabel: "Book a Discovery Call",
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_DETAILS.map((service) => service.slug);
}
