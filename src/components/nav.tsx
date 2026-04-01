"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/container";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <nav className={`w-full${isOpen ? "" : " border-b border-border"}`}>
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="font-serif text-xl leading-tight text-fg">
            TechTrinity
          </span>
          <span className="font-mono text-xs tracking-widest text-muted">
            techtrinity.ai
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden bg-fg px-4 py-2 font-mono text-xs uppercase tracking-widest text-bg md:block"
        >
          Start a project
        </Link>

        {/* Mobile hamburger / close button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div
            className={`h-0.5 w-5 bg-fg transition-all duration-200${
              isOpen ? " translate-y-2 rotate-45" : ""
            }`}
          />
          <div
            className={`h-0.5 w-5 bg-fg transition-all duration-200${
              isOpen ? " opacity-0" : ""
            }`}
          />
          <div
            className={`h-0.5 w-5 bg-fg transition-all duration-200${
              isOpen ? " -translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-200 md:hidden${
          isOpen ? " border-b border-border" : " max-h-0"
        }`}
        style={isOpen ? { maxHeight: `${navLinks.length * 56 + 56}px` } : undefined}
      >
        <Container>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block border-b border-border py-4 font-mono text-xs uppercase tracking-widest text-fg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="my-4 block w-full bg-fg py-3 text-center font-mono text-xs uppercase tracking-widest text-bg"
          >
            Start a project
          </Link>
        </Container>
      </div>
    </nav>
  );
}
