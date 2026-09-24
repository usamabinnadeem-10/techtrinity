import { EditorialLabel } from "@/components/home/label";
import type { ProcessBlock, ProcessStep } from "@/lib/services";

/** Numbered step grid shared by the services index and detail pages. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol
      data-reveal
      data-reveal-delay="1"
      className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, index) => (
        <li
          key={step.num}
          className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-card-elevated md:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden
              className="font-display text-[60px] font-black leading-none tracking-[-0.04em] text-primary md:text-[68px]"
            >
              {step.num}
            </span>
            {step.cost && (
              <span
                className={[
                  "mt-1 shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                  step.cost === "Free"
                    ? "border-ring bg-primary-soft text-primary"
                    : "border-border-strong text-muted-foreground",
                ].join(" ")}
              >
                {step.cost}
              </span>
            )}
          </div>
          <h3 className="mt-7 font-display text-[20px] font-bold tracking-[-0.015em] md:text-[22px]">
            {step.title}
          </h3>
          <p className="mt-3 text-[14px] font-light leading-[1.7] text-muted">
            {step.description}
          </p>
          {index < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute right-6 bottom-8 hidden font-mono text-[14px] text-border-strong lg:inline"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

type Props = {
  process: ProcessBlock;
};

export function ServiceDetailProcess({ process }: Props) {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel>{process.label}</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em]">
            {process.headingLead}
            <br />
            <em className="italic text-primary">{process.headingTail}</em>
          </h2>
        </div>
        <ProcessSteps steps={process.steps} />
      </div>
    </section>
  );
}
