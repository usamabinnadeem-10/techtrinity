import { describe, expect, test } from "vitest";
import { POLICY_META, PROCESSORS } from "./policy-meta";

describe("POLICY_META", () => {
  test("single-sources controller name and contact email from site config", () => {
    expect(POLICY_META.controllerName).toBe("TechTrinity");
    expect(POLICY_META.contactEmail).toBe("info@techtrinity.ai");
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
