import { EditorialLabel } from "@/components/home/label";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseFlow({ caseStudy }: Props) {
  const { flow } = caseStudy;
  if (!flow) return null;
  return (
    <section className="border-t border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div data-reveal className="md:max-w-[480px] md:sticky md:top-32">
            <EditorialLabel tone="muted">{flow.label}</EditorialLabel>
            <CaseHeadline lines={flow.headline} className="mt-4" />
            <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-muted">
              {flow.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <ol data-reveal data-reveal-delay="2" className="relative">
            <span
              aria-hidden
              className="absolute left-[15px] top-3 bottom-3 w-px bg-border-strong"
            />
            {flow.steps.map((step) => (
              <li
                key={step.num}
                className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-5 pb-8 last:pb-0"
              >
                <span
                  className={cn(
                    "relative z-10 mt-2 flex size-[32px] items-center justify-center rounded-full border-2",
                    step.highlight
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong bg-card text-muted-foreground",
                  )}
                >
                  <span className="font-mono text-[11px] font-semibold tracking-[0.04em]">
                    {step.num}
                  </span>
                </span>
                <div
                  className={cn(
                    "rounded-md border bg-card-elevated p-5 transition-colors duration-300",
                    step.highlight
                      ? "border-primary/35"
                      : "border-border-strong",
                  )}
                >
                  <p className="text-[15px] font-medium leading-[1.55] text-foreground">
                    {step.primary}
                  </p>
                  {step.secondary && (
                    <p className="mt-1.5 font-mono text-[11px] tracking-[0.04em] text-muted">
                      {step.secondary}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal data-reveal-delay="3" className="mt-20">
          <BrowserFrame
            image={flow.image}
            url={flow.imageUrl}
            sizes="(min-width: 1240px) 1144px, (min-width: 768px) 90vw, 100vw"
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {flow.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
