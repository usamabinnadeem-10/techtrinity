import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";

type Props = {
  caseStudy?: CaseStudy;
};

export function CaseCTA({ caseStudy }: Props) {
  const cta = caseStudy?.cta;
  const label = cta?.label ?? "Let's Build";
  const showSecondButton = cta?.showSecondButton ?? true;

  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[760px] text-center">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(34px,4.4vw,64px)] font-black leading-[0.98] tracking-[-0.035em]">
            {cta ? (
              <CtaHeadline lines={cta.headline} emphasis={cta.emphasis} />
            ) : (
              <>
                Interested in what a well-architected{" "}
                <em className="italic text-primary">platform</em> looks like for
                your product?
              </>
            )}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/#cta-sec" variant="accent" size="lg">
              Book a Discovery Call
            </LinkButton>
            {showSecondButton && (
              <LinkButton href="/work" variant="ghost" size="lg">
                See Other Case Studies
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaHeadline({
  lines,
  emphasis,
}: {
  lines: string[];
  emphasis?: string;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {emphasis && line.includes(emphasis) ? (
            <>
              {line.split(emphasis).map((part, j, arr) => (
                <span key={j}>
                  {part}
                  {j < arr.length - 1 && (
                    <em className="italic text-primary">{emphasis}</em>
                  )}
                </span>
              ))}
            </>
          ) : (
            line
          )}
        </span>
      ))}
    </>
  );
}
