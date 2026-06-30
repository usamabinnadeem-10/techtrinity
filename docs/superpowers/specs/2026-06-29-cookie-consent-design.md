# Cookie Consent + Google Analytics — Design

**Date:** 2026-06-29
**Status:** Approved (pending implementation plan)
**Author:** Brainstormed with Claude

## 1. Goal

Add a cookie-consent mechanism to the TechTrinity site and wire it to the
existing Google Analytics integration so that no analytics cookies are stored
until a visitor consents. The work is driven by best-practice / future-proofing
(not a hard legal deadline), with an unknown visitor geography, so the design
defaults to the safe (consent-denied) state for everyone and is ready for
GDPR and Google Ads should those needs arise.

## 2. Current State

- Next.js 16 (App Router), React 19, Tailwind v4, Sanity CMS.
- Google Analytics (gtag.js, ID `G-Z337R58187`) is loaded unconditionally on
  every route via `components/analytics/google-analytics.tsx`, rendered from
  `app/layout.tsx`. There is no consent gate: GA fires and can drop cookies on
  first paint for all visitors.
- No privacy or cookie policy page exists.
- Footers: `components/home/site-footer.tsx` (a simple link list) and
  `components/contact/contact-footer.tsx`.

## 3. Chosen Approach: Google Consent Mode v2 (denied by default)

Evaluated three approaches:

| Approach | Behavior | Verdict |
|---|---|---|
| A. Hard gate (opt-in) | Don't load gtag.js until "Accept." | Safe, but loses all data from non-deciders and cannot feed Google Ads. Rejected. |
| **B. Consent Mode v2** | Always load GA, default consent to **denied** (anonymous, cookieless modeling pings, no cookies stored); flip to **granted** on Accept. | **Chosen.** Safe-by-default, no cookies pre-consent, retains modeled data, future-proof for EU + Google Ads. Google's official pattern. |
| C. Opt-out | GA on by default, banner lets visitor disable. | Not defensible if EU traffic appears. Rejected. |

Because consent already defaults to denied, the banner is **non-blocking** — a
bottom bar, not a modal. The visitor can browse the site while deciding; we do
not freeze the page.

## 4. Consent ↔ GA Data Flow

On every page load, **before** GA processes any hit:

1. Read the stored choice from `localStorage`.
2. Set the consent **default** based on the stored value:
   ```js
   gtag('consent', 'default', {
     analytics_storage:  <stored === 'granted' ? 'granted' : 'denied'>,
     ad_storage:         'denied',
     ad_user_data:       'denied',
     ad_personalization: 'denied',
   });
   ```
3. Load gtag.js (deferred) and run `gtag('config', 'G-Z337R58187')`.

When the visitor acts in the banner:

- **Accept** → persist `'granted'` → `gtag('consent', 'update', { analytics_storage: 'granted' })`
- **Reject** → persist `'denied'`  → `gtag('consent', 'update', { analytics_storage: 'denied' })`

Resulting behavior:

- **New visitor:** denied by default → GA sends anonymous, cookieless pings, no
  cookies stored → banner shows. On Accept, full tracking and cookies begin.
- **Returning (accepted):** default is granted from the first byte → full
  tracking immediately, no banner.
- **Returning (rejected):** default denied, no banner, but reopenable via the
  footer "Cookie settings" link.

The consent **default** must execute before GA processes hits. It is delivered
via an early (`beforeInteractive`) inline script; gtag.js itself can remain
deferred (`lazyOnload`) for performance, since it loads after the default is
already set.

## 5. Components & Files

### New

- **`lib/consent.ts`** — Types, constants (storage key `tt-cookie-consent`,
  consent `version`), pure read/write/parse helpers, and the `gtag` consent
  update helper. Small and unit-testable. No mutation; helpers return new
  objects.
- **`components/analytics/consent-mode-init.tsx`** — Early `beforeInteractive`
  inline script that defines `window.dataLayer`/`gtag`, reads `localStorage`,
  and sets the consent **default**. Runs before GA.
- **`components/analytics/cookie-consent-banner.tsx`** — `"use client"`
  bottom-fixed bar. Accept / Reject buttons reusing the existing `Button`
  styles, short explanatory copy, and a link to `/privacy`. Renders only when
  no decision exists; listens for a reopen `CustomEvent`.
- **`components/analytics/cookie-settings-link.tsx`** — Tiny `"use client"`
  link/button that dispatches the reopen `CustomEvent` (keeps the
  server-rendered footer server-rendered).
- **`app/privacy/page.tsx`** — Scaffolded privacy / cookie policy page with
  placeholder copy and route metadata. Legal wording to be refined later by the
  site owner.

### Modified

- **`components/analytics/google-analytics.tsx`** — Continue loading gtag.js
  (`lazyOnload`) and running `gtag('config', ...)`, but stop owning consent
  state; correctness now depends on `ConsentModeInit` having run first.
- **`app/layout.tsx`** — Render `<ConsentModeInit />` early and
  `<CookieConsentBanner />` in the body.
- **`components/home/site-footer.tsx`** — Add a "Cookie settings" entry using
  `CookieSettingsLink`.

### Inter-component communication

Footer link ↔ banner communicate via a single `window` `CustomEvent`
(`cookie:open`). The banner adds an event listener; the link dispatches. No
global state library is introduced.

## 6. Storage Model

`localStorage` key `tt-cookie-consent` holding:

```json
{ "analytics": "granted" | "denied", "version": 1, "timestamp": <epoch ms> }
```

- `version` lets the site force a re-prompt later if the policy materially
  changes (bump the constant; a mismatch is treated as "no decision").
- `localStorage` (not a cookie) is sufficient because consent is read
  client-side only — there is no SSR dependency on the value.

## 7. Edge Cases & Accessibility

- **Hydration:** the banner renders nothing on the server and decides
  visibility in `useEffect` after mount, avoiding a hydration mismatch.
- **`localStorage` unavailable** (private mode / blocked): treated as "no
  decision" → default denied → banner shown. All storage access is wrapped in
  try/catch and never throws.
- **Accessibility:** banner uses `role="region"` with an `aria-label`, is fully
  keyboard-operable, and shows visible focus rings matching existing focus
  styles. It is not a focus trap (non-blocking).

## 8. Testing Strategy

Target the project's 80% coverage bar; follow TDD.

- **Unit (`lib/consent.ts`):** parse/validate stored value, default-state
  logic, version mismatch handling, corrupt/missing storage, update-helper
  payload shape.
- **Component:** banner shows when no decision exists, hides after
  Accept/Reject, reopens on the `cookie:open` event; Accept fires a `consent`
  `update` with `analytics_storage: 'granted'`, Reject with `'denied'`.
- **E2E (Playwright):** no GA cookie present before consent → Accept sets it →
  Reject keeps it off → footer "Cookie settings" link reopens the banner.

## 9. Out of Scope (YAGNI)

Deliberately excluded; easy to add later if needs change:

- Granular per-category consent toggles (only one analytics category exists
  today).
- Geo-detection / region-specific banner behavior.
- A hosted CMP (Cookiebot, Osano, etc.).
- Moving the GA measurement ID into an environment variable.

## 10. Success Criteria

- No analytics cookies are stored for a new visitor until they click Accept.
- Reject keeps analytics off and stores no analytics cookies.
- A returning visitor's choice is honored on first byte (no banner re-shown
  unless `version` changed).
- Visitors can change their decision at any time via the footer link.
- The `/privacy` page exists and the banner links to it.
- GA continues to function (full tracking) once consent is granted.
