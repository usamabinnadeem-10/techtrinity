import { PortableText, type PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "./portable-text-components";

type Props = {
  body: PortableTextBlock[] | null;
};

export function BlogPostBody({ body }: Props) {
  if (!body || body.length === 0) return null;
  return (
    <div className="mx-auto max-w-[680px] px-6 md:px-0">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  );
}
