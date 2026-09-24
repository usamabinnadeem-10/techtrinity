import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

/**
 * Concise business summary answering the six buyer questions (brief TT-09):
 * setting, the difficulty, the contribution, what changed, substantiated
 * outcomes, and what ongoing operation taught. Rendered right after the hero,
 * above screens and architecture, so no technical knowledge is needed.
 */
export function CaseSummary({ caseStudy }: Props) {
  const { summary } = caseStudy;
  if (!summary || summary.items.length === 0) return null;
  return (
    <section
      aria-labelledby="case-summary-heading"
      className="border-t border-border py-20 md:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-12 max-w-[720px]" data-reveal>
          <EditorialLabel tone="muted">{summary.label}</EditorialLabel>
          <div id="case-summary-heading">
            <CaseHeadline lines={summary.headline} className="mt-4" />
          </div>
        </div>
        <dl
          data-reveal
          data-reveal-delay="1"
          className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {summary.items.map((item) => (
            <div key={item.question} className="flex flex-col gap-3 bg-background p-7 md:p-8">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {item.question}
              </dt>
              <dd className="text-[15px] font-light leading-[1.75] text-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
