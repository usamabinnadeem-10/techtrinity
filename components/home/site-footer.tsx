import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "#", label: "LinkedIn" },
  // { href: "https://github.com/usamabinnadeem-10", label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <span className="font-display text-[19px] font-bold tracking-[-0.03em]">
            TechTrinity
          </span>
          <ul className="flex flex-wrap gap-7">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  target="_blank"
                  href={link.href}
                  className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="font-mono text-[13px] text-muted-foreground">
            © 2026 TechTrinity
          </span>
        </div>
      </div>
    </footer>
  );
}
