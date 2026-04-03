import Link from 'next/link'

interface PostHeaderProps {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string | null
  tags: string[] | null
  author: string
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export function PostHeader({
  title,
  description,
  publishedAt,
  updatedAt,
  tags,
  author,
}: PostHeaderProps) {
  return (
    <div className="border-b border-border pb-12">
      <nav className="font-mono text-xs text-muted">
        <Link href="/blog">Blog</Link>
        <span> → </span>
        <span>{truncate(title, 60)}</span>
      </nav>

      <div className="mt-6 flex flex-wrap gap-2">
        {(tags ?? []).map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs border border-border text-muted px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 font-serif text-3xl md:text-5xl text-fg tracking-tight leading-tight">
        {title}
      </h1>

      <p className="mt-4 font-sans text-base text-muted font-light leading-relaxed max-w-2xl">
        {description}
      </p>

      <div className="mt-6 font-mono text-xs text-muted">
        <span>{author}</span>
        <span className="mx-2">·</span>
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        {updatedAt && (
          <>
            <span className="mx-2">·</span>
            <time dateTime={updatedAt}>Updated {formatDate(updatedAt)}</time>
          </>
        )}
      </div>
    </div>
  )
}
