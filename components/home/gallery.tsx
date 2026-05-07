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

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (single) return;
    const id = window.setInterval(next, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next, single, index]);

  if (total === 0) return null;

  return (
    <div className={cn("flex w-full flex-col items-end gap-6", className)}>
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

      <div className="flex items-center gap-2.5">
        <ArrowButton
          direction="left"
          onClick={prev}
          disabled={single}
          label="Previous image"
        />
        <ArrowButton
          direction="right"
          onClick={next}
          disabled={single}
          label="Next image"
        />
      </div>
    </div>
  );
}

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
};

function ArrowButton({ direction, onClick, disabled, label }: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-[background-color,transform,opacity] duration-200 hover:bg-[#cfff72] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-primary"
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(direction === "left" && "rotate-180")}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
