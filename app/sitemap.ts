import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/case-studies";
import { ALL_POST_SLUGS_QUERY, sanityClient } from "@/lib/sanity";
import { isSanityConfigured } from "@/sanity/env";
import { getAllServiceSlugs } from "@/lib/services";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://techtrinity.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = getAllCaseStudySlugs().map(
    (slug) => ({
      url: `${BASE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  let postRoutes: MetadataRoute.Sitemap = [];
  if (isSanityConfigured) {
    try {
      const slugs = await sanityClient
        .withConfig({ useCdn: false })
        .fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY);
      postRoutes = slugs.map(({ slug }) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    } catch (error) {
      console.error("Failed to fetch post slugs for sitemap:", error);
    }
  }

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...postRoutes];
}
