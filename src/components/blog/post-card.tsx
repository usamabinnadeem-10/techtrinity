import Link from 'next/link'

import type { Post } from '@/lib/blog'

export function PostCard({ post }: { post: Post }) {
  const cleanSlug = post.slug.replace('posts/', '')

  return (
    <Link
      href={`/blog/${cleanSlug}`}
      className="block border border-border p-6 md:p-8 hover:bg-surface transition-colors"
    >
      <div className="flex items-center gap-2">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-xs text-muted uppercase tracking-widest"
        >
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs border border-border text-muted px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-serif text-xl text-fg leading-snug mt-3">
        {post.title}
      </h3>

      <p className="font-sans text-sm text-muted font-light leading-relaxed mt-2">
        {post.description}
      </p>

      <span className="font-mono text-xs text-muted mt-4 inline-block">
        Read post →
      </span>
    </Link>
  )
}
