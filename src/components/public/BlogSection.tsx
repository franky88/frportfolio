import Link from "next/link";
import { BlogCard } from "./BlogCard";
import type { IBlogPost } from "@/types";

export function BlogSection({ posts }: { posts: IBlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="py-20 transition-colors"
      style={{ backgroundColor: "var(--color-blog-bg)" }}
    >
      <div className="site-container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#E8A020" }}
            >
              Writing
            </p>
            <h2
              className="font-display font-bold text-4xl"
              style={{ color: "var(--color-blog-heading)" }}
            >
              Latest articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-display font-semibold hidden md:block transition-colors"
            style={{ color: "var(--color-blog-muted)" }}
          >
            All articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
