import { describe, expect, test } from "vitest";
import { BUYER_FAQ, SERVICE_INTENTS, UNPRICED_SERVICE_COPY } from "@/lib/offer";
import {
  getAllServiceSlugs,
  getServiceDetail,
  getServiceFaqs,
  getServicesByTier,
  getStartingPriceUSD,
  isMonthlyPrice,
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
  test("preserves the published starting prices", () => {
    expect(getStartingPriceUSD(getServiceDetail("product-sprint")!)).toBe(20000);
    expect(getStartingPriceUSD(getServiceDetail("build-only")!)).toBe(12000);
    expect(getStartingPriceUSD(getServiceDetail("growth-retainer")!)).toBe(4500);
    expect(isMonthlyPrice(getServiceDetail("growth-retainer")!)).toBe(true);
    expect(getStartingPriceUSD(getServiceDetail("technical-audit")!)).toBe(1500);
  });

  test("preserves payment terms", () => {
    const lines = (slug: string) => getServiceDetail(slug)!.priceDetail.join(" ");
    expect(lines("product-sprint")).toContain("50% to start, 50% on delivery.");
    expect(lines("build-only")).toContain("50% to start, 50% on delivery.");
    expect(lines("growth-retainer")).toContain("Invoiced monthly, in advance.");
    expect(lines("technical-audit")).toContain("Paid in full upfront");
  });

  test("unpriced services emit no offer price", () => {
    for (const slug of [
      "workflow-assessment",
      "ai-workflow-automation",
      "mvp-development",
      "business-websites",
    ]) {
      const service = getServiceDetail(slug)!;
      expect(getStartingPriceUSD(service)).toBeNull();
      expect(service.card.price).toBe(UNPRICED_SERVICE_COPY);
      expect(service.priceDetail).toContain(UNPRICED_SERVICE_COPY);
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
