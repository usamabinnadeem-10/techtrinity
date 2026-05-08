import { EditorialLabel } from "@/components/home/label";

type Props = {
  paragraphs: string[];
};

export function ServiceDetailOverview({ paragraphs }: Props) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-28">
      <div
        data-reveal
        className="grid gap-10 border-t border-border pt-14 md:grid-cols-[4fr_8fr] md:gap-16 md:pt-16"
      >
        <EditorialLabel>The Brief</EditorialLabel>
        <div className="max-w-[720px] space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[18px] font-light leading-[1.7] text-foreground md:text-[20px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
