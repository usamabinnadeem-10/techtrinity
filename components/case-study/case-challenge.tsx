import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseChallenge({ caseStudy }: Props) {
  const { challenge } = caseStudy;
  if (!challenge) return null;
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14" data-reveal>
          <EditorialLabel tone="muted">{challenge.label}</EditorialLabel>
          <CaseHeadline lines={challenge.headline} className="mt-4" />
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border-strong bg-border-strong sm:grid-cols-2"
        >
          {challenge.cards.map((card) => (
            <article
              key={card.title}
              className="group relative bg-card-elevated p-8 transition-colors duration-300 hover:bg-[#181818] md:p-10"
            >
              <span
                aria-hidden
                className="absolute left-0 top-8 bottom-8 w-px bg-border-strong transition-colors duration-300 group-hover:bg-primary"
              />
              <h3 className="font-display text-[22px] font-bold tracking-[-0.015em]">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] font-light leading-[1.75] text-muted">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
