export type Project = {
  slug: string
  name: string
  tagline: string
  category: string
  year: string
  stack: string[]
  challenge: string
  solution: string
  outcomes: { metric: string; description: string }[]
  features: { title: string; description: string }[]
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: "easy-accounts",
    name: "EasyAccounts",
    tagline:
      "Custom multi-tenant ERP and financial suite replacing a legacy local system.",
    category: "ERP / SaaS Platform",
    year: "2023",
    stack: [
      "React",
      "Django",
      "PostgreSQL",
      "DigitalOcean",
      "Django REST Framework",
    ],
    challenge:
      "The client ran their entire business on a single local computer. Creating one invoice took 15 minutes. If the hardware failed, all business data was gone. Multiple employees could not work simultaneously, and financial reports were manual and inaccurate.",
    solution:
      "Architected a cloud-native multi-tenant ERP from scratch. Designed 130+ granular RBAC permission nodes, automated financial reporting, and built inventory logic that handles raw material processing and dyeing workflows — replacing every manual process the business relied on.",
    outcomes: [
      {
        metric: "35%",
        description: "Revenue increase from operational efficiency gains",
      },
      {
        metric: "15×",
        description: "Faster invoicing — from 15 minutes to under 1 minute",
      },
      {
        metric: "Zero",
        description: "Data loss after migration to cloud infrastructure",
      },
    ],
    features: [
      {
        title: "130+ RBAC permission nodes",
        description:
          "Granular role-based access control across branches, with custom roles per employee.",
      },
      {
        title: "Automated financial reporting",
        description:
          "Real-time balance sheets, income statements, and cheque management — no manual entry.",
      },
      {
        title: "Multi-branch management",
        description:
          "Centralized control for multiple physical locations with parallel invoice workflows.",
      },
      {
        title: "Dyeing workflow inventory",
        description:
          "Tracks raw materials through processing stages, not just simple stock in/out.",
      },
    ],
    liveUrl: undefined,
    featured: true,
  },
  {
    slug: "xenia",
    name: "Xenia",
    tagline:
      "Performance optimization and billing infrastructure for a B2B operations SaaS.",
    category: "SaaS Platform",
    year: "2023",
    stack: ["React", "Node.js", "Stripe", "PostgreSQL", "Redux"],
    challenge:
      "Xenia's app took 30+ seconds to load for large accounts. The core checklist feature crashed browsers when lists exceeded 40 items. The company had no automated billing and was processing subscriptions manually.",
    solution:
      "Implemented React virtualization (windowing) on the checklist module so only visible items render in the DOM. Refactored state management to eliminate re-render cascades. Owned the complete Stripe billing integration — free trials, per-seat pricing, webhooks, and failed payment handling.",
    outcomes: [
      {
        metric: "3,000+",
        description:
          "Active organizations supported without performance degradation",
      },
      {
        metric: "$100k+",
        description: "MRR automated through Stripe billing infrastructure",
      },
      {
        metric: "<7s",
        description:
          "Load time — down from 30+ seconds for large accounts",
      },
    ],
    features: [
      {
        title: "React virtualization",
        description:
          "Checklists with 1,000+ items now render at 60fps — only visible items exist in the DOM.",
      },
      {
        title: "Stripe billing engine",
        description:
          "Free trials, monthly/yearly plans, per-seat pricing, and webhook handlers for renewals and failures.",
      },
      {
        title: "Multi-tenant data isolation",
        description:
          "Refactored data access layer to enforce strict separation across 3,000+ company accounts.",
      },
      {
        title: "State management refactor",
        description:
          "Eliminated prop-drilling re-renders that were causing cascading UI freezes.",
      },
    ],
    liveUrl: "https://xenia.com",
    featured: true,
  },
  {
    slug: "canonical-academy",
    name: "Canonical Academy",
    tagline: "AI-driven exam proctoring platform for Ubuntu certification.",
    category: "EdTech / Certification Platform",
    year: "2024",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Proctor360"],
    challenge:
      "Canonical needed a remote exam platform as secure as a physical test center for their global Ubuntu certification program. The platform had to verify candidate identity, prevent cheating via secondary screens or phones, and integrate a third-party AI proctoring tool without disrupting the exam experience.",
    solution:
      "Led development of the secure exam environment at academy.canonical.com. Engineered the integration between Canonical's backend and Proctor360's AI proctoring SDK — including the secure handshake, session management, real-time flag processing, and automated certificate issuance on pass.",
    outcomes: [
      {
        metric: "Global",
        description:
          "Platform live and actively certifying professionals worldwide",
      },
      {
        metric: "$20k",
        description:
          "MRR generated in initial launch phase from certification sales",
      },
      {
        metric: "Months",
        description:
          "Development time saved by architecting the Proctor360 integration correctly",
      },
    ],
    features: [
      {
        title: "Proctor360 AI integration",
        description:
          "Secure handshake, ID verification, environment checks, and real-time suspicious activity signals.",
      },
      {
        title: "Session integrity management",
        description:
          "Exam state persisted across Node.js backend even if proctoring connection drops.",
      },
      {
        title: "Automated certification",
        description:
          "Instant grading and certificate issuance on successful API validation from proctoring service.",
      },
      {
        title: "Browser lockdown",
        description:
          "Focus detection warns candidates attempting tab switches before the proctored session begins.",
      },
    ],
    liveUrl: "https://academy.canonical.com",
    featured: true,
  },
  {
    slug: "hirecinch",
    name: "HireCinch",
    tagline: "B2B SaaS applicant tracking system built zero to one.",
    category: "SaaS / HR Tech",
    year: "2023",
    stack: ["React", "Django", "PostgreSQL", "Stripe"],
    challenge:
      "The startup needed to go from concept to revenue-generating product quickly. HR managers were drowning in unqualified applicants, corporate clients needed branded career pages, and the platform needed a subscription billing system ready at launch.",
    solution:
      "Played dual roles as full-stack engineer and product researcher — interviewing HR professionals to design against real pain points. Built a candidate scoring engine, dynamic subdomain white-labeling, and a complete Stripe billing module. Took the product from idea to live market in under 2 months.",
    outcomes: [
      {
        metric: "60%",
        description:
          "Reduction in manual resume screening time via automated scoring",
      },
      {
        metric: "2 months",
        description: "Zero to live market product with paying customers",
      },
      {
        metric: "Day 1",
        description: "Revenue-ready Stripe billing live at launch",
      },
    ],
    features: [
      {
        title: "Candidate fit scoring engine",
        description:
          "HR managers set weighted criteria; the backend scores every applicant automatically and surfaces top candidates.",
      },
      {
        title: "White-label subdomain routing",
        description:
          "Dynamic subdomains per company (nike.hirecinch.app) with custom logos, themes, and job listings.",
      },
      {
        title: "Full Stripe billing module",
        description:
          "Subscription lifecycle management — upgrades, downgrades, cancellations — delivered in under 2 months.",
      },
      {
        title: "Product research integration",
        description:
          "User interviews with HR professionals shaped every major feature decision before a line of code was written.",
      },
    ],
    liveUrl: undefined,
    featured: true,
  },
]
