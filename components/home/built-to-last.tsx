import { EditorialLabel } from "./label";

type Commitment = { title: string; body: string };

// Copy per brief TT-08 — each maps to a delivery practice; do not broaden.
const COMMITMENTS: Commitment[] = [
  {
    title: "Ownership",
    body: "Agreed code, documentation, and account access are handed over so your business retains control.",
  },
  {
    title: "Maintainability",
    body: "We use established technology and document the decisions another engineer will need to understand.",
  },
  {
    title: "Usability",
    body: "Key workflows are designed and reviewed with the people who will use the system.",
  },
  {
    title: "Continuity",
    body: "Launch support is included as scoped. Ongoing maintenance and improvements are available separately.",
  },
];

export function BuiltToLast() {
  return (
    <section id="built-to-last" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[760px]" data-reveal>
          <EditorialLabel>Built to last</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,52px)] font-bold leading-[1.06] tracking-[-0.025em]">
            Built for daily use—{" "}
            <em className="italic text-primary">and the changes that come next.</em>
          </h2>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {COMMITMENTS.map((item, i) => (
            <article
              key={item.title}
              className="group flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-card-elevated md:p-9"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[22px] font-bold tracking-[-0.015em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] font-light leading-[1.7] text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
