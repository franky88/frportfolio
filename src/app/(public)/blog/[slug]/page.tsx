import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) notFound();
  const p = JSON.parse(JSON.stringify(post));

  return (
    <div
      className="pt-24 pb-20"
      style={{ backgroundColor: "var(--color-blog-bg)" }}
    >
      <div className="site-container">
        <Link
          href="/blog"
          className="text-xs font-display font-semibold uppercase tracking-widest mb-8 inline-block"
          style={{ color: "var(--color-text-primary)", opacity: 0.5 }}
        >
          ← Back to articles
        </Link>

        <div className="max-w-3xl">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            {p.tags?.[0] && (
              <span
                className="text-xs font-display font-semibold uppercase tracking-widest"
                style={{ color: "#7C3AED" }}
              >
                {p.tags[0]}
              </span>
            )}
            {p.publishedAt && (
              <span className="text-xs font-body" style={{ color: "#5A5A6A" }}>
                {format(new Date(p.publishedAt), "dd MMMM yyyy")}
              </span>
            )}
            {p.readTime && (
              <span className="text-xs font-body" style={{ color: "#5A5A6A" }}>
                · {p.readTime} min read
              </span>
            )}
          </div>

          <h1
            className="font-display font-bold text-4xl mb-6"
            style={{ color: "var(--color-blog-heading)" }}
          >
            {p.title}
          </h1>

          <p
            className="font-body text-lg leading-relaxed mb-10"
            style={{ color: "#5A5A6A" }}
          >
            {p.excerpt}
          </p>

          {p.coverImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose-fr"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      </div>
    </div>
  );
}
