export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type MetaEntry = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  meta: MetaEntry[];
  headline: string[];
  heroStats: { value: string; label: string }[];
  hero: { image: CaseStudyImage; url: string };

  overview?: {
    label: string;
    headline: string[];
    body: string[];
  };

  challenge?: {
    label: string;
    headline: string[];
    cards: { title: string; body: string }[];
  };

  architecture?: {
    label: string;
    headline: string[];
    body: string[];
    layers: {
      title: string;
      subtitle: string;
      primary?: boolean;
    }[];
    externals: string[];
    details: { title: string; body: string }[];
  };

  flow?: {
    label: string;
    headline: string[];
    body: string[];
    steps: { num: string; primary: string; secondary?: string; highlight?: boolean }[];
    image: CaseStudyImage;
    imageUrl: string;
    caption: string;
  };

  journey?: {
    label: string;
    headline: string[];
    steps: {
      step: string;
      title: string;
      caption: string;
      image: CaseStudyImage;
      url: string;
    }[];
  };

  spotlight?: {
    label: string;
    headline: string[];
    body: string[];
    image: CaseStudyImage;
    url: string;
  };

  whyItMatters?: {
    label: string;
    headline: string[];
    body: string;
    bullets: string[];
  };

  platform?: {
    label: string;
    headline: string[];
    startWithCopy?: boolean;
    rows: (
      | {
          label: string;
          body: string;
          image: CaseStudyImage;
          url: string;
        }
      | {
          dual: true;
          left: { image: CaseStudyImage; url: string; caption: string };
          right: { image: CaseStudyImage; url: string; caption: string };
        }
    )[];
  };

  controls?: {
    label: string;
    headline: string[];
    cards: { title: string; body: string }[];
  };

  scorecard?: {
    label: string;
    headline: string[];
    body: string[];
    image: CaseStudyImage;
    url: string;
    cards: { title: string; body: string }[];
  };

  review?: {
    label: string;
    headline: string[];
    items: {
      image: CaseStudyImage;
      url: string;
      caption: string;
    }[];
  };

  outcomes: {
    label: string;
    headline: string[];
    cards: { primary: string; description: string[] }[];
  };

  cta?: {
    label?: string;
    headline: string[];
    emphasis?: string;
    showSecondButton?: boolean;
  };
};

const CANONICAL_HERO_IMAGE: CaseStudyImage = {
  src: "/canonical/purchase.png",
  alt: "Canonical Academy exam selection page",
  width: 3456,
  height: 1984,
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "canonical-academy": {
    slug: "canonical-academy",
    name: "Canonical Academy",
    meta: [
      { label: "Role", value: "Full-Stack Engineer (In-house)" },
      { label: "Stack", value: "Go · Node.js · React" },
      { label: "Year", value: "2023–2024" },
    ],
    headline: ["The platform powering Ubuntu", "certifications at scale."],
    heroStats: [
      { value: "10,000+", label: "Exams Conducted" },
      { value: "Go · Node · React", label: "Core Stack" },
    ],
    hero: {
      image: CANONICAL_HERO_IMAGE,
      url: "academy.canonical.com",
    },
    overview: {
      label: "The Project",
      headline: ["A certification platform", "built from the inside."],
      body: [
        "Canonical Academy is the official certification platform for Ubuntu and Linux professionals. Engineers worldwide use it to purchase exams, schedule them under live proctored conditions, and earn globally recognised Credly badges upon passing.",
        "This was built in-house as part of the Canonical engineering team — not as a client engagement. The platform handles the full certification lifecycle, from payment processing to identity verification to exam delivery to credential issuance.",
      ],
    },
    challenge: {
      label: "The Challenge",
      headline: ["A legacy codebase that", "couldn't keep up."],
      cards: [
        {
          title: "Full-page reloads",
          body: "Every state change triggered a complete page reload, creating a fragmented experience during high-stakes exam flows.",
        },
        {
          title: "Tightly coupled templates",
          body: "Jinja templates bound the frontend to the backend. UI changes required backend knowledge and were expensive to test.",
        },
        {
          title: "Slow engineer onboarding",
          body: "New team members had to understand the entire Flask monolith before contributing to either layer.",
        },
        {
          title: "Scattered integrations",
          body: "External vendor APIs were embedded in the monolith, making them brittle and difficult to maintain independently.",
        },
      ],
    },
    architecture: {
      label: "The Architecture",
      headline: ["A deliberate separation", "of concerns."],
      body: [
        "The rebuild introduced a three-layer architecture — each layer with a clear, bounded responsibility.",
        "The Go backend owns all business-critical infrastructure. The Node BFF handles all external API orchestration. The React frontend owns the user experience entirely.",
        "Keeping the BFF separate from the Go backend meant external vendor changes — Proctor360 API updates, Credly webhook changes — never touched core business logic.",
      ],
      layers: [
        {
          title: "React Frontend",
          subtitle: "User experience · SPA · State management",
        },
        {
          title: "Node.js BFF",
          subtitle: "External orchestration · Session management",
          primary: true,
        },
        {
          title: "Go Backend",
          subtitle: "Payments · Exam catalogue · Student records",
        },
      ],
      externals: ["Proctor360", "Credly"],
      details: [
        {
          title: "Go Backend",
          body: "Payments, exam creation, student management, banning and compliance. Source of truth for all business logic.",
        },
        {
          title: "Node BFF",
          body: "Proctor360 session creation, webhook handling, Credly badge issuance. All external API contracts live here.",
        },
        {
          title: "React Frontend",
          body: "Migrated from Jinja templates. Client-side state management, no full-page reloads, clean component architecture.",
        },
      ],
    },
    flow: {
      label: "Proctoring Integration",
      headline: ["Live identity verification", "via webhook-driven flow."],
      body: [
        "Certification exams require verified identity and a monitored environment. The platform integrates Proctor360 to handle this entirely via API.",
        "The check-in flow is webhook-driven by design — rather than polling P360 for status, the BFF listens for P360's confirmation event. This keeps the exam flow responsive and eliminates unnecessary API calls during a time-sensitive user journey.",
      ],
      steps: [
        { num: "01", primary: "User schedules exam" },
        { num: "02", primary: "BFF creates session with Proctor360", highlight: true },
        { num: "03", primary: "P360 emails user for environment check-in" },
        {
          num: "04",
          primary: "User completes check-in on P360's platform",
          secondary: "ID verified, environment scanned for flags",
        },
        {
          num: "05",
          primary: "P360 fires webhook → BFF confirms check-in",
          highlight: true,
        },
        {
          num: "06",
          primary: "Exam window opens → user takes exam",
          secondary: "Pass → Credly badge issued automatically",
          highlight: true,
        },
      ],
      image: {
        src: "/canonical/my-exams.png",
        alt: "Canonical Academy exam dashboard showing attempt status and scheduling actions",
        width: 3456,
        height: 1984,
      },
      imageUrl: "academy.canonical.com/exams",
      caption: "Exam dashboard showing attempt status and scheduling actions.",
    },
    journey: {
      label: "The Experience",
      headline: ["From purchase to", "certified in one flow."],
      steps: [
        {
          step: "Step 01 — Purchase",
          title: "Purchase",
          caption: "Select and purchase an exam from the catalogue.",
          image: {
            src: "/canonical/purchase-cropped.png",
            alt: "Canonical Academy checkout page",
            width: 3456,
            height: 1984,
          },
          url: "academy.canonical.com/exams",
        },
        {
          step: "Step 02 — Schedule",
          title: "Schedule",
          caption: "Choose country, timezone, date and time slot.",
          image: {
            src: "/canonical/schedule-exam.png",
            alt: "Canonical Academy scheduling page",
            width: 3456,
            height: 1984,
          },
          url: "academy.canonical.com/schedule",
        },
        {
          step: "Step 03 — Confirmed",
          title: "Confirmed",
          caption: "Everything is ready. Reminders sent automatically.",
          image: {
            src: "/canonical/schedule-confirmation.png",
            alt: "Canonical Academy confirmation page",
            width: 3456,
            height: 1984,
          },
          url: "academy.canonical.com/confirmation",
        },
      ],
    },
    spotlight: {
      label: "Payments",
      headline: ["End-to-end checkout", "handled by Go."],
      body: [
        "The Go backend owns the entire payment lifecycle — exam pricing, order creation, VAT calculation, and transaction records. The checkout experience is a full two-step flow: billing address collection followed by card payment with live order summary.",
        "Payment processing is handled via Stripe integration within the Go layer, keeping financial data entirely separate from the BFF and frontend.",
      ],
      image: {
        src: "/canonical/checkout.png",
        alt: "Canonical Academy payment and order summary",
        width: 3456,
        height: 1984,
      },
      url: "academy.canonical.com/checkout",
    },
    outcomes: {
      label: "Outcomes",
      headline: ["Shipped. Scaled.", "Still running."],
      cards: [
        {
          primary: "10,000+",
          description: ["Exams conducted", "on the platform"],
        },
        {
          primary: "Faster",
          description: [
            "onboarding",
            "New engineers contribute to both layers independently",
          ],
        },
        {
          primary: "Eliminated",
          description: [
            "Jinja coupling",
            "React migration decoupled UI from backend",
          ],
        },
        {
          primary: "Resilient",
          description: [
            "integrations",
            "Proctor360 and Credly isolated in the BFF",
          ],
        },
      ],
    },
  },

  hirecinch: {
    slug: "hirecinch",
    name: "Hirecinch",
    meta: [
      { label: "Role", value: "Lead Developer" },
      { label: "Stack", value: "React · Django" },
      { label: "Type", value: "SaaS Product" },
    ],
    headline: ["From Google Sheets", "to a full hiring platform."],
    heroStats: [
      { value: "30%", label: "Recruiter time saved" },
      { value: "22%", label: "Faster time to hire" },
    ],
    hero: {
      image: {
        src: "/hirecinch/applicants.png",
        alt: "Hirecinch candidate list with pipeline stages and scores",
        width: 1433,
        height: 895,
      },
      url: "app.hirecinch.com",
    },
    overview: {
      label: "The Project",
      headline: [
        "A hiring platform built",
        "to replace the spreadsheet.",
      ],
      body: [
        "Hirecinch is a full applicant tracking system built for recruiting teams managing multiple open roles simultaneously. Before Hirecinch, hiring was managed through Google Sheets — making it nearly impossible to track which resume belonged to which candidate, where each person was in the process, or which candidates had been rejected and why.",
        "Hirecinch replaced that chaos with a structured, scored, and automated hiring workflow — from public job posting to final offer.",
      ],
    },
    challenge: {
      label: "The Problem",
      headline: ["Hiring on spreadsheets", "doesn't scale."],
      cards: [
        {
          title: "No candidate tracking",
          body: "Resumes arrived by email and were filed manually in shared folders. Nobody knew which CV belonged to which application.",
        },
        {
          title: "No process visibility",
          body: "Hiring managers had no way to see where each candidate stood without chasing the recruiter directly.",
        },
        {
          title: "Inconsistent evaluation",
          body: "Different interviewers scored candidates differently with no standardised criteria — making comparisons impossible.",
        },
        {
          title: "Manual everything",
          body: "Rejections, follow-ups, scheduling — all done manually, eating hours of recruiter time each week.",
        },
      ],
    },
    platform: {
      label: "What We Built",
      headline: ["Every stage of hiring,", "in one place."],
      rows: [
        {
          label: "Public Job Board",
          body: "Recruiters publish openings to a branded careers page. Candidates browse and apply directly through Hirecinch — no third-party job boards required. Each listing includes job details, location, and work type.",
          image: {
            src: "/hirecinch/careers-public.png",
            alt: "Hirecinch public careers page listing open roles",
            width: 1433,
            height: 895,
          },
          url: "careers.hirecinch.com/cb/...",
        },
        {
          label: "Structured Applications",
          body: "Every job has a fully configurable application form. Recruiters choose exactly what information to collect — personal details, resume, academic history, custom questions. Fields can be marked required, optional, or disabled per role.",
          image: {
            src: "/hirecinch/application-form-builder.png",
            alt: "Hirecinch application form builder",
            width: 1433,
            height: 895,
          },
          url: "app.hirecinch.com",
        },
        {
          label: "Custom Question Builder",
          body: "Recruiters build role-specific questions directly into the application form. Short text, long text, single choice, multiple choice, binary — each question type feeds directly into the automated scoring and rejection logic.",
          image: {
            src: "/hirecinch/custom-questions.png",
            alt: "Hirecinch custom question builder",
            width: 1433,
            height: 895,
          },
          url: "app.hirecinch.com",
        },
        {
          label: "Configurable Pipeline",
          body: "Each job has its own hiring pipeline. Stages are fully customisable — New Applicants, Screening, Interview, HR Interview, Offer. Candidates move through stages as the process progresses, giving every team member full visibility at a glance.",
          image: {
            src: "/hirecinch/pipeline.png",
            alt: "Hirecinch configurable hiring pipeline",
            width: 1433,
            height: 895,
          },
          url: "app.hirecinch.com",
        },
      ],
    },
    scorecard: {
      label: "The Differentiator",
      headline: ["Hiring decisions backed", "by weighted data."],
      body: [
        "The scorecard system is what separates Hirecinch from a basic ATS. When creating a job, recruiters assign weights to specific evaluation criteria — communication skills, technical ability, cultural fit, and more.",
        "Every candidate receives a calculated score based on those weights. Scores are broken down by category and displayed as percentages, so recruiters can compare candidates objectively rather than relying on gut feel.",
        "Combined with auto-rejection triggers, candidates who don't meet minimum thresholds are removed automatically — eliminating the time spent manually reviewing unqualified applicants.",
      ],
      image: {
        src: "/hirecinch/scorecard.png",
        alt: "Hirecinch weighted scorecard for candidate evaluation",
        width: 1433,
        height: 895,
      },
      url: "app.hirecinch.com",
      cards: [
        {
          title: "Weighted criteria",
          body: "Assign importance to each evaluation area when creating the job.",
        },
        {
          title: "Auto-rejection",
          body: "Set minimum score thresholds. Unqualified candidates removed automatically.",
        },
        {
          title: "Comparative scoring",
          body: "Compare all candidates side by side on the same weighted criteria.",
        },
      ],
    },
    review: {
      label: "Recruiter Workflow",
      headline: ["Review faster.", "Decide with confidence."],
      items: [
        {
          image: {
            src: "/hirecinch/candidate-review-resume.png",
            alt: "Hirecinch inline resume viewer",
            width: 1433,
            height: 895,
          },
          url: "app.hirecinch.com",
          caption:
            "Inline resume viewer. No downloading, no switching tabs.",
        },
        {
          image: {
            src: "/hirecinch/candidate-email.png",
            alt: "Hirecinch candidate email composer",
            width: 1433,
            height: 895,
          },
          url: "app.hirecinch.com",
          caption:
            "Email candidates directly from the platform with a built-in composer.",
        },
      ],
    },
    outcomes: {
      label: "Outcomes",
      headline: ["The numbers", "it moved."],
      cards: [
        {
          primary: "30%",
          description: ["Recruiter time", "saved per hire"],
        },
        {
          primary: "22%",
          description: ["Faster mean", "time to hire"],
        },
        {
          primary: "0",
          description: ["Spreadsheets", "in the workflow"],
        },
        {
          primary: "1",
          description: ["Platform", "for all roles"],
        },
      ],
    },
  },
};

CASE_STUDIES.xenia = {
  slug: "xenia",
  name: "Xenia",
  meta: [
    { label: "Role", value: "Full-Stack Engineer" },
    { label: "Stack", value: "React · Node.js · RabbitMQ" },
    { label: "Duration", value: "2+ Years" },
  ],
  headline: [
    "Helping build a frontline",
    "ops platform from seed",
    "to Series A.",
  ],
  heroStats: [
    { value: "$1M → $12M", label: "Seed to Series A during tenure" },
    { value: "30s → 7s", label: "Load time improvement" },
    { value: "100+", label: "Checklist items without crashing" },
  ],
  hero: {
    image: {
      src: "/xenia/checklist-builder.png",
      alt: "Xenia template builder with mobile preview panel",
      width: 1465,
      height: 812,
    },
    url: "app.xenia.team",
  },
  overview: {
    label: "The Project",
    headline: [
      "A frontline operations platform",
      "for multi-location businesses.",
    ],
    body: [
      "Xenia is an AI-powered operations execution platform used by restaurants, retail chains, and hospitality businesses to manage tasks, checklists, audits, work orders, and team communication across multiple locations.",
      "We joined as Full-Stack Engineers when the company had raised approximately $1M in seed funding. Over two years, we contributed to core features across the platform — from performance infrastructure to billing architecture to user-facing product features that helped unlock new customer segments.",
      "The platform has since raised a $12M Series A.",
    ],
  },
  challenge: {
    label: "The Constraints",
    headline: ["A platform running at", "the edge of its limits."],
    cards: [
      {
        title: "30-second load times",
        body: "The application was noticeably slow on initial load, creating friction for frontline workers who needed fast access during operational hours.",
      },
      {
        title: "Crashing checklist builder",
        body: "The template builder crashed the browser at 20+ checklist items due to unnecessary re-renders — severely limiting the complexity of templates customers could build.",
      },
      {
        title: "No external sharing",
        body: "Users had no way to share checklists or tasks with people outside Xenia — blocking use cases like guest experience surveys in hospitality.",
      },
      {
        title: "No monetisation infrastructure",
        body: "Premium features and free features were undifferentiated. There was no billing system, no plan gating, and no way to charge for advanced capabilities.",
      },
    ],
  },
  platform: {
    label: "What We Built",
    headline: ["Core infrastructure,", "shipped across two years."],
    startWithCopy: true,
    rows: [
      {
        label: "Load Time & Rendering Performance",
        body: "Added response compression across the API layer, reducing initial load times from 30 seconds to 7 seconds — a 77% improvement. Resolved systematic unnecessary re-renders in the checklist builder, increasing its item limit from a browser-crashing 20 items to a stable 100+ without performance degradation.",
        image: {
          src: "/xenia/reporting-task-summary.png",
          alt: "Xenia task summary dashboard",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
      {
        label: "Checklist & Template System",
        body: "Built and improved the core template builder — the feature used by operations managers to create checklists, inspection forms, and SOPs. The builder supports multiple question types, section grouping, conditional logic, and a live mobile preview so managers see exactly what frontline workers will see before publishing.",
        image: {
          src: "/xenia/checklist-builder.png",
          alt: "Xenia checklist and template builder with mobile preview",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
      {
        label: "External Sharing",
        body: "Built the public checklist feature — allowing templates to be shared with people outside the Xenia platform via a public link. This unblocked a significant use case: hospitality businesses collecting guest experience feedback directly through Xenia without requiring guests to create an account. This feature helped convert previously reluctant customers who needed to collect data from external parties.",
        image: {
          src: "/xenia/checklist-filling.png",
          alt: "Xenia public checklist being filled by an external user",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
      {
        label: "Stripe Billing & Monetisation",
        body: "Built the complete billing infrastructure — Stripe integration, recurring subscription plans, and feature gating. Before this, premium and free features were undifferentiated. After implementation, every add-on feature was properly gated behind the appropriate plan, creating a sustainable freemium-to-paid conversion path for the business.",
        image: {
          src: "/xenia/integration-add-ons.png",
          alt: "Xenia plan gating and integration add-ons billing screen",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
      {
        dual: true,
        left: {
          image: {
            src: "/xenia/task-creation-recurring.png",
            alt: "Xenia recurring task creation with frequency and time configuration",
            width: 1465,
            height: 812,
          },
          url: "app.xenia.team",
          caption:
            "Recurring task creation with frequency, day, and time configuration.",
        },
        right: {
          image: {
            src: "/xenia/task-management-kanban.png",
            alt: "Xenia kanban board view of tasks across the pipeline",
            width: 1465,
            height: 812,
          },
          url: "app.xenia.team",
          caption:
            "Kanban board view — tasks organised by status across the pipeline.",
        },
      },
      {
        label: "Reporting & Exports",
        body: "Contributed to the reporting layer — template submission tracking, task compliance reports, and scheduled work summaries. Reports are filterable by location, date range, status, and employee, giving operations managers visibility across all sites.",
        image: {
          src: "/xenia/checklist-settings.png",
          alt: "Xenia checklist settings and submission tracking",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
      {
        label: "AI-Assisted Documents",
        body: "Contributed to the documents module with AI assistant integration — allowing managers to generate SOPs, employee regulations, and operational documents directly within Xenia using an inline AI prompt interface.",
        image: {
          src: "/xenia/documents-ai.png",
          alt: "Xenia AI-assisted document creation",
          width: 1465,
          height: 812,
        },
        url: "app.xenia.team",
      },
    ],
  },
  outcomes: {
    label: "Outcomes",
    headline: ["Two years.", "Measurable results."],
    cards: [
      {
        primary: "77%",
        description: ["Load time reduction", "30s → 7s"],
      },
      {
        primary: "5×",
        description: ["Checklist capacity", "20 → 100+ items"],
      },
      {
        primary: "$1M → $12M",
        description: ["Seed to Series A", "during tenure"],
      },
      {
        primary: "Unlocked",
        description: ["External use cases", "via public links"],
      },
    ],
  },
  cta: {
    headline: ["Want infrastructure that", "scales with your operation?"],
    emphasis: "infrastructure",
    showSecondButton: false,
  },
};

CASE_STUDIES.easyaccounts = {
  slug: "easyaccounts",
  name: "EasyAccounts",
  meta: [
    { label: "Role", value: "Founder & Lead Engineer" },
    { label: "Stack", value: "React · Django" },
    { label: "Type", value: "In-house Product" },
  ],
  headline: [
    "A production ERP built",
    "from the ground up —",
    "and actually used.",
  ],
  heroStats: [
    { value: "180,000+", label: "Transactions processed" },
    { value: "100,000+", label: "Payments recorded" },
    { value: "50+", label: "Live branches in production" },
  ],
  hero: {
    image: {
      src: "/easyaccounts/reports-product-cost-trace.png",
      alt: "EasyAccounts product cost trace report with chronological event log",
      width: 1465,
      height: 812,
    },
    url: "app.easyaccounts.com",
  },
  overview: {
    label: "The System",
    headline: [
      "Not a side project.",
      "A real system for a",
      "real business.",
    ],
    body: [
      "EasyAccounts started as a solution to a problem we knew firsthand — managing a multi-branch textile wholesale business without the right tools meant manual ledgers, disconnected spreadsheets, and no reliable view of financial health.",
      "We built EasyAccounts from scratch as a full-scale ERP purpose-built for the operational complexity of wholesale trading. It's live across 50+ branches, processing real transaction volume every day.",
      "The system handles the complete business lifecycle — purchasing, sales, inventory, financial reporting, cheque management, and a 172-permission access control system — all in one platform.",
    ],
  },
  whyItMatters: {
    label: "Why It Matters",
    headline: ["Why this matters for", "owner-led inventory businesses."],
    body: "EasyAccounts is proof that we understand more than screens and code. It handles the operational details that generic software often misses: units, branches, stock movements, ledgers, permissions, reports, audit trails, and the messy edge cases that appear when real staff use the system every day.",
    bullets: [
      "Multi-branch inventory visibility",
      "Real-time financial reporting",
      "Stock and cost tracing",
      "Role-based permissions",
      "Immutable audit logs",
      "Reports owners can trust",
    ],
  },
  challenge: {
    label: "The Challenge",
    headline: ["Building an ERP that", "handles real complexity."],
    cards: [
      {
        title: "Multi-unit inventory tracking",
        body: "Inventory needed to track in units specific to wholesale trading — yardage, rolls, and quantities — with real-time stock across multiple warehouses and branches simultaneously.",
      },
      {
        title: "Production lifecycle management",
        body: "Raw grey fabric moves through dyeing and processing before becoming finished goods. The system had to track cost and status at every stage of that lifecycle, not just at purchase and sale.",
      },
      {
        title: "Financial accuracy at scale",
        body: "With hundreds of transactions per month across dozens of branches, the system needed double-entry accounting, immutable audit trails, and financial statements that could be trusted.",
      },
      {
        title: "Access control across branches",
        body: "Different employees across different branches need different levels of access. A 172-permission system was required to ensure every role saw exactly what it needed — nothing more.",
      },
    ],
  },
  platform: {
    label: "What Was Built",
    headline: ["Every module a business", "actually needs."],
    startWithCopy: true,
    rows: [
      {
        label: "Purchase & Sale Management",
        body: "Full purchase and sale invoice management with support for wholesale-specific units. Every transaction is recorded with party, amount, quantity, book reference, and date — filterable and searchable across the full transaction history. 500+ request types logged in the audit trail.",
        image: {
          src: "/easyaccounts/transactions-list.png",
          alt: "EasyAccounts transactions list with party, amount, and book references",
          width: 3454,
          height: 1912,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Income Statement",
        body: "A full P&L broken down by product category — finished goods, raw materials, dyeing/washing, and processing — with gross profit per category and net profit margin calculated automatically. Backed by real double-entry accounting. Every figure traces back to individual transactions.",
        image: {
          src: "/easyaccounts/reprots-income-statement.png",
          alt: "EasyAccounts income statement broken down by product category",
          width: 1467,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Balance Sheet",
        body: "Total assets, liabilities, and owner's equity — calculated in real time from all recorded transactions. The balance sheet updates automatically as invoices, payments, expenses, and account transfers are recorded.",
        image: {
          src: "/easyaccounts/reports-balance-sheet.png",
          alt: "EasyAccounts balance sheet with assets, liabilities, and equity",
          width: 1467,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Sale / Purchase Ledger",
        body: "Visual ledger analytics with time-series charts showing sale and purchase trends across any date range. Each data point drills down to the underlying transactions. Designed for business owners who need to understand their numbers quickly, not just accountants who already do.",
        image: {
          src: "/easyaccounts/reports-sale-ledger.png",
          alt: "EasyAccounts sale and purchase ledger with time-series chart",
          width: 1465,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Product Cost Trace",
        body: "One of the most complex features in the system. Tracks the average cost per yard of every product from first purchase through dyeing, processing, and eventual sale. Shows opening cost, closing cost, cost change percentage, and average sale price — with a full chronological event log showing every transaction that affected the cost.",
        image: {
          src: "/easyaccounts/reports-product-cost-trace.png",
          alt: "EasyAccounts product cost trace with chronological event log",
          width: 1465,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Cheque Management",
        body: "Full cheque lifecycle management — received, pending, transferred, and cleared. Each cheque has a complete history log showing every action taken on it. Remaining recovery and status tracked at all times across all parties.",
        image: {
          src: "/easyaccounts/cheque-history.png",
          alt: "EasyAccounts cheque history and lifecycle log",
          width: 3456,
          height: 1916,
        },
        url: "app.easyaccounts.com",
      },
      {
        label: "Immutable Request Logs",
        body: "Every action in the system is logged — user, timestamp, path, view name, IP address, device type, browser, OS, and HTTP status. Logs are immutable and append-only. 500 entries load per page with full search and filter capability. Built for accountability across 50+ branches.",
        image: {
          src: "/easyaccounts/reports-request-logs.png",
          alt: "EasyAccounts immutable request log audit trail",
          width: 1465,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
    ],
  },
  controls: {
    label: "Enterprise Controls",
    headline: ["Built for multi-branch", "operations from day one."],
    cards: [
      {
        title: "172+ Permissions",
        body: "Granular role-based access control with 172 individual permissions. Every feature, every report, every action can be enabled or disabled per employee role.",
      },
      {
        title: "Multi-warehouse stock",
        body: "Inventory tracked across multiple warehouses simultaneously. Stock transfers between warehouses recorded with full audit trail.",
      },
      {
        title: "PDF export engine",
        body: "Every report, ledger, and statement exports to a configurable PDF — custom font size, line width, theme, and density. Built for printing and sharing with accountants.",
      },
    ],
  },
  outcomes: {
    label: "Outcomes",
    headline: ["In production.", "Processing real volume."],
    cards: [
      {
        primary: "180,000+",
        description: ["Transactions", "processed"],
      },
      {
        primary: "100,000+",
        description: ["Payments", "recorded"],
      },
      {
        primary: "50+",
        description: ["Live branches", "in production"],
      },
      {
        primary: "172+",
        description: ["Access", "permissions"],
      },
    ],
  },
  cta: {
    headline: ["Need a system built for", "complexity, not demos?"],
    emphasis: "complexity",
    showSecondButton: false,
  },
};

export function getCaseStudy(slug: string): CaseStudy | null {
  return CASE_STUDIES[slug] ?? null;
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
