import type { CalloutBlock } from "@/lib/services";

type Props = {
  callout: CalloutBlock;
};

export function ServiceDetailCallout({ callout }: Props) {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="relative overflow-hidden rounded-lg border border-border bg-card"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-primary"
          />
          <div className="grid gap-10 p-10 md:grid-cols-[3fr_8fr] md:gap-16 md:p-14">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {callout.label}
              </span>
              <span
                aria-hidden
                className="hidden h-px w-12 bg-border-strong md:block"
              />
            </div>
            <div className="max-w-[680px]">
              <h2 className="font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] text-foreground">
                {callout.title}
              </h2>
              <p className="mt-5 text-[16px] font-light leading-[1.75] text-muted md:text-[17px]">
                {callout.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
