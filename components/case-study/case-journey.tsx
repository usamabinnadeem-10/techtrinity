import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseJourney({ caseStudy }: Props) {
  const { journey } = caseStudy;
  if (!journey) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel tone="muted">{journey.label}</EditorialLabel>
          <CaseHeadline lines={journey.headline} className="mt-4" />
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {journey.steps.map((step, i) => (
            <article
              key={step.step}
              data-reveal
              data-reveal-delay={Math.min(i + 1, 4)}
              className="flex flex-col"
            >
              <BrowserFrame
                image={step.image}
                url={step.url}
                sizes="(min-width: 1240px) 360px, (min-width: 768px) 30vw, 100vw"
                imageAspectRatio="16 / 10"
              />
              <div className="mt-5 border-t border-border pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {step.step}
                </p>
                <p className="mt-2 text-[15px] font-light leading-[1.65] text-muted">
                  {step.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
