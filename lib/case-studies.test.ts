import { describe, expect, it } from "vitest";
import { CLAIMS, claimText, isPublished, type Claim } from "@/lib/claims";
import {
  EMPLOYMENT_WORK_LABEL,
  FOUNDER_TITLE,
  OWN_PRODUCT_LABEL,
  SERVICE_INTENTS,
} from "@/lib/offer";
import { CASE_STUDIES, getAllCaseStudySlugs, getCaseStudy } from "./case-studies";

const studies = Object.values(CASE_STUDIES);

/** Unverified claim values that must never appear in public case-study copy. */
const unverifiedValues = (Object.values(CLAIMS) as Claim[])
  .filter((claim) => claim.status !== "verified")
  .flatMap((claim) => claim.value.split(/\s*→\s*/).concat(claim.value))
  // Ignore tiny fragments like "20" that would match years such as "2023".
  .filter((value) => /\d/.test(value) && value.length >= 3);

describe("case-study claims (TT-01)", () => {
  it.each(studies.map((s) => [s.slug, s] as const))(
    "%s publishes no unverified figures",
    (_slug, study) => {
      const text = JSON.stringify(study);
      for (const value of unverifiedValues) {
        expect(text, `found unverified "${value}"`).not.toContain(value);
      }
      // Superseded or derived figures that are not in the registry.
      for (const legacy of ["50+", "180,000", "100,000+", "172", "77%", "5×", "$1M", "$12M", "30 seconds", "500+"]) {
        expect(text).not.toContain(legacy);
      }
    },
  );

  it("keeps hero stats between 0 and 4", () => {
    for (const study of studies) {
      expect(study.heroStats.length).toBeLessThanOrEqual(4);
    }
  });

  it("shows verified registry figures on the matching study", () => {
    const expectations: [string, (keyof typeof CLAIMS)[]][] = [
      ["easyaccounts", ["easyAccountsBranches", "easyAccountsTransactions", "easyAccountsPayments", "easyAccountsPermissions"]],
      ["hirecinch", ["hirecinchRecruiterTime", "hirecinchTimeToHire"]],
      ["xenia", ["xeniaLoadTime", "xeniaChecklistCapacity"]],
      ["canonical-academy", ["canonicalExams"]],
    ];
    for (const [slug, keys] of expectations) {
      const text = JSON.stringify(getCaseStudy(slug));
      for (const key of keys) {
        if (isPublished(key)) expect(text).toContain(CLAIMS[key].value);
      }
    }
  });

  it("uses Hirecinch percentages only when verified, capabilities otherwise", () => {
    const hirecinch = getCaseStudy("hirecinch")!;
    const hasPercent = hirecinch.heroStats.some((s) => s.value.includes("%"));
    expect(hasPercent).toBe(isPublished("hirecinchRecruiterTime") || isPublished("hirecinchTimeToHire"));
  });

  it("never presents Xenia's funding as an outcome", () => {
    const xenia = getCaseStudy("xenia")!;
    const outcomeText = JSON.stringify([
      xenia.headline,
      xenia.heroStats,
      xenia.outcomes,
    ]).toLowerCase();
    expect(outcomeText).not.toContain("series a");
    expect(outcomeText).not.toContain("seed");
    const text = JSON.stringify(xenia).toLowerCase();
    expect(text).not.toContain("we joined");
    expect(text).not.toContain("what we built");
    if (text.includes("series a")) {
      expect(text).toContain("not presented as a result");
    }
  });

  it("describes EasyAccounts branches from the registry", () => {
    const ea = JSON.stringify(getCaseStudy("easyaccounts"));
    const branches = claimText("easyAccountsBranches", (c) => c.value)!;
    expect(ea).toContain(branches);
  });
});

describe("attribution (TT-02)", () => {
  it("labels EasyAccounts as the founder's own product with the CEO title", () => {
    const ea = getCaseStudy("easyaccounts")!;
    expect(ea.engagement).toBe("own-product");
    expect(ea.meta).toContainEqual({ label: "Role", value: FOUNDER_TITLE });
    expect(ea.meta).toContainEqual({ label: "Type", value: OWN_PRODUCT_LABEL });
    expect(JSON.stringify(ea)).toContain("family’s");
  });

  it.each(["xenia", "hirecinch", "canonical-academy"])(
    "labels %s as the founder's engineering work",
    (slug) => {
      const study = getCaseStudy(slug)!;
      expect(study.engagement).toBe("employment");
      expect(study.meta).toContainEqual({ label: "Type", value: EMPLOYMENT_WORK_LABEL });
      expect(JSON.stringify(study)).toContain("not a TechTrinity client");
    },
  );

  it("keeps Canonical's in-house disclosure", () => {
    expect(JSON.stringify(getCaseStudy("canonical-academy"))).toContain(
      "not as a client engagement",
    );
  });
});

describe("buyer summary & CTA (TT-09)", () => {
  it("gives every study a six-question summary", () => {
    for (const study of studies) {
      expect(study.summary?.items).toHaveLength(6);
    }
  });

  it("gives EasyAccounts a screenshot walkthrough with the textile-fit caveat", () => {
    const ea = getCaseStudy("easyaccounts")!;
    expect(ea.walkthrough?.steps.length).toBeGreaterThanOrEqual(3);
    for (const step of ea.walkthrough!.steps) {
      expect(step.image.src).toMatch(/^\/easyaccounts\//);
    }
    expect(ea.walkthrough?.note).toMatch(/not an off-the-shelf fit/);
  });

  it("links related CTAs to real destinations", () => {
    for (const study of studies) {
      const { href, service } = study.relatedCta;
      expect(href).not.toBe("/work");
      if (href.startsWith("/contact")) {
        const slug = new URL(href, "https://x.test").searchParams.get("service");
        expect(Object.keys(SERVICE_INTENTS)).toContain(slug);
        expect(service).toBe(slug);
      }
    }
    expect(getCaseStudy("easyaccounts")!.relatedCta.href).toBe(
      "/contact?service=operations#message",
    );
    expect(getCaseStudy("hirecinch")!.relatedCta.href).toBe("/services/mvp-development");
    expect(getCaseStudy("xenia")!.relatedCta.href).toBe("/services/mvp-development");
  });

  it("exposes all slugs", () => {
    expect(getAllCaseStudySlugs().sort()).toEqual(
      ["canonical-academy", "easyaccounts", "hirecinch", "xenia"],
    );
  });
});
