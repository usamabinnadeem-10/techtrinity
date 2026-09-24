import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

/**
 * One real task from input to outcome, shown as a captioned screenshot
 * sequence (brief TT-09). Static screenshots only — no video, no play button.
 */
export function CaseWalkthrough({ caseStudy }: Props) {
  const { walkthrough } = caseStudy;
  if (!walkthrough || walkthrough.steps.length === 0) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel tone="muted">{walkthrough.label}</EditorialLabel>
          <CaseHeadline lines={walkthrough.headline} className="mt-4" />
          <p className="mt-6 text-[16px] font-light leading-[1.8] text-muted">
            {walkthrough.intro}
          </p>
        </div>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {walkthrough.steps.map((step, i) => (
            <li
              key={step.title}
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
                  Step {String(i + 1).padStart(2, "0")} — {step.title}
                </p>
                <p className="mt-2 text-[15px] font-light leading-[1.65] text-muted">
                  {step.caption}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {walkthrough.note && (
          <p
            data-reveal
            className="mt-12 max-w-[760px] border-l-2 border-primary/50 pl-5 text-[14px] font-light leading-[1.75] text-muted"
          >
            {walkthrough.note}
          </p>
        )}
      </div>
    </section>
  );
}
