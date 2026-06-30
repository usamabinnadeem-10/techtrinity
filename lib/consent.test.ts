import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  COOKIE_OPEN_EVENT,
  consentInitScript,
  parseStoredConsent,
  readConsent,
  readFunctionalConsent,
  updateConsent,
  writeConsent,
  type StoredConsent,
} from "./consent";

beforeEach(() => {
  localStorage.clear();
  window.dataLayer = [];
  delete (window as { gtag?: unknown }).gtag;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("constants", () => {
  test("expose the agreed values", () => {
    expect(CONSENT_STORAGE_KEY).toBe("tt-cookie-consent");
    expect(CONSENT_VERSION).toBe(2);
    expect(COOKIE_OPEN_EVENT).toBe("cookie:open");
    expect(CONSENT_CHANGED_EVENT).toBe("consent:changed");
  });
});

describe("parseStoredConsent", () => {
  test("returns null for null input", () => {
    expect(parseStoredConsent(null)).toBeNull();
  });

  test("returns null for corrupt JSON", () => {
    expect(parseStoredConsent("{not json")).toBeNull();
  });

  test("returns null for a v1 record (re-prompts existing visitors)", () => {
    const raw = JSON.stringify({ analytics: "granted", version: 1, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("returns null when functional is missing", () => {
    const raw = JSON.stringify({ analytics: "granted", version: 2, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("returns null when analytics value is invalid", () => {
    const raw = JSON.stringify({ analytics: "maybe", functional: "granted", version: 2, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("returns null when functional value is invalid", () => {
    const raw = JSON.stringify({ analytics: "granted", functional: "maybe", version: 2, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("parses a valid two-category record", () => {
    const raw = JSON.stringify({ analytics: "granted", functional: "denied", version: 2, timestamp: 42 });
    expect(parseStoredConsent(raw)).toEqual({
      analytics: "granted",
      functional: "denied",
      version: 2,
      timestamp: 42,
    } satisfies StoredConsent);
  });
});

describe("readConsent", () => {
  test("returns null when nothing is stored", () => {
    expect(readConsent()).toBeNull();
  });

  test("returns the stored decision", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "denied", functional: "denied", version: 2, timestamp: 7 }),
    );
    expect(readConsent()).toEqual({
      analytics: "denied",
      functional: "denied",
      version: 2,
      timestamp: 7,
    });
  });

  test("returns null (never throws) when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readConsent()).toBeNull();
  });
});

describe("writeConsent", () => {
  test("persists an immutable record with both categories set", () => {
    const result = writeConsent("granted", 123);
    expect(result).toEqual({ analytics: "granted", functional: "granted", version: 2, timestamp: 123 });
    expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!)).toEqual(result);
  });

  test("sets both categories to denied on reject", () => {
    const result = writeConsent("denied", 1);
    expect(result.analytics).toBe("denied");
    expect(result.functional).toBe("denied");
  });

  test("dispatches a consent:changed event on write", () => {
    const handler = vi.fn();
    window.addEventListener(CONSENT_CHANGED_EVENT, handler);
    writeConsent("granted", 1);
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener(CONSENT_CHANGED_EVENT, handler);
  });

  test("does not throw when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => writeConsent("denied", 1)).not.toThrow();
  });
});

describe("readFunctionalConsent", () => {
  test("returns null when nothing is stored", () => {
    expect(readFunctionalConsent()).toBeNull();
  });

  test("returns the stored functional value", () => {
    writeConsent("granted", 1);
    expect(readFunctionalConsent()).toBe("granted");
  });
});

describe("updateConsent", () => {
  test("calls gtag with only the analytics_storage update", () => {
    const gtag = vi.fn();
    (window as { gtag?: typeof gtag }).gtag = gtag;
    updateConsent("granted");
    expect(gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    });
  });

  test("does not throw when gtag is undefined", () => {
    expect(() => updateConsent("denied")).not.toThrow();
  });
});

describe("consentInitScript", () => {
  function run(script: string) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function(script)();
  }
  function consentDefault() {
    const calls = (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>));
    return calls.find((c) => c[0] === "consent" && c[1] === "default")?.[2] as Record<string, string>;
  }

  test("defaults analytics_storage to denied for a new visitor", () => {
    run(consentInitScript());
    expect(consentDefault()).toEqual({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  test("defaults analytics_storage to granted when stored v2 choice is granted", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "granted", functional: "granted", version: 2, timestamp: 1 }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("granted");
  });

  test("falls back to denied for a v1 record (version mismatch)", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "granted", version: 1, timestamp: 1 }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("denied");
  });

  test("falls back to denied when timestamp is not a number", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "granted", functional: "granted", version: 2, timestamp: "x" }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("denied");
  });

  test("defaults analytics_storage to denied when stored choice is denied", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "denied", functional: "denied", version: 2, timestamp: 1 }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("denied");
  });
});
