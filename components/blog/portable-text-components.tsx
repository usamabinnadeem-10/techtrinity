import Image from "next/image";
import type {
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity-image";
import type { SanityImage } from "@/lib/blog-types";

type LinkValue = {
  href?: string;
  openInNewTab?: boolean;
};

type CodeBlockValue = {
  language?: string;
  code?: string;
};

type InlineImageValue = {
  image: SanityImage;
  alt: string;
  caption?: string;
};

function blockToPlainText(block: PortableTextBlock): string {
  const children = (block.children ?? []) as { text?: string }[];
  return children
    .map((child) => child.text ?? "")
    .join("")
    .trim();
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const id = slugifyHeading(blockToPlainText(value as PortableTextBlock));
      return (
        <h2
          id={id || undefined}
          className="mt-12 mb-5 scroll-mt-24 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const id = slugifyHeading(blockToPlainText(value as PortableTextBlock));
      return (
        <h3
          id={id || undefined}
          className="mt-9 mb-4 scroll-mt-24 font-display text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground"
        >
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="my-5 text-[17px] font-light leading-[1.85] text-muted">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-[3px] border-primary pl-6 font-display text-[19px] italic leading-[1.6] text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-[17px] font-light leading-[1.85] text-muted marker:text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 text-[17px] font-light leading-[1.85] text-muted marker:text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-display italic text-foreground">{children}</em>
    ),
    code: ({ children }) => (
      <code className="rounded border border-border bg-card-elevated px-1.5 py-0.5 font-mono text-[14px] text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const link = value as LinkValue | undefined;
      const href = link?.href ?? "#";
      const newTab = link?.openInNewTab;
      const rel = newTab ? "noopener noreferrer" : undefined;
      const target = newTab ? "_blank" : undefined;
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className="text-primary transition-[border-color] hover:border-b hover:border-primary"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    codeBlock: ({ value }) => {
      const code = value as CodeBlockValue;
      return (
        <pre className="my-8 overflow-x-auto rounded-lg border border-border bg-card p-6 font-mono text-[13px] leading-[1.7] text-primary whitespace-pre-wrap">
          <code>{code?.code ?? ""}</code>
        </pre>
      );
    },
    inlineImage: ({ value }) => {
      const data = value as InlineImageValue;
      const image = data.image;
      if (!image?.asset?._id) return null;
      const dims = image.asset.metadata?.dimensions;
      const width = dims?.width ?? 1280;
      const height = dims?.height ?? Math.round(width / 1.6);
      const lqip = image.asset.metadata?.lqip;
      const src = urlForImage(image).width(1280).url();
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-lg border border-border bg-card-elevated">
            <Image
              src={src}
              alt={data.alt}
              width={width}
              height={height}
              sizes="(min-width: 768px) 680px, 100vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              className="h-auto w-full"
            />
          </div>
          {data.caption ? (
            <figcaption className="mt-3 text-center font-mono text-[12px] tracking-[0.04em] text-muted-foreground">
              {data.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};
