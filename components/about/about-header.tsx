import { EditorialLabel } from "@/components/home/label";

export function AboutHeader() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <div className="grid gap-12 md:grid-cols-[7fr_5fr] md:items-end md:gap-20">
        <div className="hero-rise-sm [animation-delay:0.1s]">
          <EditorialLabel>Who We Are</EditorialLabel>
          <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
            We started TechTrinity because{" "}
            <em className="italic font-bold text-primary">
              founders deserve better.
            </em>
          </h1>
        </div>
        <p className="hero-rise-sm max-w-[600px] text-[16px] font-light leading-[1.75] text-muted [animation-delay:0.3s] md:pb-3">
          Too many founders have been burned by agencies that overpromised,
          underdelivered, and left them with a codebase nobody can maintain.
          We built TechTrinity to be the alternative.
        </p>
      </div>
    </section>
  );
}
