import { EditorialLabel } from "@/components/home/label";

export function BlogHeader() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
      <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16">
        <div className="hero-rise-sm [animation-delay:0.1s]">
          <EditorialLabel>The Blog</EditorialLabel>
          <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,76px)] font-black leading-[0.98] tracking-[-0.04em]">
            Thinking out loud about
            <br />
            SaaS, product, and{" "}
            <em className="italic font-bold text-primary">engineering.</em>
          </h1>
        </div>
        <p className="hero-rise-sm max-w-95 text-[17px] font-normal leading-normal text-muted text-balance [animation-delay:0.3s] md:pb-2">
          Practical writing for non-technical founders and the engineers who
          build with them.
        </p>
      </div>
    </section>
  );
}
