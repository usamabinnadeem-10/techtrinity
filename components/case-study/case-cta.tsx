import Link from "next/link";
import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import type { CaseStudy } from "@/lib/case-studies";
import { ctaAttrs } from "@/lib/cta";
import { BOOK_HREF, PRIMARY_CTA_HELPER, PRIMARY_CTA_LABEL } from "@/lib/offer";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseCTA({ caseStudy }: Props) {
  const { cta, relatedCta, slug } = caseStudy;
  const label = cta?.label ?? "Let's Build";
  const section = `case-study-${slug}`;

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
                Need production-grade engineering for a{" "}
                <em className="italic text-primary">system your team relies on?</em>
              </>
            )}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton
              href={BOOK_HREF}
              variant="accent"
              size="lg"
              cta={{ label: PRIMARY_CTA_LABEL, section }}
            >
              {PRIMARY_CTA_LABEL}
            </LinkButton>
            <LinkButton
              href={relatedCta.href}
              variant="ghost"
              size="lg"
              cta={{ label: relatedCta.label, section, service: relatedCta.service }}
            >
              {relatedCta.label}
            </LinkButton>
          </div>
          <p className="mx-auto mt-6 max-w-[440px] text-[14px] font-light leading-[1.7] text-muted">
            {PRIMARY_CTA_HELPER}
          </p>
          <Link
            href="/#work"
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
            {...ctaAttrs("See other work", section)}
          >
            See other work
          </Link>
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
