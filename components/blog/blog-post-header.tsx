import Image from "next/image";
import { urlForImage } from "@/lib/sanity-image";
import { formatPublishedDate } from "@/lib/format";
import type { Post } from "@/lib/blog-types";

type Props = {
  post: Post;
};

export function BlogPostHeader({ post }: Props) {
  const cover = post.coverImage;
  const lqip = cover.asset?.metadata?.lqip;
  const coverSrc = cover.asset?._id
    ? urlForImage(cover).width(1600).height(900).fit("crop").url()
    : null;

  const author = post.author;
  const authorPhoto = author?.photo;
  const authorPhotoSrc = authorPhoto?.asset?._id
    ? urlForImage(authorPhoto).width(80).height(80).fit("crop").url()
    : null;

  return (
    <header className="mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="mx-auto max-w-[720px] text-center">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
          {post.category}
        </span>
        <h1 className="mt-6 font-display text-[clamp(36px,5vw,68px)] font-black leading-[1.02] tracking-[-0.035em] text-foreground">
          {post.title}
        </h1>
        <p className="mt-6 text-[18px] font-light leading-[1.65] text-muted">
          {post.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[12px] tracking-[0.04em] text-muted-foreground">
          {author ? (
            <span className="flex items-center gap-2">
              {authorPhotoSrc ? (
                <span className="relative inline-block size-7 overflow-hidden rounded-full border border-border">
                  <Image
                    src={authorPhotoSrc}
                    alt={authorPhoto?.alt || author.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              {author.name}
            </span>
          ) : null}
          <span aria-hidden>·</span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>

      {coverSrc ? (
        <div className="mx-auto mt-14 max-w-[1100px]">
          <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card-elevated">
            <Image
              src={coverSrc}
              alt={cover.alt || post.title}
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 1100px, 100vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              priority
              className="h-auto max-h-[480px] w-full object-cover"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
