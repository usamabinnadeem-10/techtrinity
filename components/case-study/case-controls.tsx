import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseControls({ caseStudy }: Props) {
  const { controls } = caseStudy;
  if (!controls) return null;
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[760px]" data-reveal>
          <EditorialLabel tone="muted">{controls.label}</EditorialLabel>
          <CaseHeadline lines={controls.headline} className="mt-4" />
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border-strong bg-border-strong sm:grid-cols-2 md:grid-cols-3"
        >
          {controls.cards.map((card, i) => (
            <article
              key={card.title}
              className="group relative bg-card-elevated p-8 transition-colors duration-300 hover:bg-[#181818] md:p-10"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[22px] font-bold tracking-[-0.015em]">
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
