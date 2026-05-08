import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseOverview({ caseStudy }: Props) {
  const { overview } = caseStudy;
  if (!overview) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div data-reveal>
            <EditorialLabel tone="muted">{overview.label}</EditorialLabel>
            <CaseHeadline lines={overview.headline} className="mt-4" />
          </div>
          <div
            data-reveal
            data-reveal-delay="2"
            className="space-y-5 text-[16px] font-light leading-[1.85] text-muted md:pt-2"
          >
            {overview.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
