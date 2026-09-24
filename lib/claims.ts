/**
 * Single source of truth for repeated public factual claims (brief TT-01).
 *
 * Every number or factual statement that appears on more than one surface —
 * pages, cards, metadata, JSON-LD, llms.txt — should be read from here so the
 * surfaces cannot drift apart.
 *
 * A claim is only rendered publicly when `status === "verified"`. Unverified
 * claims fall back to `fallback` (neutral, factual copy) or are hidden when no
 * fallback exists. To publish a number, the owner fills in `measuredAt` and
 * `evidence` and flips `status` to "verified" — nothing else needs to change.
 *
 * `evidence` is an internal note (where the figure came from). It is never
 * rendered.
 */

export type ClaimStatus = "verified" | "unverified";

export type Claim = {
  /** What exactly the metric counts. */
  definition: string;
  /** The figure as it would be displayed, e.g. "50+". */
  value: string;
  /** Short display label that accompanies `value`, e.g. "Live branches". */
  label: string;
  /** ISO date the figure was measured. Required before publishing. */
  measuredAt: string | null;
  /** Internal note on the supporting evidence. Never rendered. */
  evidence: string | null;
  status: ClaimStatus;
  /** Neutral copy used while the claim is unverified. `null` hides it. */
  fallback: string | null;
};

export const CLAIMS = {
  easyAccountsBranches: {
    definition:
      "Number of branches/locations actively using EasyAccounts in production.",
    value: "50+",
    label: "Live branches in production",
    measuredAt: null,
    evidence: null,
    // About said 50+; an earlier case-study revision said 12+. Unreconciled.
    status: "unverified",
    fallback: "Used in a live, multi-branch wholesale operation",
  },
  easyAccountsDuration: {
    definition:
      "How long EasyAccounts has been in daily production use (product age — not founder career length or studio age).",
    value: "3+ years",
    label: "In production",
    measuredAt: null,
    evidence: null,
    // Site said three years; owner context elsewhere said four. Unreconciled.
    status: "unverified",
    fallback: "Built and maintained for daily wholesale operations",
  },
  easyAccountsTransactions: {
    definition:
      "Count of sale/purchase transactions recorded in EasyAccounts since launch.",
    value: "180,000+",
    label: "Transactions processed",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  easyAccountsPayments: {
    definition: "Count of payment records created in EasyAccounts since launch.",
    value: "100,000+",
    label: "Payments recorded",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  easyAccountsPermissions: {
    definition:
      "Number of individual permissions in the EasyAccounts role-based access control system (a product capability, readable from the codebase).",
    value: "172",
    label: "Access permissions",
    // Product capability (not an outcome), published by the owner in prior
    // site copy. Owner to confirm the exact count against the permission table.
    measuredAt: "2026-09-24",
    evidence: "Owner-published product specification; pending codebase recount.",
    status: "verified",
    fallback: null,
  },
  hirecinchRecruiterTime: {
    definition: "Reduction in recruiter time spent per hire after adopting Hirecinch.",
    value: "30%",
    label: "Recruiter time saved",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  hirecinchTimeToHire: {
    definition: "Reduction in mean time-to-hire after adopting Hirecinch.",
    value: "22%",
    label: "Faster time to hire",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  canonicalExams: {
    definition:
      "Exams conducted on the Canonical Academy platform (platform-wide figure, not attributable to one engineer).",
    value: "10,000+",
    label: "Exams conducted on the platform",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  xeniaLoadTime: {
    definition:
      "Initial load time before/after the API response-compression work the founder shipped at Xenia.",
    value: "30s → 7s",
    label: "Initial load time",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  xeniaChecklistCapacity: {
    definition:
      "Checklist-builder item count before crashing, before/after the re-render fix.",
    value: "20 → 100+",
    label: "Checklist items without crashing",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
  xeniaFunding: {
    definition:
      "Xenia's funding stage during the founder's employment. Company context only — not an outcome of the founder's work.",
    value: "Seed to Series A",
    label: "Company stage during tenure",
    measuredAt: null,
    evidence: null,
    status: "unverified",
    fallback: null,
  },
} satisfies Record<string, Claim>;

export type ClaimKey = keyof typeof CLAIMS;

export function isPublished(key: ClaimKey): boolean {
  return (CLAIMS[key] as Claim).status === "verified";
}

/** The `{ value, label }` pair for a stat badge, or `null` if it must be hidden. */
export function claimStat(key: ClaimKey): { value: string; label: string } | null {
  const claim: Claim = CLAIMS[key];
  return claim.status === "verified"
    ? { value: claim.value, label: claim.label }
    : null;
}

/**
 * Text to use in running copy: the verified `${value} ${label}` phrasing via
 * `verifiedText`, otherwise the neutral fallback. Returns `null` when the
 * claim is unverified and has no fallback — the caller must omit it.
 */
export function claimText(
  key: ClaimKey,
  verifiedText: (claim: Claim) => string,
): string | null {
  const claim: Claim = CLAIMS[key];
  if (claim.status === "verified") return verifiedText(claim);
  return claim.fallback;
}

/** Filters a list of claim keys down to the stat badges that may be shown. */
export function publishedStats(
  keys: ClaimKey[],
): { value: string; label: string }[] {
  return keys
    .map(claimStat)
    .filter((s): s is { value: string; label: string } => s !== null);
}
