"use client";

import { useState } from "react";

type Props = {
  url: string;
  title: string;
};

export function BlogShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-[680px] flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
      <span>Share this post</span>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-primary"
      >
        Twitter / X
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-primary"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="transition-colors hover:text-primary"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
