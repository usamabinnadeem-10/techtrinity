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
    value: "12+",
    label: "Live branches in production",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: "Used in a live, multi-branch wholesale operation",
  },
  easyAccountsDuration: {
    definition:
      "How long EasyAccounts has been in daily production use (product age — not founder career length or studio age).",
    value: "4 years",
    label: "In production",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: "Built and maintained for daily wholesale operations",
  },
  easyAccountsTransactions: {
    definition:
      "Count of sale/purchase transactions recorded in EasyAccounts since launch.",
    value: "90,000+",
    label: "Transactions processed",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  easyAccountsPayments: {
    definition: "Count of payment records created in EasyAccounts since launch.",
    value: "50,000+",
    label: "Payments recorded",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  easyAccountsPermissions: {
    definition:
      "Number of individual permissions in the EasyAccounts role-based access control system (a product capability).",
    value: "189+",
    label: "Access permissions",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  hirecinchRecruiterTime: {
    definition: "Reduction in recruiter time spent per hire after adopting Hirecinch.",
    value: "30%",
    label: "Recruiter time saved",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  hirecinchTimeToHire: {
    definition: "Reduction in mean time-to-hire after adopting Hirecinch.",
    value: "22%",
    label: "Faster time to hire",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  canonicalExams: {
    definition:
      "Exams conducted on the Canonical Academy platform (platform-wide figure, not attributable to one engineer).",
    value: "10,000+",
    label: "Exams conducted on the platform",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  xeniaLoadTime: {
    definition:
      "Initial load time before/after the API response-compression work the founder shipped at Xenia.",
    value: "30s → 7s",
    label: "Initial load time",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  xeniaChecklistCapacity: {
    definition:
      "Checklist-builder item count before crashing, before/after the re-render fix.",
    value: "20 → 100+",
    label: "Checklist items without crashing",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
    fallback: null,
  },
  xeniaFunding: {
    definition:
      "Xenia's funding stage during the founder's employment. Company context only — not an outcome of the founder's work.",
    value: "Seed to Series A",
    label: "Company stage during tenure",
    measuredAt: "2026-09-24",
    evidence: "Confirmed by the owner (Usama Nadeem) on 2026-09-24.",
    status: "verified",
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
