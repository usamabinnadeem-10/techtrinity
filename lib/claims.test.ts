import { describe, expect, it } from "vitest";
import { CLAIMS, claimStat, claimText, publishedStats, type Claim } from "./claims";

describe("claims registry", () => {
  it("hides unverified stats and shows verified ones", () => {
    expect(claimStat("easyAccountsBranches")).toBeNull();
    expect(claimStat("easyAccountsPermissions")).toEqual({
      value: "172",
      label: "Access permissions",
    });
  });

  it("uses the neutral fallback for unverified running copy", () => {
    expect(claimText("easyAccountsBranches", (c) => `${c.value} branches`)).toBe(
      "Used in a live, multi-branch wholesale operation",
    );
    expect(claimText("hirecinchTimeToHire", (c) => c.value)).toBeNull();
  });

  it("filters stat lists to published claims", () => {
    expect(
      publishedStats(["easyAccountsBranches", "easyAccountsPermissions"]),
    ).toHaveLength(1);
  });

  it("requires a measurement date and evidence for every verified claim", () => {
    for (const claim of Object.values(CLAIMS) as Claim[]) {
      if (claim.status === "verified") {
        expect(claim.measuredAt).toBeTruthy();
        expect(claim.evidence).toBeTruthy();
      }
    }
  });
});
