# Cookie Consent + Google Consent Mode v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a non-blocking cookie-consent banner wired to Google Consent Mode v2 so no analytics cookies are stored until a visitor accepts, with a returning visitor's choice honored on first byte.

**Architecture:** A `beforeInteractive` inline script sets the GA consent **default** (analytics denied unless a stored `granted` choice exists) before gtag.js loads. gtag.js stays `lazyOnload` and only runs `config`. A client banner reads/writes the choice in `localStorage`, fires `gtag('consent','update', …)`, and reopens via a `window` `CustomEvent`. All consent logic lives in a small, pure, unit-tested `lib/consent.ts`.

**Tech Stack:** Next.js 16.2.5 (App Router), React 19.2.4, Tailwind v4, TypeScript, gtag.js. Tests: Vitest + React Testing Library + jsdom (unit/component), Playwright (E2E). Package manager: **pnpm**.

## Global Constraints

Every task implicitly includes these. Exact values copied from the spec — do not paraphrase.

- **Package manager:** `pnpm` (repo has `pnpm-lock.yaml`). Use `pnpm` in every command.
- **GA measurement ID:** `G-Z337R58187` (kept hardcoded — moving it to an env var is explicitly out of scope).
- **localStorage key:** `tt-cookie-consent`.
- **Consent version:** `1` (a stored `version` that is not `1` is treated as "no decision").
- **Stored shape:** `{ "analytics": "granted" | "denied", "version": 1, "timestamp": <epoch ms> }`.
- **Reopen event name:** `cookie:open` (a `window` `CustomEvent`).
- **Consent default payload (every load):** `analytics_storage` = `granted` only if stored choice is `granted`, else `denied`; `ad_storage`, `ad_user_data`, `ad_personalization` always `denied`.
- **Consent update payload (on click):** Accept → `gtag('consent','update',{ analytics_storage: 'granted' })`; Reject → `{ analytics_storage: 'denied' }`.
- **No new runtime dependencies.** Validation is hand-rolled (no Zod) so it can be mirrored verbatim by the inline `beforeInteractive` script, which cannot import modules.
- **Immutability:** helpers return new objects; never mutate inputs.
- **File size:** keep files focused, well under 800 lines (all files here are small).
- **TDD:** write the failing test first, watch it fail, implement minimally, watch it pass, commit.
- **Coverage:** ≥80% on the feature's testable units (scoped via `vitest.config.mts` `coverage.include`).
- **`beforeInteractive` placement:** per Next.js 16 App Router, `beforeInteractive` scripts MUST live in `app/layout.tsx`. Next injects them into `<head>` regardless of JSX position and runs them before first-party code.

---

## File Structure

**New files:**
- `lib/consent.ts` — constants, types, pure parse/read/write helpers, the `gtag` update helper, and `consentInitScript()` (the inline-script source). The unit-tested core.
- `lib/consent.test.ts` — unit tests for `lib/consent.ts`.
- `components/analytics/consent-mode-init.tsx` — server component rendering the `beforeInteractive` `<Script>` whose body is `consentInitScript()`.
- `components/analytics/cookie-consent-banner.tsx` — `"use client"` bottom-fixed bar (Accept/Reject), visibility driven by `localStorage`, reopens on `cookie:open`.
- `components/analytics/cookie-consent-banner.test.tsx` — component tests for the banner.
- `components/analytics/cookie-settings-link.tsx` — `"use client"` button that dispatches the `cookie:open` event.
- `components/analytics/cookie-settings-link.test.tsx` — component test for the link.
- `components/privacy/privacy-content.tsx` — pure server component holding the privacy/cookie policy copy (router-free so it is unit-testable).
- `components/privacy/privacy-content.test.tsx` — component test for the copy.
- `app/privacy/page.tsx` — privacy route: metadata + page composition (nav/content/footer).
- `app/privacy/page.test.tsx` — test for the page's exported `metadata`.
- `components/home/button.test.tsx` — test for the new `Button` export.
- `components/home/site-footer.test.tsx` — test that the footer renders "Cookie settings".
- `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts` — test infrastructure.
- `e2e/cookie-consent.spec.ts` — Playwright end-to-end flow.

**Modified files:**
- `components/home/button.tsx` — add a `Button` (real `<button>`) export reusing the existing `base`/`variants`/`sizes`.
- `components/analytics/google-analytics.tsx` — keep gtag.js `lazyOnload` + `config`; stop owning consent/bootstrap (idempotent guard only).
- `app/layout.tsx` — render `<ConsentModeInit />` early and `<CookieConsentBanner />` in the body.
- `components/home/site-footer.tsx` — add a "Cookie settings" entry using `CookieSettingsLink`.
- `package.json` — add `test`, `test:watch`, `test:e2e`, `coverage` scripts and dev dependencies.
- `.gitignore` — ignore Playwright output dirs.

---

## Task 1: Test Infrastructure

**Files:**
- Create: `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts`
- Create: `__smoke__/smoke.test.ts` (temporary, deleted at end of task)
- Modify: `package.json` (scripts + dev deps), `.gitignore`

**Interfaces:**
- Produces: `pnpm test` (Vitest, jsdom, `@testing-library/jest-dom` matchers, `cleanup` after each test), `pnpm test:watch`, `pnpm coverage` (v8, scoped include), `pnpm test:e2e` (Playwright). All later tasks consume these.

- [ ] **Step 1: Install dev dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths @vitest/coverage-v8 @playwright/test
```

- [ ] **Step 2: Install the Playwright Chromium browser**

```bash
pnpm exec playwright install chromium
```

- [ ] **Step 3: Create `vitest.config.mts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e/**"],
    coverage: {
      provider: "v8",
      include: [
        "lib/consent.ts",
        "components/analytics/consent-mode-init.tsx",
        "components/analytics/cookie-consent-banner.tsx",
        "components/analytics/cookie-settings-link.tsx",
        "components/privacy/privacy-content.tsx",
        "components/home/button.tsx",
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

- [ ] **Step 5: Create `playwright.config.ts`**

The webServer runs `pnpm dev` and reuses an already-running dev server. Consent behavior is identical in dev and prod, and all E2E assertions read `window.dataLayer` / `localStorage` (populated by our own code) rather than depending on Google's network responses.

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 6: Add scripts to `package.json`**

Add these to the `"scripts"` object (alongside the existing `dev`/`build`/`start`/`lint`):

```json
    "test": "vitest run",
    "test:watch": "vitest",
    "coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
```

- [ ] **Step 7: Ignore Playwright output in `.gitignore`**

Add these lines to `.gitignore`:

```gitignore
/test-results
/playwright-report
/playwright/.cache
```

- [ ] **Step 8: Write a temporary smoke test**

Create `__smoke__/smoke.test.ts`:

```ts
import { expect, test } from "vitest";

test("vitest runs", () => {
  expect(1 + 1).toBe(2);
});
```

- [ ] **Step 9: Run the smoke test to verify the toolchain**

Run: `pnpm test`
Expected: PASS — `1 passed` for `__smoke__/smoke.test.ts`.

- [ ] **Step 10: Delete the smoke test**

```bash
rm -r __smoke__
```

- [ ] **Step 11: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.mts vitest.setup.ts playwright.config.ts .gitignore
git commit -m "test: add Vitest, RTL, and Playwright infrastructure"
```

---

## Task 2: Consent Core Helpers (`lib/consent.ts`)

**Files:**
- Create: `lib/consent.ts`
- Test: `lib/consent.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `CONSENT_STORAGE_KEY: "tt-cookie-consent"`, `CONSENT_VERSION: 1`, `COOKIE_OPEN_EVENT: "cookie:open"`
  - `type ConsentValue = "granted" | "denied"`
  - `type StoredConsent = { analytics: ConsentValue; version: number; timestamp: number }`
  - `parseStoredConsent(raw: string | null): StoredConsent | null`
  - `readConsent(): StoredConsent | null`
  - `writeConsent(value: ConsentValue, now?: number): StoredConsent`
  - `updateConsent(value: ConsentValue): void`
  - `consentInitScript(): string`
  - global augmentation: `Window.dataLayer?: unknown[]`, `Window.gtag?: (...args: unknown[]) => void`

- [ ] **Step 1: Write the failing tests**

Create `lib/consent.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  COOKIE_OPEN_EVENT,
  consentInitScript,
  parseStoredConsent,
  readConsent,
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
    expect(CONSENT_VERSION).toBe(1);
    expect(COOKIE_OPEN_EVENT).toBe("cookie:open");
  });
});

describe("parseStoredConsent", () => {
  test("returns null for null input", () => {
    expect(parseStoredConsent(null)).toBeNull();
  });

  test("returns null for corrupt JSON", () => {
    expect(parseStoredConsent("{not json")).toBeNull();
  });

  test("returns null on version mismatch", () => {
    const raw = JSON.stringify({ analytics: "granted", version: 99, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("returns null when analytics value is invalid", () => {
    const raw = JSON.stringify({ analytics: "maybe", version: 1, timestamp: 1 });
    expect(parseStoredConsent(raw)).toBeNull();
  });

  test("parses a valid granted record", () => {
    const raw = JSON.stringify({ analytics: "granted", version: 1, timestamp: 42 });
    expect(parseStoredConsent(raw)).toEqual({
      analytics: "granted",
      version: 1,
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
      JSON.stringify({ analytics: "denied", version: 1, timestamp: 7 }),
    );
    expect(readConsent()).toEqual({ analytics: "denied", version: 1, timestamp: 7 });
  });

  test("returns null (never throws) when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readConsent()).toBeNull();
  });
});

describe("writeConsent", () => {
  test("persists an immutable record and returns it", () => {
    const result = writeConsent("granted", 123);
    expect(result).toEqual({ analytics: "granted", version: 1, timestamp: 123 });
    expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!)).toEqual(result);
  });

  test("does not throw when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => writeConsent("denied", 1)).not.toThrow();
  });
});

describe("updateConsent", () => {
  test("calls gtag with the analytics_storage update", () => {
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

  test("defaults analytics_storage to granted when stored choice is granted", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "granted", version: 1, timestamp: 1 }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("granted");
  });

  test("falls back to denied on version mismatch", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "granted", version: 99, timestamp: 1 }),
    );
    run(consentInitScript());
    expect(consentDefault().analytics_storage).toBe("denied");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test lib/consent.test.ts`
Expected: FAIL — `Failed to resolve import "./consent"` (module does not exist yet).

- [ ] **Step 3: Implement `lib/consent.ts`**

```ts
export const CONSENT_STORAGE_KEY = "tt-cookie-consent";
export const CONSENT_VERSION = 1;
export const COOKIE_OPEN_EVENT = "cookie:open";

export type ConsentValue = "granted" | "denied";

export type StoredConsent = {
  analytics: ConsentValue;
  version: number;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Validate and parse a raw localStorage value into a StoredConsent.
 * Returns null for missing, corrupt, wrong-shape, or version-mismatched
 * data — all of which the caller treats as "no decision yet". Hand-rolled
 * (no Zod) so the same rules can be mirrored by the inline init script,
 * which cannot import modules.
 */
export function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    if (typeof parsed.timestamp !== "number") return null;
    return {
      analytics: parsed.analytics,
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

/** Persist a new decision immutably and return the record. Never throws. */
export function writeConsent(value: ConsentValue, now: number = Date.now()): StoredConsent {
  const record: StoredConsent = {
    analytics: value,
    version: CONSENT_VERSION,
    timestamp: now,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the in-memory decision still drives the UI this session.
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
 * so the format stays single-sourced.
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
    if (parsed && parsed.version === ${CONSENT_VERSION} && parsed.analytics === 'granted') {
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

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test lib/consent.test.ts`
Expected: PASS — all `lib/consent.test.ts` tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/consent.ts lib/consent.test.ts
git commit -m "feat: add consent storage helpers and init-script source"
```

---

## Task 3: ConsentModeInit Component

**Files:**
- Create: `components/analytics/consent-mode-init.tsx`

**Interfaces:**
- Consumes: `consentInitScript()` from `lib/consent.ts`.
- Produces: `export function ConsentModeInit(): JSX.Element` — renders a `beforeInteractive` inline `<Script id="consent-mode-init">`.

> The default-state and version-mismatch logic shipped by this component is fully unit-tested in Task 2 via `consentInitScript()`. This component is a thin `next/script` wrapper; rendering `next/script` outside the Next runtime is unreliable in jsdom, so its wiring is verified by the Playwright E2E in Task 10 rather than a brittle render test.

- [ ] **Step 1: Create the component**

```tsx
import Script from "next/script";
import { consentInitScript } from "@/lib/consent";

/**
 * Sets the Google Consent Mode v2 DEFAULT before gtag.js runs. Uses
 * `beforeInteractive` so it is injected into <head> and executed ahead of any
 * first-party code or the deferred analytics tag. Per Next.js App Router rules
 * this must be rendered from `app/layout.tsx`.
 */
export function ConsentModeInit() {
  return (
    <Script id="consent-mode-init" strategy="beforeInteractive">
      {consentInitScript()}
    </Script>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `pnpm exec tsc --noEmit`
Expected: PASS — no type errors.

- [ ] **Step 3: Commit**

```bash
git add components/analytics/consent-mode-init.tsx
git commit -m "feat: add ConsentModeInit beforeInteractive script component"
```

---

## Task 4: Add `Button` to the Button Component

**Files:**
- Modify: `components/home/button.tsx`
- Test: `components/home/button.test.tsx`

**Interfaces:**
- Consumes: existing module-scoped `base`, `variants`, `sizes`, `cn` in `components/home/button.tsx`.
- Produces: `export function Button(props)` rendering a real `<button>` reusing the shared styles.
  - Props: `{ variant?: "accent" | "ghost"; size?: "md" | "lg"; className?: string; children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void }`.

- [ ] **Step 1: Write the failing test**

Create `components/home/button.test.tsx`:

```tsx
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

test("renders a real button element with accent styles", () => {
  render(<Button>Accept</Button>);
  const button = screen.getByRole("button", { name: "Accept" });
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveClass("bg-primary");
});

test("fires onClick when pressed", async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Reject</Button>);
  await userEvent.click(screen.getByRole("button", { name: "Reject" }));
  expect(onClick).toHaveBeenCalledOnce();
});

test("applies the ghost variant border style", () => {
  render(
    <Button variant="ghost">Settings</Button>,
  );
  expect(screen.getByRole("button", { name: "Settings" })).toHaveClass("border");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test components/home/button.test.tsx`
Expected: FAIL — `"Button" is not exported by "components/home/button.tsx"`.

- [ ] **Step 3: Add the `Button` export**

In `components/home/button.tsx`, add the following after the existing `LinkButton` function (it reuses the already-defined `base`, `variants`, `sizes`, and the imported `cn`):

```tsx
type ButtonProps = CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  type = "button",
  variant = "accent",
  size = "md",
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test components/home/button.test.tsx`
Expected: PASS — all three tests green.

- [ ] **Step 5: Commit**

```bash
git add components/home/button.tsx components/home/button.test.tsx
git commit -m "feat: add Button (clickable) variant reusing shared button styles"
```

---

## Task 5: Cookie Consent Banner

**Files:**
- Create: `components/analytics/cookie-consent-banner.tsx`
- Test: `components/analytics/cookie-consent-banner.test.tsx`

**Interfaces:**
- Consumes: `readConsent`, `writeConsent`, `updateConsent`, `COOKIE_OPEN_EVENT` from `lib/consent.ts`; `Button` from `components/home/button.tsx`; `Link` from `next/link`.
- Produces: `export function CookieConsentBanner(): JSX.Element | null`.

- [ ] **Step 1: Write the failing tests**

Create `components/analytics/cookie-consent-banner.test.tsx`:

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

test("stays hidden when a decision already exists", () => {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: "denied", version: 1, timestamp: 1 }),
  );
  render(<CookieConsentBanner />);
  expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument();
});

test("Accept persists granted, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /accept/i }));

  expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).analytics).toBe("granted");
  expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "granted",
  });
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument(),
  );
});

test("Reject persists denied, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /reject/i }));

  expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).analytics).toBe("denied");
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
    JSON.stringify({ analytics: "denied", version: 1, timestamp: 1 }),
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

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test components/analytics/cookie-consent-banner.test.tsx`
Expected: FAIL — cannot resolve `./cookie-consent-banner`.

- [ ] **Step 3: Implement the banner**

Create `components/analytics/cookie-consent-banner.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/home/button";
import {
  COOKIE_OPEN_EVENT,
  readConsent,
  updateConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Non-blocking bottom bar. Renders nothing on the server and decides visibility
 * after mount (avoids hydration mismatch). Visible only when no decision exists,
 * and reopenable via the `cookie:open` window event.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_OPEN_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_OPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    writeConsent(value);
    updateConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="max-w-[640px] text-[13px] leading-[1.6] text-muted-foreground">
          We use cookies to understand how visitors use our site. Analytics stays
          off until you accept. See our{" "}
          <Link href="/privacy" className="text-foreground underline underline-offset-2">
            Privacy &amp; Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" onClick={() => decide("denied")}>
            Reject
          </Button>
          <Button variant="accent" onClick={() => decide("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test components/analytics/cookie-consent-banner.test.tsx`
Expected: PASS — all banner tests green.

- [ ] **Step 5: Commit**

```bash
git add components/analytics/cookie-consent-banner.tsx components/analytics/cookie-consent-banner.test.tsx
git commit -m "feat: add non-blocking cookie consent banner"
```

---

## Task 6: Cookie Settings Link

**Files:**
- Create: `components/analytics/cookie-settings-link.tsx`
- Test: `components/analytics/cookie-settings-link.test.tsx`

**Interfaces:**
- Consumes: `COOKIE_OPEN_EVENT` from `lib/consent.ts`.
- Produces: `export function CookieSettingsLink(): JSX.Element` — a `<button>` that dispatches the `cookie:open` window event. Styled to match footer links.

- [ ] **Step 1: Write the failing test**

Create `components/analytics/cookie-settings-link.test.tsx`:

```tsx
import { afterEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COOKIE_OPEN_EVENT } from "@/lib/consent";
import { CookieSettingsLink } from "./cookie-settings-link";

afterEach(() => {
  vi.restoreAllMocks();
});

test("dispatches the cookie:open event when clicked", async () => {
  const listener = vi.fn();
  window.addEventListener(COOKIE_OPEN_EVENT, listener);

  render(<CookieSettingsLink />);
  await userEvent.click(screen.getByRole("button", { name: /cookie settings/i }));

  expect(listener).toHaveBeenCalledOnce();
  window.removeEventListener(COOKIE_OPEN_EVENT, listener);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test components/analytics/cookie-settings-link.test.tsx`
Expected: FAIL — cannot resolve `./cookie-settings-link`.

- [ ] **Step 3: Implement the link**

Create `components/analytics/cookie-settings-link.tsx`:

```tsx
"use client";

import { COOKIE_OPEN_EVENT } from "@/lib/consent";

/**
 * Tiny client leaf that reopens the consent banner. Lets the surrounding footer
 * stay a server component — only this control needs the browser event.
 */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_OPEN_EVENT))}
      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test components/analytics/cookie-settings-link.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/analytics/cookie-settings-link.tsx components/analytics/cookie-settings-link.test.tsx
git commit -m "feat: add cookie settings reopen link"
```

---

## Task 7: Add "Cookie settings" to the Site Footer

**Files:**
- Modify: `components/home/site-footer.tsx`
- Test: `components/home/site-footer.test.tsx`

**Interfaces:**
- Consumes: `CookieSettingsLink` from `components/analytics/cookie-settings-link.tsx`.
- Produces: footer markup containing the "Cookie settings" control alongside the existing links.

- [ ] **Step 1: Write the failing test**

Create `components/home/site-footer.test.tsx`:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

test("renders the existing navigation links", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
});

test("renders a Cookie settings control", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("button", { name: /cookie settings/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test components/home/site-footer.test.tsx`
Expected: FAIL — no element with name "Cookie settings".

- [ ] **Step 3: Add the import**

In `components/home/site-footer.tsx`, add this import below the existing `import Link from "next/link";`:

```tsx
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
```

- [ ] **Step 4: Render the link inside the footer list**

In `components/home/site-footer.tsx`, replace the closing of the `<ul>` mapping block so the list ends with a "Cookie settings" item. Change:

```tsx
            ))}
          </ul>
```

to:

```tsx
            ))}
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test components/home/site-footer.test.tsx`
Expected: PASS — both tests green.

- [ ] **Step 6: Commit**

```bash
git add components/home/site-footer.tsx components/home/site-footer.test.tsx
git commit -m "feat: add Cookie settings link to site footer"
```

---

## Task 8: Privacy / Cookie Policy Page

**Files:**
- Create: `components/privacy/privacy-content.tsx`
- Create: `app/privacy/page.tsx`
- Test: `components/privacy/privacy-content.test.tsx`, `app/privacy/page.test.tsx`

**Interfaces:**
- Consumes: `CookieSettingsLink` from `components/analytics/cookie-settings-link.tsx`; `SiteNav` (`@/components/home/nav`), `AmbientBackground` (`@/components/home/background`), `RevealController` (`@/components/home/reveal-controller`), `SiteFooter` (`@/components/home/site-footer`), `JsonLd` + `breadcrumbSchema` (`@/lib/site`).
- Produces: `export function PrivacyContent(): JSX.Element` (router-free, unit-testable copy block); `app/privacy/page.tsx` default export + `export const metadata`.

> `PrivacyContent` is split out from the route so the copy is testable without a router context (the page itself pulls in `SiteNav`, which uses `usePathname`). The full page render is exercised by the Task 10 E2E.

- [ ] **Step 1: Write the failing tests**

Create `components/privacy/privacy-content.test.tsx`:

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

test("explains the cookie/analytics behavior", () => {
  render(<PrivacyContent />);
  expect(screen.getByRole("heading", { name: /cookies/i })).toBeInTheDocument();
  expect(screen.getByText(/analytics/i)).toBeInTheDocument();
});

test("lets the visitor reopen cookie settings", () => {
  render(<PrivacyContent />);
  expect(screen.getByRole("button", { name: /cookie settings/i })).toBeInTheDocument();
});
```

Create `app/privacy/page.test.tsx`:

```tsx
import { expect, test } from "vitest";
import { metadata } from "./page";

test("exposes privacy metadata with a canonical path", () => {
  expect(metadata.title).toBe("Privacy & Cookie Policy");
  expect(metadata.alternates?.canonical).toBe("/privacy");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test components/privacy/privacy-content.test.tsx app/privacy/page.test.tsx`
Expected: FAIL — cannot resolve `./privacy-content` and `./page`.

- [ ] **Step 3: Implement `PrivacyContent`**

Create `components/privacy/privacy-content.tsx`:

```tsx
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";

/**
 * Scaffolded privacy / cookie policy copy. Placeholder wording for the site
 * owner to refine later; the structure and the cookie-settings control are real.
 */
export function PrivacyContent() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24 md:px-12">
      <h1 className="font-display text-4xl font-bold tracking-[-0.03em]">
        Privacy &amp; Cookie Policy
      </h1>
      <p className="mt-6 text-[15px] leading-[1.7] text-muted-foreground">
        This page describes how TechTrinity handles your information. This is
        placeholder copy to be refined by the site owner.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold tracking-[-0.02em]">
        Cookies &amp; Analytics
      </h2>
      <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
        We use Google Analytics to understand how visitors use our site. Analytics
        cookies are not stored until you accept them. Until you choose, analytics
        runs in a cookieless, anonymous mode and no analytics cookies are written.
      </p>
      <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
        You can change your choice at any time:{" "}
        <CookieSettingsLink />.
      </p>
    </article>
  );
}
```

- [ ] **Step 4: Implement the route**

Create `app/privacy/page.tsx`:

```tsx
import type { Metadata } from "next";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { PrivacyContent } from "@/components/privacy/privacy-content";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "How TechTrinity handles your information, including how we use cookies and Google Analytics consent.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Cookie Policy — TechTrinity",
    description:
      "How TechTrinity handles your information, including cookies and analytics consent.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy & Cookie Policy", path: "/privacy" },
        ])}
      />
      <AmbientBackground />
      <SiteNav />
      <main>
        <PrivacyContent />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test components/privacy/privacy-content.test.tsx app/privacy/page.test.tsx`
Expected: PASS — all four tests green.

- [ ] **Step 6: Commit**

```bash
git add components/privacy/privacy-content.tsx components/privacy/privacy-content.test.tsx app/privacy/page.tsx app/privacy/page.test.tsx
git commit -m "feat: add privacy and cookie policy page"
```

---

## Task 9: Wire Layout + Slim Down Google Analytics

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/analytics/google-analytics.tsx`

**Interfaces:**
- Consumes: `ConsentModeInit` (Task 3), `CookieConsentBanner` (Task 5).
- Produces: a layout where the consent default is set `beforeInteractive` and the banner renders in the body; a GA component that no longer owns consent or the gtag bootstrap.

> This task wires `next/script` components and the root layout — neither is reliably unit-testable in jsdom. Its deliverable is a clean production build (`pnpm build`), and its runtime behavior is verified by the Task 10 E2E.

- [ ] **Step 1: Slim down `components/analytics/google-analytics.tsx`**

Replace the entire file with:

```tsx
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-Z337R58187";

/**
 * Loads gtag.js (`lazyOnload`) and runs `config`. Consent state and the
 * dataLayer/gtag bootstrap are owned by `ConsentModeInit`, which runs
 * `beforeInteractive` (so the consent DEFAULT is set before this tag loads).
 * The guard below is idempotent and never resets consent — it only protects
 * against `ConsentModeInit` being absent.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
```

- [ ] **Step 2: Add the consent imports to `app/layout.tsx`**

In `app/layout.tsx`, add these imports immediately after the existing `import { GoogleAnalytics } from "@/components/analytics/google-analytics";` line:

```tsx
import { ConsentModeInit } from "@/components/analytics/consent-mode-init";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
```

- [ ] **Step 3: Render the consent components in the body**

In `app/layout.tsx`, replace the existing body block:

```tsx
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={[organizationSchema(), websiteSchema(), founderPersonSchema()]}
        />
        {children}
        <GoogleAnalytics />
      </body>
```

with:

```tsx
      <body className="min-h-full flex flex-col">
        <ConsentModeInit />
        <JsonLd
          data={[organizationSchema(), websiteSchema(), founderPersonSchema()]}
        />
        {children}
        <CookieConsentBanner />
        <GoogleAnalytics />
      </body>
```

- [ ] **Step 4: Verify the production build succeeds**

Run: `pnpm build`
Expected: PASS — build completes with no type or compile errors, and `/privacy` appears in the route list.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/analytics/google-analytics.tsx
git commit -m "feat: wire consent mode init and banner into layout"
```

---

## Task 10: End-to-End Flow + Coverage Gate

**Files:**
- Create: `e2e/cookie-consent.spec.ts`

**Interfaces:**
- Consumes: the running app (banner, footer link, consent default, gtag update) from all prior tasks.
- Produces: a Playwright spec proving the full consent contract; a coverage run confirming ≥80% on feature units.

> Assertions read `window.dataLayer` and `localStorage` (populated by our own `beforeInteractive` script and the banner) plus banner visibility — all deterministic and independent of Google's network responses. `dataLayer` entries are `arguments` objects, so they are normalized with `Array.from` before matching.

- [ ] **Step 1: Write the E2E spec**

Create `e2e/cookie-consent.spec.ts`:

```ts
import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "tt-cookie-consent";

/** Normalize dataLayer arguments-objects to arrays and return the consent default payload. */
async function consentDefault(page: Page) {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const calls = layer.map((entry) => Array.from(entry as ArrayLike<unknown>));
    const found = calls.find((c) => c[0] === "consent" && c[1] === "default");
    return (found?.[2] ?? null) as Record<string, string> | null;
  });
}

async function consentUpdates(page: Page) {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const calls = layer.map((entry) => Array.from(entry as ArrayLike<unknown>));
    return calls
      .filter((c) => c[0] === "consent" && c[1] === "update")
      .map((c) => c[2] as Record<string, string>);
  });
}

test("new visitor: banner shows, default denied, no analytics cookie", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeVisible();
  expect(await consentDefault(page)).toMatchObject({ analytics_storage: "denied" });

  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name.startsWith("_ga"))).toBeUndefined();
});

test("Accept stores granted, fires consent update, and hides the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /accept/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();

  const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(JSON.parse(stored!).analytics).toBe("granted");
  expect(await consentUpdates(page)).toContainEqual({ analytics_storage: "granted" });
});

test("returning accepted visitor: default granted on first byte, no banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /accept/i }).click();
  await page.reload();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  expect(await consentDefault(page)).toMatchObject({ analytics_storage: "granted" });
});

test("Reject keeps analytics off and hides the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /reject/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(JSON.parse(stored!).analytics).toBe("denied");
  expect(await consentUpdates(page)).toContainEqual({ analytics_storage: "denied" });

  await page.reload();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
});

test("footer Cookie settings reopens the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /reject/i }).click();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();

  await page.getByRole("button", { name: /cookie settings/i }).click();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeVisible();
});

test("banner links to the privacy page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("region", { name: /cookie consent/i })
    .getByRole("link", { name: /privacy/i })
    .click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1, name: /privacy & cookie policy/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the E2E suite**

Run: `pnpm test:e2e`
Expected: PASS — Playwright boots the dev server and all six tests pass.

- [ ] **Step 3: Run the full unit/component suite**

Run: `pnpm test`
Expected: PASS — every `*.test.{ts,tsx}` green.

- [ ] **Step 4: Verify coverage meets the 80% bar**

Run: `pnpm coverage`
Expected: PASS — no threshold failures; the scoped feature files report ≥80% lines/functions/branches/statements.

- [ ] **Step 5: Commit**

```bash
git add e2e/cookie-consent.spec.ts
git commit -m "test: add end-to-end cookie consent flow"
```

---

## Self-Review

**Spec coverage:**
- §3 Consent Mode v2, denied default → Task 2 (`consentInitScript`), Task 3 (`ConsentModeInit`), Task 9 (layout wiring). ✓
- §3 non-blocking bottom bar → Task 5 (fixed bottom bar, returns null, no focus trap). ✓
- §4 read stored choice + set default before GA; Accept/Reject update → Task 2 (`consentInitScript`, `updateConsent`), Task 5 (banner). ✓
- §4 default delivered `beforeInteractive`, gtag.js `lazyOnload` → Task 3 + Task 9. ✓
- §5 new files (`lib/consent.ts`, `consent-mode-init`, `cookie-consent-banner`, `cookie-settings-link`, `app/privacy/page.tsx`) → Tasks 2, 3, 5, 6, 8. ✓
- §5 modified files (`google-analytics.tsx`, `layout.tsx`, `site-footer.tsx`) → Tasks 9, 9, 7. ✓
- §5 inter-component `cookie:open` CustomEvent → `COOKIE_OPEN_EVENT` (Task 2), dispatched (Task 6), listened (Task 5). ✓
- §6 storage model + version re-prompt → Task 2 (`StoredConsent`, version check). ✓
- §7 hydration (render nothing on server, decide in `useEffect`) → Task 5. ✓
- §7 localStorage unavailable wrapped in try/catch → Task 2 (`readConsent`/`writeConsent`), tested. ✓
- §7 accessibility (`role="region"`, `aria-label`, keyboard, focus rings) → Task 5 (region + label; Accept/Reject are real `<button>`s with the shared `focus-visible:ring` styles from Task 4). ✓
- §8 unit/component/E2E tests → Tasks 2, 4, 5, 6, 8, 10. ✓
- §9 out-of-scope respected (single analytics category, no geo, no CMP, GA id stays hardcoded). ✓
- §10 success criteria → Task 10 E2E covers all six. ✓

**Placeholder scan:** No "TBD"/"add error handling"/"similar to Task N"; every code step shows complete code. Privacy copy is intentionally placeholder *content* (per spec §5: "Legal wording to be refined later by the site owner") but the components/structure are fully specified.

**Type consistency:** `ConsentValue`, `StoredConsent`, `CONSENT_STORAGE_KEY`, `CONSENT_VERSION`, `COOKIE_OPEN_EVENT`, `parseStoredConsent`, `readConsent`, `writeConsent(value, now?)`, `updateConsent(value)`, `consentInitScript()` are defined in Task 2 and consumed with identical names/signatures in Tasks 3, 5, 6. `Button` props (Task 4) match the banner's usage (Task 5). `breadcrumbSchema([{name, path}])` matches the existing `lib/site.tsx` signature.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-29-cookie-consent.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
