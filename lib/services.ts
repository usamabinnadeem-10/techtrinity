import {
  BUYER_FAQ,
  EMPLOYMENT_WORK_LABEL,
  ENGAGEMENT_STEPS,
  LAUNCH_SUPPORT_COPY,
  type FaqItem,
  type ServiceIntent,
} from "@/lib/offer";

export type ServiceMeta = {
  label: string;
  value: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  description: string;
  /** Optional cost marker, e.g. "Free" / "Paid, if needed". */
  cost?: string;
};

export type ProcessBlock = {
  label: string;
  headingLead: string;
  headingTail: string;
  steps: ProcessStep[];
};

export type CalloutBlock = {
  label: string;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

export type Capability = {
  title: string;
  scope: string;
  humanBoundary: string;
  measurement: string;
};

export type CapabilityBlock = {
  label: string;
  headingLead: string;
  headingTail: string;
  note: string;
  items: Capability[];
};

export type DetailListBlock = {
  label: string;
  title: string;
  intro?: string;
  items: { title: string; body: string }[];
};

export type RelatedWorkBlock = {
  label: string;
  title: string;
  intro: string;
  items: { title: string; href: string; description: string }[];
};

/** Where a service sits on the Services index. */
export type ServiceTier = "primary" | "audit" | "secondary";

export type ServiceCard = {
  description: string;
  timeline: string;
};

export type ServiceDetail = {
  slug: string;
  num: string;
  tier: ServiceTier;
  title: string;
  /**
   * Page <title>. A plain string is run through the root "%s | TechTrinity"
   * template; `{ absolute }` is used verbatim when the brief gives a full title.
   */
  metaTitle?: string | { absolute: string };
  headlineLead: string;
  headlineTail: string;
  /** Allowlisted `?service=` value for the contact form. */
  intent: ServiceIntent;
  card: ServiceCard;
  meta: ServiceMeta[];
  overview: string[];
  includedLabel?: string;
  included: string[];
  notIncluded: string[];
  /** Short note shown under the scope lists (e.g. launch-support terms). */
  scopeNote?: string;
  capabilities?: CapabilityBlock;
  process?: ProcessBlock;
  detailBlocks?: DetailListBlock[];
  callout?: CalloutBlock;
  relatedWork?: RelatedWorkBlock;
  idealFor: string;
  /** Subset of BUYER_FAQ ids to answer on this page. */
  faqIds?: string[];
  ctaPrompt: string;
  /** Label for the per-service message CTA. */
  ctaLabel: string;
  /** Which CTA leads: book a call (operations pages) or send a message. */
  ctaPrimary: "book" | "message";
  ctaBody?: string;
};

/** Canonical buying process, shown on operations engagement pages. */
const ENGAGEMENT_PROCESS: ProcessBlock = {
  label: "How It Works",
  headingLead: "From first call",
  headingTail: "to software that fits.",
  steps: ENGAGEMENT_STEPS.map(({ num, title, description, cost }) => ({
    num,
    title,
    description,
    cost,
  })),
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  // ── Primary operations engagements ─────────────────────────────────────
  {
    slug: "workflow-assessment",
    num: "01",
    tier: "primary",
    title: "Workflow Assessment",
    metaTitle: "Operations Workflow Assessment",
    headlineLead: "Find the right next step",
    headlineTail: "for a costly workflow.",
    intent: "workflow-assessment",
    card: {
      description:
        "A workflow is costing time or creating mistakes, but the right fix isn’t clear yet. We map it, measure it with the data you have, and recommend whether to build, configure, or buy.",
      timeline: "Paid · scoped separately",
    },
    meta: [
      { label: "Engagement", value: "Paid, separately scoped" },
      { label: "Best for", value: "Workflows with open questions" },
    ],
    overview: [
      "When a workflow is costing time or creating mistakes but the right fix isn’t yet clear, a Workflow Assessment gives you the facts before you commit to a build.",
      "It is a paid, separately scoped engagement, recommended only when discovery is actually needed. If you already have an adequate specification, we can review it and move straight to a proposal instead.",
      "We map the process with the people who run it, look at the systems and data involved, and recommend the most practical next step — which may be building something, configuring a tool you already have, or buying an existing product.",
    ],
    includedLabel: "Deliverables",
    included: [
      "A process map of the workflow as it runs today",
      "A bottleneck baseline, using the data you have available",
      "Dependencies — the systems, data, and people the workflow relies on",
      "A build, configure, or buy recommendation",
      "Proposed acceptance criteria for any improvement",
      "Implementation options, with their trade-offs",
    ],
    notIncluded: [
      "Building or configuring the recommended solution — that is scoped and quoted separately",
      "A technical review of existing code — that’s the Existing System Audit",
      "Guaranteed savings or return-on-investment figures",
    ],
    process: ENGAGEMENT_PROCESS,
    callout: {
      label: "Your Findings",
      title: "Use them with or without us.",
      body: "The findings are yours. Use them to brief an internal team, configure software you already own, or commission a build from anyone. You are not obliged to have us build what we recommend.",
    },
    idealFor:
      "Owners and operations leads who know a workflow — order handoffs, stock lookup, quote preparation, reporting — is costing them, but aren’t yet sure what the right fix is, or whether new software is the answer.",
    faqIds: ["replace-everything", "existing-software"],
    ctaPrompt: "Not sure what to fix first?",
    ctaLabel: "Discuss a Workflow Assessment",
    ctaPrimary: "message",
    ctaBody:
      "Tell us which workflow is causing trouble. We’ll tell you whether an assessment is worth it, or whether you can go straight to a scope review.",
  },
  {
    slug: "build-only",
    num: "02",
    tier: "primary",
    title: "Defined Workflow Build",
    metaTitle: "Defined Workflow Software Build",
    headlineLead: "Defined Workflow",
    headlineTail: "Build.",
    intent: "operations",
    card: {
      description:
        "You can already describe the workflow you need. We review your specification, agree the scope, and build that one system — clean, fast, and ready for daily use.",
      timeline: "6–12 weeks",
    },
    meta: [
      { label: "Timeline", value: "6–12 weeks" },
      { label: "Best for", value: "One defined system" },
    ],
    overview: [
      "Sometimes you already know exactly what needs to be fixed: a stock lookup tool, order tracking workflow, purchase planning screen, reporting dashboard, warehouse transfer process, or another specific part of the operation.",
      "Defined Workflow Build is for one clearly scoped system. If you have an adequate specification, we review it and move to a proposal — no paid discovery required. Then we build it cleanly, connect it where needed, and put it into your team’s hands without turning it into a full ERP project.",
    ],
    included: [
      "An agreed workflow and its boundaries, confirmed in a scope review",
      "The interface design your team needs, with key user journeys approved before building",
      "A fast web app your team uses in a browser",
      "Secure logins with the right level of access for each person",
      "Connections to the other tools you already use, where scoped",
      "Acceptance checks with the people who will use it",
      "Hosting, backups, deployment, and handover",
      "Two weeks of launch support",
    ],
    notIncluded: [
      "Investigating a workflow that still has open questions — that’s the Workflow Assessment",
      "Changes to the agreed scope — these are quoted and approved before additional work begins",
      "Third-party costs like hosting fees or paid integrations",
      "Mobile apps, unless we scope one in separately",
    ],
    scopeNote: LAUNCH_SUPPORT_COPY,
    process: ENGAGEMENT_PROCESS,
    callout: {
      label: "Requirement",
      title: "A clearly defined workflow.",
      body: "This service works when the workflow is already understood. If the process still has open questions, hidden edge cases, or teams that disagree on how it should work, we’ll say so and recommend starting with a Workflow Assessment. Its findings are yours to use whether or not you go on to commission the build.",
      link: {
        href: "/services/workflow-assessment",
        label: "About the Workflow Assessment",
      },
    },
    idealFor:
      "Owners or operations teams who can clearly describe one workflow that needs to be built or replaced — and have enough of a specification to move from a scope review straight to a proposal.",
    faqIds: ["existing-software", "ownership"],
    ctaPrompt: "Know the exact workflow you need?",
    ctaLabel: "Describe Your Workflow",
    ctaPrimary: "book",
  },
  {
    slug: "product-sprint",
    num: "03",
    tier: "primary",
    title: "Larger Operations Build",
    metaTitle: "Larger Operations Software Build",
    headlineLead: "Larger Operations",
    headlineTail: "Build.",
    intent: "operations",
    card: {
      description:
        "When the problem spans several connected workflows. We map the operation and deliver one focused system in agreed phases — not by replacing everything at once.",
      timeline: "8–16 weeks",
    },
    meta: [
      { label: "Timeline", value: "8–16 weeks" },
      { label: "Best for", value: "Several connected workflows" },
    ],
    overview: [
      "You're running stock, orders, purchasing, reporting, and warehouse work across spreadsheets, accounting software, email, and a few things only one person knows how to do.",
      "The Larger Operations Build brings that patchwork into one focused system built around how your business already works — delivered in agreed phases, so you don’t have to replace everything at once. We map the process first, design and approve the key user journeys before building each phase, build it, and support the launch.",
      "This is the right engagement when the problem is bigger than one screen or one report. You bring deep knowledge of the operation; we turn it into software that gives your team trusted data and clearer workflows.",
    ],
    included: [
      "Discovery and scoping — we map how your operation runs (1–2 weeks)",
      "Delivery in agreed phases, starting with the workflow that matters most",
      "Key user journeys designed and approved before each phase is built",
      "A fast web app your team uses in a browser — nothing to install",
      "Secure logins with the right level of access for each person",
      "Hosting, backups, and setup so it's reachable from every location",
      "Two weeks of support after launch while your team settles in",
    ],
    notIncluded: [
      "Ongoing changes after launch — that's Ongoing Support & Improvements",
      "Third-party costs like hosting fees, subscriptions, or paid integrations",
      "Marketing, SEO, or content",
      "Mobile apps, unless we scope one in separately",
    ],
    scopeNote: LAUNCH_SUPPORT_COPY,
    process: ENGAGEMENT_PROCESS,
    callout: {
      label: "Delivered In Phases",
      title: "You don’t have to replace everything at once.",
      body: "We agree the phases up front, starting with the workflow that costs you most. Each phase has clear scope and agreed milestones, and changes are approved before additional work begins — so the system can grow as it proves its value.",
    },
    idealFor:
      "Owners of wholesale, distribution, light manufacturing, or multi-location businesses whose operation has outgrown spreadsheets, aging tools, or disconnected SaaS — and who want one system built properly, in phases, around how the team actually works.",
    faqIds: ["replace-everything", "ownership", "after-launch"],
    ctaPrompt: "Ready to replace the spreadsheet patchwork?",
    ctaLabel: "Discuss a Larger Build",
    ctaPrimary: "book",
  },
  {
    slug: "growth-retainer",
    num: "04",
    tier: "primary",
    title: "Ongoing Support & Improvements",
    metaTitle: "Ongoing Software Support & Improvements",
    headlineLead: "Ongoing Support",
    headlineTail: "& Improvements.",
    intent: "support",
    card: {
      description:
        "For live systems your team relies on. As you add locations, products, and people, we keep the system fitting — improvements and fixes every month, from the same team.",
      timeline: "3-month minimum",
    },
    meta: [
      { label: "Minimum", value: "3 months" },
      { label: "Best for", value: "Software that keeps growing" },
    ],
    overview: [
      "Your system is live and your team relies on it. But the business keeps changing — new locations, new product lines, new reports, new approval steps, new edge cases.",
      "Ongoing Support & Improvements gives you a senior team that already understands your system and keeps improving it month after month, without the cost and delay of hiring or re-explaining everything to a new developer.",
    ],
    included: [
      "A set block of development time every month",
      "New features and improvements as your operation changes",
      "Fixes and performance work, prioritised within your monthly time",
      "A weekly check-in call",
      "Day-to-day access over chat or email",
      "The same developer who knows your system throughout",
      "A short monthly summary of what got done",
    ],
    notIncluded: [
      "Major new design work (we can add it as a scoped extra)",
      "Deep infrastructure management beyond the basics",
      "24/7 on-call or emergency cover",
      "Guaranteed uptime or unlimited fixes",
    ],
    callout: {
      label: "Minimum Commitment",
      title: "Three months, then monthly.",
      body: "Keeping a system fitting your business takes continuity, not a one-month dip-in. We ask for three months to start; after that it runs monthly, with 30 days' notice to stop whenever you need.",
    },
    idealFor:
      "Owners with a live operations system who want it to keep improving as the business grows — without hiring a full-time developer or starting over with someone new each time.",
    faqIds: ["after-launch"],
    ctaPrompt: "Already live and ready to keep improving?",
    ctaLabel: "Discuss Ongoing Support",
    ctaPrimary: "book",
  },
  {
    slug: "technical-audit",
    num: "05",
    tier: "audit",
    title: "Existing System Audit",
    metaTitle: "Existing Operations Software Audit",
    headlineLead: "Existing System",
    headlineTail: "Audit.",
    intent: "system-review",
    card: {
      description:
        "A technical review of software you already run — code, data, security, and reliability. Different from a Workflow Assessment, which looks at a business process rather than a codebase.",
      timeline: "1 week",
    },
    meta: [
      { label: "Turnaround", value: "1 week" },
    ],
    overview: [
      "You're running software someone else built, an old internal system, or an off-the-shelf tool that has been patched around your operation for years. You're not sure whether to fix it, replace it, or stop investing in it.",
      "The Existing System Audit gives you a plain-English assessment of the code, data, security, reliability, and workflow fit — so you know what is broken, what matters, and what to do next.",
      "It is a technical review of existing software. If you instead need to understand a business process before deciding what to build, the Workflow Assessment is the better starting point.",
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
      "Mapping a business process from scratch — that's the Workflow Assessment",
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
    ctaPrompt: "Not sure what you're running?",
    ctaLabel: "Request a System Audit",
    ctaPrimary: "book",
  },

  // ── Secondary services ─────────────────────────────────────────────────
  {
    slug: "ai-workflow-automation",
    num: "06",
    tier: "secondary",
    title: "AI Workflow Automation",
    metaTitle: { absolute: "AI Workflow Automation | TechTrinity" },
    headlineLead: "AI automation for the repetitive work",
    headlineTail: "between your systems.",
    intent: "ai-automation",
    card: {
      description:
        "Bounded automation for enquiries, documents, and routine information requests — with human approval where it matters.",
      timeline: "Scoped per workflow",
    },
    meta: [
      { label: "Running costs", value: "Discussed separately" },
      { label: "Best for", value: "Enquiries, documents, routine requests" },
    ],
    overview: [
      "We assess where AI can help with enquiries, documents, and routine information requests. Then we connect it to the relevant systems, define what needs human approval, and measure its performance on your workflow.",
      "AI agents can take on well-defined parts of a workflow — reading an enquiry, pulling details from a document, looking up a status — but they work best with clear limits. We agree what the system may do on its own, what needs a person’s approval, and how each action is recorded.",
      "Where a standard integration or simple deterministic automation does the job reliably, we recommend that instead. AI is only worth its added complexity and running cost when it improves the workflow enough to justify them.",
    ],
    included: [
      "Assessment of the workflow, data, and system access involved",
      "A clear line between what is automated and what needs human approval",
      "Integration with the relevant systems, as scoped",
      "Testing on representative examples before any live use",
      "A pilot with staff reviewing the output",
      "Logging, failure handling, and monitoring, as scoped",
      "Handover, documentation, and two weeks of launch support",
    ],
    notIncluded: [
      "Unreviewed decisions on prices, commitments, or anything staff should approve",
      "Model, API, and platform usage fees — third-party operating costs, discussed separately",
      "Connections to platforms or accounts that don’t offer the access required",
      "Guaranteed savings or accuracy figures",
    ],
    scopeNote: LAUNCH_SUPPORT_COPY,
    capabilities: {
      label: "Illustrative Capabilities",
      headingLead: "Three examples of",
      headingTail: "bounded automation.",
      note: "These are illustrative examples of what can be scoped — not deployed case studies. Feasibility depends on your platform access and the integrations your systems offer.",
      items: [
        {
          title: "Enquiry qualification",
          scope: "Collect details, classify the enquiry, and route it.",
          humanBoundary:
            "Staff handle exceptions and commercial commitments.",
          measurement: "Routing accuracy, completeness, handling time.",
        },
        {
          title: "Quote preparation",
          scope:
            "Extract requested items and prepare a draft using approved data.",
          humanBoundary: "Staff approve price and quote before sending.",
          measurement: "Correction rate and preparation time.",
        },
        {
          title: "Order-status assistance",
          scope: "Retrieve permitted status information.",
          humanBoundary:
            "Escalate missing, conflicting, or uncertain information.",
          measurement: "Correct resolution and escalation rates.",
        },
      ],
    },
    process: {
      label: "The Process",
      headingLead: "Tested on your examples",
      headingTail: "before it goes live.",
      steps: [
        {
          num: "01",
          title: "Assess data & access",
          description:
            "We look at the workflow, the data it relies on, and what your systems and platforms actually allow us to connect to.",
        },
        {
          num: "02",
          title: "Test on examples",
          description:
            "We run the approach against representative real examples and agree what good output looks like.",
        },
        {
          num: "03",
          title: "Pilot with review",
          description:
            "A limited pilot where staff review the output, handle exceptions, and approve anything that needs a person.",
        },
        {
          num: "04",
          title: "Measure & improve",
          description:
            "We track the agreed measures, adjust the boundaries, and decide together whether to extend it.",
        },
      ],
    },
    detailBlocks: [
      {
        label: "Implementation",
        title: "Scoped into every build.",
        intro:
          "These are part of the implementation scope, agreed before work begins.",
        items: [
          {
            title: "Permissions",
            body: "The automation gets only the access it needs, in the systems it touches, agreed up front.",
          },
          {
            title: "Traceable actions",
            body: "Lookups, drafts, and routed messages are logged so staff can see what happened and why.",
          },
          {
            title: "Failure handling",
            body: "When information is missing, conflicting, or uncertain, the workflow hands over to a person rather than guessing.",
          },
          {
            title: "Monitoring",
            body: "The agreed measures are tracked during the pilot and after launch, so problems surface early.",
          },
          {
            title: "Platform access",
            body: "Messaging channels, inboxes, and business systems differ in what they allow. We confirm what your platforms and accounts can connect to before committing to a design.",
          },
        ],
      },
    ],
    idealFor:
      "Businesses with a recurring, well-understood information task — enquiries, documents, status requests — that has a clear owner and enough real examples to test against.",
    faqIds: ["need-ai", "existing-software"],
    ctaPrompt: "Have a repetitive task worth testing?",
    ctaLabel: "Discuss an Automation Workflow",
    ctaPrimary: "message",
    ctaBody:
      "Describe the workflow and the systems involved. We’ll tell you plainly whether AI, a standard integration, or no change at all is the better fit.",
  },
  {
    slug: "mvp-development",
    num: "07",
    tier: "secondary",
    title: "MVP Development",
    metaTitle: { absolute: "MVP Design & Development | TechTrinity" },
    headlineLead: "Build the first version",
    headlineTail: "your customers can actually use.",
    intent: "mvp",
    card: {
      description:
        "For B2B founders with a validated problem — key journeys, interface design, and a focused first release.",
      timeline: "Bounded first release",
    },
    meta: [
      { label: "Best for", value: "B2B product founders" },
      { label: "Approach", value: "A bounded first release" },
    ],
    overview: [
      "We help B2B founders turn a validated problem into a focused first product—from key user journeys and interface design to development, launch, and the next round of improvements.",
      "This is for founders who have already done the work of understanding a problem — through customer conversations, pilots, or an existing manual service — and now need a first version real users can rely on.",
      "We keep the first release deliberately narrow: the core use case, done properly, with room to grow. We don’t promise product-market fit, funding, traction, or a fixed launch date for every product — those depend on your market, your customers, and the scope we agree.",
    ],
    included: [
      "Discovery and selection of the core use case for the first release",
      "A UI/UX prototype of the key user journeys, approved before building",
      "A bounded first release, built on established technology",
      "Accounts, permissions, and integrations, as scoped",
      "Deployment and hosting setup",
      "Handover of agreed code, documentation, and access",
      "Two weeks of launch support",
      "Later improvements, scoped as separate phases",
    ],
    notIncluded: [
      "Validating demand or finding customers for you",
      "Marketing, fundraising material, or growth campaigns",
      "Native mobile apps, unless scoped in separately",
      "Third-party costs like hosting, SaaS subscriptions, or paid APIs",
    ],
    scopeNote: LAUNCH_SUPPORT_COPY,
    detailBlocks: [
      {
        label: "Before We Start",
        title: "What we look for in a product engagement.",
        items: [
          {
            title: "Customer access",
            body: "You can put us in front of the people who will use the product, or share what they’ve told you.",
          },
          {
            title: "Evidence of demand",
            body: "Interviews, pilots, pre-orders, or a manual version of the service show the problem is real.",
          },
          {
            title: "A clear product owner",
            body: "One person can make decisions about scope and priorities, and is available to make them.",
          },
          {
            title: "An allocated budget",
            body: "Funding for the first release is set aside, with room for the improvements that follow.",
          },
        ],
      },
    ],
    relatedWork: {
      label: EMPLOYMENT_WORK_LABEL,
      title: "Relevant engineering experience.",
      intro:
        "Our founder, Usama Nadeem, contributed engineering work to these products at other companies. They are not MVPs built by TechTrinity; they show the kind of product engineering he brings to a first release.",
      items: [
        {
          title: "Canonical Academy",
          href: "/work/canonical-academy",
          description:
            "In-house engineering on Canonical’s certification platform — exam purchase, scheduling, and credential issuance.",
        },
        {
          title: "Xenia",
          href: "/work/xenia",
          description:
            "Full-stack engineering on a frontline operations platform for checklists and team workflows.",
        },
        {
          title: "Hirecinch",
          href: "/work/hirecinch",
          description:
            "Lead development on a hiring platform that moved recruiting from spreadsheets to a shared candidate pipeline.",
        },
      ],
    },
    idealFor:
      "B2B founders with a validated problem, access to customers, and a budget set aside for a focused first release — who want a small senior team to design and build it.",
    faqIds: ["ownership", "after-launch"],
    ctaPrompt: "Have a validated problem to build for?",
    ctaLabel: "Discuss Your Product",
    ctaPrimary: "message",
    ctaBody:
      "Tell us who the product is for, what you’ve learned from them so far, and what the first release needs to do.",
  },
  {
    slug: "business-websites",
    num: "08",
    tier: "secondary",
    title: "Business Websites",
    metaTitle: {
      absolute: "Business Website Design & Development | TechTrinity",
    },
    headlineLead: "A website that gives customers",
    headlineTail: "a clear next step.",
    intent: "website",
    card: {
      description:
        "For established businesses — a clear, mobile-friendly site with enquiries connected to your sales process.",
      timeline: "Launch scope agreed up front",
    },
    meta: [
      { label: "Best for", value: "Established businesses" },
      { label: "Focus", value: "Enquiries into sales" },
    ],
    overview: [
      "We design and build business websites that explain your offer, work well on mobile, and connect enquiries to your sales process.",
      "We start from the enquiries you want and the questions customers ask before they get in touch, then structure the site so each page leads somewhere useful.",
      "Launch scope is the site itself — structure, design, build, and the enquiry path. Ongoing content, advertising, and SEO campaigns are separate work. We don’t promise search rankings or lead volumes; we build a sound foundation and set up the measurement to see what it does.",
    ],
    included: [
      "Information architecture and page structure",
      "UI/UX design, approved before building",
      "Responsive implementation that works well on mobile",
      "Editable content, where scoped",
      "Enquiry capture forms",
      "CRM or inbox connections, as scoped",
      "Basic technical SEO — metadata, sitemap, and page-speed foundations",
      "Measurement setup that respects visitor consent",
      "Two weeks of launch support",
    ],
    notIncluded: [
      "Copywriting and photography, unless scoped in",
      "Ongoing content, advertising, or SEO campaigns",
      "Guaranteed search rankings, traffic, or leads",
      "Third-party costs like hosting, domains, or CRM subscriptions",
    ],
    scopeNote: LAUNCH_SUPPORT_COPY,
    detailBlocks: [
      {
        label: "Your Part",
        title: "What we’ll need from you.",
        items: [
          {
            title: "Copy",
            body: "The facts about your business and offer. We can structure and edit them; original copywriting is scoped separately.",
          },
          {
            title: "Photography",
            body: "Real photos of your team, products, or premises — or a budget for a shoot. We don’t use stock images to stand in for your business.",
          },
          {
            title: "Approvals",
            body: "A named person who can review and approve structure, design, and content at each stage.",
          },
          {
            title: "Accounts",
            body: "Access to your domain, hosting, and CRM accounts — ideally held in your business’s name, so you retain control.",
          },
        ],
      },
    ],
    idealFor:
      "Established businesses whose website doesn’t explain what they do, or doesn’t connect enquiries to their sales process — and who can supply the content and approvals the project needs.",
    faqIds: ["ownership", "after-launch"],
    ctaPrompt: "Ready for a site that leads somewhere?",
    ctaLabel: "Discuss Your Website",
    ctaPrimary: "message",
    ctaBody:
      "Tell us about your business, who your customers are, and what should happen when they get in touch.",
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_DETAILS.map((service) => service.slug);
}

export function getServicesByTier(tier: ServiceTier): ServiceDetail[] {
  return SERVICE_DETAILS.filter((service) => service.tier === tier);
}

/** Title used in visible headings/OG when metaTitle is absolute. */
export function serviceMetaTitle(service: ServiceDetail): string {
  const { metaTitle } = service;
  if (!metaTitle) return service.title;
  return typeof metaTitle === "string" ? metaTitle : metaTitle.absolute;
}

/** The BUYER_FAQ entries answered on a given service page, in listed order. */
export function getServiceFaqs(service: ServiceDetail): FaqItem[] {
  return (service.faqIds ?? [])
    .map((id) => BUYER_FAQ.find((faq) => faq.id === id))
    .filter((faq): faq is FaqItem => !!faq);
}
