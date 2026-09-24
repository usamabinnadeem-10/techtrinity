import { EditorialLabel } from "./label";

type Problem = { title: string; body: string };

const PROBLEMS: Problem[] = [
  {
    title: "Orders typed in twice",
    body: "The same order is re-entered from email or WhatsApp into a spreadsheet, then again into accounting — and each copy is a chance for a mistake.",
  },
  {
    title: "Stock nobody fully trusts",
    body: "Sales, warehouse, and admin each have a different view of what is available, so someone has to check before every promise to a customer.",
  },
  {
    title: "Reports built by hand",
    body: "Someone exports, cleans, and reconciles numbers before the owner can make a decision — and by then they are already out of date.",
  },
  {
    title: "Handoffs that fall through the gaps",
    body: "Order status moves between sales, warehouse, and dispatch through messages, notes, and memory, so work stalls without anyone noticing.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-2 md:gap-20" data-reveal>
          <div>
            <EditorialLabel>Sound familiar?</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(32px,3.8vw,56px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Spreadsheets made sense.{" "}
              <em className="italic text-primary">Until they didn&apos;t.</em>
            </h2>
          </div>
          <p className="text-[17px] font-light leading-[1.8] text-muted">
            Most operations don&apos;t break all at once. The same few manual
            steps just cost a little more time — and create a few more mistakes
            — every month the business grows.
          </p>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"
        >
          {PROBLEMS.map((problem) => (
            <article
              key={problem.title}
              className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-card-elevated md:p-10"
            >
              <h3 className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.015em] md:text-[22px]">
                {problem.title}
              </h3>
              <p className="mt-3.5 text-[15px] font-light leading-[1.75] text-muted">
                {problem.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
