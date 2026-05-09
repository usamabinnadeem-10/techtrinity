import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { ALL_POSTS_SITEMAP_QUERY, sanityClient } from "@/lib/sanity";
import { isSanityConfigured } from "@/sanity/env";
import { getAllServiceSlugs } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

type PostSitemapEntry = {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = getAllCaseStudySlugs().map(
    (slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  let blogIndexLastModified = new Date("2026-05-10");
  let postRoutes: MetadataRoute.Sitemap = [];
  if (isSanityConfigured) {
    try {
      const entries = await sanityClient
        .withConfig({ useCdn: false })
        .fetch<PostSitemapEntry[]>(ALL_POSTS_SITEMAP_QUERY);
      postRoutes = entries.map((entry) => ({
        url: `${SITE_URL}/blog/${entry.slug}`,
        lastModified: new Date(entry._updatedAt || entry.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
      if (entries.length > 0) {
        blogIndexLastModified = postRoutes.reduce((latest, post) =>
          (post.lastModified as Date) > latest ? (post.lastModified as Date) : latest,
          postRoutes[0].lastModified as Date,
        );
      }
    } catch (error) {
      console.error("Failed to fetch post slugs for sitemap:", error);
    }
  }

  const blogIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...blogIndexRoute, ...serviceRoutes, ...caseStudyRoutes, ...postRoutes];
}
