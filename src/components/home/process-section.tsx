import { Container } from "@/components/container";

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We understand your requirements and goals. No fluff — clear scope only.",
  },
  {
    number: "02",
    title: "Proposal & Scope",
    description:
      "Fixed deliverables, transparent pricing, and a realistic timeline within 24 hours.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "Weekly demos, async updates, shared Notion board. You see progress always.",
  },
  {
    number: "04",
    title: "Launch & Handoff",
    description:
      "Deployed, documented, and yours. 30 days post-launch support included.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="border-t border-border">
      <Container>
        <div className="flex items-baseline justify-between pt-14 pb-8">
          <h2 className="font-serif text-2xl text-fg">How we work</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Our Process
          </span>
        </div>

        <div className="grid grid-cols-4 divide-x divide-border border-t border-border py-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-3 px-6">
              <span className="font-mono text-xs uppercase text-muted">
                {step.number}
              </span>
              <span className="font-sans text-sm font-medium text-fg">
                {step.title}
              </span>
              <p className="font-sans text-xs font-light leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
