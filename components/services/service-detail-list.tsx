import { EditorialLabel } from "@/components/home/label";
import type { DetailListBlock } from "@/lib/services";

type Props = {
  block: DetailListBlock;
};

/** Titled list of short points — qualification criteria, responsibilities, implementation considerations. */
export function ServiceDetailList({ block }: Props) {
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[4fr_8fr] md:gap-16">
          <div data-reveal>
            <EditorialLabel>{block.label}</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.08] tracking-[-0.025em]">
              {block.title}
            </h2>
            {block.intro && (
              <p className="mt-5 text-[15px] font-light leading-[1.75] text-muted">
                {block.intro}
              </p>
            )}
          </div>
          <dl
            data-reveal
            data-reveal-delay="1"
            className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
          >
            {block.items.map((item) => (
              <div key={item.title} className="bg-card p-7 md:p-8">
                <dt className="font-display text-[18px] font-bold tracking-[-0.01em]">
                  {item.title}
                </dt>
                <dd className="mt-2.5 text-[14px] font-light leading-[1.7] text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
