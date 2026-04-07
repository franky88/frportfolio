"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import type { IBlogPost } from "@/types";

export function BlogCard({ post }: { post: IBlogPost }) {
  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-xl overflow-hidden border border-theme"
      style={{ backgroundColor: "var(--color-blog-card)" }}
    >
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {post.tags?.[0] && (
            <span
              className="text-xs font-display font-semibold uppercase tracking-widest"
              style={{ color: "#7C3AED" }}
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
          style={{ color: "#7C3AED" }}
        >
          Read more →
        </Link>
      </div>
    </motion.article>
  );
}
