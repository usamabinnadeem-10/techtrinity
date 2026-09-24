import { EditorialLabel } from "@/components/home/label";
import type { CapabilityBlock } from "@/lib/services";

type Props = {
  block: CapabilityBlock;
};

const ROWS = [
  { key: "scope", label: "Proposed scope" },
  { key: "humanBoundary", label: "Human boundary" },
  { key: "measurement", label: "Measurement" },
] as const;

export function ServiceDetailCapabilities({ block }: Props) {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-12 max-w-[720px]" data-reveal>
          <EditorialLabel>{block.label}</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em]">
            {block.headingLead}
            <br />
            <em className="italic text-primary">{block.headingTail}</em>
          </h2>
          <p className="mt-6 text-[15px] font-light leading-[1.75] text-muted">
            {block.note}
          </p>
        </div>

        <ul
          data-reveal
          data-reveal-delay="1"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
        >
          {block.items.map((item) => (
            <li key={item.title} className="flex flex-col bg-card p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.015em]">
                  {item.title}
                </h3>
                <span className="mt-1 shrink-0 rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Illustrative
                </span>
              </div>
              <dl className="mt-7 space-y-5">
                {ROWS.map((row) => (
                  <div key={row.key}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 text-[14px] font-light leading-[1.65] text-foreground">
                      {item[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
