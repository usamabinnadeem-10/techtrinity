import Link from "next/link";
import { EditorialLabel } from "@/components/home/label";
import type { FaqItem } from "@/lib/offer";

type Props = {
  faqs: FaqItem[];
  /** Path of the current page; links pointing here are not repeated. */
  currentPath: string;
};

export function ServiceDetailFaq({ faqs, currentPath }: Props) {
  if (faqs.length === 0) return null;
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[4fr_8fr] md:gap-16">
          <div data-reveal>
            <EditorialLabel>Questions</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Before you <em className="italic text-primary">get in touch.</em>
            </h2>
          </div>
          <dl data-reveal data-reveal-delay="1" className="divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-7">
                <dt className="font-display text-[19px] font-bold tracking-[-0.01em]">
                  {faq.question}
                </dt>
                <dd className="mt-3 text-[15px] font-light leading-[1.75] text-muted">
                  {faq.answer}
                  {faq.link && faq.link.href !== currentPath && (
                    <>
                      {" "}
                      <Link
                        href={faq.link.href}
                        className="whitespace-nowrap border-b border-border pb-0.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {faq.link.label} →
                      </Link>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
