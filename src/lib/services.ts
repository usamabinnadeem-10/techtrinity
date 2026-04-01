export type Faq = {
  readonly q: string;
  readonly a: string;
};

export type Service = {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly includes: readonly string[];
  readonly stack: readonly string[];
  readonly faqs: readonly Faq[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: "mvp-development",
    name: "MVP Development",
    tagline: "From concept to launched product in 6–10 weeks.",
    description:
      "We scope, design, and build your MVP with a senior full-stack team. Clean code, real delivery, no handoffs to juniors.",
    includes: [
      "Scoping & architecture",
      "Full-stack development",
      "Deployment & CI/CD setup",
      "30 days post-launch support",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Vercel"],
    faqs: [
      {
        q: "How long does an MVP take to build?",
        a: "Most MVPs take 6–10 weeks from scoping to launch. Timeline depends on scope — we define this precisely in week one before writing a line of code.",
      },
      {
        q: "What is included in the MVP scope?",
        a: "Core user flows, authentication, a database, deployment to production, and 30 days of post-launch support. We cut everything that doesn't validate your core hypothesis.",
      },
      {
        q: "Do you build MVPs for non-technical founders?",
        a: "Yes. Most of our clients are non-technical founders. We handle architecture decisions and explain tradeoffs in plain language throughout the process.",
      },
      {
        q: "How much does MVP development cost?",
        a: "Most MVPs range from $8,000 to $25,000 depending on scope and complexity. We provide a fixed-price proposal after a free scoping call so there are no surprises.",
      },
      {
        q: "Who will actually build my MVP?",
        a: "Usama, the founder of TechTrinity, leads every project personally. There are no handoffs to junior developers or outsourced teams.",
      },
    ],
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platform Development",
    tagline: "Multi-tenant platforms built to scale from 10 to 10,000 customers.",
    description:
      "We architect and build full SaaS products — auth, billing, dashboards, multi-tenancy, and the infrastructure to grow on.",
    includes: [
      "Multi-tenant architecture",
      "Auth & permissions",
      "Stripe billing integration",
      "Admin dashboard",
      "API layer",
      "Deployment & monitoring",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "AWS",
    ],
    faqs: [
      {
        q: "What is multi-tenant SaaS architecture?",
        a: "Multi-tenancy means one application serves multiple customers with their data isolated. We design this from day one so your platform scales without a costly rebuild later.",
      },
      {
        q: "Do you integrate Stripe for billing?",
        a: "Yes. Every SaaS platform we build includes a full Stripe integration — subscriptions, usage billing, trials, and a customer-facing billing portal.",
      },
      {
        q: "How long does a SaaS platform take to build?",
        a: "A full SaaS platform typically takes 12–20 weeks depending on scope. We deliver in milestones so you can start user testing before the full build is complete.",
      },
      {
        q: "Can you build on our existing codebase?",
        a: "Yes. We do greenfield builds and also take over and extend existing codebases. We review your current code before scoping to give an honest assessment.",
      },
      {
        q: "Do you handle DevOps and deployment?",
        a: "Yes. Every project ships with CI/CD pipelines, environment configuration, and production deployment. We use Vercel for frontend and AWS or Railway for backend services.",
      },
    ],
  },
  {
    slug: "api-backend-engineering",
    name: "API & Backend Engineering",
    tagline: "REST and GraphQL APIs that other products are built on.",
    description:
      "We design and build backend systems — APIs, microservices, databases, and the infrastructure your product depends on.",
    includes: [
      "REST or GraphQL API design",
      "Database schema & optimization",
      "Authentication & authorization",
      "Third-party integrations",
      "API documentation",
      "Performance & load testing",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "REST",
      "GraphQL",
      "AWS",
    ],
    faqs: [
      {
        q: "Should I use REST or GraphQL for my API?",
        a: "REST is simpler and works well for most products. GraphQL is worth the overhead when clients need flexible querying of complex data. We recommend the right choice for your specific use case.",
      },
      {
        q: "Do you write API documentation?",
        a: "Yes. Every API we deliver includes OpenAPI/Swagger documentation. Clients can hit a /docs endpoint and see every endpoint, parameter, and response schema.",
      },
      {
        q: "How do you handle authentication in APIs?",
        a: "We implement JWT-based auth or OAuth 2.0 depending on your requirements. For multi-tenant APIs we add row-level security at the database layer to prevent data leakage.",
      },
      {
        q: "Can you optimize an existing slow API?",
        a: "Yes. We audit your existing API, identify bottlenecks — usually N+1 queries, missing indexes, or lack of caching — and implement targeted fixes with before/after benchmarks.",
      },
      {
        q: "Do you build microservices or monoliths?",
        a: "For most early-stage products, a well-structured monolith is the right call. We build microservices when there is a genuine scaling or team separation reason, not as a default.",
      },
    ],
  },
] as const;

export function findService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
