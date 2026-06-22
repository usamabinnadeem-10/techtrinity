"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { LinkButton } from "./button";
import { NAV_LINKS, type NavLink } from "./nav-links";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/** A destination is "current" when the route matches it. Hash links (e.g.
 *  "/#work") live on the homepage, so they mark active only at the root. */
function isActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavRow({
  link,
  active,
  onNavigate,
}: {
  link: NavLink;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <li className="border-b border-border last:border-b-0">
      <Link
        href={link.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className="group relative flex items-center gap-4 py-4 focus-visible:outline-none"
      >
        {/* Selected-row rail — the one accent note, marks the current page. */}
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        />
        <span className="flex min-w-0 flex-1 flex-col gap-1.5 pl-4">
          <span
            className={cn(
              "font-display text-[26px] font-semibold leading-none tracking-tight transition-colors duration-200",
              active
                ? "text-primary"
                : "text-foreground group-hover:text-primary group-focus-visible:text-primary",
            )}
          >
            {link.label}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {link.caption}
          </span>
        </span>
        <ChevronRight
          className={cn(
            "shrink-0 transition-[transform,color] duration-200",
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground",
          )}
        />
      </Link>
    </li>
  );
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = () => setOpen(false);

  // SSR-safe portal gate: `document.body` doesn't exist on the server, and the
  // first client render must match the server HTML (no portal). Mounting here
  // adds the portal only after hydration. The deliberate post-mount setState is
  // the whole point of this pattern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // While open: lock body scroll, trap focus, Escape to close, restore focus.
  // Every link and the CTA call close() on tap, so navigation closes the menu
  // without a route-watching effect.
  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="relative z-[70] -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span aria-hidden className="relative block h-4 w-6">
          <span
            className={cn(
              "absolute left-0 top-1 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
              open && "translate-y-[6px] rotate-45",
            )}
            style={{ transitionTimingFunction: EASE }}
          />
          <span
            className={cn(
              "absolute bottom-1 left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
              open && "-translate-y-[6px] -rotate-45",
            )}
            style={{ transitionTimingFunction: EASE }}
          />
        </span>
      </button>

      {/* Overlay is portaled to <body> so it escapes the nav's containing block.
          The nav gains `backdrop-filter` on scroll, and a backdrop-filter on an
          ancestor makes `position: fixed` descendants scroll with the page —
          which would drag the closed sheet into view. Portaling avoids that.
          It stays mounted; `inert` keeps it out of the tab order and a11y tree
          while closed, so both enter and exit can animate. */}
      {mounted &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-[60] md:hidden",
              open ? "pointer-events-auto" : "pointer-events-none",
            )}
            aria-hidden={!open}
            inert={!open}
          >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={close}
          className={cn(
            "absolute inset-0 h-full w-full cursor-default bg-black/65 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-[14px] border-t border-border-strong bg-card shadow-[0_-24px_60px_rgba(0,0,0,0.5)] transition-transform duration-[420ms]",
            "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            open ? "translate-y-0" : "translate-y-full",
          )}
          style={{ transitionTimingFunction: EASE }}
        >
          <div className="px-6 pt-3">
            <div
              aria-hidden
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-border-strong"
            />
            <div className="mb-1 flex items-center justify-between">
              <span
                id={titleId}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <ul className="px-6">
            {NAV_LINKS.map((link) => (
              <MobileNavRow
                key={link.label}
                link={link}
                active={isActive(pathname, link.href)}
                onNavigate={close}
              />
            ))}
          </ul>

          <div className="px-6 pt-5">
            <LinkButton
              href="/contact"
              variant="accent"
              size="lg"
              className="w-full justify-between"
              onClick={close}
            >
              Book a Call
              <ChevronRight />
            </LinkButton>
          </div>
        </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
