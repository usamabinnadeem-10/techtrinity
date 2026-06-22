import { EditorialLabel } from "@/components/home/label";

export function ServicesHeader() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-24">
      <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16">
        <div className="hero-rise-sm [animation-delay:0.1s]">
          <EditorialLabel>What We Build</EditorialLabel>
          <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
            Every stage of your
            <br />
            operation.{" "}
            <em className="italic font-bold text-primary">One studio.</em>
          </h1>
        </div>
        <p className="hero-rise-sm max-w-[560px] text-[16px] font-light leading-[1.75] text-muted [animation-delay:0.3s] md:pb-3">
          For wholesale, distribution, light manufacturing, and multi-location
          businesses whose stock, order, warehouse, purchasing, and reporting
          workflows have outgrown spreadsheets and disconnected tools.
        </p>
      </div>
    </section>
  );
}
