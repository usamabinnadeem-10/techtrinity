# TechTrinity ICP Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every page of the TechTrinity site with the updated ICP — owner-led, inventory-heavy businesses (wholesale/distribution/import-export/light-manufacturing) that have outgrown spreadsheets — by replacing residual SaaS/MVP/product/founder language, standardizing CTAs, expanding the contact form, adding conversion sections, adding three use-case pages, and re-aligning blog categories.

**Architecture:** Next.js 16 App Router. Pages live in `app/`, presentational components in `components/<domain>/`, and page *content* is data-driven from typed modules in `lib/` (`services.ts`, `case-studies.ts`, `contact.ts`, `blog-types.ts`). Blog content comes from Sanity (`sanity/schemas/post.ts` defines the category enum consumed at build time by `lib/blog-types.ts`). Most copy changes are edits to these `lib/` data files and a handful of component string literals; new pages follow the existing `lib/ + app/[slug]/page.tsx + components/<domain>/*` pattern already used by services.

**Tech Stack:** Next.js 16.2.5 (App Router, `metadata` exports, `MetadataRoute` sitemap/robots), React 19, TypeScript, Tailwind (utility classes inline), Sanity v5 + `next-sanity` v12 (blog), Resend (contact email).

## Global Constraints

- **Read the Next docs first.** Per `AGENTS.md`, this is Next.js 16 with breaking changes. Before editing metadata or adding routes, skim the relevant guides under `node_modules/next/dist/docs/` (App Router routing, `metadata`/`generateMetadata`, file-based `sitemap`/`robots`). Do **not** assume pre-16 conventions.
- **No new runtime dependencies** for this content work (brief §21). Use existing components (`LinkButton`, `EditorialLabel`, etc.).
- **Do not change existing service or case-study URLs.** Keep `/services/product-sprint|build-only|growth-retainer|technical-audit` and `/work/*` slugs (brief §8.2, §25). Only visible labels/copy change.
- **Do not break the contact submission flow.** Existing required fields (name, email, message) stay required; new fields are optional and backward-compatible in the API payload (brief §13.6, §25).
- **Preserve:** brand styling, animations, responsive layout, `info@techtrinity.ai`, existing case-study screenshots, existing pricing (brief §25).
- **Heading hierarchy:** one `h1` per page, `h2` for sections, `h3` for cards (brief §20).
- **Standard primary CTA label:** `Book a Workflow Review` (decision confirmed — brief §6.1 preferred). Short nav button stays `Book a Call`.
- **Canonical copy/positioning source:** brief §4 (replace table), §24 (snippet library). Use "operation / workflow / system", "inventory-heavy businesses", "owner-led", "stock, warehouse, order, purchasing, and reporting workflows". Avoid "SaaS / MVP / product studio / founders / non-technical / offshore / fraction of what an agency charges".
- **Verification gates (this repo has no unit-test runner — see note below):** every task ends with the applicable subset of `npm run lint`, `npx tsc --noEmit`, `npm run build`, plus targeted `grep` content assertions and route checks.

### Testing approach (important deviation, stated honestly)

This repository has **no test framework** (`package.json` scripts are only `dev`/`build`/`start`/`lint`; there is no `test` script and no vitest/jest installed). The brief defines acceptance as lint + typecheck + build + a content-QA checklist (brief §21–22), and forbids adding heavy deps without asking (§21). Per skill instruction-priority (user's project instructions + the provided spec outrank the default TDD rule), this plan uses the project's real gates — `npm run lint`, `npx tsc --noEmit`, `npm run build` — together with `grep`-based copy assertions and manual route checks as each task's "test". TypeScript's typed `Record<PostCategory, string>` and the contact payload types act as compile-time tests for the two logic changes (category sync, contact validation). **Optional hardening (owner decision, Task 16):** add `vitest` + a `lib/contact.test.ts` for `validateContact`; left out of the core plan to honor §21.

---

## File Structure

**Edited (existing):**
- `app/layout.tsx` — root metadata defaults (title template, default/OG titles).
- `lib/site.tsx` — `SITE_DESCRIPTION`, org/website schema description, title source.
- `app/page.tsx` — homepage; insert two new section components.
- `components/home/hero.tsx` · `services.tsx` · `cta.tsx` · `about.tsx` · `process.tsx` · `team.tsx` · `nav.tsx` · `site-footer.tsx` — copy + CTA labels + nav/footer links.
- `components/services/services-grid.tsx` · `services-fit.tsx` · `services-cta.tsx` · `services-header.tsx` · `service-detail-cta.tsx` — labels, fit lists, CTA copy.
- `lib/services.ts` — service titles/headlines/overview/idealFor/ctaPrompt/ctaLabel + new optional `metaTitle`.
- `app/services/[slug]/page.tsx` — use `metaTitle` fallback in `generateMetadata`.
- `app/contact/page.tsx` · `components/contact/contact-header.tsx` · `components/contact/contact-form.tsx` · `lib/contact.ts` · `app/api/contact/route.ts` — copy, dropdown, new fields, backend payload + email.
- `app/blog/page.tsx` · `components/blog/blog-header.tsx` · `components/blog/blog-list.tsx` — hero/subhead, empty state, metadata.
- `components/about/about-team.tsx` · `components/about/about-values.tsx` · `app/about/page.tsx` — residual "product/project" copy + metadata title.
- `components/case-study/case-cta.tsx` — fallback CTA copy + button label.
- `lib/case-studies.ts` — EasyAccounts `whyItMatters` block + label polish; Xenia CTA wording; `CaseStudy` type addition.
- `components/home/work.tsx` — image alt/copy polish (minor).
- `app/sitemap.ts` — add use-case routes.
- `sanity/schemas/post.ts` · `lib/blog-types.ts` — category enum + slug map.

**Created (new):**
- `components/home/operational-pain.tsx` — "The problems we usually walk into" (brief §7.6).
- `components/home/when-custom.tsx` — "Custom software is not always the answer" (brief §7.7).
- `components/case-study/case-why-it-matters.tsx` — EasyAccounts "Why this matters" (brief §16.2).
- `lib/use-cases.ts` — typed data for the three use-case pages.
- `app/use-cases/page.tsx` — use-cases index.
- `app/use-cases/[slug]/page.tsx` — use-case detail (dynamic, mirrors services).
- `components/use-case/*` — use-case section components (hero, problem, build, outcomes, proof, cta).

---

## Phase 1 — Critical consistency fixes

### Task 1: Global metadata & site description

**Files:**
- Modify: `lib/site.tsx:7-8` (`SITE_DESCRIPTION`), `:46` & `:65` (schema descriptions via constant).
- Modify: `app/layout.tsx:35-54` (title default/template + OG/twitter titles).

**Interfaces:**
- Produces: updated `SITE_DESCRIPTION` consumed by `organizationSchema()`, `websiteSchema()`, and any page importing it. No signature changes.

- [ ] **Step 1: Replace `SITE_DESCRIPTION` in `lib/site.tsx`**

Replace lines 7-8:
```ts
export const SITE_DESCRIPTION =
  "From idea to product, done right. We design and build SaaS products on a modern stack and stay accountable until it ships.";
```
with (brief §5.4 default/fallback description):
```ts
export const SITE_DESCRIPTION =
  "Simple custom operations software for inventory-heavy businesses whose workflows have outgrown spreadsheets, accounting software, and disconnected tools.";
```

- [ ] **Step 2: Set the org schema description to the ICP positioning (brief §19.1)**

In `organizationSchema()` the `description` field currently uses `SITE_DESCRIPTION`. Override it with the brief's org description so the schema reads as a company description, not a tagline. Change `description: SITE_DESCRIPTION,` (inside `organizationSchema`, line ~47) to:
```ts
    description:
      "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses.",
```
Leave `websiteSchema()`'s `description: SITE_DESCRIPTION` as-is (now the new ICP fallback).

- [ ] **Step 3: Update root metadata in `app/layout.tsx`**

Replace the `title` block and the three brand titles (lines 35-54) so the default is the homepage title (brief §5.1), the template uses `|` (brief §5.3), and OG uses brief §5.1/§7.2 strings:
```ts
  title: {
    default:
      "Custom Operations Software for Wholesale & Distribution Businesses | TechTrinity",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Custom Operations Software for Inventory-Heavy Businesses",
    description:
      "Inventory, warehouse, order, and reporting systems built around how your operation actually runs.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Operations Software for Inventory-Heavy Businesses",
    description:
      "Inventory, warehouse, order, and reporting systems built around how your operation actually runs.",
  },
```

- [ ] **Step 4: Verify no "Boutique SaaS Product Studio" remains and types pass**

Run:
```bash
grep -rn "Boutique\|SaaS Product Studio\|idea to product" app lib components
npx tsc --noEmit
```
Expected: grep returns **no matches**; `tsc` exits 0.

- [ ] **Step 5: Commit**

```bash
git add lib/site.tsx app/layout.tsx
git commit -m "feat: ICP-align global metadata and site description"
```

---

### Task 2: Standardize CTA labels & shared CTA copy

**Files:**
- Modify: `components/home/hero.tsx:57-59` (hero primary CTA).
- Modify: `components/home/cta.tsx:14-27` (homepage final CTA section).
- Modify: `components/services/services-cta.tsx:11-25` (services CTA).
- Modify: `components/services/service-detail-cta.tsx:18-25` (shared service-detail CTA body + uses passed `label`).
- Modify: `components/about/about-cta.tsx:11-21` (about CTA).
- Modify: `components/case-study/case-cta.tsx:31` (button label only here; fallback headline handled in Task 10).

- [ ] **Step 1: Hero CTA label (`components/home/hero.tsx`)**

Replace the accent button text on line 58:
```tsx
            Book a Free Discovery Call
```
with:
```tsx
            Book a Workflow Review
```

- [ ] **Step 2: Homepage final CTA (`components/home/cta.tsx`)**

Replace the headline + paragraph + buttons (lines 13-27) with brief §6.3 copy:
```tsx
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(40px,5.5vw,80px)] font-black leading-[0.94] tracking-[-0.04em]">
            Ready to fix the workflow that keeps{" "}
            <em className="italic text-primary">slowing your team down?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            Book a free 30-minute workflow review. No pitch, no pressure — just
            an honest conversation about how your stock, order, warehouse,
            purchasing, or reporting process works today, where it breaks, and
            whether a custom system makes sense.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
            <LinkButton href="/contact" variant="ghost" size="lg">
              Send a Message
            </LinkButton>
          </div>
```

- [ ] **Step 3: Services CTA (`components/services/services-cta.tsx`)**

Change the accent button label on line 21 from `Book a Discovery Call` to `Book a Workflow Review`. Leave the "Not sure which service fits?" heading and body (already operation-focused).

- [ ] **Step 4: Service-detail shared CTA body (`components/services/service-detail-cta.tsx`)**

The component receives `label` (per-service, set in Task 5) and renders a shared body. Replace the paragraph (lines 18-22) with brief workflow-review phrasing:
```tsx
          <p className="mx-auto mb-10 max-w-[520px] text-[16px] font-light leading-[1.75] text-muted">
            Book a free 30-minute workflow review. We&apos;ll learn how your
            operation runs today and tell you honestly whether a custom system
            is the right next step.
          </p>
```

- [ ] **Step 5: About CTA (`components/about/about-cta.tsx`)**

Replace heading + body + button (lines 10-22) with brief §15.3:
```tsx
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(38px,5.2vw,76px)] font-black leading-[0.96] tracking-[-0.04em]">
            Want a team that understands the operational mess{" "}
            <em className="italic text-primary">before writing code?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            Book a free workflow review. We&apos;ll go deep on how your
            operation runs and tell you honestly whether we&apos;re the right
            fit — even if the answer is no.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
          </div>
```

- [ ] **Step 6: Case-study CTA button label (`components/case-study/case-cta.tsx`)**

Change the accent button text on line 32 from `Book a Discovery Call` to `Book a Workflow Review`. (The fallback *headline* is updated in Task 10.)

- [ ] **Step 7: Verify**

```bash
grep -rn "Discovery Call" app components | grep -v "contact/page.tsx\|contact-calendly\|services.ts"
npx tsc --noEmit
```
Expected: remaining `Discovery Call` references are only the Calendly section header and `lib/services.ts` `ctaLabel` (handled in Task 5) and the contact page Calendly blurb (handled in Task 3). `tsc` exits 0.

- [ ] **Step 8: Commit**

```bash
git add components/home/hero.tsx components/home/cta.tsx components/services/services-cta.tsx components/services/service-detail-cta.tsx components/about/about-cta.tsx components/case-study/case-cta.tsx
git commit -m "feat: standardize primary CTA on Book a Workflow Review"
```

---

### Task 3a: Contact page copy, dropdown options & metadata

**Files:**
- Modify: `lib/contact.ts:1-9` (rename `PROJECT_TYPES` → operational `WORKFLOW_FOCUS_OPTIONS`; keep a typed union).
- Modify: `components/contact/contact-header.tsx:11-14` (hero copy).
- Modify: `components/contact/contact-form.tsx` (message label, dropdown label).
- Modify: `app/contact/page.tsx:11-23` (metadata) & `:42-49` (Calendly blurb).

**Interfaces:**
- Produces: `WORKFLOW_FOCUS_OPTIONS` (string tuple) and `WorkflowFocus` type consumed by `contact-form.tsx` and `app/api/contact/route.ts`. The payload field is renamed `projectType` → `focus` in Task 3b; in 3a keep field name `projectType` to avoid a half-migrated state — **do 3a and 3b together if executing inline.** (Subagent note: assign 3a+3b to one task if you prefer a single payload migration.)

- [ ] **Step 1: Replace the options tuple in `lib/contact.ts`**

Replace lines 1-9:
```ts
export const PROJECT_TYPES = [
  "SaaS MVP (Design + Build)",
  "SaaS MVP (Build Only)",
  "Growth Retainer",
  "Technical Audit",
  "Not sure yet",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
```
with (brief §13.3):
```ts
export const WORKFLOW_FOCUS_OPTIONS = [
  "Stock / inventory accuracy",
  "Order processing workflow",
  "Purchasing / replenishment",
  "Warehouse or branch coordination",
  "Manual reporting / dashboards",
  "Existing system audit",
  "Ongoing improvements to a live system",
  "Not sure yet",
] as const;

export type WorkflowFocus = (typeof WORKFLOW_FOCUS_OPTIONS)[number];
```
> Leave the rest of `contact.ts` for Task 3b (it expands `ContactPayload`/validation). After this edit `contact.ts` will not typecheck until 3b updates the references — that's expected; **run `tsc` only after 3b.**

- [ ] **Step 2: Contact hero (`components/contact/contact-header.tsx`)**

Replace the paragraph (lines 11-14) with brief §13.1:
```tsx
        <p className="mx-auto mt-7 max-w-[480px] text-[16px] font-light leading-[1.7] text-muted">
          Tell us what is slowing your operation down. We&apos;ll review it and
          get back to you within one business day. Or skip the form and book a
          workflow review directly.
        </p>
```

- [ ] **Step 3: Calendly blurb + metadata (`app/contact/page.tsx`)**

Replace the metadata block (lines 11-23):
```tsx
export const metadata: Metadata = {
  title: { absolute: "Talk to TechTrinity About Your Operations Workflow" },
  description:
    "Tell us what is slowing your operation down, or book a 30-minute workflow review with the TechTrinity team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Talk to TechTrinity About Your Operations Workflow",
    description:
      "Tell us what is slowing your operation down, or book a 30-minute workflow review with the TechTrinity team.",
    url: "/contact",
    type: "website",
  },
};
```
Replace the Calendly section label + blurb (lines 42-49) with brief §13.5:
```tsx
              <EditorialLabel tone="primary" className="mb-6 block">
                Book a Workflow Review
              </EditorialLabel>
              <p className="mb-7 max-w-[420px] text-[15px] font-light leading-[1.7] text-muted">
                Prefer to talk directly? Book a free 30-minute workflow review.
                No pitch, no pressure — just an honest conversation about how
                your stock, orders, warehouse, purchasing, or reporting process
                works today and whether we can help.
              </p>
```

- [ ] **Step 4: Verify (after Task 3b)** — covered by 3b's verification.

---

### Task 3b: Contact form new fields + backend payload + email

**Files:**
- Modify: `lib/contact.ts` (expand `ContactPayload`, `ContactErrors`, `validateContact`; add option tuples + guards).
- Modify: `components/contact/contact-form.tsx` (rename message label; rename dropdown label/field; add 5 optional fields).
- Modify: `app/api/contact/route.ts` (parse + email-template new fields).

**Interfaces:**
- Consumes: `WORKFLOW_FOCUS_OPTIONS`/`WorkflowFocus` from Task 3a.
- Produces: expanded `ContactPayload` type (used by form + API + email). New field keys: `focus` (was `projectType`), `company`, `role`, `tools`, `businessType`, `urgency`. Required validation unchanged (name/email/message). New fields optional.

- [ ] **Step 1: Expand types, options & validation in `lib/contact.ts`**

Append the role/businessType/urgency option tuples and replace `ContactPayload`/`ContactErrors`/`validateContact`. Full new `contact.ts` (after Task 3a's top edit) is:
```ts
export const WORKFLOW_FOCUS_OPTIONS = [
  "Stock / inventory accuracy",
  "Order processing workflow",
  "Purchasing / replenishment",
  "Warehouse or branch coordination",
  "Manual reporting / dashboards",
  "Existing system audit",
  "Ongoing improvements to a live system",
  "Not sure yet",
] as const;

export type WorkflowFocus = (typeof WORKFLOW_FOCUS_OPTIONS)[number];

export const ROLE_OPTIONS = [
  "Owner / Founder",
  "Managing Director / President",
  "General Manager",
  "Operations Manager",
  "Warehouse / Inventory Manager",
  "Finance / Admin",
  "Other",
] as const;

export type Role = (typeof ROLE_OPTIONS)[number];

export const BUSINESS_TYPE_OPTIONS = [
  "Wholesale / distribution",
  "Import / export",
  "Light manufacturing",
  "Inventory-heavy retail",
  "Multi-location operations",
  "Other",
] as const;

export type BusinessType = (typeof BUSINESS_TYPE_OPTIONS)[number];

export const URGENCY_OPTIONS = [
  "Exploring",
  "Problem is annoying but not urgent",
  "Problem is costing time/money now",
  "Need to fix in the next 30–90 days",
] as const;

export type Urgency = (typeof URGENCY_OPTIONS)[number];

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  focus: WorkflowFocus | "";
  company: string;
  role: Role | "";
  tools: string;
  businessType: BusinessType | "";
  urgency: Urgency | "";
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!payload.name.trim()) {
    errors.name = "Please tell us your name.";
  }
  if (!payload.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.message.trim()) {
    errors.message = "A short note about your operation helps a lot.";
  }
  return errors;
}
```

- [ ] **Step 2: Update the form (`components/contact/contact-form.tsx`)**

(a) Update the imports (line 5-10) to the new names:
```tsx
import {
  WORKFLOW_FOCUS_OPTIONS,
  ROLE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  URGENCY_OPTIONS,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact";
```
(b) Update `initialState` (lines 20-25):
```tsx
const initialState: ContactPayload = {
  name: "",
  email: "",
  message: "",
  focus: "",
  company: "",
  role: "",
  tools: "",
  businessType: "",
  urgency: "",
};
```
(c) Change the message label (line 136) from `Tell Us About Your Project` to `Tell us what is slowing your operation down`, and the textarea placeholder (line 142) to:
```tsx
          placeholder="Where does your stock, order, warehouse, purchasing, or reporting process break down today?"
```
(d) Replace the project-type `<div>` block (lines 160-198) with a workflow-focus select bound to `focus`, label `What best describes the workflow you want to fix?`, iterating `WORKFLOW_FOCUS_OPTIONS`, and `update("focus", ...)`. Keep the existing `fieldShell`/chevron markup; only the `id`/`name`/`value`/`onChange`/label text/options source change:
```tsx
      <div>
        <label htmlFor="contact-focus" className={fieldLabel}>
          What best describes the workflow you want to fix?
        </label>
        <div className="relative">
          <select
            id="contact-focus"
            name="focus"
            value={values.focus}
            onChange={(e) =>
              update("focus", e.target.value as ContactPayload["focus"])
            }
            className={cn(
              fieldShell,
              "appearance-none pr-10",
              !values.focus && "text-muted/80",
            )}
          >
            <option value="">Select an option</option>
            {WORKFLOW_FOCUS_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-foreground">
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 12 8"
            className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1.5 6 6.5 11 1.5" />
          </svg>
        </div>
      </div>
```
(e) Immediately after that block, add the four new optional fields. Company + tools are text inputs; role + businessType + urgency are selects (reuse the same chevron `<svg>` pattern). Add a shared `selectField` helper or inline-repeat each; inline example for one select (repeat for role/businessType/urgency, swapping `id`/`name`/`value`/options/label):
```tsx
      <div>
        <label htmlFor="contact-company" className={fieldLabel}>
          Company name
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Distribution Co."
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          className={fieldShell}
        />
      </div>

      <div>
        <label htmlFor="contact-role" className={fieldLabel}>
          Your role
        </label>
        <div className="relative">
          <select
            id="contact-role"
            name="role"
            value={values.role}
            onChange={(e) =>
              update("role", e.target.value as ContactPayload["role"])
            }
            className={cn(fieldShell, "appearance-none pr-10", !values.role && "text-muted/80")}
          >
            <option value="">Select an option</option>
            {ROLE_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-foreground">{o}</option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
        </div>
      </div>

      <div>
        <label htmlFor="contact-business-type" className={fieldLabel}>
          Business type
        </label>
        <div className="relative">
          <select
            id="contact-business-type"
            name="businessType"
            value={values.businessType}
            onChange={(e) =>
              update("businessType", e.target.value as ContactPayload["businessType"])
            }
            className={cn(fieldShell, "appearance-none pr-10", !values.businessType && "text-muted/80")}
          >
            <option value="">Select an option</option>
            {BUSINESS_TYPE_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-foreground">{o}</option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
        </div>
      </div>

      <div>
        <label htmlFor="contact-urgency" className={fieldLabel}>
          How urgent is it?
        </label>
        <div className="relative">
          <select
            id="contact-urgency"
            name="urgency"
            value={values.urgency}
            onChange={(e) =>
              update("urgency", e.target.value as ContactPayload["urgency"])
            }
            className={cn(fieldShell, "appearance-none pr-10", !values.urgency && "text-muted/80")}
          >
            <option value="">Select an option</option>
            {URGENCY_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-foreground">{o}</option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
        </div>
      </div>

      <div>
        <label htmlFor="contact-tools" className={fieldLabel}>
          What tools does your team use today?
        </label>
        <input
          id="contact-tools"
          name="tools"
          type="text"
          placeholder="Example: QuickBooks, Xero, Excel, Google Sheets, Shopify, email, WhatsApp, old desktop software, paper notes"
          value={values.tools}
          onChange={(e) => update("tools", e.target.value)}
          className={fieldShell}
        />
      </div>
```
> Note (brief §20.3): every field has a real `<label htmlFor>` — keep that; do not rely on placeholders alone.

- [ ] **Step 3: Update the API route (`app/api/contact/route.ts`)**

(a) Update imports (lines 2-6) to bring in the new option tuples and types:
```ts
import {
  WORKFLOW_FOCUS_OPTIONS,
  ROLE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  URGENCY_OPTIONS,
  validateContact,
  type ContactPayload,
} from "@/lib/contact";
```
(b) Replace `isProjectType` with generic enum guards and rewrite `parseBody` to accept the new optional fields (treat missing as `""` for backward compatibility):
```ts
function inEnum<T extends readonly string[]>(
  options: T,
  value: unknown,
): value is T[number] | "" {
  if (value === "" || value === undefined) return true;
  return typeof value === "string" && (options as readonly string[]).includes(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseBody(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (
    typeof b.name !== "string" ||
    typeof b.email !== "string" ||
    typeof b.message !== "string" ||
    !inEnum(WORKFLOW_FOCUS_OPTIONS, b.focus) ||
    !inEnum(ROLE_OPTIONS, b.role) ||
    !inEnum(BUSINESS_TYPE_OPTIONS, b.businessType) ||
    !inEnum(URGENCY_OPTIONS, b.urgency)
  ) {
    return null;
  }
  return {
    name: b.name,
    email: b.email,
    message: b.message,
    focus: (b.focus as ContactPayload["focus"]) ?? "",
    company: asString(b.company),
    role: (b.role as ContactPayload["role"]) ?? "",
    tools: asString(b.tools),
    businessType: (b.businessType as ContactPayload["businessType"]) ?? "",
    urgency: (b.urgency as ContactPayload["urgency"]) ?? "",
  };
}
```
(c) In `buildEmailHtml`, replace the `projectType` row with rows for the new fields (only render rows that have a value). Replace lines ~48-56:
```ts
function buildEmailHtml(payload: ContactPayload): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding: 6px 0; color: #666; width: 150px;">${escapeHtml(label)}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`
      : "";
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New enquiry from ${escapeHtml(payload.name)}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row("Name", payload.name)}
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        ${row("Company", payload.company)}
        ${row("Role", payload.role)}
        ${row("Business type", payload.businessType)}
        ${row("Workflow focus", payload.focus || "Not specified")}
        ${row("Current tools", payload.tools)}
        ${row("Urgency", payload.urgency)}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #666;">Message</h3>
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.55; padding: 16px; background: #f6f6f6; border-radius: 6px;">${escapeHtml(payload.message)}</div>
    </div>
  `;
}
```
(d) Update the subject line (lines ~99-100) to use `focus`:
```ts
  const focusLabel = payload.focus || "General";
  const subject = `New enquiry from ${payload.name.trim()} — ${focusLabel}`;
```

- [ ] **Step 4: Verify types, lint, build**

```bash
grep -rn "PROJECT_TYPES\|projectType\|Your Project" app components lib
npx tsc --noEmit
npm run lint
npm run build
```
Expected: grep returns **no matches** (all renamed); `tsc`, lint, and build exit 0.

- [ ] **Step 5: Manual smoke test (dev server)**

Run `npm run dev`, open `/contact`, confirm: all fields render with labels, dropdowns show the new options, submitting with only name+email+message succeeds (network tab → `/api/contact` 200 when `RESEND_API_KEY` is set; if unset, expect the existing "Email service is not configured" 500 — that's pre-existing, note it). Submitting with empty name/email/message still shows inline errors.

- [ ] **Step 6: Commit**

```bash
git add lib/contact.ts components/contact/ app/contact/page.tsx app/api/contact/route.ts
git commit -m "feat: ICP-align contact form copy, options, and add operational fields"
```

---

### Task 4: Blog hero, empty state & metadata

**Files:**
- Modify: `components/blog/blog-header.tsx:8-19` (hero + subhead).
- Modify: `components/blog/blog-list.tsx:71` (empty-state branch).
- Modify: `app/blog/page.tsx:13-25` (metadata).

- [ ] **Step 1: Blog hero (`components/blog/blog-header.tsx`)**

Replace the `h1` and paragraph (lines 9-19) with brief §14.1:
```tsx
          <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,76px)] font-black leading-[0.98] tracking-[-0.04em]">
            Notes on inventory, operations,
            <br />
            and <em className="italic font-bold text-primary">custom software.</em>
          </h1>
        </div>
        <p className="hero-rise-sm max-w-95 text-[17px] font-normal leading-normal text-muted text-balance [animation-delay:0.3s] md:pb-2">
          Practical writing for owners and operators of inventory-heavy
          businesses — about stock accuracy, reporting, warehouse workflows,
          software decisions, and what to fix before you build.
        </p>
```

- [ ] **Step 2: Empty state (`components/blog/blog-list.tsx`)**

The list currently renders nothing when there are no posts (`posts.length === 0 ? null`). Replace that branch (line 71) with brief §14.2 copy + a CTA to the EasyAccounts case study:
```tsx
      {posts.length === 0 ? (
        <div className="max-w-[640px] space-y-7">
          <p className="text-[17px] font-light leading-[1.8] text-muted">
            We&apos;re preparing practical guides for owner-led wholesale,
            distribution, and inventory-heavy businesses. Start with the
            EasyAccounts case study to see the kind of operational problems we
            build around.
          </p>
          <Link
            href="/work/easyaccounts"
            className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read the EasyAccounts Case Study <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
```
Add `import Link from "next/link";` at the top of the file if not present (it is not — add it).

- [ ] **Step 3: Blog metadata (`app/blog/page.tsx`)**

Replace the metadata block (lines 13-25):
```tsx
export const metadata: Metadata = {
  title: "Inventory, Operations & Custom Software Notes",
  description:
    "Practical writing for owners of inventory-heavy businesses — stock accuracy, reporting, warehouse workflows, and software decisions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Inventory, Operations & Custom Software Notes — TechTrinity",
    description:
      "Practical writing for owners of inventory-heavy businesses — stock accuracy, reporting, warehouse workflows, and software decisions.",
    url: "/blog",
    type: "website",
  },
};
```

- [ ] **Step 4: Verify**

```bash
grep -rn "non-technical founders\|SaaS, product" app components
npx tsc --noEmit
```
Expected: grep returns **no matches**; `tsc` exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/blog/blog-header.tsx components/blog/blog-list.tsx app/blog/page.tsx
git commit -m "feat: ICP-align blog hero, empty state, and metadata"
```

---

### Task 5: Service renames & copy (data + grids + fit)

**Files:**
- Modify: `lib/services.ts` (add `metaTitle?` to type; rename `title`/`headlineLead`/`headlineTail`; rewrite `overview`/`idealFor`/`ctaPrompt`/`ctaLabel` per service; fix internal "Product Sprint" cross-reference).
- Modify: `app/services/[slug]/page.tsx:66-70` (use `metaTitle` fallback).
- Modify: `components/home/services.tsx:12-61` (card titles + descriptions + price-comparison line).
- Modify: `components/services/services-grid.tsx:12-49` (card titles).
- Modify: `components/services/services-fit.tsx:3-17` (good/bad fit lists).
- Modify: `components/services/services-header.tsx:16-21` (subhead — light touch).

**Interfaces:**
- Produces: `ServiceDetail.metaTitle?: string` consumed by `generateMetadata`. Visible titles change; **slugs unchanged**.

- [ ] **Step 1: Add `metaTitle` to the `ServiceDetail` type (`lib/services.ts`)**

In the `ServiceDetail` type (after `title: string;`, line ~22) add:
```ts
  metaTitle?: string;
```

- [ ] **Step 2: Rewrite the four service entries' visible fields (`lib/services.ts`)**

Per service, set `title`, `metaTitle`, `headlineLead`, `headlineTail`, `overview` (first paragraph drives the meta description), `idealFor`, `ctaPrompt`, `ctaLabel`. Apply:

**product-sprint** (brief §5.5, §9.1–§9.4, §9.6):
```ts
    title: "Complete Operations System Build",
    metaTitle: "Complete Operations System Build",
    headlineLead: "Complete Operations",
    headlineTail: "System Build.",
```
Replace `overview` array with brief §9.2:
```ts
    overview: [
      "You're running stock, orders, purchasing, reporting, and warehouse work across spreadsheets, accounting software, email, and a few things only one person knows how to do.",
      "The Complete Operations System Build replaces the fragile patchwork with one focused system built around how your business already works. We map the process first, design the screens your team will actually use, build the system, and support the launch.",
      "This is the right engagement when the problem is bigger than one screen or one report. You bring deep knowledge of the operation; we turn it into software that gives your team trusted data and clearer workflows.",
    ],
```
Replace `idealFor` (brief §9.4):
```ts
    idealFor:
      "Owners of wholesale, distribution, light manufacturing, or multi-location businesses whose operation has outgrown spreadsheets, aging tools, or disconnected SaaS — and who want one system built properly around how the team actually works.",
```
Set `ctaPrompt: "Ready to replace the spreadsheet patchwork?"` and `ctaLabel: "Book a Workflow Review"`.

**build-only** (brief §5.5, §10):
```ts
    title: "Defined Workflow Build",
    metaTitle: "Defined Workflow Software Build",
    headlineLead: "Defined Workflow",
    headlineTail: "Build.",
```
Replace `overview` (brief §10.2):
```ts
    overview: [
      "Sometimes you already know exactly what needs to be fixed: a stock lookup tool, order tracking workflow, purchase planning screen, reporting dashboard, warehouse transfer process, or another specific part of the operation.",
      "Defined Workflow Build is for one clearly scoped system. We build it cleanly, connect it where needed, and put it into your team's hands without turning it into a full ERP project.",
    ],
```
Replace the `callout` (brief §10.3) `title` → `"A clearly defined workflow."` and `body`:
```ts
      body: "This service works when the workflow is already understood. If the process still has open questions, hidden edge cases, or multiple teams disagreeing on how it should work, we'll flag that and recommend starting with a short workflow discovery instead.",
```
Replace `idealFor` (brief §10.4):
```ts
    idealFor:
      "Owners or operations teams who can clearly describe one workflow that needs to be built or replaced — and want it delivered without paying for a full discovery phase.",
```
Set `ctaPrompt: "Know the exact workflow you need?"` and `ctaLabel: "Book a Workflow Review"`.

**growth-retainer** (brief §5.5, §11):
```ts
    title: "Ongoing Operations Improvements",
    metaTitle: "Ongoing Operations Software Improvements",
    headlineLead: "Ongoing Operations",
    headlineTail: "Improvements.",
```
Replace `overview` (brief §11.2):
```ts
    overview: [
      "Your system is live and your team relies on it. But the business keeps changing — new locations, new product lines, new reports, new approval steps, new edge cases.",
      "Ongoing Operations Improvements gives you a senior team that already understands your system and keeps improving it month after month, without the cost and delay of hiring or re-explaining everything to a new developer.",
    ],
```
Replace `idealFor` (brief §11.3):
```ts
    idealFor:
      "Owners with a live operations system who want it to keep improving as the business grows — without hiring a full-time developer or starting over with someone new each time.",
```
Set `ctaPrompt: "Already live and ready to keep improving?"` and `ctaLabel: "Book a Workflow Review"`.

**technical-audit** (brief §5.5, §12):
```ts
    title: "Existing System Audit",
    metaTitle: "Existing Operations Software Audit",
    headlineLead: "Existing System",
    headlineTail: "Audit.",
```
Replace `overview` (brief §12.2):
```ts
    overview: [
      "You're running software someone else built, an old internal system, or an off-the-shelf tool that has been patched around your operation for years. You're not sure whether to fix it, replace it, or stop investing in it.",
      "The Existing System Audit gives you a plain-English assessment of the code, data, security, reliability, and workflow fit — so you know what is broken, what matters, and what to do next.",
    ],
```
Replace `included` (brief §12.3):
```ts
    included: [
      "Review of current software structure and maintainability",
      "Security and data-risk check",
      "Review of database/data model where access is provided",
      "Workflow-fit assessment: where the software does not match how the team works",
      "Reliability and performance risks",
      "Integration risks",
      "Plain-English report ranked by urgency",
      "30-minute walkthrough call",
    ],
```
Replace `idealFor` (brief §12.4):
```ts
    idealFor:
      "Owners who inherited, bought, or commissioned software that no longer fits the operation — and want an honest second opinion before spending more money on it.",
```
Set `ctaPrompt: "Not sure what you're running?"` and `ctaLabel: "Book a Workflow Review"`.

Finally, fix the internal cross-reference in product-sprint's `notIncluded` and build-only's `notIncluded` that name old service labels:
- product-sprint `notIncluded`: `"Ongoing changes after launch — that's the Growth Retainer"` → `"Ongoing changes after launch — that's Ongoing Operations Improvements"`.
- build-only `notIncluded`: `"A full discovery phase to work out what to build — that's the Product Sprint"` → `"A full discovery phase to work out what to build — that's the Complete Operations System Build"`.

- [ ] **Step 3: Use `metaTitle` in `generateMetadata` (`app/services/[slug]/page.tsx`)**

In `generateMetadata` (line ~68-78), change the title and OG title to prefer `metaTitle`:
```tsx
  const metaTitle = service.metaTitle ?? service.title;
  return {
    title: metaTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${metaTitle} — ${SITE_NAME}`,
      description,
      url: path,
      type: "website",
    },
  };
```

- [ ] **Step 4: Homepage service cards (`components/home/services.tsx`)**

Replace the four `title`/`description` pairs in the `SERVICES` array (lines 13-44) with the new labels + brief §7.4 card copy:
```ts
  {
    num: "01",
    title: "Complete Operations System Build",
    description:
      "For businesses running stock, orders, purchasing, and reporting across spreadsheets, accounting software, and warehouse notes. We map the workflow, design the system, build it, and help your team launch. 8–16 weeks.",
    price: "Starting at $20,000",
    slug: "product-sprint",
  },
  {
    num: "02",
    title: "Defined Workflow Build",
    description:
      "Already know the exact workflow you need fixed? We build one focused system — stock lookup, order tracking, purchasing, reporting, transfers, or another defined operational workflow — without a long discovery phase.",
    price: "Starting at $12,000",
    slug: "build-only",
  },
  {
    num: "03",
    title: "Ongoing Operations Improvements",
    description:
      "For live systems your team already relies on. We stay close to the codebase and keep improving it as you add products, people, locations, and new ways of working.",
    price: "Starting at $4,500/month",
    slug: "growth-retainer",
  },
  {
    num: "04",
    title: "Existing System Audit",
    description:
      "Running software nobody fully understands? We review the code, data, security, reliability, and workflow fit — then tell you what to fix, what to replace, and what to leave alone.",
    price: "Starting at $1,500",
    slug: "technical-audit",
  },
```
Then replace the price-comparison paragraph (lines 58-61) with brief §7.5:
```tsx
          <p className="mt-4 max-w-[560px] text-[17px] font-light leading-[1.7] text-muted">
            Clear fixed-scope pricing agreed upfront — built by a senior team
            that maps the operation before writing code.
          </p>
```

- [ ] **Step 5: Services-page grid titles (`components/services/services-grid.tsx`)**

Rename the four `title` values in the `SERVICES` array to: `Complete Operations System Build`, `Defined Workflow Build`, `Ongoing Operations Improvements`, `Existing System Audit` (lines 15, 23, 33, 41). Keep the existing descriptions/prices/timelines/hrefs.

- [ ] **Step 6: Services right-fit lists (`components/services/services-fit.tsx`)**

Replace `GOOD_FIT` and `BAD_FIT` (lines 3-17) with brief §8.4:
```ts
const GOOD_FIT = [
  `Your operation has grown past what spreadsheets can manage`,
  `Stock, orders, purchasing, or reports are split across too many places`,
  `The owner or ops team cannot fully trust the numbers`,
  `You want software built around your workflow, not a SaaS template`,
  `You need something simple enough that warehouse/admin staff will actually use it`,
  `You're the decision-maker or can bring the decision-maker into the process`,
];

const BAD_FIT = [
  `A standard SaaS tool already fits your workflow well`,
  `There's no real operational friction yet`,
  `You only want the cheapest developer`,
  `You need a rushed two-week build for a complex workflow`,
  `You want to resell the software as a SaaS product`,
  `You cannot give access to the people who actually run the process`,
];
```

- [ ] **Step 7: Services header subhead (`components/services/services-header.tsx`)**

Replace the subhead paragraph (lines 16-21) with brief §8.3 (keeps the existing `h1`):
```tsx
        <p className="hero-rise-sm max-w-[560px] text-[16px] font-light leading-[1.75] text-muted [animation-delay:0.3s] md:pb-3">
          For wholesale, distribution, light manufacturing, and multi-location
          businesses whose stock, order, warehouse, purchasing, and reporting
          workflows have outgrown spreadsheets and disconnected tools.
        </p>
```

- [ ] **Step 8: Verify**

```bash
grep -rn "Product Sprint\|Build-Only\|Growth Retainer\|Technical Audit" app components lib
npx tsc --noEmit
npm run build
```
Expected: grep returns **no matches** in visible-string positions (slugs `product-sprint` etc. are fine and remain). `tsc` and build exit 0. Visit `/services/product-sprint` → `<title>` shows "Complete Operations System Build | TechTrinity"; hero shows "Complete Operations / System Build."

- [ ] **Step 9: Commit**

```bash
git add lib/services.ts app/services/[slug]/page.tsx components/home/services.tsx components/services/services-grid.tsx components/services/services-fit.tsx components/services/services-header.tsx
git commit -m "feat: rename services to operations language and rewrite service copy"
```

---

### Task 6: Residual product/founder/users language sweep

**Files:**
- Modify: `components/home/about.tsx:23,33-43` · `components/home/process.tsx:14` · `components/home/team.tsx:23` · `components/about/about-team.tsx:22,44-45` · `components/home/work.tsx:103` (alt).

- [ ] **Step 1: Homepage About (`components/home/about.tsx`)**

- Line 23 heading: `Built by people who've shipped real products.` → `Built by people who've shipped real systems.`
- Lines 33-36 paragraph: `the person building your product.` → `the person mapping and building your system.`
- Lines 38-42: `small number of projects at a time` → `small number of operations at a time`.

- [ ] **Step 2: Homepage Process (`components/home/process.tsx`)**

Line 14 description: `We learn your product, your timeline, your constraints.` → `We learn your operation, your timeline, your constraints.`

- [ ] **Step 3: Homepage Team (`components/home/team.tsx`)**

Line 23: `the same hands writing the code that ships to your users.` → `the same hands writing the code that ships to your team.`

- [ ] **Step 4: About Team (`components/about/about-team.tsx`)**

- Line 22: `the senior people who actually build the product` → `the senior people who actually build your system`.
- Lines 44-45 blockquote: `The person you speak to in the discovery call is the person building your product.` → `The person you speak to in the discovery call is the person mapping and building your system.` (brief §15.1 exact).

- [ ] **Step 5: Work featured image alt (`components/home/work.tsx`)**

Line 103 alt `"EasyAccounts ERP product cost trace interface"` is acceptable (describes the screen). Leave the screenshot alts that name the real report ("product cost trace") — they are accurate descriptions, not positioning copy. No change required; documented here so a reviewer doesn't flag it.

- [ ] **Step 6: Leave intentionally**

Do **not** change: `components/home/team-card.tsx:31` ("A decade across editorial, product, and identity" — a person's design-discipline bio, not the offer); `components/about/about-values.tsx` "scopes your project"/"a founder you can reach" ("founder" = the actual TechTrinity founder, which is accurate and trust-building per brief §4.1 "owners/operators" applies to *audience*, not self-reference); case-study internal labels (case-study context allowed per brief §4.3). Document these as deliberate.

- [ ] **Step 7: Verify**

```bash
grep -rniE "your product|real products|your users" app components
npx tsc --noEmit
```
Expected: grep returns **no matches** (case-study fallback "your product?" is removed in Task 10). `tsc` exits 0.

- [ ] **Step 8: Commit**

```bash
git add components/home/about.tsx components/home/process.tsx components/home/team.tsx components/about/about-team.tsx
git commit -m "feat: replace residual product/users language with system/team"
```

---

## Phase 2 — Strengthen conversion

### Task 7: Homepage "operational pain" section

**Files:**
- Create: `components/home/operational-pain.tsx`.
- Modify: `app/page.tsx` (import + render after `<Problem />`).

**Interfaces:**
- Produces: `export function OperationalPain()` — no props. Rendered between `Problem` and `Services`.

- [ ] **Step 1: Create the component**

Create `components/home/operational-pain.tsx` (six cards, brief §7.6; follows the `Services`/`Problem` visual pattern — `EditorialLabel`, `data-reveal`, card grid):
```tsx
import { EditorialLabel } from "./label";

type Pain = { title: string; body: string };

const PAINS: Pain[] = [
  {
    title: "Stock numbers nobody fully trusts",
    body: "Sales, warehouse, and admin teams each have a different version of what is available.",
  },
  {
    title: "Reports that take hours to compile",
    body: "The owner waits for someone to export, clean, and reconcile numbers before decisions can be made.",
  },
  {
    title: "Orders scattered across tools",
    body: "Order status lives in email, spreadsheets, warehouse notes, and someone's memory.",
  },
  {
    title: "Purchasing that reacts too late",
    body: "Low stock is noticed after the sale is already at risk.",
  },
  {
    title: "Branches working from different views",
    body: "Transfers, availability, and accountability become harder as locations grow.",
  },
  {
    title: "Software the team avoids using",
    body: "Overbuilt systems fail when warehouse and admin staff cannot use them easily.",
  },
];

export function OperationalPain() {
  return (
    <section id="operational-pain" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel>What We See</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            The problems we usually{" "}
            <em className="italic text-primary">walk into.</em>
          </h2>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {PAINS.map((pain) => (
            <article
              key={pain.title}
              className="group relative flex flex-col bg-card p-9 transition-colors duration-300 hover:bg-card-elevated md:p-10"
            >
              <h3 className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.015em] md:text-[22px]">
                {pain.title}
              </h3>
              <p className="mt-3.5 text-[15px] font-light leading-[1.75] text-muted">
                {pain.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import { OperationalPain } from "@/components/home/operational-pain";` and render it directly after `<Problem />`:
```tsx
        <Problem />
        <OperationalPain />
        <Services />
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0. `/` renders the new section with one `h2` for the section and `h3` per card (heading hierarchy preserved).

- [ ] **Step 4: Commit**

```bash
git add components/home/operational-pain.tsx app/page.tsx
git commit -m "feat: add operational pain section to homepage"
```

---

### Task 8: Homepage "when custom makes sense" section

**Files:**
- Create: `components/home/when-custom.tsx`.
- Modify: `app/page.tsx` (render after `<Services />`).

**Interfaces:**
- Produces: `export function WhenCustom()` — no props.

- [ ] **Step 1: Create the component (brief §7.7)**

Create `components/home/when-custom.tsx`:
```tsx
import { EditorialLabel } from "./label";

const POINTS = [
  "Use off-the-shelf software when your process is standard and the team can adapt.",
  "Consider custom software when the workflow is specific, cross-functional, or already held together by manual reconciliation.",
  "Start with a workflow map before deciding what to build.",
];

export function WhenCustom() {
  return (
    <section className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <EditorialLabel>Honest Advice</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Custom software is not always the answer.{" "}
              <em className="italic text-primary">But sometimes it is the right one.</em>
            </h2>
          </div>
          <div data-reveal data-reveal-delay="2" className="space-y-6">
            <p className="text-[17px] font-light leading-[1.85] text-muted">
              If a standard inventory or ERP tool fits your workflow, you should
              use it. We&apos;re useful when your operation is specific enough
              that off-the-shelf software forces the business into the wrong
              process — or when the real problem is the gap between accounting,
              stock, orders, warehouse work, and reporting.
            </p>
            <ul className="space-y-4">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3.5 text-[15px] font-light leading-[1.7] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import { WhenCustom } from "@/components/home/when-custom";` and render after `<Services />`:
```tsx
        <Services />
        <WhenCustom />
        <Process />
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add components/home/when-custom.tsx app/page.tsx
git commit -m "feat: add when-custom-makes-sense section to homepage"
```

---

### Task 9: EasyAccounts "Why this matters" block

**Files:**
- Modify: `lib/case-studies.ts` (add optional `whyItMatters` to the `CaseStudy` type; add the block to the `easyaccounts` entry; polish overview label).
- Create: `components/case-study/case-why-it-matters.tsx`.
- Modify: `app/work/[slug]/page.tsx` (render `<CaseWhyItMatters />` after `<CaseChallenge />`).

**Interfaces:**
- Produces: `CaseStudy.whyItMatters?: { label: string; headline: string[]; body: string; bullets: string[] }` consumed by the new component. Optional → only EasyAccounts renders it.

- [ ] **Step 1: Extend the `CaseStudy` type (`lib/case-studies.ts`)**

After the `spotlight?` block (around line 74) add:
```ts
  whyItMatters?: {
    label: string;
    headline: string[];
    body: string;
    bullets: string[];
  };
```

- [ ] **Step 2: Add the data to the EasyAccounts entry (brief §16.2)**

In `CASE_STUDIES.easyaccounts`, after the `overview` block (around line 770) add:
```ts
  whyItMatters: {
    label: "Why It Matters",
    headline: ["Why this matters for", "owner-led inventory businesses."],
    body: "EasyAccounts is proof that we understand more than screens and code. It handles the operational details that generic software often misses: units, branches, stock movements, ledgers, permissions, reports, audit trails, and the messy edge cases that appear when real staff use the system every day.",
    bullets: [
      "Multi-branch inventory visibility",
      "Real-time financial reporting",
      "Stock and cost tracing",
      "Role-based permissions",
      "Immutable audit logs",
      "Reports owners can trust",
    ],
  },
```
Also change the EasyAccounts `overview.label` from `"The Product"` to `"The System"` (line ~759).

- [ ] **Step 3: Create the component**

Create `components/case-study/case-why-it-matters.tsx` (mirrors `CaseOverview` layout + `CaseHeadline`):
```tsx
import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseWhyItMatters({ caseStudy }: Props) {
  const { whyItMatters } = caseStudy;
  if (!whyItMatters) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div data-reveal>
            <EditorialLabel tone="muted">{whyItMatters.label}</EditorialLabel>
            <CaseHeadline lines={whyItMatters.headline} className="mt-4" />
          </div>
          <div data-reveal data-reveal-delay="2" className="md:pt-2">
            <p className="text-[16px] font-light leading-[1.85] text-muted">
              {whyItMatters.body}
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {whyItMatters.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-[15px] font-light leading-[1.6] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Render it (`app/work/[slug]/page.tsx`)**

Add the import alongside the other case-study imports:
```tsx
import { CaseWhyItMatters } from "@/components/case-study/case-why-it-matters";
```
Render it right after `<CaseChallenge />` (line ~129):
```tsx
        {caseStudy.challenge && <CaseChallenge caseStudy={caseStudy} />}
        {caseStudy.whyItMatters && <CaseWhyItMatters caseStudy={caseStudy} />}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0. Visit `/work/easyaccounts` → the "Why this matters for owner-led inventory businesses" section appears after The Challenge. Other case studies are unchanged (no `whyItMatters` data).

- [ ] **Step 6: Commit**

```bash
git add lib/case-studies.ts components/case-study/case-why-it-matters.tsx app/work/[slug]/page.tsx
git commit -m "feat: add why-it-matters proof section to EasyAccounts case study"
```

---

### Task 10: Non-ICP case-study CTAs

**Files:**
- Modify: `components/case-study/case-cta.tsx:23-28` (fallback headline — used by `canonical-academy` and `hirecinch`, which have no `cta` object).
- Modify: `lib/case-studies.ts:725` (Xenia CTA wording).

- [ ] **Step 1: Update the fallback headline (`components/case-study/case-cta.tsx`)**

Replace the fallback `<>...</>` headline (lines 23-28) with brief §16.3:
```tsx
              <>
                Need production-grade engineering for a{" "}
                <em className="italic text-primary">system your team relies on?</em>
              </>
```
(The button label is already `Book a Workflow Review` from Task 2 Step 6.)

- [ ] **Step 2: Xenia CTA wording (`lib/case-studies.ts`)**

Line 725: `headline: ["Want infrastructure that", "scales with your product?"],` → `headline: ["Want infrastructure that", "scales with your operation?"],` (keep `emphasis: "infrastructure"`).

- [ ] **Step 3: Verify**

```bash
grep -rn "your product" app components lib
npx tsc --noEmit
```
Expected: grep returns **no matches**; `tsc` exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/case-study/case-cta.tsx lib/case-studies.ts
git commit -m "feat: ICP-align non-EasyAccounts case study CTAs"
```

---

## Phase 3 — SEO / content expansion

### Task 11: Use-case data module (`lib/use-cases.ts`)

> Scope decision: **first three** use cases — inventory-accuracy, manual-reporting, order-workflows (brief §17). Built data-first so the index + detail pages are thin.

**Files:**
- Create: `lib/use-cases.ts`.

**Interfaces:**
- Produces: `UseCase` type; `USE_CASES: UseCase[]`; `getUseCase(slug)`; `getAllUseCaseSlugs()`. Consumed by `app/use-cases/page.tsx`, `app/use-cases/[slug]/page.tsx`, `app/sitemap.ts`.

- [ ] **Step 1: Create `lib/use-cases.ts`**

```ts
export type UseCase = {
  slug: string;
  num: string;
  // Card / index
  cardTitle: string;
  cardBlurb: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Hero
  heroLead: string;
  heroEmphasis: string;
  subhead: string;
  // Problem
  problemHeadline: string;
  problemBullets: string[];
  // What we build
  buildHeadline: string;
  buildItems: string[];
  // Outcome line
  outcome: string;
};

export const USE_CASES: UseCase[] = [
  {
    slug: "inventory-accuracy",
    num: "01",
    cardTitle: "Inventory Accuracy",
    cardBlurb:
      "Stock movements, transfers, adjustments, and availability your team can actually trust.",
    metaTitle: "Inventory Accuracy Software for Wholesale & Distribution Teams",
    metaDescription:
      "Custom inventory systems that track stock movements, warehouse transfers, adjustments, and availability across the way your business actually works.",
    heroLead: "Stock numbers your team can",
    heroEmphasis: "actually trust.",
    subhead:
      "We build inventory systems that track stock movements, warehouse transfers, adjustments, and availability across the way your business actually works.",
    problemHeadline: "Where spreadsheets stop working.",
    problemBullets: [
      "Stock counts live in multiple spreadsheets.",
      "Sales and warehouse teams do not see the same availability.",
      "Adjustments are made without clear accountability.",
      "Reports become stale before decisions are made.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Stock movement ledger",
      "Location-level availability",
      "Transfer workflows",
      "Adjustment approval",
      "Product/SKU search",
      "Audit trail",
      "Owner dashboard",
    ],
    outcome:
      "One trusted view of stock — so sales, warehouse, and admin teams stop arguing about what's actually available.",
  },
  {
    slug: "manual-reporting",
    num: "02",
    cardTitle: "Manual Reporting",
    cardBlurb:
      "Owner-ready dashboards built around the questions you actually ask — without the weekly spreadsheet chase.",
    metaTitle: "Custom Reporting Dashboards for Inventory-Heavy Businesses",
    metaDescription:
      "Custom dashboards and reports built around the questions owners actually ask — stock, sales, purchases, margins, receivables, and branch performance.",
    heroLead: "Reports without the",
    heroEmphasis: "weekly spreadsheet chase.",
    subhead:
      "We build dashboards and reports around the questions owners actually ask — stock, sales, purchases, margins, receivables, and branch performance.",
    problemHeadline: "When reporting eats half a day.",
    problemBullets: [
      "Someone has to export, clean, and reconcile numbers by hand.",
      "Reports are stale by the time decisions get made.",
      "Each tool tells a slightly different story.",
      "Owners wait on staff to answer simple questions.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Owner dashboards",
      "Product/category performance",
      "P&L summaries",
      "Branch reports",
      "Purchase/sale trends",
      "PDF export where needed",
      "Drill-down to source transactions",
    ],
    outcome:
      "The numbers an owner needs, on demand — reconciled automatically and traceable back to the underlying transactions.",
  },
  {
    slug: "order-workflows",
    num: "03",
    cardTitle: "Order Workflows",
    cardBlurb:
      "Order status that everyone can see — sales, picking, dispatch, and backorders in one place.",
    metaTitle: "Custom Order Workflow Software for Wholesale & Distribution",
    metaDescription:
      "Custom order workflows for sales, warehouse, picking, dispatch, backorders, and notes — so everyone can see what needs to happen next.",
    heroLead: "Keep orders moving without losing status in",
    heroEmphasis: "email and spreadsheets.",
    subhead:
      "We build order workflows for sales, warehouse, picking, dispatch, backorders, and notes — so everyone can see what needs to happen next.",
    problemHeadline: "When order status lives in someone's memory.",
    problemBullets: [
      "Order status is spread across email, spreadsheets, and warehouse notes.",
      "Nobody is sure what has shipped and what is waiting.",
      "Backorders slip through the cracks.",
      "Handoffs between sales and warehouse lose information.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Order status pipeline",
      "Picking/packing views",
      "Backorder tracking",
      "Dispatch notes",
      "Customer/order history",
      "Internal comments",
      "Role-based access",
    ],
    outcome:
      "A single order pipeline everyone can see — so nothing stalls between sales, the warehouse, and dispatch.",
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((useCase) => useCase.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((useCase) => useCase.slug);
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add lib/use-cases.ts
git commit -m "feat: add use-case data module for first three use cases"
```

---

### Task 12: Use-case pages (index + detail)

**Files:**
- Create: `app/use-cases/page.tsx` (index, lists `USE_CASES`).
- Create: `app/use-cases/[slug]/page.tsx` (detail; `generateStaticParams` + `generateMetadata`).
- Modify: `app/sitemap.ts` (add use-case routes).

**Interfaces:**
- Consumes: `USE_CASES`, `getUseCase`, `getAllUseCaseSlugs` from Task 11; `LinkButton`, `EditorialLabel`, `AmbientBackground`, `SiteNav`, `SiteFooter`, `RevealController`, `CTA`.

- [ ] **Step 1: Create the index page `app/use-cases/page.tsx`**

Mirror the page shell used by `app/services/page.tsx`. Build a header + a card grid linking to each detail page + the shared `CTA`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { USE_CASES } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: "Operations Software Use Cases for Inventory-Heavy Businesses",
  description:
    "Custom software for inventory accuracy, manual reporting, and order workflows — built around how wholesale and distribution teams actually operate.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Operations Software Use Cases — TechTrinity",
    description:
      "Custom software for inventory accuracy, manual reporting, and order workflows.",
    url: "/use-cases",
    type: "website",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-24">
          <div className="hero-rise-sm max-w-[720px] [animation-delay:0.1s]">
            <EditorialLabel>Use Cases</EditorialLabel>
            <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
              The operational problems{" "}
              <em className="italic font-bold text-primary">we build around.</em>
            </h1>
            <p className="mt-7 max-w-[560px] text-[16px] font-light leading-[1.75] text-muted">
              Custom software for inventory-heavy wholesale, distribution, and
              multi-location businesses — built around the workflows that have
              outgrown spreadsheets and disconnected tools.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group relative flex flex-col rounded-lg border border-border bg-card p-10 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-primary/30 md:p-12"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                  {useCase.num}
                </span>
                <h2 className="mt-10 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.025em]">
                  {useCase.cardTitle}
                </h2>
                <p className="mt-4 max-w-[440px] text-[15px] font-light leading-[1.75] text-muted">
                  {useCase.cardBlurb}
                </p>
                <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    View Use Case
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[16px] text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
```

- [ ] **Step 2: Create the detail page `app/use-cases/[slug]/page.tsx`**

Follow the `app/services/[slug]/page.tsx` pattern (async params, `generateStaticParams`, `generateMetadata`, `notFound`). Render hero → problem → what-we-build → outcome → EasyAccounts proof link → CTA, reusing `LinkButton`/`EditorialLabel`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import {
  getAllUseCaseSlugs,
  getUseCase,
} from "@/lib/use-cases";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return { title: "Use Case" };
  const path = `/use-cases/${slug}`;
  return {
    title: { absolute: `${useCase.metaTitle} | TechTrinity` },
    description: useCase.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${useCase.metaTitle} — TechTrinity`,
      description: useCase.metaDescription,
      url: path,
      type: "website",
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Use Cases", path: "/use-cases" },
    { name: useCase.cardTitle, path: `/use-cases/${useCase.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AmbientBackground />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
          <div className="hero-rise-sm max-w-[860px] [animation-delay:0.1s]">
            <EditorialLabel>Use Case {useCase.num}</EditorialLabel>
            <h1 className="mt-5 font-display text-[clamp(44px,6.5vw,96px)] font-black leading-[0.96] tracking-[-0.04em]">
              {useCase.heroLead}{" "}
              <em className="italic font-bold text-primary">{useCase.heroEmphasis}</em>
            </h1>
            <p className="mt-7 max-w-[600px] text-[17px] font-light leading-[1.75] text-muted">
              {useCase.subhead}
            </p>
            <div className="mt-10">
              <LinkButton href="/contact" variant="accent" size="lg">
                Book a Workflow Review
              </LinkButton>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-border py-24 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
              <div data-reveal>
                <EditorialLabel>The Problem</EditorialLabel>
                <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.025em]">
                  {useCase.problemHeadline}
                </h2>
              </div>
              <ul data-reveal data-reveal-delay="2" className="space-y-5">
                {useCase.problemBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3.5 text-[16px] font-light leading-[1.7] text-muted"
                  >
                    <span aria-hidden className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className="border-t border-border bg-card py-24 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="mb-12" data-reveal>
              <EditorialLabel>What We Build</EditorialLabel>
              <h2 className="mt-3.5 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
                {useCase.buildHeadline}
              </h2>
            </div>
            <ul data-reveal data-reveal-delay="1" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCase.buildItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-5 text-[15px] font-light leading-[1.5] text-foreground"
                >
                  <span aria-hidden className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outcome + proof */}
        <section className="border-t border-border py-24 md:py-28">
          <div className="mx-auto max-w-[820px] px-6 text-center md:px-12">
            <p className="font-display text-[clamp(24px,3vw,38px)] font-bold leading-[1.2] tracking-[-0.02em]">
              {useCase.outcome}
            </p>
            <Link
              href="/work/easyaccounts"
              className="mt-9 inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              See the EasyAccounts Case Study <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="border-y border-border bg-card py-24 md:py-28">
          <div className="mx-auto max-w-[760px] px-6 text-center md:px-12">
            <EditorialLabel>Next Step</EditorialLabel>
            <h2 className="mt-4 mb-8 font-display text-[clamp(34px,4.6vw,64px)] font-black leading-[0.98] tracking-[-0.035em]">
              Ready to fix this{" "}
              <em className="italic text-primary">in your operation?</em>
            </h2>
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
          </div>
        </section>
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
```
> Note: `breadcrumbSchema` returns a single object; `JsonLd` accepts an object or array — passing the object directly is fine (see `lib/site.tsx`).

- [ ] **Step 3: Add use-case routes to the sitemap (`app/sitemap.ts`)**

Import the helper and add a route group. After the `serviceRoutes` block (line ~49) add:
```ts
  const useCaseRoutes: MetadataRoute.Sitemap = getAllUseCaseSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/use-cases/${slug}`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );
```
Add `{ url: `${SITE_URL}/use-cases`, lastModified: new Date("2026-06-22"), changeFrequency: "monthly", priority: 0.8 }` to `staticRoutes`, add the import `import { getAllUseCaseSlugs } from "@/lib/use-cases";`, and include `...useCaseRoutes` in the final returned array.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0; build statically generates `/use-cases`, `/use-cases/inventory-accuracy`, `/use-cases/manual-reporting`, `/use-cases/order-workflows`. Hit each route in `npm run dev`: one `h1`, section `h2`s, CTA → `/contact`. `curl -s localhost:3000/sitemap.xml | grep use-cases` lists all four.

- [ ] **Step 5: Commit**

```bash
git add app/use-cases app/sitemap.ts
git commit -m "feat: add use-cases index and detail pages with sitemap entries"
```

---

### Task 13: Navigation & footer updates

**Files:**
- Modify: `components/home/nav.tsx:8-13` (add "Use Cases").
- Modify: `components/home/site-footer.tsx:9-20` (add "Use Cases" + positioning line).
- Modify: `components/contact/contact-chips.tsx:47` (LinkedIn URL consistency — see note).

- [ ] **Step 1: Desktop nav (`components/home/nav.tsx`)**

Add a Use Cases entry to `NAV_LINKS` (brief §18.1), placing it after Services:
```tsx
const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];
```

- [ ] **Step 2: Footer links + positioning line (`components/home/site-footer.tsx`)**

Add `{ href: "/use-cases", label: "Use Cases" }` to `FOOTER_LINKS` after Services. Then add the positioning line (brief §18.2). Replace the brand `<span>` row (around line 27) so the brand name is followed by the positioning line:
```tsx
          <div className="flex flex-col gap-2">
            <span className="font-display text-[19px] font-bold tracking-[-0.03em]">
              TechTrinity
            </span>
            <span className="max-w-[320px] text-[12px] font-light leading-[1.6] text-muted-foreground">
              Custom operations software for inventory-heavy businesses that
              have outgrown spreadsheets.
            </span>
          </div>
```
(Keep the links `<ul>` and the `© 2026 TechTrinity` span; the flex wrap layout still works.)

- [ ] **Step 3: LinkedIn URL consistency (`components/contact/contact-chips.tsx`)**

The footer + org schema use `https://www.linkedin.com/company/108867952`, but the contact chip uses `https://www.linkedin.com/company/techtrinity`. Align the chip to the canonical one used elsewhere:
```tsx
  { href: "https://www.linkedin.com/company/108867952", label: "LinkedIn", icon: LinkedInIcon },
```
> **Owner confirmation needed (brief §26):** confirm which LinkedIn URL is correct; if the vanity slug `/company/techtrinity` is live, prefer it everywhere instead. Flag in the handoff.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0. Nav shows Work · Services · Use Cases · About · Blog · Book a Call; footer shows the positioning line + Use Cases link. Check mobile width: nav button still fits (links are hidden under `md`).

- [ ] **Step 5: Commit**

```bash
git add components/home/nav.tsx components/home/site-footer.tsx components/contact/contact-chips.tsx
git commit -m "feat: add Use Cases to nav/footer and align LinkedIn URL"
```

---

### Task 14: Blog category re-alignment (schema + frontend + content migration)

> **Decision confirmed:** adopt the six ICP categories now (brief §14.3). This changes a Sanity enum tied to existing post documents, so it includes a **content migration** of any live posts. Treat the migration as gated on what the dataset actually contains.

**Files:**
- Modify: `sanity/schemas/post.ts:4-10` (`POST_CATEGORIES`).
- Modify: `lib/blog-types.ts:52-58` (`CATEGORY_SLUGS` — TypeScript enforces key parity with `POST_CATEGORIES`).
- Content migration: re-tag existing posts (Studio or Sanity MCP) — see Step 3.

**Interfaces:**
- Produces: new `POST_CATEGORIES` tuple; `PostCategory` (derived) updates automatically; `CATEGORY_SLUGS` must have exactly the new keys or `tsc` fails.

- [ ] **Step 1: Update the schema enum (`sanity/schemas/post.ts`)**

Replace lines 4-10:
```ts
export const POST_CATEGORIES = [
  "Inventory Accuracy",
  "Warehouse Workflows",
  "Manual Reporting",
  "Custom vs Off-the-Shelf",
  "Multi-Location Operations",
  "Software Audits",
] as const;
```

- [ ] **Step 2: Sync the slug map (`lib/blog-types.ts`)**

Replace `CATEGORY_SLUGS` (lines 52-58) with the matching keys:
```ts
export const CATEGORY_SLUGS: Record<PostCategory, string> = {
  "Inventory Accuracy": "inventory-accuracy",
  "Warehouse Workflows": "warehouse-workflows",
  "Manual Reporting": "manual-reporting",
  "Custom vs Off-the-Shelf": "custom-vs-off-the-shelf",
  "Multi-Location Operations": "multi-location-operations",
  "Software Audits": "software-audits",
};
```
Run `npx tsc --noEmit` — if any key is missing/misspelled, the `Record<PostCategory, string>` type errors here. That is the compile-time test for this change.

- [ ] **Step 3: Migrate existing post documents**

Existing posts still hold old category strings (`Engineering`, `Product`, `Founders`, `Case Studies`, `Agency Life`). After Step 1 those values are no longer valid dropdown options and won't match any filter chip. **First enumerate, then re-tag.**

(a) List current posts + categories (Sanity MCP `query_documents`, or Vision in `/studio`, or `npx sanity documents query`):
```groq
*[_type == "post"]{ _id, title, category }
```
(b) Map each old category to a new one. Recommended default mapping (confirm with owner):
- `Engineering` → `Custom vs Off-the-Shelf`
- `Product` → `Manual Reporting`
- `Founders` → `Custom vs Off-the-Shelf`
- `Case Studies` → `Inventory Accuracy`
- `Agency Life` → `Software Audits`
(c) Patch each document's `category` (Sanity MCP `patch_documents`, or edit in `/studio` and re-publish). Example MCP patch per id:
```
patch_documents: set category = "<new category>" where _id == "<post id>"
```
(d) Re-verify nothing holds an old value:
```groq
*[_type == "post" && !(category in ["Inventory Accuracy","Warehouse Workflows","Manual Reporting","Custom vs Off-the-Shelf","Multi-Location Operations","Software Audits"])]{ _id, title, category }
```
Expected: empty result.

> If the dataset has **zero** posts (the index already renders an empty state), Step 3 is a no-op — record that in the handoff.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run build
```
Expected: exit 0. On `/blog`, the category filter chips now read the six ICP categories. With posts present, each post falls under a valid chip; with no posts, the empty state from Task 4 shows.

- [ ] **Step 5: Commit**

```bash
git add sanity/schemas/post.ts lib/blog-types.ts
git commit -m "feat: re-align blog categories to ICP taxonomy"
```
(The content migration in Step 3 lives in Sanity, not git.)

---

### Task 15: Structured-data confirmation

> Most schema is already correct after earlier tasks: `organizationSchema()`/`websiteSchema()` descriptions (Task 1), `serviceSchema` uses `service.title` which is now the operations names (Task 5), case-study `Article` schema is content-driven. This task is a verification-only pass (brief §19) — no new code unless a gap is found.

**Files:**
- Verify only: `lib/site.tsx`, `app/services/[slug]/page.tsx`, `app/work/[slug]/page.tsx`.

- [ ] **Step 1: Confirm org + service schema output**

Run `npm run dev`, then for the homepage and a service page, view source / use a structured-data check:
```bash
curl -s localhost:3000/ | grep -o '"@type":"Organization"[^<]*' | head -1
curl -s localhost:3000/services/product-sprint | grep -o '"serviceType":"[^"]*"'
```
Expected: Organization description is the ICP org string; `serviceType` reads `Complete Operations System Build` (no "SaaS/MVP" service names anywhere — brief §19.2).

- [ ] **Step 2: Confirm `sameAs` LinkedIn**

Confirm `ORG_SAME_AS` in `lib/site.tsx` matches the LinkedIn URL the owner confirmed in Task 13. If the owner chooses the vanity slug, update `ORG_SAME_AS` to match. Otherwise no change.

- [ ] **Step 3: Commit (only if a change was made)**

```bash
git add lib/site.tsx
git commit -m "chore: confirm structured data aligns with ICP service names"
```

---

### Task 16: Final verification & handoff

**Files:** none (verification + report only). Optional hardening noted in Step 4.

- [ ] **Step 1: Full build gates**

```bash
npm run lint
npx tsc --noEmit
npm run build
```
Expected: all exit 0, no broken routes reported by the build.

- [ ] **Step 2: Content QA grep sweep (brief §22.1)**

```bash
grep -rniE "boutique|saas mvp|\bMVP\b|product studio|non-technical founder|your product\b|fraction of what" app components lib | grep -viE "productType|product-sprint|product cost trace|reports-product-cost"
```
Expected: **no matches** other than the documented, allowed case-study screenshot filenames/alts (`reports-product-cost-trace.png`, "product cost trace" — a real EasyAccounts report name) and the `product-sprint` URL slug. Confirm each remaining hit is one of those allowed exceptions.

- [ ] **Step 3: Route + link smoke test**

In `npm run dev`, load `/`, `/services`, each `/services/<slug>`, `/use-cases`, each `/use-cases/<slug>`, `/about`, `/blog`, `/contact`, `/work/easyaccounts`, `/work/canonical-academy`, `/work/xenia`, `/work/hirecinch`. Confirm: no 404s/console errors, nav + footer show Use Cases, every page's primary CTA reads "Book a Workflow Review" (nav button "Book a Call"), and `/sitemap.xml` + `/robots.txt` still render.

- [ ] **Step 4 (optional hardening — owner decision):** add `vitest` and `lib/contact.test.ts`

If the owner approves a dev-dependency (brief §21 asks first), add `vitest` and a unit test covering `validateContact` (required name/email/message, email regex, optional fields ignored). Add a `"test": "vitest run"` script. Skip if the owner prefers to keep zero test deps.

- [ ] **Step 5: Write the handoff report (brief §26)**

Produce a summary covering: files changed, copy/SEO changes, routes updated, new routes added (`/use-cases`, 3 detail pages), contact payload/backend/email changes, commands run + results, assumptions, and **open owner items**: confirm metrics (50+/180,000+/100,000+/172+ — all already present and unchanged), confirm LinkedIn URL (Task 13), confirm service names/pricing (pricing unchanged), confirm the blog category migration mapping (Task 14 Step 3), and confirm whether use-case pages publish now or stay unlinked.

---

## Self-Review

**1. Spec coverage** (brief section → task):
- §4 global language / §24 snippets → Tasks 1, 2, 5, 6, 10 (sweeps + grep gate in 16).
- §5 metadata (5.1–5.5) → Task 1 (global/home), Task 3a (contact), Task 4 (blog), Task 5 (services, incl. `metaTitle`), Task 12 (use-cases), Task 6/Task 1 (about title — see note below).
- §6 CTAs → Task 2 (+ standard label everywhere).
- §7 homepage (7.2 meta, 7.3 hero kept, 7.4 cards, 7.5 price, 7.6 pain, 7.7 when-custom) → Tasks 1, 2, 5, 7, 8. *7.3 hero body: brief says current is fine to keep; plan keeps it and only changes the CTA label — intentional.*
- §8 services → Task 5. §9–12 service details → Task 5 (data) + Task 2 (CTA body).
- §13 contact → Tasks 3a + 3b. §14 blog → Tasks 4 (copy/empty/meta) + 14 (categories).
- §15 about → Task 6 (copy) + Task 2 (CTA) + **about metadata title** (see gap fix below).
- §16 work/case studies → Tasks 9 (EasyAccounts why-it-matters) + 10 (non-ICP CTAs).
- §17–18 use cases + nav/footer → Tasks 11, 12, 13.
- §19 schema → Tasks 1 + 5 + 15. §20 a11y → enforced inline (labels in 3b, heading hierarchy in 7/8/12). §21 perf → no deps; gates in 16. §22 QA → Task 16. §23 order → phases match. §25 do-not-break → Global Constraints. §26–27 handoff/acceptance → Task 16 Step 5.

**Gap found & fixed:** brief §5.5 sets the `/about` title to "About TechTrinity — Operations Software for Inventory-Heavy Businesses", but no task changed `app/about/page.tsx` metadata. **Add to Task 6** a step: replace the about `metadata` `title: "About"` with `title: { absolute: "About TechTrinity — Operations Software for Inventory-Heavy Businesses" }` and update its OG title/description to the same ICP string + the §5.4 description. (The existing about description is already ICP-aligned; tightening it is optional.)

**Gap found & fixed:** brief §16.1 wants "See the EasyAccounts Case Study" links from Home/Services/About/Contact. The blog empty-state (Task 4) and use-case outcome (Task 12) already add such links; the homepage `Work` section already links to `/work/easyaccounts` ("View Case Study"). No new task required, but note in handoff that adding an explicit "See the EasyAccounts Case Study" secondary CTA on Services/About is optional polish, not required for acceptance.

**2. Placeholder scan:** no "TBD/handle edge cases/similar to Task N" — each step has exact strings/paths/code. The only deliberately deferred item is the blog content migration mapping (Task 14 Step 3), which is owner-confirmable by design (the dataset contents are unknown and `.env` is read-restricted).

**3. Type consistency:** contact field key `focus` (was `projectType`) is used identically across `lib/contact.ts`, `contact-form.tsx`, and `route.ts` (Tasks 3a/3b). `ServiceDetail.metaTitle?` defined in Task 5 Step 1 and consumed in Step 3. `CaseStudy.whyItMatters?` defined and consumed in Task 9. `UseCase` field names in Task 11 match their consumption in Task 12. `POST_CATEGORIES` ↔ `CATEGORY_SLUGS` parity is compiler-enforced (Task 14).
