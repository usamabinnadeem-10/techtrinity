import { describe, expect, it } from "vitest";
import { BUYER_FAQ, FOUNDER_TITLE } from "./offer";
import {
  easyAccountsSchema,
  founderPersonSchema,
  homeFaqSchema,
  organizationSchema,
  PERSON_ID,
} from "./site";

describe("structured data", () => {
  it("keeps unverified figures out of JSON-LD", () => {
    const json = JSON.stringify([
      easyAccountsSchema(),
      founderPersonSchema(),
      organizationSchema(),
    ]);
    for (const figure of ["50+", "12+", "180,000", "10,000", "Series A"]) {
      expect(json).not.toContain(figure);
    }
  });

  it("attributes EasyAccounts to the founder, not the studio", () => {
    const schema = easyAccountsSchema();
    expect(schema.creator).toEqual({ "@id": PERSON_ID });
    expect(String(schema.description)).not.toMatch(/built by TechTrinity/i);
  });

  it("uses the canonical founder title", () => {
    expect(founderPersonSchema().jobTitle).toBe(FOUNDER_TITLE);
  });

  it("includes every visible buyer FAQ in the homepage FAQPage", () => {
    const names = (homeFaqSchema().mainEntity as { name: string }[]).map(
      (q) => q.name,
    );
    for (const item of BUYER_FAQ) expect(names).toContain(item.question);
    expect(names).toContain("Does TechTrinity work with Laravel?");
  });
});
