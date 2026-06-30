import { describe, expect, test } from "vitest";
import { COOKIE_INVENTORY } from "./cookie-inventory";

describe("COOKIE_INVENTORY", () => {
  test("lists the four disclosed entries in order", () => {
    expect(COOKIE_INVENTORY.map((e) => e.name)).toEqual([
      "tt-cookie-consent",
      "_ga",
      "_ga_Z337R58187",
      "Calendly cookies",
    ]);
  });

  test("every entry has valid required fields", () => {
    for (const entry of COOKIE_INVENTORY) {
      expect(entry.name).toBeTruthy();
      expect(entry.provider).toBeTruthy();
      expect(["necessary", "analytics", "functional"]).toContain(entry.category);
      expect(entry.purpose).toBeTruthy();
      expect(["Cookie", "Local storage", "Third-party cookie"]).toContain(entry.type);
      expect(entry.duration).toBeTruthy();
    }
  });

  test("GA cookie names and durations match GA4 behaviour", () => {
    const ga = COOKIE_INVENTORY.find((e) => e.name === "_ga");
    const gaSession = COOKIE_INVENTORY.find((e) => e.name === "_ga_Z337R58187");
    expect(ga?.category).toBe("analytics");
    expect(ga?.duration).toBe("2 years");
    expect(gaSession?.category).toBe("analytics");
    expect(gaSession?.duration).toBe("2 years");
  });

  test("the consent record is strictly necessary local storage", () => {
    const consent = COOKIE_INVENTORY.find((e) => e.name === "tt-cookie-consent");
    expect(consent?.category).toBe("necessary");
    expect(consent?.type).toBe("Local storage");
  });
});
