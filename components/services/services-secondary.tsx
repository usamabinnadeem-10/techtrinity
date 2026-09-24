import Link from "next/link";
import { EditorialLabel } from "@/components/home/label";
import { getServicesByTier } from "@/lib/services";

export function ServicesSecondary() {
  const services = getServicesByTier("secondary");

  return (
    <section
      id="secondary-services"
      className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32"
    >
      <div className="mb-10 max-w-[720px]" data-reveal>
        <EditorialLabel>Secondary Services</EditorialLabel>
        <h2 className="mt-4 font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.08] tracking-[-0.025em]">
          Also available, with their own scope.
        </h2>
      </div>

      <ul
        data-reveal
        data-reveal-delay="1"
        className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
      >
        {services.map((service) => (
          <li key={service.slug} className="bg-card">
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-card-elevated"
            >
              <h3 className="font-display text-[22px] font-bold tracking-[-0.015em]">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] font-light leading-[1.7] text-muted">
                {service.card.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
                View Details
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
