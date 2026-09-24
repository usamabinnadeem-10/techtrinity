import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetAnalyticsDedupe,
  sanitizeProps,
  trackEvent,
  trackOnce,
} from "./analytics";

describe("sanitizeProps", () => {
  it("keeps only allowlisted string props", () => {
    expect(
      sanitizeProps({ service: "mvp", name: "Jane", message: "hello", slug: 3 }),
    ).toEqual({ service: "mvp" });
  });

  it("drops values that look like emails or contain unsafe characters", () => {
    expect(
      sanitizeProps({ cta_label: "jane@example.com", slug: "a?b=c" }),
    ).toEqual({});
  });

  it("bounds value length", () => {
    expect(sanitizeProps({ slug: "x".repeat(200) }).slug).toHaveLength(64);
  });
});

describe("trackEvent / trackOnce", () => {
  const gtag = vi.fn();
  beforeEach(() => {
    window.gtag = gtag;
    __resetAnalyticsDedupe();
  });
  afterEach(() => {
    gtag.mockReset();
    delete window.gtag;
  });

  it("sends sanitized props to gtag", () => {
    trackEvent("cta_click", { cta_label: "Book", email: "a@b.co" });
    expect(gtag).toHaveBeenCalledWith("event", "cta_click", { cta_label: "Book" });
  });

  it("is a no-op without gtag", () => {
    delete window.gtag;
    expect(() => trackEvent("cta_click")).not.toThrow();
  });

  it("dedupes one-shot events by key", () => {
    trackOnce("service_view", "mvp", { slug: "mvp" });
    trackOnce("service_view", "mvp", { slug: "mvp" });
    trackOnce("service_view", "website", { slug: "website" });
    expect(gtag).toHaveBeenCalledTimes(2);
  });
});
