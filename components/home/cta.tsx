import {
  BOOK_HREF,
  messageHref,
  PRIMARY_CTA_HELPER,
  PRIMARY_CTA_LABEL,
  RESPONSE_PROMISE,
} from "@/lib/offer";
import { LinkButton } from "./button";
import { EditorialLabel } from "./label";

type Props = {
  /** Analytics section name recorded with the CTA clicks. */
  section?: string;
};

export function CTA({ section = "final-cta" }: Props) {
  return (
    <section
      id="cta-sec"
      className="border-y border-border bg-card py-28 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[720px] text-center">
          <EditorialLabel>Let&apos;s Build</EditorialLabel>
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(36px,5.5vw,80px)] font-black leading-[0.96] tracking-[-0.04em]">
            Ready to fix the workflow that keeps{" "}
            <em className="italic text-primary">slowing your team down?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            {PRIMARY_CTA_HELPER} Prefer to write? Send a message about the
            workflow you want to improve.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton
              href={BOOK_HREF}
              variant="accent"
              size="lg"
              className="justify-center"
              cta={{ label: PRIMARY_CTA_LABEL, section }}
            >
              {PRIMARY_CTA_LABEL}
            </LinkButton>
            <LinkButton
              href={messageHref()}
              variant="ghost"
              size="lg"
              className="justify-center"
              cta={{ label: "Send a Message", section }}
            >
              Send a Message
            </LinkButton>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {RESPONSE_PROMISE} Or email us at{" "}
            <a
              href="mailto:info@techtrinity.ai"
              className="border-b border-border pb-0.5 text-muted transition-colors hover:border-muted hover:text-foreground"
            >
              info@techtrinity.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
