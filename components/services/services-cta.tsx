import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";

export function ServicesCTA() {
  return (
    <section className="border-y border-border bg-card py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[720px] text-center">
          <EditorialLabel>Still Deciding</EditorialLabel>
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(36px,5vw,72px)] font-black leading-[0.96] tracking-[-0.04em]">
            Not sure which{" "}
            <em className="italic text-primary">service fits?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            Book a free 30-minute call. Tell us what&apos;s slowing your
            operation down, and we&apos;ll point you to the right service — or
            tell you honestly if we&apos;re not the right team.
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
            Or email us at{" "}
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
