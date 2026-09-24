import Link from "next/link";
import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import { ctaAttrs } from "@/lib/cta";
import {
  BOOK_HREF,
  PRIMARY_CTA_HELPER,
  PRIMARY_CTA_LABEL,
  messageHref,
  type ServiceIntent,
} from "@/lib/offer";

type Props = {
  prompt: string;
  /** Label for the per-service message CTA. */
  label: string;
  intent: ServiceIntent;
  primary: "book" | "message";
  body?: string;
};

const SECTION = "service_detail_cta";

const DEFAULT_BODY =
  "Book a free 30-minute workflow review. We’ll learn how your operation runs today and tell you honestly whether custom software is the right next step.";

export function ServiceDetailCTA({ prompt, label, intent, primary, body }: Props) {
  const book = {
    href: BOOK_HREF,
    label: primary === "book" ? PRIMARY_CTA_LABEL : "Book a Free Call",
  };
  const message = { href: messageHref(intent), label };
  const [first, second] = primary === "book" ? [book, message] : [message, book];

  return (
    <section className="py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[820px] text-center">
          <EditorialLabel>Next Step</EditorialLabel>
          <h2 className="mt-4 mb-9 font-display text-[clamp(36px,5.4vw,76px)] font-black leading-[0.96] tracking-[-0.04em]">
            <em className="italic text-primary">{prompt}</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[560px] text-[16px] font-light leading-[1.75] text-muted">
            {body ?? DEFAULT_BODY}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton
              href={first.href}
              variant="accent"
              size="lg"
              cta={{ label: first.label, section: SECTION, service: intent }}
            >
              {first.label}
            </LinkButton>
            <LinkButton
              href={second.href}
              variant="ghost"
              size="lg"
              cta={{ label: second.label, section: SECTION, service: intent }}
            >
              {second.label}
            </LinkButton>
          </div>
          <p className="mx-auto mt-6 max-w-[520px] text-[13px] font-light leading-[1.6] text-muted-foreground">
            {PRIMARY_CTA_HELPER}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Or email us at{" "}
            <a
              href="mailto:info@techtrinity.ai"
              className="border-b border-border pb-0.5 text-muted transition-colors hover:border-muted hover:text-foreground"
              {...ctaAttrs("Email", SECTION, intent)}
            >
              info@techtrinity.ai
            </a>
            {" · "}
            <Link
              href="/services"
              className="border-b border-border pb-0.5 text-muted transition-colors hover:border-muted hover:text-foreground"
            >
              See all services
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
