import { ENGAGEMENT_STEPS, SCOPE_PROMISE } from "@/lib/offer";
import { EditorialLabel } from "./label";

export function Process() {
  return (
    <section id="process" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-16" data-reveal>
          <EditorialLabel>The Process</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            How the engagement{" "}
            <em className="italic text-primary">works.</em>
          </h2>
          <p className="mt-3.5 max-w-[620px] text-[17px] font-light leading-[1.7] text-muted">
            {SCOPE_PROMISE}
          </p>
        </div>

        <ol className="border-t border-border">
          {ENGAGEMENT_STEPS.map((step, index) => (
            <li
              key={step.num}
              data-reveal
              data-reveal-delay={Math.min(index, 4) || undefined}
              className="group grid grid-cols-[56px_1fr] items-start gap-5 border-b border-border py-10 transition-colors md:grid-cols-[88px_1fr] md:gap-8"
            >
              <span className="font-display text-[40px] font-black leading-none text-border-strong transition-colors duration-300 group-hover:text-primary md:text-[52px]">
                {step.num}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-[22px] font-bold tracking-[-0.015em] md:text-[23px]">
                    {step.title}
                  </h3>
                  <span className="rounded-full border border-ring bg-primary-soft px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-primary">
                    {step.cost}
                  </span>
                </div>
                <p className="mt-2 max-w-[760px] text-[15px] font-light leading-[1.75] text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
