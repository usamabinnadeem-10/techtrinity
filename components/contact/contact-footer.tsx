import { ORG_ADDRESS_LINE } from "@/lib/site";

export function ContactMinimalFooter() {
  return (
    <footer className="mt-20 border-t border-border py-7">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 font-mono text-[13px] text-muted-foreground md:px-12">
        <span>© 2026 TechTrinity</span>
        {/* Postal line and mailto are one semantic unit — the site's contact info. */}
        <address className="flex flex-wrap items-center gap-3 not-italic">
          <span>{ORG_ADDRESS_LINE}</span>
          <a
            href="mailto:info@techtrinity.ai"
            className="transition-colors hover:text-foreground"
          >
            info@techtrinity.ai
          </a>
        </address>
      </div>
    </footer>
  );
}
