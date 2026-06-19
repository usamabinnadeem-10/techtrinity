import { EditorialLabel } from "@/components/home/label";

type Value = {
  num: string;
  title: string;
  body: string;
};

const VALUES: Value[] = [
  {
    num: "01",
    title: "Honest scoping",
    body: "We tell you what's realistic before you pay a deposit — not after. If your budget and your scope don't line up, you'll hear it on the first call, not three weeks into the build.",
  },
  {
    num: "02",
    title: "No handoffs to juniors",
    body: "The senior engineer who scopes your project is the one writing the code. No bait-and-switch to a junior the moment the contract is signed.",
  },
  {
    num: "03",
    title: "Written agreements",
    body: "Scope, timeline, and price go in writing before anything starts. \"We'll figure it out as we go\" is how projects blow past budget — so we don't work that way.",
  },
  {
    num: "04",
    title: "Accountability after launch",
    body: "We don't vanish at delivery. Every build includes post-launch support, and a founder you can actually reach when something needs attention.",
  },
];

export function AboutValues() {
  return (
    <section className="border-y border-border bg-card py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16" data-reveal>
          <div>
            <EditorialLabel>How We Work</EditorialLabel>
            <h2 className="mt-3.5 font-display text-[clamp(32px,3.6vw,54px)] font-bold leading-[1.04] tracking-[-0.03em]">
              A few things we{" "}
              <em className="italic text-primary">won&apos;t compromise on.</em>
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="text-[15px] font-light leading-[1.8] text-muted md:max-w-[380px]">
              Hard lines we&apos;ve drawn from watching too many owners get
              burned by agencies and freelancers.
            </p>
          </div>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"
        >
          {VALUES.map((value) => (
            <article
              key={value.num}
              className="group relative bg-card p-9 transition-colors duration-300 hover:bg-card-elevated md:p-11"
              style={{
                boxShadow: "inset 3px 0 0 0 var(--color-border-strong)",
              }}
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {value.num}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-primary/30"
                />
              </div>
              <h3 className="mt-7 font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] md:text-[28px]">
                {value.title}
              </h3>
              <p className="mt-4 text-[15px] font-light leading-[1.75] text-muted">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
