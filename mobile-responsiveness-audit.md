# Mobile Responsiveness Audit

Audit date: 2026-04-01
Scope: all files in `src/components/` and `src/app/`

---

## Critical Issues

### 1. Nav — No mobile menu

**File:** [nav.tsx:24](src/components/nav.tsx#L24)

The navigation renders all links and CTA in a single horizontal row with no collapse behavior. On screens below ~768px the links overflow or wrap awkwardly.

| Element | Class | Problem |
|---------|-------|---------|
| Links wrapper | `flex items-center gap-8` (line 24) | Fixed `gap-8` between 4 links; no `hidden md:flex` or hamburger toggle |
| CTA button | `bg-fg px-4 py-2 font-mono text-xs` (line 38) | Always visible; no mobile alternative |
| Outer layout | `flex items-center justify-between` (line 14, via Container) | Three-column layout (logo / links / CTA) breaks on narrow screens |

---

### 2. Process Section — 4-column grid with no breakpoints

**File:** [process-section.tsx:41](src/components/home/process-section.tsx#L41)

| Element | Class | Problem |
|---------|-------|---------|
| Steps grid | `grid grid-cols-4 divide-x divide-border` (line 41) | Hard-coded 4 columns; no `md:grid-cols-4 grid-cols-1` pattern; content is unreadable on mobile |
| Step cell | `px-6` (line 43) | Padding eats remaining space in narrow columns |

---

### 3. Services Preview — 3-column grid with no breakpoints

**File:** [services-preview.tsx:39](src/components/home/services-preview.tsx#L39)

| Element | Class | Problem |
|---------|-------|---------|
| Services grid | `grid grid-cols-3 divide-x divide-border` (line 39) | Hard-coded 3 columns; no responsive variant |
| Service card | `px-6 py-8` (line 44) | Excessive padding at narrow widths |

---

### 4. Work Preview — 2-column grid with no breakpoints

**File:** [work-preview.tsx:18](src/components/home/work-preview.tsx#L18)

| Element | Class | Problem |
|---------|-------|---------|
| Projects grid | `grid grid-cols-2 divide-x divide-border` (line 18) | Hard-coded 2 columns; should stack to 1 on mobile |
| Project card | `p-8` (line 23) | 2rem padding is large on small screens |

---

### 5. About Page — Stats grid (4 columns, no breakpoints)

**File:** [about/page.tsx:86](src/app/about/page.tsx#L86)

| Element | Class | Problem |
|---------|-------|---------|
| Stats grid | `grid grid-cols-4` (line 86) | Hard-coded 4 columns; stats are unreadable on mobile |
| Stat cell | `pl-8` / `pr-8 border-r` (line 90) | Conditional padding assumes wide viewport |

---

### 6. About Page — Founder section (3 columns, no breakpoints)

**File:** [about/page.tsx:107](src/app/about/page.tsx#L107)

| Element | Class | Problem |
|---------|-------|---------|
| Founder grid | `grid grid-cols-3 gap-12` (line 107) | Hard-coded 3 columns; sidebar (avatar, links) is crushed on mobile |
| Gap | `gap-12` (line 107) | 3rem gap is excessive on small screens |

---

### 7. About Page — Values grid (2 columns, no breakpoints)

**File:** [about/page.tsx:189](src/app/about/page.tsx#L189)

| Element | Class | Problem |
|---------|-------|---------|
| Values grid | `grid grid-cols-2 gap-0` (line 189) | Hard-coded 2 columns; cards become too narrow on mobile |

---

### 8. CTA Section — side-by-side layout with no mobile stack

**File:** [cta-section.tsx:8](src/components/home/cta-section.tsx#L8)

| Element | Class | Problem |
|---------|-------|---------|
| Wrapper | `flex items-start justify-between` (line 8) | Heading and CTA column sit side-by-side; no `flex-col` on mobile |
| Right column | `flex flex-col items-end` (line 15) | Content pushed to far right, overlaps heading on narrow screens |

---

### 9. Hero Section — bottom row doesn't stack on mobile

**File:** [hero-section.tsx:23](src/components/home/hero-section.tsx#L23)

| Element | Class | Problem |
|---------|-------|---------|
| Bottom row | `flex items-end justify-between` (line 23) | Paragraph and CTA button sit side-by-side; should stack on mobile |

---

### 10. Case Study — Outcomes grid uses inline columns with no responsive fallback

**File:** [work/\[slug\]/page.tsx:111-114](src/app/work/[slug]/page.tsx#L111-L114)

| Element | Class / Style | Problem |
|---------|---------------|---------|
| Outcomes grid | `style={{ gridTemplateColumns: repeat(N, 1fr) }}` (line 114) | Inline style ignores breakpoints entirely; 3-4 outcomes in one row overflows on mobile |
| Outcome cell | `px-6` (line 120) | Padding compounds in narrow columns |

---

## High Issues

### 11. Container — `px-10` too wide for small screens

**File:** [container.tsx:10](src/components/container.tsx#L10)

| Element | Class | Problem |
|---------|-------|---------|
| Container div | `px-10` (line 10) | 2.5rem (40px) padding each side; on a 375px phone, only 295px remains for content. Should use `px-5 md:px-10` or similar |

This affects **every page** since Container is used globally.

---

### 12. Calendly Embed — fixed min-width

**File:** [calendly-embed.tsx:24](src/components/calendly-embed.tsx#L24)

| Element | Class | Problem |
|---------|-------|---------|
| Widget div | `min-w-80 h-175` (line 24) | `min-w-80` (320px) may overflow on devices narrower than 320px + container padding; `h-175` is a fixed height with no responsive variant |

---

### 13. About Page Hero — `text-5xl` heading with no mobile reduction

**File:** [about/page.tsx:69](src/app/about/page.tsx#L69)

| Element | Class | Problem |
|---------|-------|---------|
| H1 | `text-5xl` (line 69) | 3rem/48px on mobile with no `md:text-5xl text-3xl` step-down (contrast with homepage hero which has `text-5xl md:text-6xl`) |

---

### 14. Case Study Hero — `text-5xl` heading with no mobile reduction

**File:** [work/\[slug\]/page.tsx:81](src/app/work/[slug]/page.tsx#L81)

| Element | Class | Problem |
|---------|-------|---------|
| H1 | `text-5xl` (line 81) | Same issue — no responsive step-down for mobile |

---

### 15. Contact Page — `text-5xl` heading with no mobile reduction

**File:** [contact/page.tsx:43](src/app/contact/page.tsx#L43)

| Element | Class | Problem |
|---------|-------|---------|
| H1 | `text-5xl` (line 43) | Same issue — no responsive step-down for mobile |

---

### 16. Service Hero — `text-5xl` heading with no mobile reduction

**File:** [service-hero.tsx:23](src/components/services/service-hero.tsx#L23)

| Element | Class | Problem |
|---------|-------|---------|
| H1 | `text-5xl` (line 23) | Same issue — no responsive step-down for mobile |

---

## Medium Issues

### 17. Footer — doesn't stack on narrow screens

**File:** [footer.tsx:18](src/components/footer.tsx#L18)

| Element | Class | Problem |
|---------|-------|---------|
| Footer container | `flex items-center justify-between` (line 18) | Copyright + 5 links in a single row; on small screens, links wrap awkwardly |
| Links group | `flex items-center space-x-5` (line 23) | 5 links with `space-x-5` gap; may overflow on phones |

---

### 18. Stack Strip — gaps may cause awkward wrapping

**File:** [stack-strip.tsx:20](src/components/home/stack-strip.tsx#L20)

| Element | Class | Problem |
|---------|-------|---------|
| Strip wrapper | `flex flex-wrap items-center justify-center gap-x-4 gap-y-1` (line 20) | `flex-wrap` is correct, but `gap-x-4` with 8 items causes multi-row wrapping that may look messy on very small screens |

---

### 19. Service FAQ — no responsive padding reduction

**File:** [service-faq.tsx:12](src/components/services/service-faq.tsx#L12)

| Element | Class | Problem |
|---------|-------|---------|
| Section | `py-12` (line 12) | 3rem vertical padding consumes significant screen space on mobile |
| FAQ items | `py-6` (line 21) | 1.5rem per item adds up on long FAQ lists |

---

## Already Responsive (no issues)

| Component | File | Why it's fine |
|-----------|------|---------------|
| ContactForm | [contact-form.tsx:27](src/components/contact-form.tsx#L27) | Uses `grid-cols-1 md:grid-cols-2` |
| Work Page grid | [work/page.tsx:55](src/app/work/page.tsx#L55) | Uses `grid-cols-1 md:grid-cols-2` |
| Services Page grid | [services/page.tsx:55](src/app/services/page.tsx#L55) | Uses `grid-cols-1 md:grid-cols-3` with `md:divide-x` |
| Case Study Features | [work/\[slug\]/page.tsx:158](src/app/work/[slug]/page.tsx#L158) | Uses `grid-cols-1 md:grid-cols-2` |
| Service Includes | [service-includes.tsx:10](src/components/services/service-includes.tsx#L10) | Uses `grid-cols-1 md:grid-cols-2` |
| Service Stack | [service-stack.tsx:10](src/components/services/service-stack.tsx#L10) | Uses `flex flex-wrap` correctly |

---

## Summary

| Severity | Count | Key pattern |
|----------|-------|-------------|
| Critical | 10 | Hard-coded multi-column grids, no mobile menu, flex layouts that don't stack |
| High | 6 | Container padding, fixed widget dimensions, large headings with no mobile step-down |
| Medium | 3 | Footer wrapping, spacing that wastes mobile screen space |
| **Total** | **19** | |
