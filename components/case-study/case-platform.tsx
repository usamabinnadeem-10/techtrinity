import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CasePlatform({ caseStudy }: Props) {
  const platform = caseStudy.platform;
  if (!platform) return null;
  const startWithCopy = platform.startWithCopy ?? false;

  let singleIndex = 0;

  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-16 max-w-[760px] md:mb-20" data-reveal>
          <EditorialLabel tone="muted">{platform.label}</EditorialLabel>
          <CaseHeadline lines={platform.headline} className="mt-4" />
        </div>

        <div className="space-y-20 md:space-y-24">
          {platform.rows.map((row, i) => {
            if ("dual" in row) {
              return (
                <div
                  key={`dual-${i}`}
                  data-reveal
                  data-reveal-delay={Math.min(i + 1, 4)}
                  className="grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-10"
                >
                  {[row.left, row.right].map((side, j) => (
                    <article
                      key={j}
                      className="flex flex-col"
                    >
                      <BrowserFrame
                        image={side.image}
                        url={side.url}
                        sizes="(min-width: 1240px) 560px, (min-width: 768px) 48vw, 100vw"
                        imageAspectRatio="16 / 10"
                      />
                      <p className="mt-5 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {side.caption}
                      </p>
                    </article>
                  ))}
                </div>
              );
            }

            const localIdx = singleIndex++;
            const flipped = startWithCopy
              ? localIdx % 2 === 0
              : localIdx % 2 === 1;
            return (
              <div
                key={row.label}
                data-reveal
                data-reveal-delay={Math.min(i + 1, 4)}
                className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 lg:gap-20"
              >
                <div className={flipped ? "md:order-2" : "md:order-1"}>
                  <BrowserFrame
                    image={row.image}
                    url={row.url}
                    sizes="(min-width: 1240px) 560px, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className={flipped ? "md:order-1" : "md:order-2"}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {row.label}
                  </p>
                  <p className="mt-5 text-[16px] font-light leading-[1.85] text-muted">
                    {row.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
