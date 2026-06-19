import { EditorialLabel } from "@/components/home/label";

type Step = {
  num: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "You reach out",
    description:
      "Fill in the contact form or book a call. Tell us what's slowing your operation down and what you'd like to fix.",
  },
  {
    num: "02",
    title: "Discovery call",
    description:
      "A free 30-minute call. We learn how your business runs, your timeline, and your budget — and tell you honestly if we're not the right fit.",
  },
  {
    num: "03",
    title: "Proposal",
    description:
      "A written proposal within 5 business days. Scope, timeline, fixed price, and exactly what's not included. Nothing starts without your sign-off.",
  },
  {
    num: "04",
    title: "Kick-off",
    description:
      "A 60-minute session to map your workflows in detail and agree how we'll work together. Then we build.",
  },
];

export function ServicesProcess() {
  return (
    <section className="border-y border-border bg-card py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-16 max-w-[720px]" data-reveal>
          <EditorialLabel>The Process</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(34px,4vw,60px)] font-bold leading-[1.04] tracking-[-0.03em]">
            From first message
            <br />
            to <em className="italic text-primary">software that fits.</em>
          </h2>
        </div>

        <ol
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4"
        >
          {STEPS.map((step, index) => (
            <li
              key={step.num}
              className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-card-elevated md:p-10"
            >
              <span
                aria-hidden
                className="font-display text-[64px] font-black leading-none tracking-[-0.04em] text-primary md:text-[72px]"
              >
                {step.num}
              </span>
              <h3 className="mt-7 font-display text-[20px] font-bold tracking-[-0.015em] md:text-[22px]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] font-light leading-[1.7] text-muted">
                {step.description}
              </p>
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-6 top-12 hidden font-mono text-[14px] text-border-strong md:inline"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
