import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "accent" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center gap-2 rounded-sm font-medium tracking-tight transition-[transform,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  accent:
    "bg-primary text-primary-foreground hover:bg-[#cfff72] hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(184,255,87,0.18)]",
  ghost:
    "border border-border-strong text-foreground hover:border-muted hover:-translate-y-px",
};

const sizes: Record<Size, string> = {
  md: "px-[22px] py-2.5 text-sm",
  lg: "px-[30px] py-3.5 text-[15px]",
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export function LinkButton({
  href,
  external,
  variant = "accent",
  size = "md",
  className,
  children,
  onClick,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
