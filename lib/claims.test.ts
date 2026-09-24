import { describe, expect, it } from "vitest";
import {
  CLAIMS,
  claimStat,
  claimText,
  publishedStats,
  type Claim,
  type ClaimKey,
} from "./claims";

const entries = Object.entries(CLAIMS) as [ClaimKey, Claim][];

describe("claims registry", () => {
  it.each(entries)("%s renders a stat only when verified", (key, claim) => {
    const stat = claimStat(key);
    if (claim.status === "verified") {
      expect(stat).toEqual({ value: claim.value, label: claim.label });
    } else {
      expect(stat).toBeNull();
    }
  });

  it.each(entries)("%s uses verified phrasing or the neutral fallback", (key, claim) => {
    const text = claimText(key, (c) => `VERIFIED ${c.value}`);
    expect(text).toBe(
      claim.status === "verified" ? `VERIFIED ${claim.value}` : claim.fallback,
    );
  });

  it("filters stat lists to published claims", () => {
    const keys = entries.map(([key]) => key);
    const verified = entries.filter(([, c]) => c.status === "verified").length;
    expect(publishedStats(keys)).toHaveLength(verified);
  });

  it("requires a measurement date and evidence for every verified claim", () => {
    for (const [, claim] of entries) {
      if (claim.status === "verified") {
        expect(claim.measuredAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(claim.evidence).toBeTruthy();
      }
    }
  });
});
