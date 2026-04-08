import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { BlogCard } from "@/components/public/BlogCard";
import { IBlogPost } from "@/types";

export default async function BlogPage() {
  await connectDB();
  const posts = await BlogPost.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();

  return (
    <div
      className="pt-24 pb-20"
      style={{ backgroundColor: "var(--color-blog-bg)" }}
    >
      <div className="site-container">
        <p
          className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#7C3AED" }}
        >
          Writing
        </p>
        <h1
          className="font-display font-bold text-4xl mb-12"
          style={{ color: "var(--color-blog-heading)" }}
        >
          Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JSON.parse(JSON.stringify(posts)).map(
            (post: IBlogPost, index: number) => (
              <BlogCard key={post._id} post={post} isPriority={index === 0} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
