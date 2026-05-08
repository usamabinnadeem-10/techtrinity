import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

const DEFAULT_REVALIDATE = 60;

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = DEFAULT_REVALIDATE,
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate: tags && tags.length > 0 ? false : revalidate,
        tags,
      },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export const POSTS_LIST_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  readTime,
  coverImage{
    ...,
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  "author": author->{
    _id,
    name,
    photo{
      ...,
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    }
  }
`;

export const ALL_POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    ${POSTS_LIST_FIELDS}
  }
`;

export const ALL_POST_SLUGS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;

export const ALL_POSTS_SITEMAP_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    category,
    readTime,
    seoTitle,
    seoDescription,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    body[]{
      ...,
      _type == "inlineImage" => {
        ...,
        image{
          ...,
          asset->{
            _id,
            url,
            metadata { lqip, dimensions }
          }
        }
      },
      markDefs[]{
        ...,
        _type == "link" => { _type, _key, href, openInNewTab }
      }
    },
    "author": author->{
      _id,
      name,
      bio,
      photo{
        ...,
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt
      }
    }
  }
`;

export const RELATED_POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && _id != $id]{
    "isMatch": category == $category,
    ${POSTS_LIST_FIELDS}
  } | order(isMatch desc, publishedAt desc) [0...3]
`;
