# Privacy & Cookie Policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `/privacy` copy with a real, comprehensive GDPR/UK-PECR-grade Privacy & Cookie Policy, and close the genuine compliance gap by consent-gating the Calendly embed on `/contact` so the policy is actually true of the running site.

**Architecture:** The stored consent record is broadened from one analytics category to two (`analytics` + `functional`), versioned-bumped so existing visitors are re-prompted once. A new `consent:changed` window event lets the Calendly embed react live. The embed becomes a consent-gated client component with a click-to-load fallback. The policy page is rebuilt from a single-sourced, typed cookie inventory plus small presentational section components (Approach A).

**Tech Stack:** Next.js 16.2.5 (App Router), React 19.2.4, TypeScript 5, Tailwind v4, `next/script`, `next/font`, Vitest 4 + Testing Library, Playwright 1.61.

## Global Constraints

Every task's requirements implicitly include this section. Copy exact values verbatim.

- **Framework:** Next.js **16.2.5** App Router — this is NOT the Next.js in your training data. Before changing any `next/script` or `app/layout.tsx` behaviour, read `node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md`. `beforeInteractive` scripts MUST stay in `app/layout.tsx` (already correct). React **19.2.4**.
- **Consent storage key:** `tt-cookie-consent` (unchanged). **`CONSENT_VERSION` bumps `1 → 2`** — the version-mismatch path already maps to "no decision", so v1 visitors are correctly re-prompted once.
- **Two stored categories:** `analytics` and `functional`. A single broadened consent sets **both** to the same value. Only `analytics_storage` is ever sent to gtag (Consent Mode has no Calendly signal); `functional` gates our own embed loading.
- **GA4:** measurement id `G-Z337R58187`. Ad signals (`ad_storage`, `ad_user_data`, `ad_personalization`) stay hardwired to `denied`. Do not change `consentInitScript`'s emitted gtag default beyond what the version bump implies.
- **Copy / single-sourcing:** "Last updated: **30 June 2026**". Controller name `TechTrinity` and contact `info@techtrinity.ai` MUST be imported from `lib/site.tsx` (`ORG_LEGAL_NAME`, `ORG_CONTACT_EMAIL`) — never re-hardcoded. Plain-language, GDPR + UK PECR posture.
- **Provider policy URLs (verified HTTP 200 on 2026-06-30):** Google `https://policies.google.com/privacy`; Calendly `https://calendly.com/legal/privacy-notice`; Resend `https://resend.com/legal/privacy-policy`; Vercel `https://vercel.com/legal/privacy-policy`.
- **Coding style:** Immutability — always construct new objects, never mutate. Many small focused files. No `console.log`. Consent reads/writes must never throw (private-mode / blocked storage → fall back gracefully).
- **Testing:** TDD (test first, watch it fail, implement, watch it pass, commit). Aggregate coverage threshold ≥80% (`vitest.config.ts` thresholds). Every new covered file gets added to the coverage `include` allowlist in the same task that tests it.
- **Git:** Conventional commits (`feat:`, `test:`, `refactor:`, `docs:`). Attribution is disabled globally — do NOT add `Co-Authored-By` trailers (matches existing project history). Commit at the end of every task.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `lib/consent.ts` (modify) | Two-category stored consent, v2, `consent:changed` event, `readFunctionalConsent` selector | 1 |
| `lib/consent.test.ts` (modify) | Unit tests for the v2 consent model | 1 |
| `components/analytics/cookie-consent-banner.tsx` (modify) | Broadened copy; still flips both categories via `writeConsent` | 2 |
| `components/analytics/cookie-consent-banner.test.tsx` (modify) | Tests for new copy + both-category writes | 2 |
| `components/contact/contact-calendly.tsx` (modify) | Consent-gated client embed with click-to-load fallback + live swap | 3 |
| `components/contact/contact-calendly.test.tsx` (create) | Tests for placeholder / granted / click / event paths | 3 |
| `lib/legal/cookie-inventory.ts` (create) | Typed, single-sourced cookie inventory data | 4 |
| `lib/legal/cookie-inventory.test.ts` (create) | Data-shape + GA-fact tests | 4 |
| `lib/legal/policy-meta.ts` (create) | Controller/contact/last-updated + named processors list | 4 |
| `lib/legal/policy-meta.test.ts` (create) | Single-sourcing + processor-link tests | 4 |
| `components/privacy/policy-header.tsx` (create) | `<h1>` + last-updated header | 5 |
| `components/privacy/policy-header.test.tsx` (create) | Header render test | 5 |
| `components/privacy/policy-section.tsx` (create) | `<h2>` + children section wrapper | 5 |
| `components/privacy/policy-section.test.tsx` (create) | Section render test | 5 |
| `components/privacy/cookie-table.tsx` (create) | Renders `COOKIE_INVENTORY` as a table | 5 |
| `components/privacy/cookie-table.test.tsx` (create) | Every-entry + columns test | 5 |
| `components/privacy/privacy-content.tsx` (modify) | Composes header + sections + processors table + `CookieTable` + `CookieSettingsLink` | 6 |
| `components/privacy/privacy-content.test.tsx` (modify) | Real-copy assertions | 6 |
| `e2e/cookie-consent.spec.ts` (modify) | Playwright Calendly consent-path tests | 7 |
| `vitest.config.ts` (modify) | Add new covered files to the `include` allowlist | 3, 4, 5 |

---

### Task 1: Broaden the consent model to two categories

**Files:**
- Modify: `lib/consent.ts`
- Test: `lib/consent.test.ts` (modify)

**Interfaces:**
- Consumes: nothing (foundation task).
- Produces:
  - `CONSENT_STORAGE_KEY: string` (`"tt-cookie-consent"`, unchanged), `CONSENT_VERSION: number` (now `2`), `COOKIE_OPEN_EVENT: string` (`"cookie:open"`, unchanged), `CONSENT_CHANGED_EVENT: string` (`"consent:changed"`, new).
  - `type ConsentValue = "granted" | "denied"`.
  - `type StoredConsent = { analytics: ConsentValue; functional: ConsentValue; version: number; timestamp: number }`.
  - `parseStoredConsent(raw: string | null): StoredConsent | null` — validates **both** `analytics` and `functional`.
  - `readConsent(): StoredConsent | null`.
  - `writeConsent(value: ConsentValue, now?: number): StoredConsent` — sets **both** categories to `value`, persists, dispatches `consent:changed`, returns the record.
  - `readFunctionalConsent(): ConsentValue | null` — selector returning the stored `functional` value or `null`.
  - `updateConsent(value: ConsentValue): void` — unchanged (only `analytics_storage`).
  - `consentInitScript(): string` — unchanged logic; version interpolation auto-updates to `2`.

- [ ] **Step 1: Replace the test file with the v2 test suite**

Overwrite `lib/consent.test.ts` with:

```ts
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
```

- [ ] **Step 2: Run the suite to verify it fails**

Run: `npm run test -- lib/consent.test.ts`
Expected: FAIL — `readFunctionalConsent`/`CONSENT_CHANGED_EVENT` are not exported yet; `CONSENT_VERSION` is still `1`; parse does not validate `functional`.

- [ ] **Step 3: Rewrite `lib/consent.ts` for the v2 model**

Overwrite `lib/consent.ts` with:

```ts
export const CONSENT_STORAGE_KEY = "tt-cookie-consent";
export const CONSENT_VERSION = 2;
export const COOKIE_OPEN_EVENT = "cookie:open";
export const CONSENT_CHANGED_EVENT = "consent:changed";

export type ConsentValue = "granted" | "denied";

export type StoredConsent = {
  analytics: ConsentValue;
  functional: ConsentValue;
  version: number;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isConsentValue(value: unknown): value is ConsentValue {
  return value === "granted" || value === "denied";
}

/**
 * Validate and parse a raw localStorage value into a StoredConsent.
 * Returns null for missing, corrupt, wrong-shape, or version-mismatched
 * data — all of which the caller treats as "no decision yet". A v1 record
 * (single `analytics` field, version 1) fails the version check and so
 * re-prompts the visitor once, which is correct: the consent scope changed.
 * Hand-rolled (no Zod) so the same rules can be mirrored by the inline init
 * script, which cannot import modules.
 */
export function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (!isConsentValue(parsed.analytics)) return null;
    if (!isConsentValue(parsed.functional)) return null;
    if (typeof parsed.timestamp !== "number") return null;
    return {
      analytics: parsed.analytics,
      functional: parsed.functional,
      version: parsed.version,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

/** Read the stored decision. Never throws (private mode / blocked storage → null). */
export function readConsent(): StoredConsent | null {
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Read just the functional (embedded-tools) decision, or null if undecided. */
export function readFunctionalConsent(): ConsentValue | null {
  return readConsent()?.functional ?? null;
}

/**
 * Persist a new decision immutably and return the record. A single broadened
 * consent sets BOTH categories to the same value. Dispatches `consent:changed`
 * so live embeds (the Calendly scheduler) can react without a reload. Never throws.
 */
export function writeConsent(value: ConsentValue, now: number = Date.now()): StoredConsent {
  const record: StoredConsent = {
    analytics: value,
    functional: value,
    version: CONSENT_VERSION,
    timestamp: now,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the in-memory decision still drives the UI this session.
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }));
  } catch {
    // Event dispatch unavailable — setState in callers still updates the live UI.
  }
  return record;
}

/** Flip the live GA consent state for analytics. No-op if gtag is not present. */
export function updateConsent(value: ConsentValue): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: value });
}

/**
 * Source for the beforeInteractive inline script. Runs before gtag.js: defines
 * dataLayer/gtag, then sets the consent DEFAULT from the stored choice. The
 * parse logic mirrors parseStoredConsent in plain JS because an inline browser
 * script cannot import this module; the storage key and version are interpolated
 * so the format stays single-sourced. Only `analytics` drives the gtag default —
 * Consent Mode has no Calendly/functional signal.
 */
export function consentInitScript(): string {
  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
window.gtag('js', new Date());
var stored = 'denied';
try {
  var raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
  if (raw) {
    var parsed = JSON.parse(raw);
    if (parsed && parsed.version === ${CONSENT_VERSION} && parsed.analytics === 'granted' && typeof parsed.timestamp === 'number') {
      stored = 'granted';
    }
  }
} catch (e) {}
window.gtag('consent', 'default', {
  analytics_storage: stored,
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
`.trim();
}
```

- [ ] **Step 4: Run the suite to verify it passes**

Run: `npm run test -- lib/consent.test.ts`
Expected: PASS (all describe blocks green).

- [ ] **Step 5: Commit**

```bash
git add lib/consent.ts lib/consent.test.ts
git commit -m "feat: broaden consent model to analytics + functional categories"
```

---

### Task 2: Broaden the consent banner copy

**Files:**
- Modify: `components/analytics/cookie-consent-banner.tsx`
- Test: `components/analytics/cookie-consent-banner.test.tsx` (modify)

**Interfaces:**
- Consumes from Task 1: `readConsent`, `writeConsent`, `updateConsent`, `ConsentValue`, `COOKIE_OPEN_EVENT`, `CONSENT_STORAGE_KEY`. `writeConsent` now sets both categories and dispatches `consent:changed` — the banner needs no new logic, only copy.
- Produces: unchanged export `CookieConsentBanner`.

- [ ] **Step 1: Update the banner test for the new copy and two-category writes**

Overwrite `components/analytics/cookie-consent-banner.test.tsx` with:

```tsx
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONSENT_STORAGE_KEY, COOKIE_OPEN_EVENT } from "@/lib/consent";
import { CookieConsentBanner } from "./cookie-consent-banner";

beforeEach(() => {
  localStorage.clear();
  (window as { gtag?: unknown }).gtag = vi.fn();
  window.dataLayer = [];
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows when no decision is stored", async () => {
  render(<CookieConsentBanner />);
  expect(await screen.findByRole("region", { name: /cookie/i })).toBeInTheDocument();
});

test("mentions analytics and embedded tools", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  expect(screen.getByText(/embedded tools/i)).toBeInTheDocument();
});

test("stays hidden when a v2 decision already exists", () => {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: "denied", functional: "denied", version: 2, timestamp: 1 }),
  );
  render(<CookieConsentBanner />);
  expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument();
});

test("Accept persists granted to both categories, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /accept/i }));

  const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
  expect(stored.analytics).toBe("granted");
  expect(stored.functional).toBe("granted");
  expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "granted",
  });
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument(),
  );
});

test("Reject persists denied to both categories, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /reject/i }));

  const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
  expect(stored.analytics).toBe("denied");
  expect(stored.functional).toBe("denied");
  expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "denied",
  });
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument(),
  );
});

test("reopens on the cookie:open event after a decision exists", async () => {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: "denied", functional: "denied", version: 2, timestamp: 1 }),
  );
  render(<CookieConsentBanner />);
  expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument();

  act(() => {
    window.dispatchEvent(new CustomEvent(COOKIE_OPEN_EVENT));
  });
  expect(await screen.findByRole("region", { name: /cookie/i })).toBeInTheDocument();
});

test("links to the privacy page", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
});
```

- [ ] **Step 2: Run the test to verify the new-copy test fails**

Run: `npm run test -- components/analytics/cookie-consent-banner.test.tsx`
Expected: FAIL — `mentions analytics and embedded tools` cannot find `/embedded tools/i` (current copy says analytics only).

- [ ] **Step 3: Broaden the banner copy**

In `components/analytics/cookie-consent-banner.tsx`, replace the two copy paragraphs (the `<p className="mt-3 ...">` heading line and the `<p className="mt-2 ...">` body) with:

```tsx
          <p className="mt-3 text-[15px] font-medium leading-snug text-foreground">
            Analytics and embedded tools stay off until you accept.
          </p>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted">
            We use cookies for analytics and for embedded tools like our Calendly
            scheduler — both stay off until you choose. Read more in our{"  "}
            <Link
              href="/privacy"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </p>
```

Leave everything else in the file unchanged — `decide()` already calls `writeConsent` (which now sets both categories and dispatches `consent:changed`) followed by `updateConsent`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- components/analytics/cookie-consent-banner.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/analytics/cookie-consent-banner.tsx components/analytics/cookie-consent-banner.test.tsx
git commit -m "feat: broaden consent banner copy to cover embedded tools"
```

---

### Task 3: Consent-gate the Calendly embed with a click-to-load fallback

**Files:**
- Modify: `components/contact/contact-calendly.tsx`
- Create: `components/contact/contact-calendly.test.tsx`
- Modify: `vitest.config.ts` (add the component to the coverage allowlist)

**Interfaces:**
- Consumes from Task 1: `readFunctionalConsent(): ConsentValue | null`, `CONSENT_CHANGED_EVENT: string`.
- Produces: unchanged export `ContactCalendly` (already imported by `app/contact/page.tsx:5`). When functional consent is granted (now, or after a `consent:changed` event), or when the visitor clicks the placeholder, the live widget (`.calendly-inline-widget` div + Calendly `widget.js`) renders. Otherwise a click-to-load placeholder button labelled "Load scheduler" renders. SSR-safe: placeholder renders on the server / first paint; the decision is made after mount.

- [ ] **Step 1: Write the failing test**

Create `components/contact/contact-calendly.test.tsx`:

```tsx
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONSENT_CHANGED_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";
import { ContactCalendly } from "./contact-calendly";

// Render next/script as an inert span so we can assert the widget script was
// requested without React's <script> hoisting moving it out of the container.
vi.mock("next/script", () => ({
  default: ({ src }: { src?: string }) =>
    src ? <span data-testid="calendly-script" data-src={src} /> : null,
}));

function seedConsent(value: "granted" | "denied") {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: value, functional: value, version: 2, timestamp: 1 }),
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows the click-to-load placeholder when functional consent is not granted", async () => {
  render(<ContactCalendly />);
  expect(await screen.findByRole("button", { name: /load scheduler/i })).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).toBeNull();
  expect(screen.queryByTestId("calendly-script")).not.toBeInTheDocument();
});

test("renders the live widget when functional consent is already granted", async () => {
  seedConsent("granted");
  render(<ContactCalendly />);
  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
  expect(screen.queryByRole("button", { name: /load scheduler/i })).not.toBeInTheDocument();
});

test("clicking the placeholder loads the widget for the session", async () => {
  render(<ContactCalendly />);
  await userEvent.click(await screen.findByRole("button", { name: /load scheduler/i }));
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
});

test("swaps placeholder for the live widget when consent:changed fires with functional granted", async () => {
  render(<ContactCalendly />);
  await screen.findByRole("button", { name: /load scheduler/i });

  seedConsent("granted");
  act(() => {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
  });

  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- components/contact/contact-calendly.test.tsx`
Expected: FAIL — the current component always renders the widget; there is no "Load scheduler" placeholder and it does not read consent.

- [ ] **Step 3: Rewrite the Calendly component as consent-gated**

Overwrite `components/contact/contact-calendly.tsx` with:

```tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGED_EVENT, readFunctionalConsent } from "@/lib/consent";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/techtrinity/discovery";

const EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=0f0f0f&text_color=ede9e1&primary_color=b8ff57`;

/**
 * Consent-gated Calendly embed. Renders a stable click-to-load placeholder on the
 * server and first paint (anti hydration-mismatch, mirroring the consent banner),
 * then after mount loads the live widget if functional consent is granted. The
 * visitor can also load it directly with one click — that click is per-use
 * consent. Accepting in the banner while on this page swaps the placeholder for
 * the live widget via the `consent:changed` event, no reload needed.
 */
export function ContactCalendly() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (readFunctionalConsent() === "granted") {
      setLoaded(true);
      return;
    }
    const onConsentChange = () => {
      if (readFunctionalConsent() === "granted") setLoaded(true);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChange);
  }, []);

  if (!loaded) {
    return (
      <div className="flex h-[640px] min-w-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
        <p className="max-w-[320px] text-[15px] font-light leading-[1.7] text-muted">
          The scheduler is off until you allow it. Loading it runs Calendly and
          sets its cookies.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-[22px] py-2.5 text-sm font-medium tracking-tight text-foreground transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Load scheduler
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          className="calendly-inline-widget"
          data-url={EMBED_URL}
          style={{ minWidth: "320px", height: "640px" }}
        />
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- components/contact/contact-calendly.test.tsx`
Expected: PASS (all four tests green).

- [ ] **Step 5: Add the component to the coverage allowlist**

In `vitest.config.ts`, add `"components/contact/contact-calendly.tsx",` to the `coverage.include` array (place it after the existing entries):

```ts
      include: [
        "lib/consent.ts",
        "components/analytics/consent-mode-init.tsx",
        "components/analytics/cookie-consent-banner.tsx",
        "components/analytics/cookie-settings-link.tsx",
        "components/contact/contact-calendly.tsx",
        "components/privacy/privacy-content.tsx",
        "components/home/button.tsx",
      ],
```

- [ ] **Step 6: Run the full unit suite with coverage to confirm thresholds hold**

Run: `npm run coverage`
Expected: PASS — all tests green and aggregate coverage ≥80%.

- [ ] **Step 7: Commit**

```bash
git add components/contact/contact-calendly.tsx components/contact/contact-calendly.test.tsx vitest.config.ts
git commit -m "feat: consent-gate Calendly embed with click-to-load fallback"
```

---

### Task 4: Legal data layer — cookie inventory and policy meta

**Files:**
- Create: `lib/legal/cookie-inventory.ts`
- Create: `lib/legal/cookie-inventory.test.ts`
- Create: `lib/legal/policy-meta.ts`
- Create: `lib/legal/policy-meta.test.ts`
- Modify: `vitest.config.ts` (add both data files to the coverage allowlist)

**Interfaces:**
- Consumes: `ORG_LEGAL_NAME`, `ORG_CONTACT_EMAIL` from `@/lib/site`.
- Produces:
  - `type CookieCategory = "necessary" | "analytics" | "functional"`.
  - `type CookieEntry = { name: string; provider: string; category: CookieCategory; purpose: string; type: "Cookie" | "Local storage" | "Third-party cookie"; duration: string; policyUrl?: string }`.
  - `COOKIE_INVENTORY: readonly CookieEntry[]` — four entries (order: `tt-cookie-consent`, `_ga`, `_ga_Z337R58187`, `Calendly cookies`).
  - `type Processor = { name: string; role: string; policyUrl: string }`.
  - `POLICY_META: { controllerName: string; contactEmail: string; lastUpdated: string }`.
  - `PROCESSORS: readonly Processor[]` — four entries (order: Google Analytics, Calendly, Resend, Vercel).

- [ ] **Step 1: Write the failing data tests**

Create `lib/legal/cookie-inventory.test.ts`:

```ts
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
```

Create `lib/legal/policy-meta.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- lib/legal`
Expected: FAIL — `lib/legal/cookie-inventory.ts` and `lib/legal/policy-meta.ts` do not exist yet.

- [ ] **Step 3: Create the cookie inventory data**

Create `lib/legal/cookie-inventory.ts`:

```ts
export type CookieCategory = "necessary" | "analytics" | "functional";

export type CookieEntry = {
  name: string; // e.g. "_ga" or "tt-cookie-consent"
  provider: string; // "Google", "Calendly", "TechTrinity (first-party)"
  category: CookieCategory;
  purpose: string;
  type: "Cookie" | "Local storage" | "Third-party cookie";
  duration: string; // human string, e.g. "2 years", "Until you clear it"
  policyUrl?: string; // provider policy link where relevant
};

/**
 * Ground-truth cookie / tracking surface, verified against the running site.
 * Single-sourced so the policy table is testable and cannot drift from reality.
 */
export const COOKIE_INVENTORY: readonly CookieEntry[] = [
  {
    name: "tt-cookie-consent",
    provider: "TechTrinity (first-party)",
    category: "necessary",
    purpose: "Remembers your cookie choice",
    type: "Local storage",
    duration: "Until you clear it",
  },
  {
    name: "_ga",
    provider: "Google",
    category: "analytics",
    purpose: "Tells visitors apart",
    type: "Cookie",
    duration: "2 years",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "_ga_Z337R58187",
    provider: "Google",
    category: "analytics",
    purpose: "Keeps GA4 session state",
    type: "Cookie",
    duration: "2 years",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Calendly cookies",
    provider: "Calendly",
    category: "functional",
    purpose: "Runs the embedded scheduler",
    type: "Third-party cookie",
    duration: "See Calendly's cookie policy",
    policyUrl: "https://calendly.com/legal/privacy-notice",
  },
];
```

- [ ] **Step 4: Create the policy meta data**

Create `lib/legal/policy-meta.ts`:

```ts
import { ORG_CONTACT_EMAIL, ORG_LEGAL_NAME } from "@/lib/site";

export type Processor = {
  name: string;
  role: string; // "What it does"
  policyUrl: string;
};

/**
 * Controller details and publish date. Name and email are single-sourced from
 * the site's organisation constants so the policy cannot disagree with structured
 * data elsewhere on the site.
 */
export const POLICY_META = {
  controllerName: ORG_LEGAL_NAME,
  contactEmail: ORG_CONTACT_EMAIL,
  lastUpdated: "30 June 2026",
} as const;

/** Named sub-processors, single-sourced for both the processors and cookie tables. */
export const PROCESSORS: readonly Processor[] = [
  {
    name: "Google Analytics",
    role: "Website analytics (only with consent)",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Calendly",
    role: "Embedded call scheduling (only when loaded)",
    policyUrl: "https://calendly.com/legal/privacy-notice",
  },
  {
    name: "Resend",
    role: "Delivers your enquiry to us by email",
    policyUrl: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Vercel",
    role: "Hosting and server logs",
    policyUrl: "https://vercel.com/legal/privacy-policy",
  },
];
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test -- lib/legal`
Expected: PASS.

- [ ] **Step 6: Add the data files to the coverage allowlist**

In `vitest.config.ts`, add these two lines to `coverage.include` (after the `lib/consent.ts` entry):

```ts
        "lib/legal/cookie-inventory.ts",
        "lib/legal/policy-meta.ts",
```

- [ ] **Step 7: Verify the provider policy links still resolve**

Run:
```bash
for u in \
  "https://policies.google.com/privacy" \
  "https://calendly.com/legal/privacy-notice" \
  "https://resend.com/legal/privacy-policy" \
  "https://vercel.com/legal/privacy-policy"; do \
  echo "$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 10 "$u")  $u"; done
```
Expected: each line begins with `200`. If any is not `200`, find the provider's current privacy/cookie policy URL and update it in both `cookie-inventory.ts` and `policy-meta.ts` before continuing.

- [ ] **Step 8: Commit**

```bash
git add lib/legal/cookie-inventory.ts lib/legal/cookie-inventory.test.ts lib/legal/policy-meta.ts lib/legal/policy-meta.test.ts vitest.config.ts
git commit -m "feat: add single-sourced cookie inventory and policy meta"
```

---

### Task 5: Presentational policy components

**Files:**
- Create: `components/privacy/policy-header.tsx`
- Create: `components/privacy/policy-header.test.tsx`
- Create: `components/privacy/policy-section.tsx`
- Create: `components/privacy/policy-section.test.tsx`
- Create: `components/privacy/cookie-table.tsx`
- Create: `components/privacy/cookie-table.test.tsx`
- Modify: `vitest.config.ts` (add the three components to the coverage allowlist)

**Interfaces:**
- Consumes from Task 4: `COOKIE_INVENTORY`, `type CookieCategory` from `@/lib/legal/cookie-inventory`.
- Produces:
  - `PolicyHeader(props: { title: string; lastUpdated: string })` — renders an `<h1>` and a "Last updated: …" line.
  - `PolicySection(props: { title: string; children: React.ReactNode })` — renders an `<h2>` and its children.
  - `CookieTable()` — renders `COOKIE_INVENTORY` as a `<table>` with columns Name, Provider, Category, Purpose, Type, Lasts.

- [ ] **Step 1: Write the failing tests**

Create `components/privacy/policy-header.test.tsx`:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PolicyHeader } from "./policy-header";

test("renders the title as an h1 and the last-updated date", () => {
  render(<PolicyHeader title="Privacy & Cookie Policy" lastUpdated="30 June 2026" />);
  expect(
    screen.getByRole("heading", { level: 1, name: /privacy & cookie policy/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/30 June 2026/)).toBeInTheDocument();
});
```

Create `components/privacy/policy-section.test.tsx`:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PolicySection } from "./policy-section";

test("renders an h2 heading and its children", () => {
  render(
    <PolicySection title="Your rights">
      <p>You can ask us to delete your data.</p>
    </PolicySection>,
  );
  expect(
    screen.getByRole("heading", { level: 2, name: /your rights/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/ask us to delete your data/i)).toBeInTheDocument();
});
```

Create `components/privacy/cookie-table.test.tsx`:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { COOKIE_INVENTORY } from "@/lib/legal/cookie-inventory";
import { CookieTable } from "./cookie-table";

test("renders every cookie inventory entry by name", () => {
  render(<CookieTable />);
  for (const entry of COOKIE_INVENTORY) {
    expect(screen.getByText(entry.name)).toBeInTheDocument();
  }
});

test("renders the required column headers", () => {
  render(<CookieTable />);
  for (const col of ["Name", "Provider", "Category", "Purpose", "Type", "Lasts"]) {
    expect(screen.getByRole("columnheader", { name: col })).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- components/privacy/policy-header.test.tsx components/privacy/policy-section.test.tsx components/privacy/cookie-table.test.tsx`
Expected: FAIL — none of the three components exist yet.

- [ ] **Step 3: Create `PolicyHeader`**

Create `components/privacy/policy-header.tsx`:

```tsx
/** Title + publish-date header for the privacy policy. Presentational. */
export function PolicyHeader({
  title,
  lastUpdated,
}: {
  title: string;
  lastUpdated: string;
}) {
  return (
    <header>
      <h1 className="font-display text-4xl font-bold tracking-[-0.03em]">{title}</h1>
      <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
    </header>
  );
}
```

- [ ] **Step 4: Create `PolicySection`**

Create `components/privacy/policy-section.tsx`:

```tsx
/** A titled policy section: an h2 followed by its body content. Presentational. */
export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-muted">
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `CookieTable`**

Create `components/privacy/cookie-table.tsx`:

```tsx
import { COOKIE_INVENTORY, type CookieCategory } from "@/lib/legal/cookie-inventory";

const COLUMNS = ["Name", "Provider", "Category", "Purpose", "Type", "Lasts"] as const;

const CATEGORY_LABEL: Record<CookieCategory, string> = {
  necessary: "Strictly necessary",
  analytics: "Analytics",
  functional: "Functional",
};

/** Renders the single-sourced cookie inventory as an accessible table. */
export function CookieTable() {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COOKIE_INVENTORY.map((entry) => (
            <tr key={entry.name} className="align-top">
              <td className="border-b border-border/60 px-3 py-2 font-mono text-foreground">
                {entry.name}
              </td>
              <td className="border-b border-border/60 px-3 py-2">
                {entry.policyUrl ? (
                  <a
                    href={entry.policyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {entry.provider}
                  </a>
                ) : (
                  entry.provider
                )}
              </td>
              <td className="border-b border-border/60 px-3 py-2">
                {CATEGORY_LABEL[entry.category]}
              </td>
              <td className="border-b border-border/60 px-3 py-2">{entry.purpose}</td>
              <td className="border-b border-border/60 px-3 py-2">{entry.type}</td>
              <td className="border-b border-border/60 px-3 py-2">{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run test -- components/privacy/policy-header.test.tsx components/privacy/policy-section.test.tsx components/privacy/cookie-table.test.tsx`
Expected: PASS.

- [ ] **Step 7: Add the three components to the coverage allowlist**

In `vitest.config.ts`, add these to `coverage.include` (next to the existing `components/privacy/privacy-content.tsx` entry):

```ts
        "components/privacy/policy-header.tsx",
        "components/privacy/policy-section.tsx",
        "components/privacy/cookie-table.tsx",
```

- [ ] **Step 8: Commit**

```bash
git add components/privacy/policy-header.tsx components/privacy/policy-header.test.tsx components/privacy/policy-section.tsx components/privacy/policy-section.test.tsx components/privacy/cookie-table.tsx components/privacy/cookie-table.test.tsx vitest.config.ts
git commit -m "feat: add presentational privacy policy components"
```

---

### Task 6: Compose the full privacy & cookie policy page

**Files:**
- Modify: `components/privacy/privacy-content.tsx`
- Test: `components/privacy/privacy-content.test.tsx` (modify)

**Interfaces:**
- Consumes: `PolicyHeader`, `PolicySection`, `CookieTable` (Task 5); `POLICY_META`, `PROCESSORS` (Task 4); existing `CookieSettingsLink` from `@/components/analytics/cookie-settings-link`.
- Produces: unchanged export `PrivacyContent` (already rendered by `app/privacy/page.tsx`). The `<h1>` text stays exactly "Privacy & Cookie Policy" (the E2E and banner-link tests depend on it).

- [ ] **Step 1: Update the test for the real policy copy**

Overwrite `components/privacy/privacy-content.test.tsx` with:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivacyContent } from "./privacy-content";

test("renders the policy heading", () => {
  render(<PrivacyContent />);
  expect(
    screen.getByRole("heading", { level: 1, name: /privacy & cookie policy/i }),
  ).toBeInTheDocument();
});

test("shows the last-updated date", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/30 June 2026/)).toBeInTheDocument();
});

test("discloses that analytics and the scheduler both stay off until consent", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/both stay off until you say yes/i)).toBeInTheDocument();
});

test("lists the GA and Calendly cookies in the inventory table", () => {
  render(<PrivacyContent />);
  expect(screen.getByText("_ga_Z337R58187")).toBeInTheDocument();
  expect(screen.getByText("Calendly cookies")).toBeInTheDocument();
});

test("names the data processors", () => {
  render(<PrivacyContent />);
  expect(screen.getAllByText(/resend/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/vercel/i).length).toBeGreaterThan(0);
});

test("affirms no advertising and no third-party fonts", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/no advertising cookies/i)).toBeInTheDocument();
  expect(screen.getByText(/no third-party fonts/i)).toBeInTheDocument();
});

test("lets the visitor reopen cookie settings", () => {
  render(<PrivacyContent />);
  expect(screen.getByRole("button", { name: /cookie settings/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- components/privacy/privacy-content.test.tsx`
Expected: FAIL — the placeholder copy has no last-updated date, no cookie table, no processors, and no "both stay off until you say yes" text.

- [ ] **Step 3: Rewrite `PrivacyContent` with the full policy**

Overwrite `components/privacy/privacy-content.tsx` with:

```tsx
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
import { CookieTable } from "@/components/privacy/cookie-table";
import { PolicyHeader } from "@/components/privacy/policy-header";
import { PolicySection } from "@/components/privacy/policy-section";
import { POLICY_META, PROCESSORS } from "@/lib/legal/policy-meta";

/**
 * Full GDPR / UK-PECR-grade privacy & cookie policy, plain-language voice.
 * Composes the data-driven cookie inventory and processors list so the page
 * cannot drift from the site's actual tracking surface.
 */
export function PrivacyContent() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24 md:px-12">
      <PolicyHeader title="Privacy & Cookie Policy" lastUpdated={POLICY_META.lastUpdated} />

      <PolicySection title="The short version">
        <p>
          We keep this simple. {POLICY_META.controllerName} uses one analytics tool
          (Google Analytics) and one embedded scheduler (Calendly), and both stay
          off until you say yes. We don&apos;t advertise to you, we don&apos;t sell
          your data, and we don&apos;t load tracking in the background. To change
          your mind anytime, use the <CookieSettingsLink /> link at the bottom of
          any page.
        </p>
      </PolicySection>

      <PolicySection title="Who we are">
        <p>
          This site is operated by <strong>{POLICY_META.controllerName}</strong>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;), the data controller for the
          information described here. Contact:{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          . Postal address available on request. A real person reads privacy email.
        </p>
      </PolicySection>

      <PolicySection title="What this policy covers">
        <p>
          How we handle your information when you visit this site, send an enquiry,
          or book a call. It does not cover third-party sites we link to (LinkedIn,
          GitHub), which have their own policies.
        </p>
      </PolicySection>

      <PolicySection title="Information we collect">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>When you contact us.</em> The contact form asks for your name,
            email, and a short message, plus optional details (company, role,
            business type, tools you use, urgency, and which workflow you want help
            with). On submit, that&apos;s sent to us as an email through our
            provider Resend, and used only to read and reply.
          </li>
          <li>
            <em>When you book a call.</em> Our scheduler Calendly collects what you
            enter to book (name, email, chosen time) on its own platform. The
            scheduler does not load until you allow it (see Cookies).
          </li>
          <li>
            <em>When you allow analytics.</em> Google Analytics collects anonymous
            usage info — pages viewed, rough location, device/browser — to show us
            what&apos;s useful. No name, no advertising.
          </li>
          <li>
            <em>Automatically, to run the site.</em> Our host Vercel processes
            standard technical info in server logs (IP, browser type) to serve
            pages securely. Normal for any website.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Why we're allowed to use it (legal basis)">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>Answering enquiries / scheduling</em> — legitimate interest in
            responding, and steps taken at your request before any agreement.
          </li>
          <li>
            <em>Analytics and the embedded scheduler</em> — your consent,
            withdrawable anytime.
          </li>
          <li>
            <em>Running and securing the site (server logs)</em> — legitimate
            interest in a safe, working website.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Who else processes your data">
        <p>
          We don&apos;t sell or rent your information. We share it only with the
          providers that make the site work, each acting on our behalf:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr>
                {["Provider", "What it does", "Policy"].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROCESSORS.map((processor) => (
                <tr key={processor.name} className="align-top">
                  <td className="border-b border-border/60 px-3 py-2 text-foreground">
                    {processor.name}
                  </td>
                  <td className="border-b border-border/60 px-3 py-2">
                    {processor.role}
                  </td>
                  <td className="border-b border-border/60 px-3 py-2">
                    <a
                      href={processor.policyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-primary"
                    >
                      Policy
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These providers are US-based. Where data is transferred there, it&apos;s
          protected by appropriate safeguards — the EU-US / UK Data Privacy
          Framework and/or Standard Contractual Clauses.
        </p>
      </PolicySection>

      <PolicySection title="How long we keep it">
        <p>
          We don&apos;t run our own database of visitor information. Enquiries you
          send us live as email in our inbox, and we keep them only as long as we
          need to respond and handle any follow-up, after which we delete them.
          Everything else — analytics, scheduling, hosting logs — is held by the
          providers above under their own retention periods.
        </p>
      </PolicySection>

      <PolicySection title="Your rights">
        <p>
          Depending on where you live (including the UK and EU under the GDPR), you
          can: access what we hold; ask us to correct or delete it; restrict or
          object to its use; request a copy to take elsewhere; withdraw consent for
          analytics or the scheduler anytime; and complain to a data protection
          authority (UK: the ICO; EU: your local authority). To exercise these,
          email{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          . To withdraw cookie consent, use <CookieSettingsLink /> — no email needed.
        </p>
      </PolicySection>

      <PolicySection title="Cookies & similar technologies">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>What they are.</em> Cookies are small files a site stores in your
            browser; some sites also use related storage (like &ldquo;local
            storage&rdquo;). We use as little as possible.
          </li>
          <li>
            <em>Off by default.</em> On arrival, nothing optional runs. Analytics
            and the Calendly scheduler are off until you choose. We use Google
            Consent Mode, so Google Analytics starts in a privacy-preserving mode
            and writes no analytics cookies unless you accept. Your choice is
            remembered under <code>tt-cookie-consent</code>.
          </li>
          <li>
            <em>Your choice, anytime.</em> The banner lets you Accept or Reject.
            Change it whenever via the <CookieSettingsLink /> link, or by clearing{" "}
            <code>tt-cookie-consent</code>.
          </li>
        </ul>

        <p className="font-medium text-foreground">The categories we use:</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Strictly necessary</strong> — your cookie choice itself, so we
            can honour it. No consent needed, because without it we couldn&apos;t
            remember that you said no.
          </li>
          <li>
            <strong>Analytics</strong> <em>(consent)</em> — Google Analytics. Only
            set after you accept.
          </li>
          <li>
            <strong>Functional / embedded tools</strong> <em>(consent)</em> — the
            Calendly scheduler on Contact. Loads (and sets Calendly&apos;s cookies)
            only after you accept, or when you click to load it directly.
          </li>
        </ul>

        <p className="font-medium text-foreground">The full list:</p>
        <CookieTable />

        <p className="font-medium text-foreground">
          What we deliberately don&apos;t do:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>No advertising cookies.</strong> Ad storage and ad
            personalisation are switched off in our setup, always.
          </li>
          <li>
            <strong>No third-party fonts loading.</strong> Fonts are built into the
            site itself, so Google never sees your visit and no font cookies are set.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Changes to this policy">
        <p>
          If we add a tool or change cookie use, we update this page and the
          &ldquo;Last updated&rdquo; date. Changes needing fresh consent reset the
          banner so you can choose again.
        </p>
      </PolicySection>

      <PolicySection title="Contact">
        <p>
          Questions about this policy or your data? Email{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          .
        </p>
      </PolicySection>
    </article>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- components/privacy/privacy-content.test.tsx`
Expected: PASS.

- [ ] **Step 5: Run the full unit suite with coverage**

Run: `npm run coverage`
Expected: PASS — all unit tests green, aggregate coverage ≥80%.

- [ ] **Step 6: Verify the page builds and lints**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build completes; `/privacy` and `/contact` compile without type errors.

- [ ] **Step 7: Commit**

```bash
git add components/privacy/privacy-content.tsx components/privacy/privacy-content.test.tsx
git commit -m "feat: render full privacy and cookie policy on /privacy"
```

---

### Task 7: Extend the E2E suite for the Calendly consent path

**Files:**
- Modify: `e2e/cookie-consent.spec.ts`

**Interfaces:**
- Consumes: the running app (Playwright `webServer` from `playwright.config`). On `/contact`, the consent-gated `ContactCalendly` renders a "Load scheduler" button when functional consent is not granted, and a `.calendly-inline-widget` container once loaded. The consent banner (root layout) shows for undecided visitors on every route. Note: `/contact` has no "Cookie settings" footer link, so re-consent on that page happens via the banner (while undecided) or the click-to-load placeholder — not a footer reopen.

- [ ] **Step 1: Append the Calendly E2E tests**

Add the following tests to the end of `e2e/cookie-consent.spec.ts` (after the existing `banner links to the privacy page` test):

```ts
test("contact: undecided visitor sees the click-to-load scheduler placeholder", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();
  await expect(page.locator(".calendly-inline-widget")).toHaveCount(0);
});

test("contact: clicking the placeholder loads the Calendly widget", async ({ page }) => {
  await page.goto("/contact");

  await page.getByRole("button", { name: /load scheduler/i }).click();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: accepting consent auto-loads the scheduler without a reload", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();

  await page.getByRole("button", { name: /accept/i }).click();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: returning accepted visitor gets the scheduler, no placeholder", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /accept/i }).click();
  await page.reload();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: rejected visitor keeps the placeholder and can still load per-use", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /reject/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();

  await page.getByRole("button", { name: /load scheduler/i }).click();
  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
});
```

- [ ] **Step 2: Run the E2E suite**

Run: `npm run test:e2e -- cookie-consent`
Expected: PASS — all existing tests plus the five new Calendly tests green. (The `.calendly-inline-widget` container is rendered by our own component, so these assertions hold even if Calendly's external script is blocked in the test network.)

- [ ] **Step 3: Commit**

```bash
git add e2e/cookie-consent.spec.ts
git commit -m "test: cover Calendly consent gating and click-to-load in E2E"
```

---

## Ship Gate: honesty / verification checklist (spec §10)

Run before considering the feature done. Each item must hold:

- [ ] **No advertising cookies** — `lib/consent.ts` `consentInitScript` sets `ad_storage`, `ad_user_data`, `ad_personalization` to `'denied'` (verify the literals are present and untouched by Task 1).
- [ ] **Fonts self-hosted, no Google font cookies** — `app/layout.tsx` still imports fonts via `next/font/google` (`Fraunces`, `Plus_Jakarta_Sans`, `DM_Mono`), which self-host at build. No change needed; confirm it's still true.
- [ ] **GA cookie names/durations** — `COOKIE_INVENTORY` lists `_ga` and `_ga_Z337R58187`, both `2 years`, category `analytics` (asserted by `lib/legal/cookie-inventory.test.ts`).
- [ ] **Calendly row links to a real policy** — the Calendly cookie row and processor row both point at `https://calendly.com/legal/privacy-notice` (verified 200 in Task 4 Step 7), not enumerated cookie names we can't verify.
- [ ] **Every processor policy link works** — re-run Task 4 Step 7's curl loop; every line begins with `200`.
- [ ] **Full unit + E2E green** — `npm run coverage` and `npm run test:e2e` both pass.

---

## Self-Review (performed against the spec)

**Spec coverage:**
- §3 Calendly handling (broaden → auto-load → click-to-load) → Tasks 1, 3.
- §3 single broadened consent modelled as two categories → Task 1.
- §3 Approach A (data-driven inventory + small components) → Tasks 4, 5, 6.
- §6 document copy → Task 6 (rendered verbatim from the draft).
- §7 data model (`cookie-inventory.ts`, `policy-meta.ts`) → Task 4.
- §8.1 consent.ts changes (v2, both categories, `consent:changed`, `readFunctionalConsent`, `updateConsent` unchanged, init script accepts v2) → Task 1.
- §8.2 banner copy → Task 2.
- §8.3 Calendly client component, consent-gated, click-to-load, `consent:changed` subscription, SSR-safe → Task 3.
- §8.4 content components → Tasks 5, 6.
- §9 testing strategy (consent, banner, calendly, cookie-table unit tests + E2E) → Tasks 1, 2, 3, 5, 7.
- §10 honesty checklist → Ship Gate section.
- §11 open items → defaults already baked into copy/data (postal address "on request", Vercel host, criteria-based retention, "TechTrinity" with no suffix). No code action; surfaced here for the review conversation.
- §12 out of scope (separate /cookies route, multi-toggle panel) → not built; single page, single broadened consent retained.

**Placeholder scan:** No TBD/TODO/"add error handling"/"similar to Task N" — every code step shows complete code; every test step shows full assertions.

**Type consistency:** `StoredConsent` carries `analytics` + `functional` everywhere; `writeConsent(value, now?)`, `readFunctionalConsent()`, `CONSENT_CHANGED_EVENT` are defined in Task 1 and consumed with identical names/signatures in Tasks 2, 3. `CookieEntry`/`CookieCategory`/`COOKIE_INVENTORY` and `Processor`/`POLICY_META`/`PROCESSORS` are defined in Task 4 and consumed with matching names in Tasks 5, 6. `PolicyHeader({title,lastUpdated})`, `PolicySection({title,children})`, `CookieTable()` are defined in Task 5 and called identically in Task 6. Coverage `include` is amended in the same task that adds each covered file (Tasks 3, 4, 5).
