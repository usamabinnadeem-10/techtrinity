import Link from "next/link";
import { Container } from "@/components/container";

const internalLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
] as const;

const externalLinks = [
  { href: "https://www.linkedin.com/company/techtrinity", label: "LinkedIn" },
  { href: "https://www.upwork.com/agencies/techtrinity", label: "Upwork" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-5">
      <Container className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          © 2025 TechTrinity · techtrinity.ai
        </span>

        <div className="flex items-center space-x-5">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-muted"
            >
              {link.label}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
