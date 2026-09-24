import Link from "next/link";
import { ctaAttrs } from "@/lib/cta";
import { LinkButton } from "./button";
import { EditorialLabel } from "./label";

const DELIVERABLES = [
  "Agreed workflow and boundaries",
  "Necessary UI/UX",
  "Scoped integrations",
  "Acceptance checks with users",
  "Deployment and handover",
  "Launch-support terms",
];

export function OneWorkflow() {
  return (
    <section id="start" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-[6fr_5fr] md:gap-20">
          <div data-reveal className="min-w-0">
            <EditorialLabel>Where to start</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,54px)] font-bold leading-[1.06] tracking-[-0.025em]">
              Start with one workflow that{" "}
              <em className="italic text-primary">needs to work better.</em>
            </h2>
            <p className="mt-6 text-[17px] font-light leading-[1.8] text-muted">
              Choose a recurring problem—order handoffs, stock lookup, quote
              preparation, reporting, or another defined process. We map the
              steps, check the systems involved, and scope an improvement your
              team can use in daily work.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <LinkButton
                href="/services/build-only"
                variant="accent"
                className="justify-center"
                cta={{
                  label: "Defined Workflow Build",
                  section: "one-workflow",
                  service: "operations",
                }}
              >
                Defined Workflow Build
              </LinkButton>
              <LinkButton
                href="/services/workflow-assessment"
                variant="ghost"
                className="justify-center"
                cta={{
                  label: "Workflow Assessment",
                  section: "one-workflow",
                  service: "workflow-assessment",
                }}
              >
                Not sure yet? Workflow Assessment
              </LinkButton>
            </div>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
              {...ctaAttrs("All services", "one-workflow")}
            >
              All services, including larger builds and ongoing support →
            </Link>
          </div>

          <div data-reveal data-reveal-delay="2" className="min-w-0 space-y-4">
            <div className="rounded-lg border border-border bg-card p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                What you get
              </p>
              <ul className="mt-6 space-y-3.5">
                {DELIVERABLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-[15px] font-light leading-[1.6] text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[8px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-lg border border-border p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Honest advice
              </p>
              <p className="mt-4 text-[15px] font-light leading-[1.75] text-muted">
                If a standard inventory or ERP product fits your process, use it.
                Custom software earns its place when the workflow is specific,
                crosses several teams, or is already held together by manual
                reconciliation—and we&apos;ll tell you which one you have.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
