import Link from 'next/link'

export function PostFooter() {
  return (
    <footer>
      {/* Author */}
      <div className="border-t border-border pt-10 mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          Written by
        </p>
        <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center font-mono text-sm text-muted">
          UBN
        </div>
        <p className="font-sans text-sm font-medium text-fg mt-3">
          Usama Bin Nadeem
        </p>
        <p className="font-sans text-xs text-muted font-light leading-relaxed mt-1 max-w-sm">
          Founder of TechTrinity. 5+ years building software for US and UK
          clients. I write about software architecture, product development, and
          what it actually takes to ship.
        </p>
      </div>

      {/* CTA */}
      <div className="border border-border p-8 mt-10">
        <h2 className="font-serif text-2xl text-fg">
          Working on something like this?
        </h2>
        <p className="font-sans text-sm text-muted font-light leading-relaxed mt-2">
          We build MVPs, SaaS platforms, and APIs for US-based founders. Book a
          free 30-minute call to talk through your project.
        </p>
        <Link
          href="/contact"
          className="bg-fg text-bg font-mono text-xs uppercase tracking-widest px-6 py-3 mt-6 inline-block"
        >
          Book a free call →
        </Link>
      </div>
    </footer>
  )
}
