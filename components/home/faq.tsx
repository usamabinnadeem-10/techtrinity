import Link from "next/link";
import { BUYER_FAQ } from "@/lib/offer";
import { EditorialLabel } from "./label";

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-[4fr_7fr] md:gap-20 md:px-12">
        <div data-reveal>
          <EditorialLabel>Questions</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.06] tracking-[-0.025em]">
            Before you{" "}
            <em className="italic text-primary">get in touch.</em>
          </h2>
        </div>

        <div data-reveal data-reveal-delay="1" className="min-w-0 border-t border-border">
          {BUYER_FAQ.map((item) => (
            <details
              key={item.id}
              id={`faq-${item.id}`}
              className="group border-b border-border"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-[21px] [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="mt-1 font-mono text-[18px] leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-7 pr-8 text-[15px] font-light leading-[1.75] text-muted">
                <p>{item.answer}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.link.label} →
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
