import { EditorialLabel } from "@/components/home/label";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseHeadline } from "./headline";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseArchitecture({ caseStudy }: Props) {
  const { architecture } = caseStudy;
  if (!architecture) return null;
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-16 lg:gap-24">
          <div data-reveal className="md:max-w-[480px]">
            <EditorialLabel tone="muted">{architecture.label}</EditorialLabel>
            <CaseHeadline lines={architecture.headline} className="mt-4" />
            <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-muted">
              {architecture.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div data-reveal data-reveal-delay="2">
            <ArchitectureDiagram caseStudy={caseStudy} />
          </div>
        </div>

        <div
          data-reveal
          data-reveal-delay="3"
          className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
        >
          {architecture.details.map((detail, i) => (
            <article
              key={detail.title}
              className="bg-card p-8 transition-colors duration-300 hover:bg-card-elevated md:p-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Layer
              </p>
              <h4 className="mt-5 font-display text-[22px] font-bold tracking-[-0.015em]">
                {detail.title}
              </h4>
              <p className="mt-3 text-[14px] font-light leading-[1.75] text-muted">
                {detail.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Architecture = NonNullable<CaseStudy["architecture"]>;
type Layer = Architecture["layers"][number];

function ArchitectureDiagram({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.architecture) return null;
  const { layers, externals } = caseStudy.architecture;
  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>System Diagram</span>
        <span className="hidden sm:inline">3 Layers · 2 Externals</span>
      </div>

      <div className="mt-6 flex flex-col">
        {layers.map((layer, i) => {
          const isLast = i === layers.length - 1;
          const isMiddle = i === Math.floor(layers.length / 2);
          return (
            <div key={layer.title}>
              <LayerRow
                layer={layer}
                externals={isMiddle ? externals : undefined}
              />
              {!isLast && <VerticalConnector />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LayerRow({
  layer,
  externals,
}: {
  layer: Layer;
  externals?: string[];
}) {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,200px)] md:gap-0">
      <LayerCard layer={layer} />

      {externals ? (
        <>
          <HorizontalConnector />
          <div className="flex flex-col gap-2">
            {externals.map((ext) => (
              <ExternalChip key={ext} label={ext} />
            ))}
          </div>
        </>
      ) : (
        <>
          <span className="hidden md:block" aria-hidden />
          <span className="hidden md:block" aria-hidden />
        </>
      )}
    </div>
  );
}

function LayerCard({ layer }: { layer: Layer }) {
  const isPrimary = Boolean(layer.primary);
  return (
    <div
      className={cn(
        "relative flex flex-col justify-center rounded-md border px-6 py-5 transition-colors duration-300",
        isPrimary
          ? "border-primary/45 bg-primary-soft"
          : "border-border-strong bg-card-elevated",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h4
          className={cn(
            "font-display text-[18px] font-bold tracking-[-0.015em]",
            isPrimary ? "text-primary" : "text-foreground",
          )}
        >
          {layer.title}
        </h4>
        <span
          aria-hidden
          className={cn(
            "font-mono text-[9.5px] uppercase tracking-[0.22em]",
            isPrimary ? "text-primary" : "text-muted-foreground",
          )}
        >
          {isPrimary ? "Primary" : "Layer"}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[11px] tracking-[0.04em] text-muted">
        {layer.subtitle}
      </p>
    </div>
  );
}

function ExternalChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-between gap-2 rounded-sm border border-border-strong bg-card-elevated px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      <span className="truncate">{label}</span>
      <span
        aria-hidden
        className="font-display text-[10px] tracking-normal text-muted-foreground"
      >
        ext
      </span>
    </span>
  );
}

function VerticalConnector() {
  return (
    <div
      aria-hidden
      className="flex flex-col items-center py-2 md:grid md:grid-cols-[minmax(0,1fr)_56px_minmax(0,200px)]"
    >
      <div className="flex items-center justify-center md:col-start-1">
        <span className="block h-6 w-px bg-border-strong" />
      </div>
    </div>
  );
}

function HorizontalConnector() {
  return (
    <div
      aria-hidden
      className="hidden h-full items-center md:flex"
    >
      <span className="block h-px w-full bg-linear-to-r from-primary/55 via-border-strong to-border-strong" />
    </div>
  );
}
