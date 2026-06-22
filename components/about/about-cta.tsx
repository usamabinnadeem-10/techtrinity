import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";

export function AboutCTA() {
  return (
    <section className="border-y border-border bg-card py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[760px] text-center">
          <EditorialLabel>Let&apos;s Talk</EditorialLabel>
          <h2 className="mt-3.5 mb-7 font-display text-[clamp(38px,5.2vw,76px)] font-black leading-[0.96] tracking-[-0.04em]">
            Want a team that understands the operational mess{" "}
            <em className="italic text-primary">before writing code?</em>
          </h2>
          <p className="mb-12 text-[17px] font-light leading-[1.75] text-muted">
            Book a free workflow review. We&apos;ll go deep on how your
            operation runs and tell you honestly whether we&apos;re the right
            fit — even if the answer is no.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Or reach us at{" "}
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
