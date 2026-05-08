import Image from "next/image";
import { urlForImage } from "@/lib/sanity-image";
import type { Author } from "@/lib/blog-types";

type Props = {
  author: Author;
};

export function BlogAuthorCard({ author }: Props) {
  const photo = author.photo;
  const photoSrc = photo?.asset?._id
    ? urlForImage(photo).width(160).height(160).fit("crop").url()
    : null;

  return (
    <aside className="mx-auto max-w-[680px] rounded-xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-start gap-5 md:gap-6">
        {photoSrc ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-border md:size-20">
            <Image
              src={photoSrc}
              alt={photo?.alt || author.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-col">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            Written by
          </span>
          <h2 className="mt-1.5 font-display text-[20px] font-bold leading-[1.2] tracking-[-0.015em] text-foreground">
            {author.name}
          </h2>
          <p className="mt-2 text-[14px] font-light leading-[1.65] text-muted">
            {author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}
