import { describe, expect, test } from "vitest";
import { BUYER_FAQ, SERVICE_INTENTS } from "@/lib/offer";
import {
  getAllServiceSlugs,
  getServiceFaqs,
  getServicesByTier,
  SERVICE_DETAILS,
  serviceMetaTitle,
} from "@/lib/services";

describe("service catalogue", () => {
  test("keeps every existing slug and adds the new routes", () => {
    expect(getAllServiceSlugs()).toEqual(
      expect.arrayContaining([
        "product-sprint",
        "build-only",
        "growth-retainer",
        "technical-audit",
        "workflow-assessment",
        "ai-workflow-automation",
        "mvp-development",
        "business-websites",
      ]),
    );
  });

  test("orders primary engagements per the buying path", () => {
    expect(getServicesByTier("primary").map((s) => s.slug)).toEqual([
      "workflow-assessment",
      "build-only",
      "product-sprint",
      "growth-retainer",
    ]);
    expect(getServicesByTier("audit").map((s) => s.slug)).toEqual([
      "technical-audit",
    ]);
    expect(getServicesByTier("secondary").map((s) => s.slug)).toEqual([
      "ai-workflow-automation",
      "mvp-development",
      "business-websites",
    ]);
  });

  test("slugs and page titles are unique", () => {
    const slugs = getAllServiceSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = SERVICE_DETAILS.map(serviceMetaTitle);
    expect(new Set(titles).size).toBe(titles.length);
  });

  test("absolute titles are not double-suffixed", () => {
    for (const service of SERVICE_DETAILS) {
      const title = serviceMetaTitle(service);
      expect(title).not.toMatch(/TechTrinity.*TechTrinity/);
      if (typeof service.metaTitle === "string") {
        expect(service.metaTitle).not.toMatch(/TechTrinity/);
      }
    }
  });

  test("every intent is on the contact allowlist", () => {
    for (const service of SERVICE_DETAILS) {
      expect(Object.keys(SERVICE_INTENTS)).toContain(service.intent);
    }
  });

  test("FAQ ids resolve to buyer FAQ entries", () => {
    const ids = BUYER_FAQ.map((f) => f.id);
    for (const service of SERVICE_DETAILS) {
      for (const id of service.faqIds ?? []) expect(ids).toContain(id);
      expect(getServiceFaqs(service)).toHaveLength(service.faqIds?.length ?? 0);
    }
  });
});

describe("pricing", () => {
  test("publishes no prices on any service (prices removed in #19)", () => {
    for (const service of SERVICE_DETAILS) {
      const copy = JSON.stringify(service);
      expect(copy).not.toMatch(/\$\d/);
      expect(service.meta.map((m) => m.label)).not.toContain("Starting at");
    }
  });

  test("no absolute scope or support guarantees remain", () => {
    const copy = JSON.stringify(SERVICE_DETAILS);
    expect(copy).not.toMatch(/no hourly surprises/i);
    expect(copy).not.toMatch(/no discovery phase to pay for/i);
    expect(copy).not.toMatch(/without paying for a full discovery/i);
    expect(copy).not.toMatch(/fixed price/i);
    expect(copy).not.toMatch(/every screen/i);
  });
});
