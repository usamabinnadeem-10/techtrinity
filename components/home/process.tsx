import { EditorialLabel } from "./label";

type Step = {
  num: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Discovery Call",
    description:
      "Free. We learn your operation, your timeline, your constraints. If we're a fit, we'll tell you. If we're not, we'll tell you that too.",
  },
  {
    num: "02",
    title: "Scope & Proposal",
    description:
      "A clear document. What we build, what we don't, what it costs, when it ships. You approve it before anything starts.",
  },
  {
    num: "03",
    title: "Design",
    description:
      "Every screen in Figma before a line of code is written. Nothing moves to development without your sign-off.",
  },
  {
    num: "04",
    title: "Development",
    description:
      "Bi-weekly builds you can actually log in to. Not status updates — working software you can click through.",
  },
  {
    num: "05",
    title: "Launch & Handoff",
    description:
      "Deployed, documented, and yours. We stick around for two weeks post-launch to make sure nothing breaks.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-16" data-reveal>
          <EditorialLabel>The Process</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            No surprises.
            <br />
            No scope creep.
            <br />
            No ghosting.
          </h2>
          <p className="mt-3.5 text-[17px] font-light text-muted">
            We move fast because we understand your operation first — a clear,
            repeatable process you can hold us to.
          </p>
        </div>

        <ol className="border-t border-border">
          {STEPS.map((step, index) => (
            <li
              key={step.num}
              data-reveal
              data-reveal-delay={Math.min(index, 4) || undefined}
              className="group grid grid-cols-[64px_1fr] items-start gap-6 border-b border-border py-10 transition-colors md:grid-cols-[88px_1fr] md:gap-8"
            >
              <span className="font-display text-[42px] font-black leading-none text-border-strong transition-colors duration-300 group-hover:text-primary md:text-[52px]">
                {step.num}
              </span>
              <div>
                <h3 className="text-[22px] font-bold tracking-[-0.015em] md:text-[23px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] font-light leading-[1.75] text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
