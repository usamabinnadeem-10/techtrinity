import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseScorecard({ caseStudy }: Props) {
  const scorecard = caseStudy.scorecard;
  if (!scorecard) return null;

  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-16 lg:gap-20">
          <div data-reveal>
            <EditorialLabel tone="muted">{scorecard.label}</EditorialLabel>
            <CaseHeadline lines={scorecard.headline} className="mt-4" />
            <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-muted">
              {scorecard.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal data-reveal-delay="2">
            <BrowserFrame
              image={scorecard.image}
              url={scorecard.url}
              sizes="(min-width: 1240px) 600px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <div
          data-reveal
          data-reveal-delay="3"
          className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border-strong bg-border-strong md:grid-cols-3"
        >
          {scorecard.cards.map((card, i) => (
            <article
              key={card.title}
              className="bg-card-elevated p-7 transition-colors duration-300 hover:bg-[#181818] md:p-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.015em]">
                {card.title}
              </h3>
              <p className="mt-3 text-[14px] font-light leading-[1.75] text-muted">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
