import { EditorialLabel } from "@/components/home/label";

type Props = {
  idealFor: string;
  priceDetail: string[];
};

export function ServiceDetailFitPrice({ idealFor, priceDetail }: Props) {
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="grid gap-12 md:grid-cols-2 md:gap-px md:bg-border md:overflow-hidden md:rounded-lg md:border md:border-border"
        >
          <div className="md:bg-card md:p-12">
            <EditorialLabel>Ideal For</EditorialLabel>
            <div className="mt-7 flex items-start gap-5">
              <span
                aria-hidden
                className="mt-1 font-display text-[64px] font-black leading-[0.7] text-primary"
              >
                &ldquo;
              </span>
              <p className="text-[18px] font-light leading-[1.6] text-foreground md:text-[19px]">
                {idealFor}
              </p>
            </div>
          </div>

          <div className="md:bg-card md:p-12">
            <EditorialLabel>Price Detail</EditorialLabel>
            <ul className="mt-7 space-y-5">
              {priceDetail.map((line, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 text-[15px] font-light leading-[1.7] text-muted"
                >
                  <span
                    aria-hidden
                    className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
