import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity-image";
import sanityLoader from "@/lib/sanity-loader";
import type { PostListItem } from "@/lib/blog-types";

type Props = {
  post: PostListItem;
};

export function BlogFeatured({ post }: Props) {
  const cover = post.coverImage;
  const lqip = cover.asset?.metadata?.lqip;
  const coverSrc = cover.asset?._id
    ? urlForImage(cover).width(1200).height(750).fit("crop").url()
    : null;

  const author = post.author;
  const authorPhoto = author?.photo;
  const authorPhotoSrc = authorPhoto?.asset?._id
    ? urlForImage(authorPhoto).width(80).height(80).fit("crop").url()
    : null;

  return (
    <article className="grid items-center gap-10 rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-border-strong md:grid-cols-[3fr_2fr] md:gap-14 md:p-10">
      <div>
        <span className="inline-flex rounded-full border border-primary/30 bg-primary-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
          {post.category}
        </span>
        <h2 className="mt-5 font-display text-[clamp(28px,3.4vw,46px)] font-bold leading-[1.05] tracking-[-0.025em] text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-[560px] text-[16px] font-light leading-[1.7] text-muted">
          {post.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4 font-mono text-[12px] tracking-[0.04em] text-muted-foreground">
          <span>{post.readTime} min read</span>
          {author ? (
            <span className="flex items-center gap-2">
              {authorPhotoSrc ? (
                <span className="relative inline-block size-7 overflow-hidden rounded-full border border-border">
                  <Image
                    loader={sanityLoader}
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
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex items-center gap-2 border-b border-border pb-1 text-[14px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Read Post <span aria-hidden>→</span>
        </Link>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-card-elevated"
      >
        {coverSrc ? (
          <Image
            loader={sanityLoader}
            src={coverSrc}
            alt={cover.alt || post.title}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : null}
      </Link>
    </article>
  );
}
