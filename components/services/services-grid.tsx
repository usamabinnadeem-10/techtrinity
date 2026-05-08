import Link from "next/link";

type Service = {
  num: string;
  title: string;
  description: string;
  price: string;
  timeline: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Product Sprint",
    description:
      "Design + development from scratch. You bring the idea — we bring the UX, UI, and working product.",
    price: "Starting at $20,000",
    timeline: "8–16 weeks",
    href: "/services/product-sprint",
  },
  {
    num: "02",
    title: "Build-Only",
    description:
      "Already have Figma designs? We build fast and clean on React/Next.js with Node or Django.",
    price: "Starting at $12,000",
    timeline: "6–12 weeks",
    href: "/services/build-only",
  },
  {
    num: "03",
    title: "Growth Retainer",
    description:
      "A dedicated team monthly. No re-briefing, no handoffs, no strangers in your codebase.",
    price: "Starting at $4,500/month",
    timeline: "3-month minimum",
    href: "/services/growth-retainer",
  },
  {
    num: "04",
    title: "Technical Audit",
    description:
      "Inherited a codebase? We review it honestly and tell you what's broken, what's a risk, and what to fix first.",
    price: "Starting at $1,500",
    timeline: "1 week",
    href: "/services/technical-audit",
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32">
      <div
        data-reveal
        className="grid gap-5 md:grid-cols-2 md:gap-6"
      >
        {SERVICES.map((service, index) => (
          <Link
            key={service.num}
            href={service.href}
            data-reveal
            data-reveal-delay={Math.min(index + 1, 4)}
            className="group relative flex flex-col rounded-lg border border-border bg-card p-10 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-primary/30 md:p-12"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                {service.num}
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
                {service.timeline}
              </span>
            </div>

            <h2 className="mt-10 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.025em]">
              {service.title}
            </h2>

            <p className="mt-4 max-w-[440px] text-[15px] font-light leading-[1.75] text-muted">
              {service.description}
            </p>

            <div className="mt-8">
              <span className="inline-block rounded-full border border-ring bg-primary-soft px-4 py-1.5 font-mono text-[12px] tracking-[0.04em] text-primary">
                {service.price}
              </span>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Learn More
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
  );
}
