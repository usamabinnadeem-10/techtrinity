import { EditorialLabel } from "@/components/home/label";
import type { ServiceDetail } from "@/lib/services";

type Props = {
  service: ServiceDetail;
};

export function ServiceDetailHero({ service }: Props) {
  return (
    <section className="relative mx-auto max-w-[1240px] px-6 pt-12 pb-20 md:px-12 md:pt-16 md:pb-24">
      <span
        aria-hidden
        className="hero-fade pointer-events-none absolute right-4 top-2 select-none font-display text-[clamp(180px,28vw,360px)] font-black leading-none tracking-[-0.06em] text-card-elevated md:right-8 md:top-4 [animation-delay:0.05s]"
      >
        {service.num}
      </span>

      <div className="relative">
        <div className="hero-rise-sm [animation-delay:0.1s]">
          <EditorialLabel>Service {service.num}</EditorialLabel>
        </div>

        <h1 className="hero-rise mt-5 max-w-[1080px] font-display text-[clamp(48px,7vw,108px)] font-black leading-[0.94] tracking-[-0.04em] [animation-delay:0.2s]">
          <span className="block">{service.headlineLead}</span>
          <em className="block italic font-bold text-primary">
            {service.headlineTail}
          </em>
        </h1>

        <dl className="hero-rise-sm mt-14 grid grid-cols-1 overflow-hidden border-y border-border md:mt-16 md:grid-cols-3 [animation-delay:0.45s]">
          {service.meta.map((entry, i) => (
            <div
              key={entry.label}
              className={[
                "flex flex-col gap-2.5 py-7",
                i > 0
                  ? "border-t border-border md:border-t-0 md:border-l md:pl-10"
                  : "",
                "md:px-10 first:md:pl-0",
                service.meta.length === 2 && i === 1
                  ? "md:col-span-2 md:border-l md:pl-10"
                  : "",
              ].join(" ")}
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {entry.label}
              </dt>
              <dd className="font-display text-[clamp(20px,2vw,28px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
