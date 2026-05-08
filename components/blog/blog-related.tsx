import { EditorialLabel } from "@/components/home/label";
import type { PostListItem } from "@/lib/blog-types";
import { BlogCard } from "./blog-card";

type Props = {
  posts: PostListItem[];
};

export function BlogRelated({ posts }: Props) {
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="border-t border-border pt-14">
        <EditorialLabel>More Posts</EditorialLabel>
        <h2 className="mt-3.5 font-display text-[clamp(28px,3vw,42px)] font-bold leading-[1.05] tracking-[-0.025em]">
          Keep reading.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
