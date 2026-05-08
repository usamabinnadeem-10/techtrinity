"use client";

import type { ImageLoader } from "next/image";

const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  const params = url.searchParams;

  const originalW = Number(params.get("w") ?? 0);
  const originalH = Number(params.get("h") ?? 0);

  if (originalW > 0 && originalH > 0) {
    const scaledH = Math.round((originalH / originalW) * width);
    params.set("w", String(width));
    params.set("h", String(scaledH));
  } else {
    params.set("w", String(width));
  }

  if (quality) {
    params.set("q", String(quality));
  }

  if (!params.has("auto")) {
    params.set("auto", "format");
  }

  return url.href;
};

export default sanityLoader;
