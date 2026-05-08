import Link from "next/link";

export function BlogBack() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 pt-32 md:px-12 md:pt-36">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
      >
        <svg
          aria-hidden
          viewBox="0 0 14 14"
          className="size-3 stroke-current transition-transform duration-300 group-hover:-translate-x-0.5"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 2.5 4.5 7 9 11.5" />
          <path d="M4.5 7H12" />
        </svg>
        <span>Back to Blog</span>
      </Link>
    </div>
  );
}
