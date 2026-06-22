"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  ALL_CATEGORIES,
  CATEGORY_SLUGS,
  categoryToSlug,
  slugToCategory,
  type PostListItem,
  type PostCategory,
} from "@/lib/blog-types";
import { BlogCard } from "./blog-card";
import { BlogFeatured } from "./blog-featured";

const POSTS_PER_PAGE = 6;

type Filter = "all" | PostCategory;

type Props = {
  posts: PostListItem[];
};

export function BlogList({ posts }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category");
  const initialFilter: Filter =
    initialCategory && slugToCategory(initialCategory)
      ? (slugToCategory(initialCategory) as PostCategory)
      : "all";

  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter !== "all") {
      params.set("category", categoryToSlug(filter));
    }
    const query = params.toString();
    const next = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", next);
  }, [filter, pathname]);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((post) => post.category === filter);
  }, [filter, posts]);

  const featured = filter === "all" ? posts[0] : null;

  const gridSource = featured ? filtered.slice(1) : filtered;

  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const visible = gridSource.slice(start, start + POSTS_PER_PAGE);

  const handleFilterChange = (next: Filter) => {
    setFilter(next);
    setPage(1);
  };

  return (
    <div className="space-y-16">
      <CategoryFilter active={filter} onChange={handleFilterChange} />

      {posts.length === 0 ? (
        <div className="max-w-[640px] space-y-7">
          <p className="text-[17px] font-light leading-[1.8] text-muted">
            We&apos;re preparing practical guides for owner-led wholesale,
            distribution, and inventory-heavy businesses. Start with the
            EasyAccounts case study to see the kind of operational problems we
            build around.
          </p>
          <Link
            href="/work/easyaccounts"
            className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read the EasyAccounts Case Study <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <>
          {featured ? <BlogFeatured post={featured} /> : null}

          {visible.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              No posts in this category yet.
            </p>
          )}

          {totalPages > 1 ? (
            <Pagination
              current={safePage}
              total={totalPages}
              onChange={setPage}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (next: Filter) => void;
}) {
  const filters: Filter[] = ["all", ...ALL_CATEGORIES];
  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((f) => {
        const label = f === "all" ? "All" : f;
        const isActive = active === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-200",
              isActive
                ? "border-primary/30 bg-primary-soft text-primary"
                : "border-border bg-card text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 border-t border-border pt-10"
    >
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
          className={cn(
            "min-w-9 rounded-full px-3 py-1.5 font-mono text-[12px] tracking-[0.04em] transition-colors duration-200",
            p === current
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {p.toString().padStart(2, "0")}
        </button>
      ))}
    </nav>
  );
}

export { CATEGORY_SLUGS };
