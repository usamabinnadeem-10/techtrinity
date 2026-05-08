import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseOutcomes({ caseStudy }: Props) {
  const { outcomes } = caseStudy;
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 text-center" data-reveal>
          <EditorialLabel tone="muted">{outcomes.label}</EditorialLabel>
          <CaseHeadline lines={outcomes.headline} className="mt-4" />
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-strong bg-border-strong sm:grid-cols-2 md:grid-cols-4"
        >
          {outcomes.cards.map((card, i) => (
            <article
              key={i}
              className="group relative flex flex-col bg-card-elevated p-7 transition-colors duration-300 hover:bg-[#181818] md:p-9"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 font-display text-[clamp(28px,3vw,42px)] font-black leading-[1] tracking-[-0.025em] text-primary">
                {card.primary}
              </p>
              <div className="mt-4 space-y-1 text-[14px] font-light leading-[1.7] text-muted">
                {card.description.map((line, j) => (
                  <p
                    key={j}
                    className={
                      j === 0
                        ? "font-mono text-[11px] uppercase tracking-[0.16em] text-foreground"
                        : undefined
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
