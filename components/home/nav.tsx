"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { LinkButton } from "./button";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "./nav-links";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 transition-[background-color,border-color,backdrop-filter] duration-300 md:px-12",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent",
      )}
    >
      <Link
        href="/"
        className="font-display text-[44px] font-bold tracking-tight text-primary"
      >
        tt.
      </Link>
      <ul className="hidden items-center gap-9 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <LinkButton href="/contact" variant="accent">
            Book a Call
          </LinkButton>
        </li>
      </ul>
      <MobileMenu />
    </nav>
  );
}
