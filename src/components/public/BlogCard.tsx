import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { IBlogPost } from "@/types";

export function BlogCard({ post }: { post: IBlogPost }) {
  return (
    <article
      className="group rounded-xl overflow-hidden border border-theme transition-transform duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--color-blog-card)" }}
    >
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {post.tags?.[0] && (
            <span
              className="text-xs font-display font-semibold uppercase tracking-widest"
              style={{ color: "#E8A020" }}
            >
              {post.tags[0]}
            </span>
          )}
          {post.publishedAt && (
            <span
              className="text-xs font-body"
              style={{ color: "var(--color-blog-muted)" }}
            >
              {format(new Date(post.publishedAt), "dd MMM yyyy")}
            </span>
          )}
          {post.readTime && (
            <span
              className="text-xs font-body"
              style={{ color: "var(--color-blog-muted)" }}
            >
              · {post.readTime} min read
            </span>
          )}
        </div>
        <h3
          className="font-display font-bold text-lg mb-2 leading-snug"
          style={{ color: "var(--color-blog-heading)" }}
        >
          {post.title}
        </h3>
        <p
          className="font-body text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--color-blog-muted)" }}
        >
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-display font-semibold transition-colors group-hover:underline"
          style={{ color: "#E8A020" }}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
