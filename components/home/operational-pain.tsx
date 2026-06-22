import { EditorialLabel } from "./label";

type Pain = { title: string; body: string };

const PAINS: Pain[] = [
  {
    title: "Stock numbers nobody fully trusts",
    body: "Sales, warehouse, and admin teams each have a different version of what is available.",
  },
  {
    title: "Reports that take hours to compile",
    body: "The owner waits for someone to export, clean, and reconcile numbers before decisions can be made.",
  },
  {
    title: "Orders scattered across tools",
    body: "Order status lives in email, spreadsheets, warehouse notes, and someone's memory.",
  },
  {
    title: "Purchasing that reacts too late",
    body: "Low stock is noticed after the sale is already at risk.",
  },
  {
    title: "Branches working from different views",
    body: "Transfers, availability, and accountability become harder as locations grow.",
  },
  {
    title: "Software the team avoids using",
    body: "Overbuilt systems fail when warehouse and admin staff cannot use them easily.",
  },
];

export function OperationalPain() {
  return (
    <section id="operational-pain" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 max-w-[720px]" data-reveal>
          <EditorialLabel>What We See</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            The problems we usually{" "}
            <em className="italic text-primary">walk into.</em>
          </h2>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {PAINS.map((pain) => (
            <article
              key={pain.title}
              className="group relative flex flex-col bg-card p-9 transition-colors duration-300 hover:bg-card-elevated md:p-10"
            >
              <h3 className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.015em] md:text-[22px]">
                {pain.title}
              </h3>
              <p className="mt-3.5 text-[15px] font-light leading-[1.75] text-muted">
                {pain.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
