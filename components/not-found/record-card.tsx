"use client";

import { usePathname } from "next/navigation";
import { PathBarcode } from "./path-barcode";

const MAX_PATH_LENGTH = 42;

/** Clamp the (user-controlled) path to a display-safe label. React escapes the
 *  text on render, so this is purely for layout, not security. */
function toItemLabel(pathname: string | null): string {
  if (!pathname || pathname === "/") return "/unknown";
  if (pathname.length <= MAX_PATH_LENGTH) return pathname;
  return `${pathname.slice(0, MAX_PATH_LENGTH - 1)}…`;
}

type Field = { label: string; value: string; accent?: boolean };

export function RecordCard() {
  const pathname = usePathname();
  const item = toItemLabel(pathname);

  const fields: Field[] = [
    { label: "Item", value: item },
    { label: "Location", value: "—" },
    { label: "Last seen", value: "—" },
    { label: "Status", value: "Not found" },
    { label: "On hand", value: "0", accent: true },
  ];

  return (
    <div className="hero-rise-sm relative w-full max-w-[440px] overflow-hidden rounded-lg border border-border-strong bg-card-elevated [animation-delay:0.7s]">
      {/* One-shot lime scan-line that sweeps the record once on load. */}
      <span aria-hidden className="scan-line" />

      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <PathBarcode seed={item} className="min-w-0 flex-1" />
        <div className="flex flex-col items-end leading-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Code
          </span>
          <span className="font-mono text-[26px] font-medium tracking-tight text-foreground">
            404
          </span>
        </div>
      </div>

      <div className="mx-6 mt-5 border-t border-dashed border-border" />

      <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 px-6 pb-6 pt-5 font-mono text-[13px]">
        {fields.map((field) => (
          <div key={field.label} className="contents">
            <dt className="self-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {field.label}
            </dt>
            <dd
              className={
                field.accent
                  ? "self-center break-all font-medium text-primary"
                  : "self-center break-all text-foreground"
              }
            >
              {field.label === "Status" ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_rgba(184,255,87,0.7)]"
                  />
                  {field.value}
                </span>
              ) : (
                field.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
