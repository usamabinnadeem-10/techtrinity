import {
  CLAIMS,
  claimStat,
  claimText,
  isPublished,
  publishedStats,
  type ClaimKey,
} from "@/lib/claims";
import {
  EMPLOYMENT_WORK_LABEL,
  FOUNDER_TITLE,
  OWN_PRODUCT_LABEL,
  messageHref,
} from "@/lib/offer";

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

export type Stat = { value: string; label: string };

export type OutcomeCard = { primary: string; description: string[] };

/**
 * How the work relates to TechTrinity (brief TT-02). "own-product" is the
 * founder's own product; "employment" is the founder's engineering work for
 * another company — never presented as a TechTrinity client commission.
 */
export type Engagement = "own-product" | "employment";

/** One answer in the buyer-question business summary (brief TT-09). */
export type SummaryItem = {
  /** Short heading for the buyer question, e.g. "Setting". */
  question: string;
  answer: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  engagement: Engagement;
  meta: MetaEntry[];
  headline: string[];
  /** 0–4 stat badges. Numbers must come from lib/claims.ts. */
  heroStats: Stat[];
  hero: { image: CaseStudyImage; url: string };

  /** Concise business summary shown right after the hero (TT-09). */
  summary?: {
    label: string;
    headline: string[];
    items: SummaryItem[];
  };

  /** A real task from input to outcome, as a captioned screenshot sequence. */
  walkthrough?: {
    label: string;
    headline: string[];
    intro: string;
    steps: {
      title: string;
      caption: string;
      image: CaseStudyImage;
      url: string;
    }[];
    note?: string;
  };

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
    /** Any number of cards; verified figures or factual capability copy. */
    cards: OutcomeCard[];
  };

  cta?: {
    label?: string;
    headline: string[];
    emphasis?: string;
  };

  /** Related-workflow CTA shown next to the booking CTA (TT-09). */
  relatedCta: {
    label: string;
    href: string;
    /** Intended service slug, for cta_click analytics. */
    service?: string;
  };
};

// ── Claim helpers ───────────────────────────────────────────────────────────

/**
 * A verified outcome card from the claims registry, or `null` when the claim
 * is unverified (the card is then omitted, never shown with a placeholder).
 */
function claimCard(key: ClaimKey, description: string[]): OutcomeCard | null {
  const stat = claimStat(key);
  return stat ? { primary: stat.value, description } : null;
}

/** Uses the verified card when available, otherwise the factual fallback. */
function claimCardOr(
  key: ClaimKey,
  description: string[],
  fallback: OutcomeCard,
): OutcomeCard {
  return claimCard(key, description) ?? fallback;
}

function compact<T>(items: (T | null | undefined | false)[]): T[] {
  return items.filter((item): item is T => Boolean(item));
}

/** Hero stats are capped at four so the hero grid stays legible. */
function heroStats(stats: (Stat | null | undefined | false)[]): Stat[] {
  return compact(stats).slice(0, 4);
}

function sentence(text: string | null): string {
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

// Running-copy phrasings for EasyAccounts claims (verified value, or fallback).
const eaPermissions = claimStat("easyAccountsPermissions");
const eaBranches = claimStat("easyAccountsBranches");

/** e.g. "role-based access control with 189+ permissions". */
const accessControlPhrase = eaPermissions
  ? `role-based access control with ${eaPermissions.value} permissions`
  : "granular role-based access control";

/** e.g. "Used in a live, multi-branch wholesale operation." */
const branchesSentence = sentence(
  claimText("easyAccountsBranches", (c) => `Live across ${c.value} branches`),
);

/** e.g. "across 50+ branches" or "across a multi-branch operation". */
const branchesPhrase = eaBranches
  ? `across ${eaBranches.value} branches`
  : "across a multi-branch operation";

/** e.g. "Built and maintained for daily wholesale operations." */
const durationSentence = sentence(
  claimText("easyAccountsDuration", (c) => `In production for ${c.value}`),
);

/** Hirecinch outcome percentages that may be published (verified only). */
const hirecinchStats = publishedStats([
  "hirecinchRecruiterTime",
  "hirecinchTimeToHire",
]);

/** Xenia engineering results that may be published (verified only). */
const xeniaStats = publishedStats(["xeniaLoadTime", "xeniaChecklistCapacity"]);

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
    engagement: "employment",
    meta: [
      { label: "Role", value: "Full-Stack Engineer (In-house)" },
      { label: "Type", value: EMPLOYMENT_WORK_LABEL },
      { label: "Stack", value: "Go · Node.js · React" },
      { label: "Year", value: "2023–2024" },
    ],
    headline: ["The platform powering Ubuntu", "certifications at scale."],
    heroStats: heroStats([
      claimStat("canonicalExams"),
      { value: "In-house", label: "Canonical engineering team" },
      { value: "Go · Node · React", label: "Core Stack" },
    ]),
    hero: {
      image: CANONICAL_HERO_IMAGE,
      url: "academy.canonical.com",
    },
    summary: {
      label: "In Brief",
      headline: ["The work, in", "plain terms."],
      items: [
        {
          question: "Who used it",
          answer:
            "Engineers worldwide use Canonical Academy to buy, schedule, and sit proctored Ubuntu and Linux certification exams, and to receive Credly badges when they pass.",
        },
        {
          question: "What was difficult",
          answer:
            "A Flask monolith with Jinja templates meant full-page reloads during exam flows, UI changes that needed backend knowledge, and vendor integrations tangled into core code.",
        },
        {
          question: "Usama’s contribution",
          answer:
            "As a full-stack engineer on Canonical’s in-house team — not a TechTrinity client engagement — Usama worked on the rebuild across the Go backend, the Node.js BFF that isolates Proctor360 and Credly, and the React frontend.",
        },
        {
          question: "What changed",
          answer:
            "Buying, scheduling, proctored check-in, and badge issuance run as one flow without full-page reloads, and vendor API changes are contained in the BFF rather than the core business logic.",
        },
        {
          question: "Outcomes",
          answer: isPublished("canonicalExams")
            ? `The platform has conducted ${CLAIMS.canonicalExams.value} exams. That is a platform-wide figure reflecting Canonical’s whole team, not one engineer’s contribution.`
            : "Operational description only. Platform-wide usage figures are Canonical’s and are pending verification, so none are published here.",
        },
        {
          question: "What it taught",
          answer:
            "Clear boundaries between layers make a system easier to change safely — especially where third-party integrations change on their own schedule.",
        },
      ],
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
      headline: ["Shipped.", "Still running."],
      cards: compact([
        claimCard("canonicalExams", ["Exams conducted", "on the platform"]),
        {
          primary: "Simpler",
          description: [
            "onboarding",
            "New engineers can work on one layer without learning the whole monolith",
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
          primary: "Isolated",
          description: [
            "integrations",
            "Proctor360 and Credly contained in the BFF",
          ],
        },
      ]),
    },
    relatedCta: {
      label: "Discuss an Existing System",
      href: messageHref("system-review"),
      service: "system-review",
    },
  },

  hirecinch: {
    slug: "hirecinch",
    name: "Hirecinch",
    engagement: "employment",
    meta: [
      { label: "Role", value: "Lead Developer" },
      { label: "Type", value: EMPLOYMENT_WORK_LABEL },
      { label: "Product", value: "SaaS hiring platform" },
      { label: "Stack", value: "React · Django" },
    ],
    headline: ["From Google Sheets", "to a full hiring platform."],
    // Outcome percentages only when verified; otherwise factual capabilities.
    heroStats: heroStats(
      hirecinchStats.length > 0
        ? hirecinchStats
        : [
            { value: "Shared", label: "Candidate pipeline per role" },
            { value: "Weighted", label: "Candidate scorecards" },
          ],
    ),
    hero: {
      image: {
        src: "/hirecinch/applicants.png",
        alt: "Hirecinch candidate list with pipeline stages and scores",
        width: 1433,
        height: 895,
      },
      url: "app.hirecinch.com",
    },
    summary: {
      label: "In Brief",
      headline: ["The work, in", "plain terms."],
      items: [
        {
          question: "Who used it",
          answer:
            "Recruiting teams hiring for several open roles at once, from public job posting through to offer.",
        },
        {
          question: "What was difficult",
          answer:
            "Hiring ran on Google Sheets and email: resumes were hard to match to applications, stages were invisible to hiring managers, and interviewers scored candidates inconsistently.",
        },
        {
          question: "Usama’s contribution",
          answer:
            "As lead developer, Usama led development of the React and Django application, including the public job board, configurable application forms and questions, per-role pipelines, and the weighted scorecard with auto-rejection thresholds. This was employment at Hirecinch, not a TechTrinity client commission.",
        },
        {
          question: "What changed",
          answer:
            "Applications, stages, scores, resumes, and candidate emails live in one place, and every team member can see where each candidate stands.",
        },
        {
          question: "Outcomes",
          answer:
            hirecinchStats.length > 0
              ? "Measured changes in recruiter time and time to hire are shown below."
              : "Operational description; figures pending verification. The capabilities below are implemented — time-saving percentages are not published until they can be substantiated.",
        },
        {
          question: "What it taught",
          answer:
            "Structured, weighted criteria make candidate comparisons more consistent than free-form notes in a spreadsheet.",
        },
      ],
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
      label: "The Platform",
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
        "Combined with auto-rejection triggers, candidates who don't meet minimum thresholds are removed automatically, so recruiters don't have to review them by hand.",
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
      headline:
        hirecinchStats.length > 0
          ? ["The numbers", "it moved."]
          : ["What the platform", "does today."],
      // Percentages appear only once verified; the rest are implemented
      // capabilities, not measured results.
      cards: compact([
        claimCard("hirecinchRecruiterTime", ["Recruiter time", "saved per hire"]),
        claimCard("hirecinchTimeToHire", ["Faster mean", "time to hire"]),
        {
          primary: "Shared",
          description: ["Candidate pipeline", "Every stage of every role, visible to the team"],
        },
        {
          primary: "Weighted",
          description: ["Scorecards", "Candidates compared on the same criteria"],
        },
        {
          primary: "Automatic",
          description: ["Threshold rejection", "Configured per role by recruiters"],
        },
        {
          primary: "1",
          description: ["Platform", "for all roles"],
        },
      ]).slice(0, 4),
    },
    relatedCta: {
      label: "See MVP Development",
      href: "/services/mvp-development",
      service: "mvp",
    },
  },
};

CASE_STUDIES.xenia = {
  slug: "xenia",
  name: "Xenia",
  engagement: "employment",
  meta: [
    { label: "Role", value: "Full-Stack Engineer" },
    { label: "Type", value: EMPLOYMENT_WORK_LABEL },
    { label: "Stack", value: "React · Node.js · RabbitMQ" },
    { label: "Duration", value: "2+ Years" },
  ],
  headline: [
    "Engineering work on a",
    "frontline operations",
    "platform.",
  ],
  // Engineering results only when verified; otherwise the contribution areas.
  // Company funding is context, never a stat attributed to this work.
  heroStats: heroStats(
    xeniaStats.length > 0
      ? xeniaStats
      : [
          { value: "Performance", label: "API compression & render fixes" },
          { value: "Billing", label: "Stripe subscriptions & plan gating" },
          { value: "Public links", label: "External checklist sharing" },
        ],
  ),
  hero: {
    image: {
      src: "/xenia/checklist-builder.png",
      alt: "Xenia template builder with mobile preview panel",
      width: 1465,
      height: 812,
    },
    url: "app.xenia.team",
  },
  summary: {
    label: "In Brief",
    headline: ["The work, in", "plain terms."],
    items: [
      {
        question: "Who used it",
        answer:
          "Restaurants, retail chains, and hospitality businesses use Xenia to run tasks, checklists, audits, and work orders across multiple locations.",
      },
      {
        question: "What was difficult",
        answer:
          "Slow initial loads, a checklist builder that crashed on larger templates, no way to share checklists with people outside the platform, and no billing or plan gating.",
      },
      {
        question: "Usama’s contribution",
        answer:
          "Over two-plus years as a full-stack engineer on Xenia’s product team, Usama shipped API response compression, re-render fixes in the checklist builder, public checklist links, and the Stripe billing and plan-gating infrastructure, and contributed to reporting and AI-assisted documents. This was employment at Xenia, not a TechTrinity client commission.",
      },
      {
        question: "What changed",
        answer:
          "Managers could build larger checklists without the builder crashing, share checklists with guests and other external parties by link, and gate add-on features behind paid plans.",
      },
      {
        question: "Outcomes",
        answer:
          xeniaStats.length > 0
            ? "Measured performance changes from this work are shown below. The company’s funding is context only, not an outcome of any one engineer’s work."
            : "Operational description; figures pending verification. The company’s funding stage is context only and is not presented as an outcome of this work.",
      },
      {
        question: "What it taught",
        answer:
          "In a fast-growing product, performance fixes and billing infrastructure are as important to customers as new features — and both have to ship without disrupting daily use.",
      },
    ],
  },
  overview: {
    label: "The Project",
    headline: [
      "A frontline operations platform",
      "for multi-location businesses.",
    ],
    body: compact([
      "Xenia is an AI-powered operations execution platform used by restaurants, retail chains, and hospitality businesses to manage tasks, checklists, audits, work orders, and team communication across multiple locations.",
      "Usama joined Xenia’s team as a full-stack engineer. Over two-plus years he contributed to core features across the platform — performance work, the checklist builder, external sharing, billing infrastructure, and reporting.",
      claimText(
        "xeniaFunding",
        (c) =>
          `For context, the company went from ${c.value} during that time. That growth reflects the whole company’s work and is not presented as a result of these contributions.`,
      ),
    ]),
  },
  challenge: {
    label: "The Constraints",
    headline: ["A platform running at", "the edge of its limits."],
    cards: [
      {
        title: "Slow initial load",
        body: "The application was noticeably slow on initial load, creating friction for frontline workers who needed fast access during operational hours.",
      },
      {
        title: "Crashing checklist builder",
        body: "The template builder could crash the browser on larger templates due to unnecessary re-renders — limiting the complexity of templates customers could build.",
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
    label: "Usama’s Contributions",
    headline: ["Core infrastructure,", "shipped across two years."],
    startWithCopy: true,
    rows: [
      {
        label: "Load Time & Rendering Performance",
        body: [
          "Added response compression across the API layer to cut initial load time",
          claimText("xeniaLoadTime", (c) => ` (${c.value})`) ?? "",
          ". Resolved systematic unnecessary re-renders in the checklist builder so it could handle much larger templates without crashing the browser",
          claimText("xeniaChecklistCapacity", (c) => ` (${c.value} items)`) ?? "",
          ".",
        ].join(""),
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
        body: "Built the public checklist feature — allowing templates to be shared with people outside the Xenia platform via a public link. This opened up a use case such as hospitality businesses collecting guest experience feedback directly through Xenia, without requiring guests to create an account.",
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
        body: "Built the complete billing infrastructure — Stripe integration, recurring subscription plans, and feature gating. Before this, premium and free features were undifferentiated. After implementation, add-on features were gated behind the appropriate plan, giving the business a way to charge for advanced capabilities.",
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
    headline: ["Two years.", "Shipped contributions."],
    // Performance figures only once verified. Funding is deliberately absent:
    // it is company context, not an outcome of this work.
    cards: [
      claimCardOr("xeniaLoadTime", ["Initial load time", "After API response compression"], {
        primary: "Faster",
        description: ["Initial load", "API response compression across the platform"],
      }),
      claimCardOr(
        "xeniaChecklistCapacity",
        ["Checklist items", "Without crashing the builder"],
        {
          primary: "Larger",
          description: ["Checklists", "Re-render fixes in the template builder"],
        },
      ),
      {
        primary: "Public",
        description: ["Checklist links", "External parties respond without an account"],
      },
      {
        primary: "Gated",
        description: ["Paid features", "Stripe subscriptions and plan gating"],
      },
    ],
  },
  cta: {
    headline: ["Want infrastructure that", "scales with your operation?"],
    emphasis: "infrastructure",
  },
  relatedCta: {
    label: "See MVP Development",
    href: "/services/mvp-development",
    service: "mvp",
  },
};

CASE_STUDIES.easyaccounts = {
  slug: "easyaccounts",
  name: "EasyAccounts",
  engagement: "own-product",
  meta: [
    { label: "Role", value: FOUNDER_TITLE },
    { label: "Type", value: OWN_PRODUCT_LABEL },
    { label: "Built for", value: "Family textile wholesale business" },
    { label: "Stack", value: "React · Django" },
  ],
  headline: [
    "A production ERP built",
    "from the ground up —",
    "and actually used.",
  ],
  // Branch count only when verified (neutral fallback otherwise); volume
  // badges are hidden until their definitions and dates are verified.
  heroStats: heroStats([
    claimStat("easyAccountsBranches") ?? {
      value: "Multi-branch",
      label: "Live wholesale operation",
    },
    claimStat("easyAccountsTransactions"),
    claimStat("easyAccountsPayments"),
    claimStat("easyAccountsPermissions"),
  ]),
  hero: {
    image: {
      src: "/easyaccounts/reports-product-cost-trace.png",
      alt: "EasyAccounts product cost trace report with chronological event log",
      width: 1465,
      height: 812,
    },
    url: "app.easyaccounts.com",
  },
  summary: {
    label: "In Brief",
    headline: ["The business case,", "before the screens."],
    items: [
      {
        question: "Who uses it",
        answer: `The staff and owners of a multi-branch textile wholesale business — Usama’s family’s business — for purchasing, sales, stock, cheques, and financial reporting. ${durationSentence}`,
      },
      {
        question: "What was difficult",
        answer:
          "Manual ledgers and disconnected spreadsheets gave no reliable view of stock or financial health. Fabric moves through dyeing and processing, so cost had to be tracked at every stage, not just at purchase and sale.",
      },
      {
        question: "Usama’s contribution",
        answer: `Usama Nadeem, ${FOUNDER_TITLE} of TechTrinity, built EasyAccounts for his family’s wholesale business and continues to work on it: the data model, purchasing and sales workflows, reporting, cost tracing, and permissions.`,
      },
      {
        question: "What changed",
        answer:
          "Transactions, stock movements, cheques, and reports live in one system. The owner can trace a product’s cost from purchase through processing to sale, and every action is recorded in an audit log.",
      },
      {
        question: "Outcomes",
        answer: [
          branchesSentence,
          publishedStats(["easyAccountsTransactions", "easyAccountsPayments"]).length > 0
            ? "Transaction and payment volumes are shown above."
            : "Operational description; transaction and payment figures are pending verification and are not published.",
        ]
          .filter(Boolean)
          .join(" "),
      },
      {
        question: "What operation taught",
        answer:
          "Daily use surfaces the details generic software misses — units, branch permissions, stock corrections, and the exceptions real staff run into. Those details shape how we scope client software.",
      },
    ],
  },
  walkthrough: {
    label: "One Task, End to End",
    headline: ["Tracing what a", "product really cost."],
    intro:
      "A real task from the business: the owner wants to know what a fabric actually cost by the time it was sold, after purchase, dyeing, and processing. These are the screens used to answer it.",
    steps: [
      {
        title: "Record the purchase",
        caption:
          "Staff record the purchase invoice with party, quantity, amount, book reference, and date. It joins the searchable transaction history.",
        image: {
          src: "/easyaccounts/transactions-list.png",
          alt: "EasyAccounts transactions list with party, amount, and book references",
          width: 3454,
          height: 1912,
        },
        url: "app.easyaccounts.com",
      },
      {
        title: "Trace the cost",
        caption:
          "The product cost trace shows opening and closing average cost per yard, the cost change, and average sale price — with every transaction that moved the cost in a chronological log.",
        image: {
          src: "/easyaccounts/reports-product-cost-trace.png",
          alt: "EasyAccounts product cost trace with chronological event log",
          width: 1465,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
      {
        title: "See the effect on profit",
        caption:
          "The income statement breaks gross profit down by product category — finished goods, raw materials, dyeing/washing, and processing — and every figure traces back to its transactions.",
        image: {
          src: "/easyaccounts/reprots-income-statement.png",
          alt: "EasyAccounts income statement broken down by product category",
          width: 1467,
          height: 812,
        },
        url: "app.easyaccounts.com",
      },
    ],
    note:
      "EasyAccounts was designed around one textile wholesale operation — yardage, rolls, dyeing, and processing stages. It is not an off-the-shelf fit for every distributor; another business’s workflow would need its own review.",
  },
  overview: {
    label: "The System",
    headline: [
      "Not a side project.",
      "A real system for a",
      "real business.",
    ],
    body: compact([
      "EasyAccounts started as a solution to a problem Usama knew firsthand — managing his family’s multi-branch textile wholesale business without the right tools meant manual ledgers, disconnected spreadsheets, and no reliable view of financial health.",
      `He built EasyAccounts from scratch as a full-scale ERP purpose-built for the operational complexity of wholesale trading. ${branchesSentence} ${durationSentence}`.trim(),
      `The system handles the complete business lifecycle — purchasing, sales, inventory, financial reporting, cheque management, and ${accessControlPhrase} — all in one platform.`,
    ]),
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
        body: "With transactions flowing through multiple branches and warehouses every day, the system needed double-entry accounting, immutable audit trails, and financial statements that could be trusted.",
      },
      {
        title: "Access control across branches",
        body: `Different employees across different branches need different levels of access. ${accessControlPhrase.replace(/^./, (c) => c.toUpperCase())} was required to ensure every role saw exactly what it needed — nothing more.`,
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
        body: "Full purchase and sale invoice management with support for wholesale-specific units. Every transaction is recorded with party, amount, quantity, book reference, and date — filterable and searchable across the full transaction history. Every request is recorded in the audit trail.",
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
        body: `Every action in the system is logged — user, timestamp, path, view name, IP address, device type, browser, OS, and HTTP status. Logs are immutable and append-only. 500 entries load per page with full search and filter capability. Built for accountability ${branchesPhrase}.`,
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
        title: eaPermissions ? `${eaPermissions.value} Permissions` : "Granular Permissions",
        body: `Granular role-based access control${eaPermissions ? ` with ${eaPermissions.value} individual permissions` : ""}. Every feature, every report, every action can be enabled or disabled per employee role.`,
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
    headline: ["In production.", "In daily use."],
    // Verified figures from lib/claims.ts; neutral operational copy otherwise.
    cards: compact([
      claimCardOr("easyAccountsBranches", ["Live branches", "in production"], {
        primary: "Multi-branch",
        description: [
          "Live operation",
          "Used in a live, multi-branch wholesale operation",
        ],
      }),
      claimCard("easyAccountsTransactions", ["Transactions", "processed"]),
      claimCard("easyAccountsPayments", ["Payments", "recorded"]),
      claimCard("easyAccountsPermissions", ["Access", "permissions"]),
      {
        primary: "Traceable",
        description: ["Stock & cost", "Every cost change linked to its transactions"],
      },
      {
        primary: "Audited",
        description: ["Every action", "Immutable, append-only request logs"],
      },
    ]).slice(0, 4),
  },
  cta: {
    headline: ["Need a system built for", "complexity, not demos?"],
    emphasis: "complexity",
  },
  relatedCta: {
    label: "Discuss an Operations Workflow",
    href: messageHref("operations"),
    service: "operations",
  },
};

export function getCaseStudy(slug: string): CaseStudy | null {
  return CASE_STUDIES[slug] ?? null;
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
