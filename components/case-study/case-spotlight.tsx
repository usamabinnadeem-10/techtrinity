import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseSpotlight({ caseStudy }: Props) {
  const { spotlight } = caseStudy;
  if (!spotlight) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-20">
          <div data-reveal>
            <EditorialLabel tone="muted">{spotlight.label}</EditorialLabel>
            <CaseHeadline lines={spotlight.headline} className="mt-4" />
            <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-muted">
              {spotlight.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal data-reveal-delay="2">
            <BrowserFrame
              image={spotlight.image}
              url={spotlight.url}
              sizes="(min-width: 1240px) 660px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
