import Link from "next/link";
import { Container } from "@/components/container";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export function Nav() {
  return (
    <nav className="w-full border-b border-border">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="font-serif text-xl leading-tight text-fg">
            TechTrinity
          </span>
          <span className="font-mono text-xs tracking-widest text-muted">
            techtrinity.ai
          </span>
        </Link>

        <div className="flex items-center gap-8">
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

        <Link
          href="/contact"
          className="bg-fg px-4 py-2 font-mono text-xs uppercase tracking-widest text-bg"
        >
          Start a project
        </Link>
      </Container>
    </nav>
  );
}
