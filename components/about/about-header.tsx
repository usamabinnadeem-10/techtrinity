import { EditorialLabel } from "@/components/home/label";

export function AboutHeader() {
  return (
    <section className="px-6 pt-32 pb-16 text-center md:px-12 md:pt-40 md:pb-24">
      <div className="mx-auto flex max-w-[940px] flex-col items-center">
        <div className="hero-rise-sm [animation-delay:0.1s]">
          <EditorialLabel>Who We Are</EditorialLabel>
        </div>
        <h1 className="hero-rise-sm mt-5 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em] [text-wrap:balance] [animation-delay:0.2s]">
          We started TechTrinity because{" "}
          <em className="italic font-bold text-primary">
            the businesses that move stock deserve software that keeps up.
          </em>
        </h1>
        <p className="hero-rise-sm mt-8 max-w-[620px] text-[16px] font-light leading-[1.75] text-muted [text-wrap:pretty] [animation-delay:0.35s]">
          If you run a distribution or multi-location business, you know the
          drill — stock counts that don&apos;t match, reports that eat half a
          day, numbers living in ten different spreadsheets. The software that
          fixes that has always been priced for enterprises. We build it for
          you: custom-fit to how you actually operate, at a number that makes
          sense.
        </p>
      </div>
    </section>
  );
}
