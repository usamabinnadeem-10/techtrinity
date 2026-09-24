import { describe, expect, test } from "vitest";
import { OUTREACH_PROCESSORS, POLICY_META, PROCESSORS } from "./policy-meta";

describe("POLICY_META", () => {
  test("single-sources controller name and contact email from site config", () => {
    expect(POLICY_META.controllerName).toBe("TechTrinity");
    expect(POLICY_META.contactEmail).toBe("privacy@techtrinity.ai");
  });

  test("publishes the postal address rather than offering it on request", () => {
    expect(POLICY_META.postalAddress).toBe(
      "1710 Keller Parkway #8550, Keller, TX 76248, USA",
    );
  });

  test("states the published last-updated date", () => {
    expect(POLICY_META.lastUpdated).toBe("30 June 2026");
  });
});

describe("PROCESSORS", () => {
  test("lists the four named processors in order", () => {
    expect(PROCESSORS.map((p) => p.name)).toEqual([
      "Google Analytics",
      "Calendly",
      "Resend",
      "Vercel",
    ]);
  });

  test("every processor has a role and an https policy link", () => {
    for (const p of PROCESSORS) {
      expect(p.role).toBeTruthy();
      expect(p.policyUrl).toMatch(/^https:\/\//);
    }
  });
});

describe("OUTREACH_PROCESSORS", () => {
  test("lists the outreach stack in order", () => {
    expect(OUTREACH_PROCESSORS.map((p) => p.name)).toEqual([
      "Findymail",
      "Instantly",
      "InboxKit",
    ]);
  });

  test("stays disjoint from the visitor-facing processors", () => {
    const visitor = new Set(PROCESSORS.map((p) => p.name));
    for (const p of OUTREACH_PROCESSORS) {
      expect(visitor.has(p.name)).toBe(false);
    }
  });
});
