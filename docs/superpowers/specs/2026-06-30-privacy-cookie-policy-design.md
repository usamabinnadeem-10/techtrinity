# Privacy & Cookie Policy — Design Spec

**Date:** 2026-06-30
**Branch:** `feat/cookie-consent`
**Status:** Approved design, ready for implementation planning

---

## 1. Goal

Replace the placeholder copy on `/privacy` with a real, **comprehensive, GDPR/UK-grade Privacy & Cookie Policy written in plain language**, and close the one genuine compliance gap (the Calendly embed loading before consent) so that the policy is actually *true* of the running site.

This is **docs + a small code change**, not docs alone.

## 2. Why this is needed

The current `/privacy` page is scaffolded placeholder text. It also under-discloses: it mentions Google Analytics only, and omits the Calendly embed and the consent record. Meanwhile the Calendly widget on `/contact` loads its script and can set third-party cookies **regardless of consent** — under a GDPR/PECR-grade posture that is a real gap.

## 3. Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Legal posture | **GDPR + UK PECR grade**, plain-language voice | Superset that covers CCPA/etc. for a site this simple; matches the Consent Mode v2 machinery already built; downside of under-complying is asymmetric |
| Scope | **Full Privacy + Cookie policy** on the existing `/privacy` page | Whole page becomes real, not just the cookie section |
| Calendly handling | **Broaden consent → auto-load when granted → click-to-load fallback** | Accepted visitors get a seamless scheduler; rejected/undecided visitors can still book via a one-click load (that click is per-use consent) |
| Consent granularity | **Single broadened consent** (Accept = analytics + embeds together), modelled as two stored categories | Simplest correct option for one analytics tool + one embed; reject-users keep the scheduler via click-to-load, so nobody is locked out; two-field shape leaves room for granular later without redesigning the banner |
| Content structure | **Approach A — data-driven cookie inventory + small section components** | Cookie table is the heart of "comprehensive"; keeping it as typed data makes it single-sourced, testable, and matches the project's many-small-files / data-driven conventions |
| Retention | **Criteria-based statement, no fixed schedule** | TechTrinity runs no own datastore; only first-party data is enquiry email in the inbox; GDPR Art. 13 allows criteria instead of a fixed period |

## 4. Controller / entity details

| Field | Value |
|---|---|
| Controller / legal name | **TechTrinity** (`ORG_LEGAL_NAME`) |
| Privacy contact | **info@techtrinity.ai** (`ORG_CONTACT_EMAIL`) |
| Postal address | Omitted — stated as "available on request" |
| "Last updated" date | Set at publish time (currently 2026-06-30) |
| Supervisory authority | UK: ICO; EU: visitor's local authority |

## 5. Actual cookie / tracking surface (ground truth)

Verified against the code, so the policy is truthful rather than boilerplate:

- **Google Analytics 4** (`G-Z337R58187`), loaded `lazyOnload` via gtag.js with **Consent Mode v2**. `analytics_storage` defaults to **denied**; `_ga` / `_ga_*` are written only after Accept. `ad_storage`, `ad_user_data`, `ad_personalization` are hardwired to **denied** (no advertising).
- **Consent record** in `localStorage` under `tt-cookie-consent` (strictly necessary; not a cookie but a tracking technology worth disclosing).
- **Calendly embed** on `/contact` (`assets.calendly.com/.../widget.js` + iframe). Currently loads regardless of consent → the gap this spec closes.
- **Google Fonts via `next/font`** — self-hosted at build time. **No** request to Google, **no** font cookies. (Affirmatively stated in the policy.)
- **Contact form** → `/api/contact` → **Resend** (server-side email). No client cookies; a privacy disclosure, not a cookie.
- **Hosting**: **Vercel** — standard server logs (IP, user-agent).
- LinkedIn / GitHub are plain outbound links — no embeds, no cookies.

## 6. Document content (near-final draft copy)

> Voice: GDPR/UK-grade substance, human plain-English tone. This is the copy to render via the Approach-A components; refine wording during implementation as needed.

### Privacy & Cookie Policy

**Last updated: 30 June 2026**

**The short version.** We keep this simple. TechTrinity uses one analytics tool (Google Analytics) and one embedded scheduler (Calendly), and **both stay off until you say yes**. We don't advertise to you, we don't sell your data, and we don't load tracking in the background. To change your mind anytime, use the **Cookie settings** link at the bottom of any page.

**Who we are.** This site is operated by **TechTrinity** ("we", "us"), the data controller for the information described here. Contact: **info@techtrinity.ai**. Postal address available on request. A real person reads privacy email.

**What this policy covers.** How we handle your information when you visit this site, send an enquiry, or book a call. It does not cover third-party sites we link to (LinkedIn, GitHub), which have their own policies.

**Information we collect**
- *When you contact us.* The contact form asks for your name, email, and a short message, plus optional details (company, role, business type, tools you use, urgency, and which workflow you want help with). On submit, that's sent to us as an email through our provider **Resend**, and used only to read and reply.
- *When you book a call.* Our scheduler **Calendly** collects what you enter to book (name, email, chosen time) on its own platform. The scheduler does not load until you allow it (see Cookies).
- *When you allow analytics.* **Google Analytics** collects anonymous usage info — pages viewed, rough location, device/browser — to show us what's useful. No name, no advertising.
- *Automatically, to run the site.* Our host **Vercel** processes standard technical info in server logs (IP, browser type) to serve pages securely. Normal for any website.

**Why we're allowed to use it (legal basis)**
- *Answering enquiries / scheduling* — legitimate interest in responding, and steps taken at your request before any agreement.
- *Analytics and the embedded scheduler* — your consent, withdrawable anytime.
- *Running and securing the site (server logs)* — legitimate interest in a safe, working website.

**Who else processes your data.** We don't sell or rent your information. We share it only with the providers that make the site work, each acting on our behalf:

| Provider | What it does | Policy |
|---|---|---|
| Google Analytics | Website analytics (only with consent) | Google Privacy Policy |
| Calendly | Embedded call scheduling (only when loaded) | Calendly Privacy Policy |
| Resend | Delivers your enquiry to us by email | Resend Privacy Policy |
| Vercel | Hosting and server logs | Vercel Privacy Policy |

These providers are US-based. Where data is transferred there, it's protected by appropriate safeguards — the **EU-US / UK Data Privacy Framework** and/or **Standard Contractual Clauses**.

**How long we keep it.** We don't run our own database of visitor information. Enquiries you send us live as email in our inbox, and we keep them only as long as we need to respond and handle any follow-up, after which we delete them. Everything else — analytics, scheduling, hosting logs — is held by the providers above under their own retention periods.

**Your rights.** Depending on where you live (including the UK and EU under the GDPR), you can: **access** what we hold; ask us to **correct** or **delete** it; **restrict** or **object** to its use; request a **copy** to take elsewhere; **withdraw consent** for analytics or the scheduler anytime; and **complain** to a data protection authority (UK: the ICO; EU: your local authority). To exercise these, email **info@techtrinity.ai**. To withdraw cookie consent, use **Cookie settings** — no email needed.

**Cookies & similar technologies**
- *What they are.* Cookies are small files a site stores in your browser; some sites also use related storage (like "local storage"). We use as little as possible.
- *Off by default.* On arrival, nothing optional runs. Analytics and the Calendly scheduler are **off** until you choose. We use **Google Consent Mode**, so Google Analytics starts in a privacy-preserving mode and writes no analytics cookies unless you accept. Your choice is remembered under `tt-cookie-consent`.
- *Your choice, anytime.* The banner lets you **Accept** or **Reject**. Change it whenever via the **Cookie settings** footer link, or by clearing `tt-cookie-consent`.

*The categories we use:*
- **Strictly necessary** — your cookie choice itself, so we can honour it. No consent needed, because without it we couldn't remember that you said no.
- **Analytics** *(consent)* — Google Analytics. Only set after you accept.
- **Functional / embedded tools** *(consent)* — the Calendly scheduler on Contact. Loads (and sets Calendly's cookies) only after you accept, or when you click to load it directly.

*The full list:*

| Name | Provider | Category | Purpose | Type | Lasts |
|---|---|---|---|---|---|
| `tt-cookie-consent` | TechTrinity (first-party) | Strictly necessary | Remembers your cookie choice | Local storage | Until you clear it |
| `_ga` | Google | Analytics | Tells visitors apart | Cookie | 2 years |
| `_ga_Z337R58187` | Google | Analytics | Keeps GA4 session state | Cookie | 2 years |
| Calendly cookies | Calendly | Functional | Runs the embedded scheduler | Third-party cookie | See Calendly's cookie policy |

*What we deliberately don't do:*
- **No advertising cookies.** Ad storage and ad personalisation are switched off in our setup, always.
- **No third-party fonts loading.** Fonts are built into the site itself, so Google never sees your visit and no font cookies are set.

**Changes to this policy.** If we add a tool or change cookie use, we update this page and the "Last updated" date. Changes needing fresh consent reset the banner so you can choose again.

**Contact.** Questions about this policy or your data? Email **info@techtrinity.ai**.

## 7. Cookie inventory data model

`lib/legal/cookie-inventory.ts`:

```ts
export type CookieCategory = "necessary" | "analytics" | "functional";

export type CookieEntry = {
  name: string;          // e.g. "_ga" or "tt-cookie-consent"
  provider: string;      // "Google", "Calendly", "TechTrinity (first-party)"
  category: CookieCategory;
  purpose: string;
  type: "Cookie" | "Local storage" | "Third-party cookie";
  duration: string;      // human string, e.g. "2 years", "Until you clear it"
  policyUrl?: string;    // provider policy link where relevant
};

export const COOKIE_INVENTORY: readonly CookieEntry[] = [ /* rows from §6 table */ ];
```

`lib/legal/policy-meta.ts`: controller name, contact email, last-updated date, and the named processors list (Google, Calendly, Resend, Vercel) with policy URLs — single-sourced for both the processors table and the cookie table links.

## 8. Code changes (file by file)

### 8.1 `lib/consent.ts` — broaden to two categories
- `StoredConsent` → `{ analytics: ConsentValue; functional: ConsentValue; version: number; timestamp: number }`.
- Bump `CONSENT_VERSION` `1 → 2`. Version mismatch already maps to "no decision", so existing visitors are re-prompted once — correct, since the consent scope genuinely changed.
- `parseStoredConsent` validates **both** `analytics` and `functional`.
- `writeConsent(value)` sets **both** categories to the same value (single broadened consent) and dispatches a new `consent:changed` window event.
- Add `CONSENT_CHANGED_EVENT = "consent:changed"` and a `readFunctionalConsent(): ConsentValue | null` selector.
- `updateConsent` unchanged — still sends **only** `analytics_storage` to gtag (Consent Mode has no Calendly signal; `functional` gates our own embed loading only).
- `consentInitScript` — the gtag default it emits is unchanged (driven by stored `analytics`); the inline parser must accept the v2 shape.

### 8.2 `components/analytics/cookie-consent-banner.tsx` — copy
- Broaden the message from analytics-only to "analytics **and embedded tools like our scheduler**." Two buttons stay (Accept / Reject); each flips both categories via `writeConsent`. (`decide()` already writes + updates; the `consent:changed` dispatch lives in `writeConsent`.)

### 8.3 `components/contact/contact-calendly.tsx` — becomes a client component, consent-gated
- On mount, read consent. `functional === "granted"` → render the live widget (inject `widget.js` + inline-widget div, as today).
- Otherwise → render a styled **click-to-load placeholder** ("Load scheduler — this loads Calendly and sets its cookies"). The click loads the widget for the session and is the per-use consent.
- Subscribe to `consent:changed`: if the visitor accepts in the banner while on `/contact`, swap placeholder → live widget automatically.
- SSR-safe: render the stable placeholder on the server / first paint, decide after mount (mirror the banner's existing anti-hydration-mismatch pattern).

### 8.4 Content components (Approach A)
- `lib/legal/cookie-inventory.ts`, `lib/legal/policy-meta.ts` — data (above).
- `components/privacy/policy-header.tsx`, `policy-section.tsx`, `cookie-table.tsx` — small presentational components.
- `components/privacy/privacy-content.tsx` — composes header + sections + `CookieTable`; keeps the existing `CookieSettingsLink`.

## 9. Testing strategy (Vitest + Playwright, ≥80%)

- `lib/consent.test.ts` — v2 shape; v1 record → re-prompt (parse returns null); `writeConsent` sets **both** fields; parse rejects records missing `functional`; `consent:changed` fires on write; `readFunctionalConsent` selector.
- `components/analytics/cookie-consent-banner.test.tsx` — new copy renders; Accept/Reject flips **both** categories.
- `components/contact/contact-calendly.test.tsx` (new) — placeholder when not granted; live widget when `functional` granted; click loads the widget; reacts to `consent:changed`.
- `components/privacy/cookie-table.test.tsx` (new) — renders every `COOKIE_INVENTORY` entry; required columns present.
- Extend the existing Playwright E2E (commit `ae2246d`) — Calendly path: reject → placeholder → click loads; accept → scheduler auto-loads; reopen Cookie settings → change choice.

## 10. Honesty / verification checklist (must hold before ship)
- [ ] "No advertising cookies" — verified: `ad_storage`/`ad_user_data`/`ad_personalization` set to `denied` in `consentInitScript`.
- [ ] "Fonts self-hosted, no Google font cookies" — verified: `next/font/google` in `app/layout.tsx` self-hosts at build.
- [ ] GA cookie names/durations in the table match GA4 gtag behaviour (`_ga`, `_ga_Z337R58187`, 2 years).
- [ ] Calendly row links to Calendly's current cookie/privacy policy rather than enumerating names we can't verify.
- [ ] Every provider in the processors table has a working policy link.

## 11. Open items (sensible defaults chosen; confirm at review)
- Postal address: omitted as "available on request". (Confirmed.)
- Hosting: **Vercel**. (Confirmed.)
- Retention: criteria-based statement, no fixed period. (Confirmed.)
- Legal entity: "TechTrinity" with no registered-entity suffix. (Confirm if a formal entity name/country should appear.)

## 12. Out of scope
- Splitting cookies onto a separate `/cookies` route (rejected — single page chosen).
- A categorized multi-toggle consent panel / granular per-category consent UI (rejected for now — single broadened consent; two-field storage leaves the door open).
- Any change to advertising (none exists) or to the contact-form / Resend flow beyond disclosing it.
