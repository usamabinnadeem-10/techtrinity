import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseWhyItMatters({ caseStudy }: Props) {
  const { whyItMatters } = caseStudy;
  if (!whyItMatters) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div data-reveal>
            <EditorialLabel tone="muted">{whyItMatters.label}</EditorialLabel>
            <CaseHeadline lines={whyItMatters.headline} className="mt-4" />
          </div>
          <div data-reveal data-reveal-delay="2" className="md:pt-2">
            <p className="text-[16px] font-light leading-[1.85] text-muted">
              {whyItMatters.body}
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {whyItMatters.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-[15px] font-light leading-[1.6] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
