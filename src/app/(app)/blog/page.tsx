import type { Metadata } from 'next'

import { PostCard } from '@/components/blog/post-card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — TechTrinity',
  description:
    'Practical writing on software development, MVPs, SaaS architecture, and what it takes to ship production-ready products.',
  openGraph: {
    title: 'Blog — TechTrinity',
    description:
      'Practical writing on software development, MVPs, SaaS architecture, and what it takes to ship production-ready products.',
    url: 'https://techtrinity.ai/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
    <Nav />
    <Container>
      <section className="border-b border-border py-14">
        <div className="flex items-center">
          <span className="inline-block h-px w-5 bg-muted mr-2" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            From the blog
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl text-fg tracking-tight mt-6">
          Practical writing on <em className="text-muted italic">building software.</em>
        </h1>

        <p className="font-sans text-sm text-muted font-light mt-4">
          No fluff. No filler. Just the things we wish someone had told us.
        </p>
      </section>

      <section className="py-12">
        {posts.length === 0 ? (
          <p className="font-mono text-xs text-muted">Posts coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </Container>
    <Footer />
    </>
  )
}
