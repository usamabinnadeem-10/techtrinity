import { defineQuery } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    author,
    publishedAt,
    updatedAt,
    tags,
    ogImage
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    seoTitle,
    "slug": slug.current,
    description,
    author,
    publishedAt,
    updatedAt,
    tags,
    ogImage,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "dimensions": asset->metadata.dimensions
      }
    },
    faq[]{ _key, question, answer }
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
}

export type PostListItem = {
  _id: string
  title: string
  slug: string
  description: string
  author: string
  publishedAt: string
  updatedAt: string | null
  tags: string[] | null
  ogImage: SanityImage | null
}

export type FaqItem = {
  _key: string
  question: string
  answer: string
}

export type PostDetail = PostListItem & {
  seoTitle: string | null
  body: PortableTextBlock[]
  faq: FaqItem[] | null
}
