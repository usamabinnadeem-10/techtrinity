type Props = {
  included: string[];
  notIncluded: string[];
};

export function ServiceDetailScope({ included, notIncluded }: Props) {
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"
        >
          <div className="bg-card p-8 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              What&apos;s included
            </p>
            <ul className="mt-8 space-y-5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[15px] font-light leading-[1.6] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card p-8 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              What&apos;s not included
            </p>
            <ul className="mt-8 space-y-5">
              {notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[15px] font-light leading-[1.6] text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
