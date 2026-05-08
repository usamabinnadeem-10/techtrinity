import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseReview({ caseStudy }: Props) {
  const review = caseStudy.review;
  if (!review) return null;

  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel tone="muted">{review.label}</EditorialLabel>
          <CaseHeadline lines={review.headline} className="mt-4" />
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
          {review.items.map((item, i) => (
            <article
              key={i}
              data-reveal
              data-reveal-delay={Math.min(i + 1, 4)}
              className="flex flex-col"
            >
              <BrowserFrame
                image={item.image}
                url={item.url}
                sizes="(min-width: 1240px) 560px, (min-width: 768px) 48vw, 100vw"
                imageAspectRatio="16 / 10"
              />
              <p className="mt-5 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.caption}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
