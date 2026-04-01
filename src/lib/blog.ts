import { posts } from '../../.velite'

export type Post = (typeof posts)[number]

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === `posts/${slug}`)
}

export function getRelatedPosts(current: Post, count = 2): Post[] {
  return posts
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.tags.some((t) => current.tags.includes(t)))
    .slice(0, count)
}