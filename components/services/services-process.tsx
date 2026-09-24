import { EditorialLabel } from "@/components/home/label";
import { ProcessSteps } from "@/components/services/service-detail-process";
import { ENGAGEMENT_STEPS } from "@/lib/offer";

export function ServicesProcess() {
  return (
    <section className="border-y border-border bg-card py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-16 max-w-[720px]" data-reveal>
          <EditorialLabel>How It Works</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(34px,4vw,60px)] font-bold leading-[1.04] tracking-[-0.03em]">
            From first call
            <br />
            to <em className="italic text-primary">software that fits.</em>
          </h2>
          <p className="mt-6 text-[16px] font-light leading-[1.75] text-muted">
            The first call is free. A paid workflow assessment is only
            recommended when a process needs further investigation — if you
            already have an adequate specification, we go from a scope review
            straight to a proposal.
          </p>
        </div>
        <ProcessSteps steps={ENGAGEMENT_STEPS} />
      </div>
    </section>
  );
}
