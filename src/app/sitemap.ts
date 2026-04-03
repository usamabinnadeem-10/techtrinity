import type { MetadataRoute } from 'next'
import { ALL_POSTS_QUERY, type PostListItem } from '@/lib/blog'
import { sanityFetch } from '@/sanity/lib/live'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://techtrinity.ai'

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const { data: posts } = await sanityFetch({
    query: ALL_POSTS_QUERY,
    perspective: 'published',
    stega: false,
  })

  const blogEntries: MetadataRoute.Sitemap = (posts as PostListItem[]).map(
    (post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  )

  return [...staticEntries, ...blogEntries]
}
