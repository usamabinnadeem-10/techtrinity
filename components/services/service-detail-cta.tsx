import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";

type Props = {
  prompt: string;
  label: string;
};

export function ServiceDetailCTA({ prompt, label }: Props) {
  return (
    <section className="py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div data-reveal className="mx-auto max-w-[820px] text-center">
          <EditorialLabel>Next Step</EditorialLabel>
          <h2 className="mt-4 mb-9 font-display text-[clamp(36px,5.4vw,76px)] font-black leading-[0.96] tracking-[-0.04em]">
            <em className="italic text-primary">{prompt}</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[520px] text-[16px] font-light leading-[1.75] text-muted">
            Book a free 30-minute workflow review. We&apos;ll learn how your
            operation runs today and tell you honestly whether a custom system
            is the right next step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <LinkButton href="/contact" variant="accent" size="lg">
              {label}
            </LinkButton>
            <LinkButton href="/services" variant="ghost" size="lg">
              See all services
            </LinkButton>
          </div>
          <p className="mt-7 text-sm text-muted-foreground">
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
