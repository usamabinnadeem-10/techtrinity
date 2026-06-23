import Link from "next/link";
import { EditorialLabel } from "@/components/home/label";
import { NAV_LINKS } from "@/components/home/nav-links";

/** A lost visitor's quickest way back in: the real site sections, framed as
 *  warehouse aisles. The label is in-world; the links are honest navigation. */
export function AisleLinks() {
  return (
    <div className="hero-rise-sm flex flex-col items-center gap-3 [animation-delay:1s]">
      <EditorialLabel tone="muted">Aisles</EditorialLabel>
      <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
        {NAV_LINKS.map((link, i) => (
          <li key={link.href} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className="mr-1 select-none text-muted-foreground"
              >
                ·
              </span>
            )}
            <Link
              href={link.href}
              className="rounded-sm px-1.5 py-0.5 text-[14px] text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
