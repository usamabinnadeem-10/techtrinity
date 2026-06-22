# TechTrinity Website ICP Alignment Implementation Brief

**Prepared for:** AI coding agent (Claude Code, Codex, Cursor agent, etc.)  
**Website:** `https://www.techtrinity.ai`  
**Primary goal:** Make every page of TechTrinity’s website speak directly to the updated ICP: owner-led, inventory-heavy businesses whose operations have outgrown spreadsheets, accounting software, email, warehouse notes, and disconnected tools.  
**Document version:** 1.0  
**Prepared date:** 2026-06-20  

---

## 0. How to use this document

You are an AI coding agent working inside the TechTrinity website codebase.

Your job is to update the site so that a visitor from the target ICP can immediately recognize:

1. TechTrinity understands their operational problem.
2. TechTrinity solves problems around inventory, stock accuracy, warehouse/order workflows, purchasing, reporting, and multi-location coordination.
3. TechTrinity is not a generic SaaS/MVP/product studio.
4. TechTrinity is not merely an offshore development vendor.
5. TechTrinity has credible proof through EasyAccounts and other relevant production systems.

Do **not** blindly rewrite everything. Inspect the repository first, understand the routing/component structure, then apply the page-by-page instructions below.

---

## 1. Canonical ICP

Use this ICP as the single source of truth for all copy, SEO, forms, CTA language, page structure, and content hierarchy.

### 1.1 Primary ICP statement

Owner-led wholesale, distribution, import/export, light manufacturing, or inventory-heavy retail business in the US, UK, or Australia with:

- 10–75 employees.
- Roughly $1M–$15M annual revenue.
- 500+ SKUs or recurring stock movement.
- Operations split across accounting software, spreadsheets, email, warehouse notes, WhatsApp/team chats, old desktop tools, or disconnected SaaS tools.
- Recent trigger such as:
  - stock errors,
  - overselling,
  - delayed reports,
  - new warehouse/location,
  - hiring an operations/warehouse/inventory/finance/admin role,
  - manual reconciliation taking several hours per week,
  - dissatisfaction with off-the-shelf SaaS.

### 1.2 Primary buyers

Use these buyer labels across the site:

- Owner
- Founder
- Managing Director
- President
- General Manager
- Operations Manager
- Warehouse Manager
- Finance/Admin Manager

Avoid using these as the primary audience:

- SaaS founder
- Startup founder
- Pre-seed founder
- App founder
- Product founder
- Creator
- Technical cofounder
- Enterprise procurement team

### 1.3 Core pains to emphasize

The website should repeatedly and consistently speak to these pains:

| Pain | What the buyer thinks/says | Website language to use |
|---|---|---|
| Stock accuracy | “We do not fully trust the numbers.” | trusted stock, real-time inventory, stock movements, fewer stock mismatches |
| Manual reporting | “Reports take hours and someone has to compile them.” | automated dashboards, owner-ready reporting, fewer manual reconciliations |
| Order processing | “Orders move through email, spreadsheets, and warehouse notes.” | order workflow, picking/dispatch status, fewer missed steps |
| Purchasing/replenishment | “We realize too late when stock is low.” | reorder alerts, purchase planning, supplier/order history |
| Multi-location coordination | “Each branch/warehouse has its own view.” | location-level stock, transfers, one shared operational view |
| Adoption risk | “The team will not use something complicated.” | simple screens, workflow-first build, built around how your team already works |

### 1.4 Positioning rule

Use this positioning everywhere:

> Simple custom operations software for inventory-heavy businesses whose current workflow has outgrown spreadsheets, accounting software, and disconnected tools.

Do **not** lead with:

- “Boutique SaaS Product Studio”
- “We build MVPs”
- “We build products”
- “Cheap offshore development”
- “We can build anything”
- “React/Next.js/Django experts” as the main message
- “For non-technical founders”
- “Build your SaaS idea”

Technology stack can appear later as credibility, but it must not be the headline.

---

## 2. Evidence base to support the messaging

These findings are included so the coding agent understands why the messaging changes matter. Use the facts carefully; do not overclaim.

### 2.1 Manual work and disconnected tools are a real pain

Source: Intuit QuickBooks Business Solutions Survey 2024  
URL: `https://www.intuit.com/enterprise/blog/research/business-solutions-survey-2024/`

Relevant facts:

- 95% of respondents reported challenges with their current digital business solutions.
- 54% cited manual/repetitive tasks.
- 45% cited inadequate reporting and analysis.
- Respondents reported spending an average of 25 hours per week on manual data entry or reconciling data across apps.
- 72% wanted more automation to reduce manual work.
- 64% wanted better integration capabilities.

Use these facts to support copy about:

- manual reconciliation,
- disconnected tools,
- reporting delays,
- the need for integrated workflow systems.

### 2.2 Manufacturing and operational businesses still suffer from manual processes

Source: SME + Laserfiche manufacturing study  
URL: `https://www.sme.org/aboutsme/newsroom/press-releases/2023/manufacturers-challenged-with-manual-operations-and-work-delays--according-to-sme-and-laserfiche-study/`

Relevant facts:

- The study surveyed 300+ manufacturing professionals in organizations with 101+ employees.
- Only a third had completely automated certain operational areas.
- 62% experienced work delays related to inventory data.
- 62% experienced work delays related to manufacturing throughput times.
- 62% experienced work delays related to equipment effectiveness.
- 62% experienced work delays related to equipment capacity utilization.

Use this to support inclusion of light manufacturing and production-adjacent workflows.

### 2.3 Small inventory businesses still use manual/spreadsheet methods

Source: Capterra inventory management/spreadsheets buyer research  
URL: `https://www.capterra.com/resources/inventory-management-excel/`

Relevant facts:

- Around 34% of SMBs rely on manual methods for inventory.
- Around 24% rely on spreadsheets.
- Inventory buyers switch because of inefficiency and limited functionality.
- Reporting, stock levels, supplies tracking, scanning, and inventory systems are common upgrade priorities.

Use this to justify copy about spreadsheets breaking as SKUs, orders, people, and locations grow.

### 2.4 The target geographies contain large enough business pools

Sources:

- UK Business Population Estimates 2025  
  URL: `https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release`
- U.S. SBA 2024 Small Business Profile  
  URL: `https://advocacy.sba.gov/wp-content/uploads/2024/11/United_States.pdf`
- Australian Bureau of Statistics business counts 2024–25  
  URL: `https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release`

Relevant facts:

- UK had 5.7M private-sector businesses at the start of 2025.
- UK had 220,085 businesses with 10–49 employees and 38,435 with 50–249 employees.
- UK Wholesale and Retail Trade accounted for 547,000 SMEs and 32% of SME turnover.
- U.S. SBA 2024 profile reported 34.8M small businesses and 664,634 small businesses in wholesale trade.
- Australia had 2,729,648 actively trading businesses as of 30 June 2025, including 994,178 employing businesses.

Use these facts only in internal content, blog content, or “why this matters” sections. Do not overload the homepage hero with statistics.

---

## 3. Current site audit summary

The live website is already partially aligned with the updated ICP, especially the homepage, Services page, About page, and EasyAccounts case study.

The remaining issue is **consistency**. A visitor can land on an ICP-aligned homepage and then click into pages that still use generic “product,” “SaaS,” or “founder” language.

### 3.1 Pages that are mostly aligned already

- `/`
- `/services`
- `/services/product-sprint`
- `/services/build-only`
- `/services/growth-retainer`
- `/services/technical-audit`
- `/about`
- `/work/easyaccounts`

### 3.2 Pages/areas that need immediate updates

- Global metadata/title tags.
- CTA sections that say “product” instead of “operation” or “workflow.”
- `/contact`
- `/blog`
- Service names and service detail wording.
- Case study CTAs that use product/startup language.
- Any remaining references to “Boutique SaaS Product Studio,” “SaaS MVP,” “non-technical founders,” “product,” “project,” or “MVP” when speaking to the primary ICP.

---

## 4. Global messaging rules

Apply these throughout the codebase.

### 4.1 Replace generic language

Search the codebase for these terms and revise them where they are customer-facing:

| Current wording | Replace with |
|---|---|
| Boutique SaaS Product Studio | Custom Operations Software Studio |
| SaaS Product Studio | Operations Software Studio |
| SaaS MVP | Custom Operations System |
| MVP | first operational system / focused workflow build |
| product | operation / workflow / system |
| project | operation / workflow problem / system build |
| non-technical founders | owner-led inventory-heavy businesses |
| founders | owners / operators / managing directors |
| users | team / staff / warehouse team / admin team |
| product demo | workflow review / discovery call |
| build something worth building | build software your operation will actually use |
| tell us about your product | tell us what is slowing your operation down |
| your product and whether we are the right fit | your operation and whether a custom system makes sense |

### 4.2 Use these repeated phrases

Use these phrases across pages for consistency:

- “inventory-heavy businesses”
- “wholesale and distribution businesses”
- “owner-led operations”
- “stock, warehouse, order, purchasing, and reporting workflows”
- “outgrown spreadsheets”
- “accounting software handles accounts, but operations live elsewhere”
- “built around how your team already works”
- “simple enough for non-technical staff”
- “trusted stock and reporting”
- “one shared operational view”
- “map the workflow before writing code”
- “custom software only where it makes operational and financial sense”

### 4.3 Avoid these phrases

Avoid the following unless the context is clearly a case study and not the main offer:

- “SaaS founder”
- “startup”
- “MVP”
- “pre-seed”
- “seed-stage”
- “app idea”
- “build your product”
- “product studio”
- “we can build anything”
- “cheap offshore development”
- “fraction of what a US/UK agency charges” as a primary selling point

---

## 5. Global SEO and metadata updates

Inspect how metadata is currently implemented. It may be in Next.js `metadata` exports, page-level constants, `Head` components, or a site config file.

### 5.1 Homepage metadata

Set the homepage title to:

```txt
Custom Operations Software for Wholesale & Distribution Businesses | TechTrinity
```

Set the homepage meta description to:

```txt
TechTrinity builds simple inventory, warehouse, order, and reporting software for owner-led wholesale and distribution businesses that have outgrown spreadsheets.
```

Open Graph title:

```txt
Custom Operations Software for Inventory-Heavy Businesses
```

Open Graph description:

```txt
Inventory, warehouse, order, and reporting systems built around how your operation actually runs.
```

### 5.2 Global site name

Use:

```txt
TechTrinity
```

### 5.3 Default/fallback title template

Use:

```txt
%s | TechTrinity
```

### 5.4 Default/fallback description

Use:

```txt
Simple custom operations software for inventory-heavy businesses whose workflows have outgrown spreadsheets, accounting software, and disconnected tools.
```

### 5.5 Service page metadata

Use these page titles:

| Page | Title |
|---|---|
| `/services` | Custom Operations Software Services for Inventory-Heavy Businesses |
| `/services/product-sprint` | Complete Operations System Build |
| `/services/build-only` | Defined Workflow Software Build |
| `/services/growth-retainer` | Ongoing Operations Software Improvements |
| `/services/technical-audit` | Existing Operations Software Audit |
| `/contact` | Talk to TechTrinity About Your Operations Workflow |
| `/blog` | Inventory, Operations & Custom Software Notes |
| `/about` | About TechTrinity — Operations Software for Inventory-Heavy Businesses |

---

## 6. Global CTA updates

### 6.1 Primary CTA label

Use:

```txt
Book a Workflow Review
```

or:

```txt
Book a Discovery Call
```

Prefer “Book a Workflow Review” on pages where the visitor has pain but may not yet think they need software.

### 6.2 Secondary CTA labels

Use:

```txt
See EasyAccounts Case Study
```

```txt
Send a Message
```

```txt
See How We Work
```

### 6.3 CTA section replacement copy

Replace generic final CTA sections like:

```txt
Ready to build something worth building?
Book a free 30-minute discovery call. No pitch, no pressure — just an honest conversation about your product.
```

with:

```txt
Ready to fix the workflow that keeps slowing your team down?

Book a free 30-minute workflow review. No pitch, no pressure — just an honest conversation about how your stock, order, warehouse, purchasing, or reporting process works today, where it breaks, and whether a custom system makes sense.
```

Shorter version:

```txt
Ready to replace the spreadsheet patchwork?

Book a free 30-minute call. We will learn how your operation runs today and tell you honestly whether a custom system is the right next step.
```

---

## 7. Homepage implementation instructions

Route: `/`

### 7.1 Keep the current direction

The current hero already says:

- Custom Operations Software
- wholesale, distribution, and multi-location teams
- spreadsheets
- stock errors
- inventory, warehouse, and reporting tools

This is good and should remain.

### 7.2 Update page title/metadata

The live page title was observed as “TechTrinity — Boutique SaaS Product Studio.” Replace it using the metadata instructions above.

### 7.3 Tighten hero copy

Current hero body is already strong. You may keep it or use this sharper version:

```txt
Wholesale, distribution, and multi-location teams lose hours to spreadsheets, stock errors, and systems nobody trusts.

We map how your operation actually runs — then build the inventory, warehouse, order, and reporting tools that fit it. Not another SaaS template you have to bend your business around.
```

### 7.4 Update service cards

Current card names:

- Product Sprint
- Build-Only
- Growth Retainer
- Technical Audit

Recommended names:

| Current | New |
|---|---|
| Product Sprint | Complete Operations System Build |
| Build-Only | Defined Workflow Build |
| Growth Retainer | Ongoing Operations Improvements |
| Technical Audit | Existing System Audit |

If changing URLs is risky, keep current URLs for now but update labels. Use redirects only if new URLs are added.

Recommended card copy:

#### Complete Operations System Build

```txt
For businesses running stock, orders, purchasing, and reporting across spreadsheets, accounting software, and warehouse notes. We map the workflow, design the system, build it, and help your team launch. 8–16 weeks.
```

#### Defined Workflow Build

```txt
Already know the exact workflow you need fixed? We build one focused system — stock lookup, order tracking, purchasing, reporting, transfers, or another defined operational workflow — without a long discovery phase.
```

#### Ongoing Operations Improvements

```txt
For live systems your team already relies on. We stay close to the codebase and keep improving it as you add products, people, locations, and new ways of working.
```

#### Existing System Audit

```txt
Running software nobody fully understands? We review the code, data, security, reliability, and workflow fit — then tell you what to fix, what to replace, and what to leave alone.
```

### 7.5 Reframe price comparison

Current copy says:

```txt
A fraction of what a US or UK agency charges for the same scope — quoted upfront, no surprises.
```

Replace with:

```txt
Clear fixed-scope pricing agreed upfront — built by a senior team that maps the operation before writing code.
```

Reason: The ICP document says not to lead with cheap/offshore development. Price can remain, but the primary value should be operational fit, trust, and adoption.

### 7.6 Add an “operational pain” section if not already present

Add a section after the hero or after “Spreadsheets made sense. Until they didn’t.”

Heading:

```txt
The problems we usually walk into
```

Cards:

1. **Stock numbers nobody fully trusts**  
   ```txt
   Sales, warehouse, and admin teams each have a different version of what is available.
   ```

2. **Reports that take hours to compile**  
   ```txt
   The owner waits for someone to export, clean, and reconcile numbers before decisions can be made.
   ```

3. **Orders scattered across tools**  
   ```txt
   Order status lives in email, spreadsheets, warehouse notes, and someone’s memory.
   ```

4. **Purchasing that reacts too late**  
   ```txt
   Low stock is noticed after the sale is already at risk.
   ```

5. **Branches or warehouses working from different views**  
   ```txt
   Transfers, availability, and accountability become harder as locations grow.
   ```

6. **Software the team avoids using**  
   ```txt
   Overbuilt systems fail when warehouse and admin staff cannot use them easily.
   ```

### 7.7 Add a “when custom makes sense” section

Heading:

```txt
Custom software is not always the answer. But sometimes it is the right one.
```

Body:

```txt
If a standard inventory or ERP tool fits your workflow, you should use it. We are useful when your operation is specific enough that off-the-shelf software forces the business into the wrong process — or when the real problem is the gap between accounting, stock, orders, warehouse work, and reporting.
```

Bullets:

- Use off-the-shelf software when your process is standard and the team can adapt.
- Consider custom software when the workflow is specific, cross-functional, or already held together by manual reconciliation.
- Start with a workflow map before deciding what to build.

This section supports trust and avoids making custom software sound like the answer to everything.

---

## 8. Services page implementation

Route: `/services`

The current `/services` page is mostly aligned. Keep the overall structure.

### 8.1 Rename service labels

Update visible labels as follows:

| Current | New visible label |
|---|---|
| Product Sprint | Complete Operations System Build |
| Build-Only | Defined Workflow Build |
| Growth Retainer | Ongoing Operations Improvements |
| Technical Audit | Existing System Audit |

### 8.2 Keep URLs stable initially

Do not break existing URLs unless the project already has a redirect strategy.

Keep:

- `/services/product-sprint`
- `/services/build-only`
- `/services/growth-retainer`
- `/services/technical-audit`

Optionally add new canonical slugs later:

- `/services/operations-system-build`
- `/services/defined-workflow-build`
- `/services/ongoing-operations-improvements`
- `/services/existing-system-audit`

If adding new slugs, add permanent redirects from old slugs.

### 8.3 Update services page hero

Use:

```txt
Custom software for every stage of your operation.
```

Subhead:

```txt
For wholesale, distribution, light manufacturing, and multi-location businesses whose stock, order, warehouse, purchasing, and reporting workflows have outgrown spreadsheets and disconnected tools.
```

### 8.4 Update “Right Fit” section

Current section is strong. Replace or refine with:

```txt
We are a good fit if:
- Your operation has grown past what spreadsheets can manage.
- Stock, orders, purchasing, or reports are split across too many places.
- The owner or ops team cannot fully trust the numbers.
- You want software built around your workflow, not a SaaS template.
- You need something simple enough that warehouse/admin staff will actually use it.
- You are the decision-maker or can bring the decision-maker into the process.
```

```txt
We are not a good fit if:
- A standard SaaS tool already fits your workflow well.
- There is no real operational friction yet.
- You only want the cheapest developer.
- You need a rushed two-week build for a complex workflow.
- You want to resell the software as a SaaS product.
- You cannot give access to the people who actually run the process.
```

---

## 9. Product Sprint page implementation

Route: `/services/product-sprint`

### 9.1 Rename visible service

Change visible name from:

```txt
Product Sprint. The complete system.
```

to:

```txt
Complete Operations System Build
```

Optional subtitle:

```txt
The full workflow map, design, build, and launch.
```

### 9.2 Replace brief

Use:

```txt
You are running stock, orders, purchasing, reporting, and warehouse work across spreadsheets, accounting software, email, and a few things only one person knows how to do.

The Complete Operations System Build replaces the fragile patchwork with one focused system built around how your business already works. We map the process first, design the screens your team will actually use, build the system, and support the launch.
```

Second paragraph:

```txt
This is the right engagement when the problem is bigger than one screen or one report. You bring deep knowledge of the operation; we turn it into software that gives your team trusted data and clearer workflows.
```

### 9.3 Replace “Product Sprint” occurrences

Search page/component for:

```txt
Product Sprint
```

Replace visible text with:

```txt
Complete Operations System Build
```

Keep internal constant names only if changing them causes unnecessary refactor risk.

### 9.4 Update “Ideal For”

Use:

```txt
Owners of wholesale, distribution, light manufacturing, or multi-location businesses whose operation has outgrown spreadsheets, aging tools, or disconnected SaaS — and who want one system built properly around how the team actually works.
```

### 9.5 Update “What’s included”

Use or adapt:

- Workflow discovery and scoping.
- Current process map: stock, orders, purchases, returns, reporting, roles, and handoffs.
- Clickable design/prototype before development.
- Browser-based web app.
- Secure logins and role-based permissions.
- Inventory/order/reporting workflows based on agreed scope.
- Hosting, backups, and deployment setup.
- Launch support and team onboarding.
- Two weeks of post-launch support.

### 9.6 Update CTA

Heading:

```txt
Ready to replace the spreadsheet patchwork?
```

Body:

```txt
Book a free 30-minute workflow review. We will learn how your operation runs today and tell you honestly whether a custom system is the right next step.
```

---

## 10. Build-Only page implementation

Route: `/services/build-only`

### 10.1 Rename visible service

Change:

```txt
Build-Only. Defined scope, built fast.
```

to:

```txt
Defined Workflow Build
```

Subtitle:

```txt
One clear operational workflow, built cleanly.
```

### 10.2 Replace brief

Use:

```txt
Sometimes you already know exactly what needs to be fixed: a stock lookup tool, order tracking workflow, purchase planning screen, reporting dashboard, warehouse transfer process, or another specific part of the operation.

Defined Workflow Build is for one clearly scoped system. We build it cleanly, connect it where needed, and put it into your team’s hands without turning it into a full ERP project.
```

### 10.3 Update requirement section

Heading:

```txt
A clearly defined workflow.
```

Body:

```txt
This service works when the workflow is already understood. If the process still has open questions, hidden edge cases, or multiple teams disagreeing on how it should work, we will flag that and recommend starting with a short workflow discovery instead.
```

### 10.4 Update ideal-for section

```txt
Owners or operations teams who can clearly describe one workflow that needs to be built or replaced — and want it delivered without paying for a full discovery phase.
```

---

## 11. Growth Retainer page implementation

Route: `/services/growth-retainer`

### 11.1 Rename visible service

Change:

```txt
Growth Retainer. Your team. Monthly.
```

to:

```txt
Ongoing Operations Improvements
```

Subtitle:

```txt
Keep your live system fitting the business as it changes.
```

### 11.2 Replace brief

Use:

```txt
Your system is live and your team relies on it. But the business keeps changing — new locations, new product lines, new reports, new approval steps, new edge cases.

Ongoing Operations Improvements gives you a senior team that already understands your system and keeps improving it month after month, without the cost and delay of hiring or re-explaining everything to a new developer.
```

### 11.3 Update ideal-for section

```txt
Owners with a live operations system who want it to keep improving as the business grows — without hiring a full-time developer or starting over with someone new each time.
```

---

## 12. Technical Audit page implementation

Route: `/services/technical-audit`

### 12.1 Rename visible service

Change:

```txt
Technical Audit. Know what you have.
```

to:

```txt
Existing System Audit
```

Subtitle:

```txt
Find out whether your current software is helping, hurting, or worth replacing.
```

### 12.2 Replace brief

Use:

```txt
You are running software someone else built, an old internal system, or an off-the-shelf tool that has been patched around your operation for years. You are not sure whether to fix it, replace it, or stop investing in it.

The Existing System Audit gives you a plain-English assessment of the code, data, security, reliability, and workflow fit — so you know what is broken, what matters, and what to do next.
```

### 12.3 Update “What’s included”

Use or adapt:

- Review of current software structure and maintainability.
- Security/data-risk check.
- Review of database/data model where access is provided.
- Workflow-fit assessment: where the software does not match how the team works.
- Reliability/performance risks.
- Integration risks.
- Plain-English report ranked by urgency.
- 30-minute walkthrough call.

### 12.4 Update ideal-for section

```txt
Owners who inherited, bought, or commissioned software that no longer fits the operation — and want an honest second opinion before spending more money on it.
```

---

## 13. Contact page implementation

Route: `/contact`

This is a high-priority page. It currently contains product/SaaS/MVP language that does not match the ICP.

### 13.1 Replace hero copy

Current:

```txt
Tell us about your product and we'll get back to you within 6-8 hours. Or skip the form and book a call directly.
```

Replace with:

```txt
Tell us what is slowing your operation down. We will review it and get back to you within one business day. Or skip the form and book a workflow review directly.
```

### 13.2 Replace form labels

Current labels:

- Tell Us About Your Project
- What Best Describes Your Project?

Replace with:

```txt
Tell us what is slowing your operation down
```

```txt
What best describes the workflow you want to fix?
```

### 13.3 Replace dropdown options

Current options:

- SaaS MVP (Design + Build)
- SaaS MVP (Build Only)
- Growth Retainer
- Technical Audit
- Not sure yet

Replace with:

- Stock / inventory accuracy
- Order processing workflow
- Purchasing / replenishment
- Warehouse or branch coordination
- Manual reporting / dashboards
- Existing system audit
- Ongoing improvements to a live system
- Not sure yet

### 13.4 Add optional fields

Add these fields if the form implementation supports easy changes:

#### Company name

```txt
Company name
```

#### Your role

Options:

- Owner / Founder
- Managing Director / President
- General Manager
- Operations Manager
- Warehouse / Inventory Manager
- Finance / Admin
- Other

#### Current tools

Label:

```txt
What tools does your team use today?
```

Placeholder:

```txt
Example: QuickBooks, Xero, Excel, Google Sheets, Shopify, email, WhatsApp, old desktop software, paper notes
```

#### Business type

Options:

- Wholesale / distribution
- Import / export
- Light manufacturing
- Inventory-heavy retail
- Multi-location operations
- Other

#### Urgency

Options:

- Exploring
- Problem is annoying but not urgent
- Problem is costing time/money now
- Need to fix in the next 30–90 days

### 13.5 Update discovery call text

Current text mentions “your product.” Replace with:

```txt
Prefer to talk directly? Book a free 30-minute workflow review. No pitch, no pressure — just an honest conversation about how your stock, orders, warehouse, purchasing, or reporting process works today and whether we can help.
```

### 13.6 Form behavior

Do not break current submission behavior.

Before editing:

1. Identify whether the form posts to an API route, external service, email service, or static form provider.
2. Preserve all existing required fields and anti-spam handling.
3. If adding fields requires backend updates, update the backend payload and email template too.
4. Ensure validation messages are still clear.
5. Run type checks/build after changes.

---

## 14. Blog page implementation

Route: `/blog`

The current blog page says:

```txt
Thinking out loud about SaaS, product, and engineering.
Practical writing for non-technical founders and the engineers who build with them.
```

This is not aligned with the ICP.

### 14.1 Replace blog hero

Heading:

```txt
Notes on inventory, operations, and custom software.
```

Subheading:

```txt
Practical writing for owners and operators of inventory-heavy businesses — about stock accuracy, reporting, warehouse workflows, software decisions, and what to fix before you build.
```

### 14.2 Replace empty/loading state

If blog posts are not yet loaded or there are no posts, show:

```txt
We are preparing practical guides for owner-led wholesale, distribution, and inventory-heavy businesses. Start with the EasyAccounts case study to see the kind of operational problems we build around.
```

CTA:

```txt
Read the EasyAccounts Case Study
```

Link to:

```txt
/work/easyaccounts
```

### 14.3 Suggested blog categories

If the codebase supports categories/tags, add:

- Inventory Accuracy
- Warehouse Workflows
- Manual Reporting
- Custom vs Off-the-Shelf
- Multi-Location Operations
- Software Audits

### 14.4 Suggested first posts

Create placeholders only if the project already supports draft content. Otherwise add these to a TODO/comment or content backlog, not public broken pages.

Suggested article titles:

1. `When spreadsheets stop working for inventory-heavy businesses`
2. `Why QuickBooks or Xero is not enough for warehouse operations`
3. `Custom software vs Odoo/Cin7/Zoho: how to decide`
4. `The workflow map every distributor should create before buying software`
5. `Why stock numbers stop being trusted as teams and locations grow`
6. `The first operational system to build before a full ERP`

---

## 15. About page implementation

Route: `/about`

The About page is strong and should not be heavily rewritten.

### 15.1 Fix remaining generic/product language

Search for:

```txt
product
```

Where the meaning is the client’s system/product, replace with:

```txt
system
```

or:

```txt
operation
```

Example current quote:

```txt
The person you speak to in the discovery call is the person building your product.
```

Replace with:

```txt
The person you speak to in the discovery call is the person mapping and building your system.
```

### 15.2 Keep EasyAccounts founder story

The EasyAccounts story is highly relevant. Keep and strengthen it.

Possible addition after the EasyAccounts paragraph:

```txt
That experience shapes how we build today: start with the movement of stock, orders, money, and responsibility — then design software around the people who actually do the work.
```

### 15.3 CTA update

Current:

```txt
Want to work with a team that actually gives a damn?
```

This can stay if brand voice permits, but for the ICP a slightly more practical CTA may work better:

```txt
Want a team that understands the operational mess before writing code?
```

Body:

```txt
Book a free workflow review. We will go deep on how your operation runs and tell you honestly whether we are the right fit — even if the answer is no.
```

---

## 16. Work / case study implementation

### 16.1 Make EasyAccounts the lead proof asset

Route: `/work/easyaccounts`

EasyAccounts should be the most prominent case study across the site because it is closest to the ICP.

Homepage, Services, About, and Contact pages should link to it using:

```txt
See the EasyAccounts Case Study
```

### 16.2 Add a short “Why this matters for your business” section to EasyAccounts

Add near the top or after the challenge section:

Heading:

```txt
Why this matters for owner-led inventory businesses
```

Body:

```txt
EasyAccounts is proof that we understand more than screens and code. It handles the operational details that generic software often misses: units, branches, stock movements, ledgers, permissions, reports, audit trails, and the messy edge cases that appear when real staff use the system every day.
```

Bullets:

- Multi-branch inventory visibility.
- Real-time financial reporting.
- Stock and cost tracing.
- Role-based permissions.
- Immutable audit logs.
- Reports owners can trust.

### 16.3 Update non-ICP case study CTAs

For case studies like Canonical Academy, keep them as engineering credibility, but update CTAs that say things like:

```txt
Interested in what a well-architected platform looks like for your product?
```

Replace with:

```txt
Need production-grade engineering for a system your team relies on?
```

CTA:

```txt
Book a Workflow Review
```

This keeps the credibility while avoiding startup/SaaS/product language.

---

## 17. Add use-case pages

These are optional but highly recommended. They will make the site easier to understand for the ICP and improve SEO around operational pain.

Add a top-level route group such as:

```txt
/use-cases/inventory-accuracy
/use-cases/manual-reporting
/use-cases/order-workflows
/use-cases/purchasing-replenishment
/use-cases/multi-location-operations
```

If adding all five is too much, start with three:

1. `/use-cases/inventory-accuracy`
2. `/use-cases/manual-reporting`
3. `/use-cases/order-workflows`

### 17.1 Use-case page template

Each use-case page should follow this structure:

1. Hero:
   - Pain-specific headline.
   - Short direct subhead.
   - CTA.

2. Problem section:
   - What usually breaks.
   - Why spreadsheets/accounting software are not enough.

3. What we build:
   - Specific modules/screens/workflows.

4. What changes:
   - Operational outcomes without overclaiming.

5. Proof:
   - Link to EasyAccounts or relevant module screenshots.

6. CTA:
   - Book a Workflow Review.

### 17.2 Use-case: Inventory Accuracy

Title:

```txt
Inventory Accuracy Software for Wholesale & Distribution Teams
```

Hero:

```txt
Stock numbers your team can actually trust.
```

Subhead:

```txt
We build inventory systems that track stock movements, warehouse transfers, adjustments, and availability across the way your business actually works.
```

Problem bullets:

- Stock counts live in multiple spreadsheets.
- Sales and warehouse teams do not see the same availability.
- Adjustments are made without clear accountability.
- Reports become stale before decisions are made.

What we build:

- Stock movement ledger.
- Location-level availability.
- Transfer workflows.
- Adjustment approval.
- Product/SKU search.
- Audit trail.
- Owner dashboard.

### 17.3 Use-case: Manual Reporting

Title:

```txt
Custom Reporting Dashboards for Inventory-Heavy Businesses
```

Hero:

```txt
Reports without the weekly spreadsheet chase.
```

Subhead:

```txt
We build dashboards and reports around the questions owners actually ask — stock, sales, purchases, margins, receivables, and branch performance.
```

What we build:

- Owner dashboards.
- Product/category performance.
- P&L summaries.
- Branch reports.
- Purchase/sale trends.
- PDF export where needed.
- Drill-down to source transactions.

### 17.4 Use-case: Order Workflows

Title:

```txt
Custom Order Workflow Software for Wholesale & Distribution
```

Hero:

```txt
Keep orders moving without losing status in email and spreadsheets.
```

Subhead:

```txt
We build order workflows for sales, warehouse, picking, dispatch, backorders, and notes — so everyone can see what needs to happen next.
```

What we build:

- Order status pipeline.
- Picking/packing views.
- Backorder tracking.
- Dispatch notes.
- Customer/order history.
- Internal comments.
- Role-based access.

### 17.5 Use-case: Purchasing/Replenishment

Title:

```txt
Purchasing & Replenishment Tools for Inventory-Heavy Businesses
```

Hero:

```txt
Stop noticing low stock after the sale is already at risk.
```

Subhead:

```txt
We build simple purchasing tools that help teams see what needs replenishing, what is already ordered, and which suppliers are involved.
```

What we build:

- Reorder alerts.
- Supplier purchase history.
- Purchase order tracking.
- Incoming stock visibility.
- Suggested replenishment lists.
- Low-stock dashboard.

### 17.6 Use-case: Multi-Location Operations

Title:

```txt
Multi-Location Inventory & Operations Software
```

Hero:

```txt
One shared view across branches, warehouses, and teams.
```

Subhead:

```txt
We build systems that help multi-location teams track stock, transfers, responsibility, and reports without each branch maintaining its own version of the truth.
```

What we build:

- Branch-level stock.
- Warehouse transfers.
- Role/location permissions.
- Location dashboards.
- Transfer audit trail.
- Cross-location reporting.

---

## 18. Navigation updates

If adding use-case pages, update navigation carefully.

### 18.1 Suggested desktop nav

Keep simple:

- Work
- Services
- Use Cases
- About
- Blog
- Book a Workflow Review

If the design cannot support another nav item, add use cases into the Services page instead.

### 18.2 Footer updates

Footer should include:

- Work
- Services
- Use Cases
- About
- Blog
- Contact
- LinkedIn

Add a short footer positioning line:

```txt
Custom operations software for inventory-heavy businesses that have outgrown spreadsheets.
```

---

## 19. Structured data / schema

If the site already has JSON-LD support, add or update schema.

### 19.1 Organization schema

Use:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechTrinity",
  "url": "https://www.techtrinity.ai",
  "description": "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses.",
  "sameAs": [
    "https://www.linkedin.com/company/techtrinity-ai"
  ]
}
```

Only include `sameAs` if that LinkedIn URL is correct in the codebase/site.

### 19.2 Service schema

If implementing service schemas, use service names:

- Complete Operations System Build
- Defined Workflow Build
- Ongoing Operations Improvements
- Existing System Audit

Do not use SaaS/MVP service names in schema.

---

## 20. Accessibility and UX improvements

While making copy and content changes, check these basics:

1. Preserve heading hierarchy:
   - One `h1` per page.
   - Use `h2` for major sections.
   - Use `h3` for cards/subsections.

2. Ensure buttons and links have meaningful labels:
   - Avoid multiple generic “View Details” links without accessible labels.
   - Add `aria-label` where necessary, e.g. `View details for Complete Operations System Build`.

3. Ensure form fields have proper labels:
   - Do not rely only on placeholders.
   - Add accessible validation errors.

4. Ensure images have useful alt text:
   - EasyAccounts screenshots should describe what the screen shows.
   - Team portraits can have normal portrait alt text.
   - Decorative images should be empty alt text if appropriate.

5. Preserve mobile layout:
   - Check all updated copy on mobile widths.
   - Long service names should wrap cleanly.

---

## 21. Performance and technical constraints

Do not introduce heavy dependencies for this content work.

Before adding packages, ask whether the same result can be achieved with existing components.

After changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If the project uses different commands, inspect `package.json` and run the closest equivalents.

Do not deploy automatically unless explicitly instructed.

---

## 22. Content QA checklist

Before finishing, verify the following:

### 22.1 Messaging consistency

- [ ] Homepage title no longer says “Boutique SaaS Product Studio.”
- [ ] Homepage hero clearly targets operations/inventory-heavy businesses.
- [ ] No primary CTA says “your product.”
- [ ] Contact page does not say “SaaS MVP.”
- [ ] Blog page does not say “non-technical founders.”
- [ ] Service pages do not frame the offer as startup/MVP/product development.
- [ ] EasyAccounts is clearly promoted as the main ICP-relevant proof asset.
- [ ] Every major page uses “operation,” “workflow,” “stock,” “inventory,” “warehouse,” “orders,” or “reporting” language where appropriate.

### 22.2 ICP fit

- [ ] The site clearly targets wholesale, distribution, import/export, light manufacturing, or inventory-heavy retail.
- [ ] The site clearly targets owner-led businesses.
- [ ] The site addresses spreadsheets, disconnected tools, stock errors, reporting delays, and team adoption.
- [ ] The site does not sound like a generic agency.
- [ ] The site does not lead with price/offshore value.
- [ ] The site explains that custom software is recommended only when it makes operational sense.

### 22.3 SEO

- [ ] Every updated page has ICP-aligned title and description.
- [ ] OG title/description are updated.
- [ ] Any sitemap/robots metadata remains valid.
- [ ] New use-case pages, if added, are included in sitemap.
- [ ] Old service URLs remain working.

### 22.4 Contact flow

- [ ] Contact form labels match the ICP.
- [ ] Dropdown options match operational pains.
- [ ] Any new fields are included in submission payload.
- [ ] Email notification/template includes new fields.
- [ ] Validation still works.
- [ ] Success and error states still work.

### 22.5 Build quality

- [ ] Lint passes.
- [ ] Type check passes.
- [ ] Production build passes.
- [ ] No broken routes.
- [ ] No broken internal links.
- [ ] Mobile layout still works.

---

## 23. Suggested implementation order

Follow this order to avoid scope creep.

### Phase 1 — Critical consistency fixes

1. Update metadata/title tags.
2. Update global CTA copy.
3. Update Contact page copy and form options.
4. Update Blog hero/subhead.
5. Rename visible service labels.
6. Replace remaining “product/MVP/SaaS founder” language.

### Phase 2 — Strengthen conversion

1. Add homepage pain section.
2. Add “custom is not always the answer” section.
3. Improve EasyAccounts proof placement.
4. Update non-ICP case study CTAs.
5. Add better right-fit/not-fit language.

### Phase 3 — SEO/content expansion

1. Add use-case pages.
2. Add use-case navigation/footer links.
3. Add structured data.
4. Add blog categories/placeholders or initial content if content system supports it.

---

## 24. Copy snippets library

Use these snippets consistently.

### 24.1 Short positioning

```txt
Custom operations software for inventory-heavy businesses that have outgrown spreadsheets.
```

### 24.2 Long positioning

```txt
TechTrinity builds simple custom operations software for owner-led wholesale, distribution, light manufacturing, and multi-location businesses whose stock, order, warehouse, purchasing, and reporting workflows have outgrown spreadsheets, accounting software, and disconnected tools.
```

### 24.3 Discovery call copy

```txt
Book a free 30-minute workflow review. We will learn how your operation runs today, where the process breaks, and whether a custom system makes operational and financial sense.
```

### 24.4 Risk reversal

```txt
We do not start by pitching software. We map the workflow first, find where time and data are leaking, and then recommend whether to build, buy, fix, or leave things alone.
```

### 24.5 EasyAccounts proof

```txt
Our strongest proof is EasyAccounts: a production ERP built for a wholesale business, live across 50+ branches, handling inventory, purchases, sales, ledgers, reports, permissions, audit logs, and multi-warehouse stock.
```

Only use metrics like `50+ branches`, `180,000+ transactions`, `100,000+ payments`, or `172+ permissions` if they are already present in the site/content and remain true.

### 24.6 Off-the-shelf honesty

```txt
Sometimes the right answer is Odoo, Zoho, Cin7, Unleashed, Katana, Fishbowl, or another standard tool. We are useful when the workflow is specific enough that standard software creates workarounds instead of removing them.
```

Use this carefully; do not accidentally promote competitors above TechTrinity. The purpose is trust-building.

---

## 25. Do-not-break list

Do not break or remove:

- Existing brand styling.
- Existing animations unless necessary.
- Existing responsive layout.
- Existing form submission.
- Existing case study screenshots.
- Existing email address: `info@techtrinity.ai`
- Existing service pricing unless the business owner has asked to change it.
- Existing URLs unless redirects are added.

---

## 26. Final response expected from coding agent

When the coding agent is done, provide:

1. Files changed.
2. Summary of copy/SEO changes.
3. Routes updated.
4. Any new routes added.
5. Any form payload/backend changes.
6. Commands run and results.
7. Any assumptions made.
8. Any tasks left for the human owner, especially:
   - confirm metrics,
   - confirm LinkedIn URL,
   - confirm service names/pricing,
   - confirm whether use-case pages should be published now or kept as draft.

---

## 27. Final acceptance criteria

The work is done only when a cold visitor from the ICP can answer “yes” to these within 10 seconds of landing on the site:

1. “This company works with businesses like mine.”
2. “They understand stock, warehouse, order, purchasing, and reporting problems.”
3. “They are not just selling generic development.”
4. “They have proof from a real inventory/operations system.”
5. “I know what to do next if I want them to look at my workflow.”
