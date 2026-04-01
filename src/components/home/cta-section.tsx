import Link from "next/link";
import { Container } from "@/components/container";

export function CtaSection() {
  return (
    <section className="border-t border-border py-16">
      <Container>
        <div className="flex items-start justify-between">
          <h2 className="max-w-md font-serif text-4xl tracking-tight text-fg">
            Have a project in mind?
            <br />
            <em className="text-muted">Let&apos;s talk.</em>
          </h2>

          <div className="flex flex-col items-end">
            <a
              href="mailto:usama@techtrinity.ai"
              className="font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              usama@techtrinity.ai
            </a>
            <p className="mt-2 font-mono text-xs text-muted">
              Available for new projects · Based in Pakistan · Serving US
              clients
            </p>
            <Link
              href="/contact"
              className="mt-6 bg-fg px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-colors hover:bg-accent"
            >
              Book a Free Call →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
