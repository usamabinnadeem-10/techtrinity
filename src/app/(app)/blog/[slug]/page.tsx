import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { PostHeader } from '@/components/blog/post-header'
import { PostBody } from '@/components/blog/post-body'
import { PostFooter } from '@/components/blog/post-footer'
import type { Metadata } from 'next'

type Params = { slug: string }

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug.replace('posts/', ''),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — TechTrinity`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://techtrinity.ai/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://techtrinity.ai/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechTrinity',
      url: 'https://techtrinity.ai',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://techtrinity.ai/blog/${slug}`,
    },
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Container>
        <section className="py-14">
          <PostHeader
            title={post.title}
            description={post.description}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt}
            tags={post.tags}
            author={post.author}
          />

          <div className="flex flex-col md:flex-row gap-12 mt-12">
            <div className="flex-1 min-w-0">
              <PostBody body={post.body} />
              <PostFooter />
            </div>

            <aside className="hidden md:block w-full md:w-64 shrink-0">
              <div className="sticky top-8 self-start">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
                  In this post
                </p>
                <p className="font-mono text-xs text-muted">
                  Table of contents coming soon.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  )
}
