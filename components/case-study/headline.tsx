import { cn } from "@/lib/cn";

type Props = {
  lines: string[];
  className?: string;
};

export function CaseHeadline({ lines, className }: Props) {
  return (
    <h2
      className={cn(
        "font-display font-bold leading-[1.05] tracking-[-0.025em]",
        "text-[clamp(32px,3.4vw,52px)]",
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}
