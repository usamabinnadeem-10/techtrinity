import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity-image";
import type { PostListItem } from "@/lib/blog-types";

type Props = {
  post: PostListItem;
};

export function BlogCard({ post }: Props) {
  const cover = post.coverImage;
  const lqip = cover.asset?.metadata?.lqip;
  const coverSrc = cover.asset?._id
    ? urlForImage(cover).width(800).height(450).fit("crop").url()
    : null;

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-border-strong"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-card-elevated">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={cover.alt || post.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="self-start rounded-full border border-primary/30 bg-primary-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
            {post.category}
          </span>
          <h3 className="mt-4 font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-[14px] font-light leading-[1.65] text-muted">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-6 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
            <span>{post.readTime} min read</span>
            <span aria-hidden>·</span>
            <span>{post.author?.name ?? "TechTrinity"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
