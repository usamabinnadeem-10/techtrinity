import type { PortableTextBlock } from "next-sanity";
import { POST_CATEGORIES } from "@/sanity/schemas";

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const ALL_CATEGORIES = [...POST_CATEGORIES] as PostCategory[];

export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt?: string | null;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type AuthorSummary = {
  _id: string;
  name: string;
  photo: SanityImage;
};

export type Author = AuthorSummary & {
  bio: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: PostCategory;
  readTime: number;
  coverImage: SanityImage;
  author: AuthorSummary;
};

export type Post = PostListItem & {
  body: PortableTextBlock[] | null;
  author: Author;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export const CATEGORY_SLUGS: Record<PostCategory, string> = {
  Engineering: "engineering",
  Product: "product",
  Founders: "founders",
  "Case Studies": "case-studies",
  "Agency Life": "agency-life",
};

export function categoryToSlug(category: PostCategory): string {
  return CATEGORY_SLUGS[category];
}

export function slugToCategory(slug: string): PostCategory | null {
  const entry = Object.entries(CATEGORY_SLUGS).find(([, value]) => value === slug);
  return entry ? (entry[0] as PostCategory) : null;
}
