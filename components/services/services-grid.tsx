import Link from "next/link";
import { EditorialLabel } from "@/components/home/label";
import { getServicesByTier, type ServiceDetail } from "@/lib/services";

function ServiceCard({
  service,
  index,
  className,
}: {
  service: ServiceDetail;
  index: number;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-reveal
      data-reveal-delay={Math.min(index + 1, 4)}
      className={[
        "group relative flex flex-col rounded-lg border border-border bg-card p-8 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-primary/30 md:p-12",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
          {service.num}
        </span>
        <span className="text-right font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          {service.card.timeline}
        </span>
      </div>

      <h3 className="mt-10 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.025em]">
        {service.title}
      </h3>

      <p className="mt-4 max-w-[520px] text-[15px] font-light leading-[1.75] text-muted">
        {service.card.description}
      </p>

      <div className="mt-8">
        <span className="inline-block rounded-full border border-ring bg-primary-soft px-4 py-1.5 font-mono text-[12px] tracking-[0.04em] text-primary">
          {service.card.price}
        </span>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          View Details
        </span>
        <span
          aria-hidden
          className="font-mono text-[16px] text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-primary"
        >
          →
        </span>
      </div>
    </Link>
  );
}

export function ServicesGrid() {
  const primary = getServicesByTier("primary");
  const audit = getServicesByTier("audit");

  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32">
      <div className="mb-12 max-w-[720px]" data-reveal>
        <EditorialLabel>Operations Engagements</EditorialLabel>
        <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
          Start with one workflow.{" "}
          <em className="italic text-primary">Expand when it’s justified.</em>
        </h2>
        <p className="mt-5 text-[16px] font-light leading-[1.75] text-muted">
          Assess a workflow if the fix isn’t clear yet, build it once it is,
          grow into a larger system in agreed phases, and keep improving it
          after launch.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {primary.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </div>

      {audit.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 max-w-[720px]" data-reveal>
            <EditorialLabel tone="muted">
              Separate option · Technical review
            </EditorialLabel>
            <p className="mt-3 text-[15px] font-light leading-[1.75] text-muted">
              Already running software you’re unsure about? An audit reviews
              the code and data you have. It is a different purchase from a
              Workflow Assessment, which looks at a business process.
            </p>
          </div>
          {audit.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
              className="border-dashed"
            />
          ))}
        </div>
      )}
    </section>
  );
}
