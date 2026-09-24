import Link from "next/link";
import { EditorialLabel } from "@/components/home/label";
import type { RelatedWorkBlock } from "@/lib/services";

type Props = {
  block: RelatedWorkBlock;
};

export function ServiceDetailRelatedWork({ block }: Props) {
  return (
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-12 max-w-[720px]" data-reveal>
          <EditorialLabel>{block.label}</EditorialLabel>
          <h2 className="mt-4 font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.08] tracking-[-0.025em]">
            {block.title}
          </h2>
          <p className="mt-5 text-[15px] font-light leading-[1.75] text-muted">
            {block.intro}
          </p>
        </div>
        <ul
          data-reveal
          data-reveal-delay="1"
          className="grid gap-5 md:grid-cols-3"
        >
          {block.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-8 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-primary/30"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {block.label}
                </span>
                <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] font-light leading-[1.7] text-muted">
                  {item.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Read the details
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
