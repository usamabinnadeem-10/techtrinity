import Link from "next/link";
import { EditorialLabel } from "./label";

type Service = {
  num: string;
  title: string;
  description: string;
  price: string;
  slug: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Product Sprint",
    description:
      "Design + development from scratch. You bring the idea. We bring everything else — UX, UI, and a working product. 8–16 weeks.",
    price: "Starting at $20,000",
    slug: "product-sprint",
  },
  {
    num: "02",
    title: "Build-Only",
    description:
      "Already have Figma designs? We build fast and clean on React/Next.js with Node or Django backends. No overhead, just execution.",
    price: "Starting at $12,000",
    slug: "build-only",
  },
  {
    num: "03",
    title: "Growth Retainer",
    description:
      "A dedicated team, monthly. No re-briefing, no handoffs, no strangers in your codebase. Minimum 3-month commitment.",
    price: "Starting at $4,500/month",
    slug: "growth-retainer",
  },
  {
    num: "04",
    title: "Technical Audit",
    description:
      "Inherited a codebase? We review it honestly and tell you exactly what's broken, what's a risk, and what to fix first.",
    price: "Starting at $1,500",
    slug: "technical-audit",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14" data-reveal>
          <EditorialLabel>What We Do</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            One studio.
            <br />
            Every stage of your product.
          </h2>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"
          style={{ gap: 1 }}
        >
          {SERVICES.map((service) => (
            <article
              key={service.num}
              className="group relative flex flex-col bg-card p-10 transition-colors duration-300 hover:bg-card-elevated md:p-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-primary/35"
              />
              <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                {service.num}
              </p>
              <h3 className="mt-6 font-display text-[29px] font-bold tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="mt-3.5 text-[15px] font-light leading-[1.75] text-muted">
                {service.description}
              </p>
              <span className="mt-7 inline-block self-start rounded-full border border-ring bg-primary-soft px-4 py-1.5 font-mono text-[12px] tracking-[0.04em] text-primary">
                {service.price}
              </span>
              <Link
                href={`/services/${service.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
