import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, type PostDetail } from '@/lib/blog'
import { PostBody } from '@/components/blog/post-body'
import { PostFaq } from '@/components/blog/post-faq'
import { PostFooter } from '@/components/blog/post-footer'
import { PostHeader } from '@/components/blog/post-header'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'

type Params = { slug: string }

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  if (!post) return {}

  const typedPost = post as PostDetail

  return {
    title: `${typedPost.seoTitle ?? typedPost.title} — TechTrinity`,
    description: typedPost.description,
    openGraph: {
      title: typedPost.seoTitle ?? typedPost.title,
      description: typedPost.description,
      url: `https://techtrinity.ai/blog/${slug}`,
      type: 'article',
      publishedTime: typedPost.publishedAt,
      modifiedTime: typedPost.updatedAt ?? typedPost.publishedAt,
      authors: [typedPost.author],
      ...(typedPost.ogImage
        ? {
            images: [
              urlFor(typedPost.ogImage).width(1200).height(630).url(),
            ],
          }
        : {}),
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!post) notFound()

  const typedPost = post as PostDetail

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: typedPost.title,
    description: typedPost.description,
    author: {
      '@type': 'Person',
      name: typedPost.author,
      url: 'https://techtrinity.ai/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechTrinity',
      url: 'https://techtrinity.ai',
    },
    datePublished: typedPost.publishedAt,
    dateModified: typedPost.updatedAt ?? typedPost.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://techtrinity.ai/blog/${slug}`,
    },
  }

  const faqJsonLd =
    typedPost.faq && typedPost.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: typedPost.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <>
      <Nav />
      <script type="application/ld+json">
        {JSON.stringify(blogPostingJsonLd)}
      </script>
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
      <Container>
        <section className="py-14">
          <PostHeader
            title={typedPost.title}
            description={typedPost.description}
            publishedAt={typedPost.publishedAt}
            updatedAt={typedPost.updatedAt}
            tags={typedPost.tags}
            author={typedPost.author}
          />

          <div className="flex flex-col md:flex-row gap-12 mt-12">
            <div className="flex-1 min-w-0">
              <PostBody body={typedPost.body} />
              <PostFaq faq={typedPost.faq} />
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
