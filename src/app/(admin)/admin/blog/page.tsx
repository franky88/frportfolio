import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { Plus } from "lucide-react";
import { BlogRow } from "@/components/admin/BlogRow";

export default async function AdminBlogPage() {
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-display font-bold"
            style={{ color: "#F5F0E8" }}
          >
            Blog
          </h1>
          <p
            className="text-sm font-body mt-1"
            style={{ color: "#F5F0E8", opacity: 0.5 }}
          >
            {posts.length} posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-display font-semibold transition-colors"
          style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
        >
          <Plus size={16} />
          New post
        </Link>
      </div>

      <div className="rounded-lg overflow-hidden border border-white/10">
        <table className="w-full text-sm font-body">
          <thead>
            <tr style={{ backgroundColor: "#2C2C3A" }}>
              {["Title", "Status", "Published", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                  style={{ color: "#F5F0E8", opacity: 0.6 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <BlogRow
                key={String(post._id)}
                post={JSON.parse(JSON.stringify(post))}
                alt={i % 2 === 1}
              />
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm"
                  style={{
                    color: "#F5F0E8",
                    opacity: 0.4,
                    backgroundColor: "#0A0A0A",
                  }}
                >
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
