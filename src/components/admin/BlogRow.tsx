"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { IBlogPost } from "@/types";

export function BlogRow({ post, alt }: { post: IBlogPost; alt: boolean }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await fetch(`/api/blog/${post._id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <tr style={{ backgroundColor: alt ? "#F5F0E808" : "#0A0A0A" }}>
      <td className="px-4 py-3 font-body" style={{ color: "#F5F0E8" }}>
        {post.title}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
          style={{
            backgroundColor: post.published ? "#22C55E20" : "#F59E0B20",
            color: post.published ? "#22C55E" : "#F59E0B",
          }}
        >
          {post.published ? "Published" : "Draft"}
        </span>
      </td>
      <td
        className="px-4 py-3 text-sm font-body"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        {post.publishedAt
          ? format(new Date(post.publishedAt), "dd MMM yyyy")
          : "—"}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={`/admin/blog/${post._id}/edit`}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            style={{ color: "#F5F0E8", opacity: 0.6 }}
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded hover:bg-danger/20 transition-colors"
            style={{ color: "#EF4444" }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
