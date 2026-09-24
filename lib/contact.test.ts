import { describe, expect, it } from "vitest";
import { SERVICE_INTENTS } from "@/lib/offer";
import {
  EMPTY_CONTACT,
  MAX_LENGTHS,
  SERVICE_OPTIONS,
  buildContactEmailHtml,
  buildContactEmailSubject,
  cleanAttributionValue,
  dropHiddenFields,
  parseContactBody,
  readAttribution,
  serviceFromQuery,
  showsOperationsFields,
  validateContact,
  type ContactPayload,
} from "./contact";

const valid: ContactPayload = {
  ...EMPTY_CONTACT,
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Our order handoffs are manual.",
};

describe("service options", () => {
  it("match the SERVICE_INTENTS allowlist exactly", () => {
    expect(new Set(Object.values(SERVICE_INTENTS))).toEqual(new Set(SERVICE_OPTIONS));
  });
});

describe("serviceFromQuery", () => {
  it("maps allowlisted slugs to form labels", () => {
    expect(serviceFromQuery("mvp")).toBe("MVP/product development");
    expect(serviceFromQuery("workflow-assessment")).toBe("Operations workflow");
    expect(serviceFromQuery("ai-automation")).toBe("AI automation");
    expect(serviceFromQuery(" Website ")).toBe("Website");
  });

  it("returns empty for invalid values", () => {
    expect(serviceFromQuery("hack<script>")).toBe("");
    expect(serviceFromQuery("MVP/product development")).toBe("");
    expect(serviceFromQuery("constructor")).toBe("");
    expect(serviceFromQuery("__proto__")).toBe("");
  });

  it("returns empty when missing", () => {
    expect(serviceFromQuery(null)).toBe("");
    expect(serviceFromQuery(undefined)).toBe("");
    expect(serviceFromQuery("")).toBe("");
  });
});

describe("progressive disclosure", () => {
  it("shows operations questions only for operations / undecided enquiries", () => {
    expect(showsOperationsFields("Operations workflow")).toBe(true);
    expect(showsOperationsFields("Not sure yet")).toBe(true);
    expect(showsOperationsFields("")).toBe(true);
    expect(showsOperationsFields("MVP/product development")).toBe(false);
    expect(showsOperationsFields("Website")).toBe(false);
  });

  it("drops hidden operations answers", () => {
    const out = dropHiddenFields({
      ...valid,
      service: "MVP/product development",
      focus: "Stock / inventory accuracy",
      businessType: "Wholesale / distribution",
      tools: "Excel",
    });
    expect(out.focus).toBe("");
    expect(out.businessType).toBe("");
    expect(out.tools).toBe("");
  });
});

describe("validateContact", () => {
  it("accepts a minimal valid payload (only name, email, message required)", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires name, email and message", () => {
    const errors = validateContact(EMPTY_CONTACT);
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("rejects malformed emails", () => {
    expect(validateContact({ ...valid, email: "nope" }).email).toBeDefined();
  });

  it("enforces length bounds", () => {
    const tooLong = (n: number) => "x".repeat(n + 1);
    const errors = validateContact({
      ...valid,
      name: tooLong(MAX_LENGTHS.name),
      email: `${tooLong(MAX_LENGTHS.email)}@example.com`,
      message: tooLong(MAX_LENGTHS.message),
      company: tooLong(MAX_LENGTHS.company),
      tools: tooLong(MAX_LENGTHS.tools),
    });
    expect(Object.keys(errors).sort()).toEqual([
      "company",
      "email",
      "message",
      "name",
      "tools",
    ]);
  });

  it("rejects a service outside the allowlist", () => {
    const bad = { ...valid, service: "Crypto" as ContactPayload["service"] };
    expect(validateContact(bad).service).toBeDefined();
  });
});

describe("parseContactBody (server)", () => {
  const body = {
    name: "Jane",
    email: "jane@example.com",
    message: "Hello",
  };

  it("accepts a legacy payload without the new fields", () => {
    const parsed = parseContactBody({ ...body, focus: "Order processing workflow" });
    expect(parsed).not.toBeNull();
    expect(parsed?.service).toBe("");
    expect(parsed?.focus).toBe("Order processing workflow");
  });

  it("rejects non-objects and missing required strings", () => {
    expect(parseContactBody(null)).toBeNull();
    expect(parseContactBody("x")).toBeNull();
    expect(parseContactBody([])).toBeNull();
    expect(parseContactBody({ name: "Jane", email: "a@b.co" })).toBeNull();
  });

  it("rejects unknown enum values", () => {
    expect(parseContactBody({ ...body, service: "Crypto" })).toBeNull();
    expect(parseContactBody({ ...body, focus: "Anything" })).toBeNull();
    expect(parseContactBody({ ...body, role: "CEO" })).toBeNull();
    expect(parseContactBody({ ...body, businessType: 1 })).toBeNull();
    expect(parseContactBody({ ...body, urgency: "Now!" })).toBeNull();
  });

  it("accepts allowlisted service labels", () => {
    for (const service of SERVICE_OPTIONS) {
      expect(parseContactBody({ ...body, service })?.service).toBe(service);
    }
  });

  it("clears operations fields for services that hide them", () => {
    const parsed = parseContactBody({
      ...body,
      service: "Website",
      focus: "Stock / inventory accuracy",
      businessType: "Other",
    });
    expect(parsed?.focus).toBe("");
    expect(parsed?.businessType).toBe("");
  });

  it("re-sanitizes attribution and drops invalid values", () => {
    const parsed = parseContactBody({
      ...body,
      utmSource: "  linkedin  ",
      utmMedium: "x".repeat(500),
      utmCampaign: "<script>alert(1)</script>",
      referrer: "https://evil.example/path?q=1",
    });
    expect(parsed?.utmSource).toBe("linkedin");
    expect(parsed?.utmMedium).toHaveLength(MAX_LENGTHS.attribution);
    expect(parsed?.utmCampaign).toBe("");
    expect(parsed?.referrer).toBe("");
  });

  it("feeds validateContact for length bounds", () => {
    const parsed = parseContactBody({ ...body, message: "x".repeat(6000) });
    expect(parsed && validateContact(parsed).message).toBeDefined();
  });
});

describe("attribution", () => {
  it("reads only allowlisted UTM keys and the external referrer host", () => {
    expect(
      readAttribution(
        "?utm_source=google&utm_medium=cpc&utm_campaign=q4&utm_term=secret&email=a@b.co",
        "https://www.google.com/search?q=private",
        "techtrinity.ai",
      ),
    ).toEqual({
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "q4",
      referrer: "www.google.com",
    });
  });

  it("ignores same-site and malformed referrers", () => {
    expect(readAttribution("", "https://techtrinity.ai/services", "techtrinity.ai").referrer).toBe("");
    expect(readAttribution("", "not a url", "techtrinity.ai").referrer).toBe("");
  });

  it("drops values that look like emails", () => {
    expect(cleanAttributionValue("jane@example.com")).toBe("");
  });
});

describe("email rendering", () => {
  it("includes service and attribution rows and escapes HTML", () => {
    const html = buildContactEmailHtml({
      ...valid,
      name: "<b>Jane</b>",
      service: "AI automation",
      utmSource: "linkedin",
      referrer: "www.linkedin.com",
    });
    expect(html).toContain("AI automation");
    expect(html).toContain("UTM source");
    expect(html).toContain("www.linkedin.com");
    expect(html).not.toContain("<b>Jane</b>");
  });

  it("builds a single-line subject with the service", () => {
    expect(
      buildContactEmailSubject({ ...valid, name: "Jane\r\nBcc: x", service: "Website" }),
    ).toBe("New enquiry from Jane Bcc: x — Website");
  });
});
