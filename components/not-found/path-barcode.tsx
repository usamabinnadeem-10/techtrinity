import { cn } from "@/lib/cn";

/**
 * A faux Code-128-style barcode whose bar pattern is derived deterministically
 * from the requested path — so every missing URL "scans" to its own strip, yet
 * the same URL always renders identically (no Math.random, SSR-safe).
 */

// FNV-1a — small, fast, deterministic string hash seeding the bar sequence.
function hashString(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Bar = { width: number; ink: boolean };

// xorshift32 PRNG, seeded by the path hash, turned into a bar/gap sequence.
function barsFromSeed(seed: string, count: number): Bar[] {
  let state = hashString(seed) || 0x9e3779b9;
  const next = () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
  return Array.from({ length: count }, () => ({
    width: 1 + Math.floor(next() * 4), // 1–4px modules
    ink: next() > 0.34, // bars slightly outnumber gaps
  }));
}

type Props = {
  seed: string;
  count?: number;
  className?: string;
};

export function PathBarcode({ seed, count = 48, className }: Props) {
  const bars = barsFromSeed(seed, count);
  return (
    <div
      aria-hidden
      className={cn("flex h-10 items-stretch gap-px", className)}
    >
      {bars.map((bar, i) => (
        <span
          key={i}
          style={{ width: `${bar.width}px` }}
          className={bar.ink ? "bg-foreground/70" : "bg-transparent"}
        />
      ))}
    </div>
  );
}
