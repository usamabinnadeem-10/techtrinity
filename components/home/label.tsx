import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "muted";
};

export function EditorialLabel({ children, className, tone = "primary" }: Props) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em]",
        tone === "primary" ? "text-primary" : "text-muted-foreground tracking-[0.14em] text-[10px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
