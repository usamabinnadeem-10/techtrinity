"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  images: GalleryImage[];
  className?: string;
};

const AUTOPLAY_INTERVAL_MS = 3500;

export function Gallery({ images, className }: Props) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const single = total <= 1;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (single) return;
    const id = window.setInterval(next, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next, single, index]);

  if (total === 0) return null;

  return (
    <div className={cn("flex w-full flex-col items-center gap-6", className)}>
      <div className="relative aspect-2614/1666 w-full">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority={i === 0}
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 440px, 0px"
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i === index ? undefined : true}
          />
        ))}
      </div>

      {!single && (
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Product gallery">
          {images.map((img, i) => (
            <Dot
              key={img.src}
              active={i === index}
              onClick={() => setIndex(i)}
              label={`Show ${img.alt}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DotProps = {
  active: boolean;
  onClick: () => void;
  label: string;
};

function Dot({ active, onClick, label }: DotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-selected={active}
      role="tab"
      className="group inline-flex h-6 w-6 items-center justify-center focus-visible:outline-none"
    >
      <span
        className={cn(
          "block rounded-full transition-[width,height,background-color] duration-300 ease-out",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
          active
            ? "h-2.5 w-6 bg-primary"
            : "h-2.5 w-2.5 bg-border group-hover:bg-muted-foreground",
        )}
      />
    </button>
  );
}
