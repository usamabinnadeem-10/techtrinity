import type { Metadata } from "next";
import { Suspense } from "react";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogList } from "@/components/blog/blog-list";
import { ALL_POSTS_QUERY, sanityFetch } from "@/lib/sanity";
import type { PostListItem } from "@/lib/blog-types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing for non-technical founders and the engineers who build with them.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — TechTrinity",
    description:
      "Practical writing for non-technical founders and the engineers who build with them.",
    url: "/blog",
    type: "website",
  },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts =
    (await sanityFetch<PostListItem[]>({
      query: ALL_POSTS_QUERY,
    })) ?? [];

  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <BlogHeader />
        <section className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32">
          <Suspense
            fallback={
              <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                Loading…
              </div>
            }
          >
            <BlogList posts={posts} />
          </Suspense>
        </section>
        <CTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
