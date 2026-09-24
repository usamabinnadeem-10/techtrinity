import Link from "next/link";
import { ctaAttrs } from "@/lib/cta";
import { EditorialLabel } from "./label";

type Capability = { title: string; scope: string; boundary: string };

// Illustrative capabilities, not deployed case studies (brief TT-07).
const CAPABILITIES: Capability[] = [
  {
    title: "Enquiry qualification",
    scope: "Collect details, classify the enquiry, and route it to the right person.",
    boundary: "Staff handle exceptions and commercial commitments.",
  },
  {
    title: "Quote preparation",
    scope: "Extract the requested items and prepare a draft quote using approved data.",
    boundary: "Staff approve price and quote before anything is sent.",
  },
  {
    title: "Order-status assistance",
    scope: "Retrieve the status information a customer is permitted to see.",
    boundary: "Missing, conflicting, or uncertain information is escalated to a person.",
  },
];

export function AiAutomation() {
  return (
    <section id="ai" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-12 grid items-end gap-8 md:grid-cols-2 md:gap-20" data-reveal>
          <div>
            <EditorialLabel>Practical AI automation</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.025em]">
              AI where it helps—{" "}
              <em className="italic text-primary">with a person where it matters.</em>
            </h2>
          </div>
          <p className="text-[16px] font-light leading-[1.8] text-muted">
            For repetitive work between your systems, AI agents can take on
            routine steps. We define what needs human approval, connect only
            the systems involved, and recommend a simpler integration when it
            does the job just as well.
          </p>
        </div>

        <p
          data-reveal
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
        >
          Illustrative capabilities — scoped to your workflow and systems
        </p>
        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <article key={cap.title} className="flex flex-col bg-card p-8 md:p-9">
              <h3 className="font-display text-[21px] font-bold leading-[1.2] tracking-[-0.015em]">
                {cap.title}
              </h3>
              <p className="mt-3 text-[15px] font-light leading-[1.7] text-muted">
                {cap.scope}
              </p>
              <p className="mt-auto pt-6 text-[13px] leading-[1.6] text-foreground/80">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                  Human boundary
                </span>
                <br />
                {cap.boundary}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/services/ai-workflow-automation"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
          {...ctaAttrs("AI workflow automation", "ai", "ai-automation")}
        >
          How we scope, test, and measure AI automation →
        </Link>
      </div>
    </section>
  );
}
