import Link from "next/link";
import { Container } from "@/components/container";

const SERVICES = [
  {
    number: "01",
    name: "MVP Development",
    description: "From concept to launch-ready product in weeks, not months.",
    tags: ["Next.js", "React", "Node.js"],
    href: "/services/mvp-development",
  },
  {
    number: "02",
    name: "SaaS Platforms",
    description: "Scalable multi-tenant architectures built for growth.",
    tags: ["TypeScript", "PostgreSQL", "AWS"],
    href: "/services/saas-platforms",
  },
  {
    number: "03",
    name: "API & Backend Engineering",
    description: "Robust APIs and services that handle real-world load.",
    tags: ["Node.js", "REST", "GraphQL"],
    href: "/services/api-backend-engineering",
  },
] as const;

export function ServicesPreview() {
  return (
    <section className="border-t border-b border-border">
      <Container>
        <div className="flex items-baseline justify-between border-b border-border pt-10 pb-8">
          <h2 className="font-serif text-2xl text-fg">What we build</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Core Services
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border [&>*]:border-b [&>*]:border-border">
          {SERVICES.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group flex flex-col gap-3 px-6 py-8 transition-colors hover:bg-surface"
            >
              <span className="font-mono text-xs text-muted">
                {service.number}
              </span>
              <span className="font-sans text-sm font-medium text-fg">
                {service.name}
              </span>
              <span className="font-sans text-xs font-light leading-relaxed text-muted">
                {service.description}
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border px-2 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/services"
          className="flex items-center border-t border-border py-4 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          See all services →
        </Link>
      </Container>
    </section>
  );
}
