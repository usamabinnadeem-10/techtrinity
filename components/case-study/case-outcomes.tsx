import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

/** Grid columns per card count, so 1–3 cards don't leave empty cells. */
function gridColumns(count: number): string {
  if (count <= 1) return "";
  if (count === 2) return "sm:grid-cols-2";
  if (count === 3) return "sm:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
}

export function CaseOutcomes({ caseStudy }: Props) {
  const { outcomes } = caseStudy;
  if (outcomes.cards.length === 0) return null;
  const longValues = outcomes.cards.some((c) => c.primary.length > 8);
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
          className={[
            "grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-strong bg-border-strong",
            gridColumns(outcomes.cards.length),
            outcomes.cards.length === 1 ? "mx-auto max-w-[420px]" : "",
          ].join(" ")}
        >
          {outcomes.cards.map((card, i) => (
            <article
              key={i}
              className="group relative flex flex-col bg-card-elevated p-7 transition-colors duration-300 hover:bg-[#181818] md:p-9"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={[
                  "mt-6 break-words font-display font-black leading-[1] tracking-[-0.025em] text-primary",
                  // Word-valued cards ("Multi-branch") need a smaller size
                  // than short figures to fit narrow columns.
                  longValues
                    ? "text-[clamp(24px,2.2vw,32px)]"
                    : "text-[clamp(28px,3vw,42px)]",
                ].join(" ")}
              >
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
