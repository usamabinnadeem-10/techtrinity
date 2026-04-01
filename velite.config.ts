import { defineConfig, defineCollection, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    posts: defineCollection({
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        publishedAt: s.isodate(),
        updatedAt: s.isodate().optional(),
        tags: s.array(s.string()),
        author: s.string().default('Usama Bin Nadeem'),
        slug: s.path(),
        body: s.mdx(),
      })
    })
  }
})