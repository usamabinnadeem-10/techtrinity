import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { BlogAuthorCard } from "@/components/blog/blog-author-card";
import { BlogBack } from "@/components/blog/blog-back";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { BlogRelated } from "@/components/blog/blog-related";
import { BlogShare } from "@/components/blog/blog-share";
import {
  ALL_POST_SLUGS_QUERY,
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  sanityClient,
  sanityFetch,
} from "@/lib/sanity";
import { isSanityConfigured } from "@/sanity/env";
import { urlForImage } from "@/lib/sanity-image";
import type { Post, PostListItem } from "@/lib/blog-types";

type RouteParams = { slug: string };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://techtrinity.ai";

export const revalidate = 60;

export async function generateStaticParams(): Promise<RouteParams[]> {
  if (!isSanityConfigured) return [];
  try {
    const slugs = await sanityClient
      .withConfig({ useCdn: false })
      .fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY);
    return slugs.map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error("Failed to fetch slugs for static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  });

  if (!post) {
    return { title: "Post — TechTrinity" };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage?.asset?._id
    ? urlForImage(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${title} — TechTrinity`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  const post = await sanityFetch<Post>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "author"],
  });

  if (!post) notFound();

  const relatedPosts =
    (await sanityFetch<PostListItem[]>({
      query: RELATED_POSTS_QUERY,
      params: { id: post._id, category: post.category },
      tags: ["post"],
    })) ?? [];

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <BlogBack />
        <article className="pb-20 pt-10 md:pt-14">
          <BlogPostHeader post={post} />
          <div className="mt-14 md:mt-20">
            <BlogPostBody body={post.body} />
          </div>
          <div className="mx-auto mt-16 max-w-[1240px] px-6 md:px-12">
            <BlogShare url={url} title={post.title} />
          </div>
          <div className="mx-auto mt-12 max-w-[1240px] px-6 md:px-12">
            <BlogAuthorCard author={post.author} />
          </div>
        </article>
        <BlogRelated posts={relatedPosts} />
        <div className="mt-20">
          <CTA />
        </div>
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
