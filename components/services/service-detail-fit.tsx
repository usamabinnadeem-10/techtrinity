import { EditorialLabel } from "@/components/home/label";

type Props = {
  idealFor: string;
};

export function ServiceDetailFit({ idealFor }: Props) {
  return (
    <section className="border-y border-border bg-card py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="md:overflow-hidden md:rounded-lg md:border md:border-border md:bg-card md:p-12"
        >
          <EditorialLabel>Ideal For</EditorialLabel>
          <div className="mt-7 flex items-start gap-5">
            <span
              aria-hidden
              className="mt-1 font-display text-[64px] font-black leading-[0.7] text-primary"
            >
              &ldquo;
            </span>
            <p className="max-w-[760px] text-[18px] font-light leading-[1.6] text-foreground md:text-[19px]">
              {idealFor}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
