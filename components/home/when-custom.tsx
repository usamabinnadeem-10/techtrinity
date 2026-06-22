import { EditorialLabel } from "./label";

const POINTS = [
  "Use off-the-shelf software when your process is standard and the team can adapt.",
  "Consider custom software when the workflow is specific, cross-functional, or already held together by manual reconciliation.",
  "Start with a workflow map before deciding what to build.",
];

export function WhenCustom() {
  return (
    <section className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <EditorialLabel>Honest Advice</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Custom software is not always the answer.{" "}
              <em className="italic text-primary">But sometimes it is the right one.</em>
            </h2>
          </div>
          <div data-reveal data-reveal-delay="2" className="space-y-6">
            <p className="text-[17px] font-light leading-[1.85] text-muted">
              If a standard inventory or ERP tool fits your workflow, you should
              use it. We&apos;re useful when your operation is specific enough
              that off-the-shelf software forces the business into the wrong
              process — or when the real problem is the gap between accounting,
              stock, orders, warehouse work, and reporting.
            </p>
            <ul className="space-y-4">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3.5 text-[15px] font-light leading-[1.7] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
