import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CaseStudyImage } from "@/lib/case-studies";

type Props = {
  image: CaseStudyImage;
  url: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  imageAspectRatio?: string;
};

export function BrowserFrame({
  image,
  url,
  className,
  imageClassName,
  priority,
  sizes,
  imageAspectRatio,
}: Props) {
  return (
    <figure
      className={cn(
        "block w-full max-w-full overflow-hidden rounded-md border border-border-strong bg-card-elevated shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] contain-[inline-size]",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 border-b border-border-strong bg-card px-3.5 py-2.5 md:px-4 md:py-3">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-2 rounded-sm border border-border bg-background/60 px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="size-2.5 shrink-0 fill-none stroke-muted-foreground"
            strokeWidth="1.4"
          >
            <rect x="2.5" y="5" width="7" height="5" rx="1" />
            <path d="M4 5V3.5a2 2 0 1 1 4 0V5" />
          </svg>
          <span className="min-w-0 flex-1 truncate">{url}</span>
        </div>
        <div className="w-[42px] shrink-0" aria-hidden />
      </div>
      {imageAspectRatio ? (
        <div
          className="relative w-full overflow-hidden bg-background"
          style={{ aspectRatio: imageAspectRatio }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover object-top", imageClassName)}
          />
        </div>
      ) : (
        <div className="relative w-full bg-background">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className={cn("h-auto w-full", imageClassName)}
          />
        </div>
      )}
    </figure>
  );
}
