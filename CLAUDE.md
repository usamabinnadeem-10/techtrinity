@AGENTS.md
# TechTrinity Website

## Package manager
- pnpm only — never use npm or yarn
- Install: pnpm add <package>
- Run scripts: pnpm run <script>

## Stack
- Next.js 16, App Router, TypeScript strict mode
- Tailwind CSS v4 — CSS-first config via @theme in globals.css, no tailwind.config.ts
- MDX + Velite for blog content
- Fonts: DM Serif Display (headings), DM Mono (labels/CTAs/tags), DM Sans (body)
- Deployment: Vercel

## React
- React Compiler is enabled — do not manually add useMemo, useCallback, or React.memo

## Do not
- Do not use shadcn
- Do not use inline styles
- Do not add dependencies without asking first
- Do not use npm or yarn commands
- Do not write tailwind.config.ts for color or token configuration
- Do not manually memoize React components

## Color tokens (Tailwind v4 — defined in globals.css via @theme)
- bg-bg — page background (#FAFAF8)
- text-fg — primary text, buttons (#1A1A18)
- text-muted — body copy, labels (#888780)
- text-accent / bg-accent — italic highlights, hover accents (#C8A882)
- bg-surface — card hover, section backgrounds (#E8E5DC)
- border-border — all borders and dividers (#D4C4A8)
- Use these token class names only — never hardcode hex values in components

## Project structure
- /app — Next.js App Router pages and layouts
- /components — shared UI components
- /content — MDX blog posts and content
- /lib — utilities, JSON-LD schema helpers, metadata helpers
- /public — static assets

## Layout
- All sections are full-width for border-t border-border to span the viewport
- Content inside sections is wrapped in <Container> (components/container.tsx)
- Container: max-w-screen-xl mx-auto px-10
- Never add px-* directly to section elements

## Naming conventions
- Files: kebab-case (e.g. service-card.tsx, hero-section.tsx)
- Components: PascalCase (e.g. ServiceCard, HeroSection)
- Utilities: camelCase

## SEO — required on every page
- Every page must export a generateMetadata function with title, description, and openGraph
- Every page must have exactly one H1 containing the primary keyword for that page
- Every page must include JSON-LD structured data (see types below per page)
- No meaningful content hidden in display:none or loaded only via client-side JS
- All images must have descriptive alt text

## JSON-LD schema by page type
- Homepage: Organization schema (name, url, logo, description, sameAs for LinkedIn/Upwork)
- Service pages: Service schema (name, description, provider, areaServed: "US", serviceType)
- Services index: ItemList schema linking to all individual service pages
- Blog posts: Article schema (headline, author, datePublished, dateModified, publisher)
- All service pages and blog posts: FAQPage schema with 5-8 Q&A entries, answers 40-60 words each

## Blog post conventions (MDX)
- Frontmatter required: title, description, publishedAt, updatedAt, tags, author
- Open every post with a direct 40-60 word answer to the main question before any other content
- All H2s must be phrased as questions (e.g. "How long does an MVP take to build?")
- Include a FAQ section at the bottom of every post

## Service page conventions
- Individual service pages: /app/services/[service-slug]/page.tsx
- Services index page: /app/services/page.tsx — treat as a pillar page, not just navigation
- Services index must link to every individual service page and include ItemList JSON-LD
- Individual pages must include: H1, intro paragraph, process/approach section, FAQ block, CTA
- FAQ block: 5-8 questions with direct 40-60 word answers and FAQPage JSON-LD
- Add every new service route to /app/sitemap.ts

## After every edit
- Run: pnpm run lint
- Fix all lint errors before considering a task complete

## Commands available
- pnpm run dev — start dev server
- pnpm run build — production build
- pnpm run lint — run ESLint
- pnpm run start — start production server