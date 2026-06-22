import { LinkButton } from "./button";
import { EditorialLabel } from "./label";

export function CTA() {
  return (
    <section
      id="cta-sec"
      className="border-y border-border bg-card py-28 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[720px] text-center">
          <EditorialLabel>Let&apos;s Build</EditorialLabel>
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(40px,5.5vw,80px)] font-black leading-[0.94] tracking-[-0.04em]">
            Ready to fix the workflow that keeps{" "}
            <em className="italic text-primary">slowing your team down?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            Book a free 30-minute workflow review. No pitch, no pressure — just
            an honest conversation about how your stock, order, warehouse,
            purchasing, or reporting process works today, where it breaks, and
            whether a custom system makes sense.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
            <LinkButton href="/contact" variant="ghost" size="lg">
              Send a Message
            </LinkButton>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Email us at{" "}
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
