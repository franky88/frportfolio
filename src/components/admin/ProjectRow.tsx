"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { IProject } from "@/types";

interface Props {
  project: IProject;
  alt: boolean;
}

export function ProjectRow({ project, alt }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <tr style={{ backgroundColor: alt ? "#F5F0E808" : "#0A0A0A" }}>
      <td className="px-4 py-3 font-body" style={{ color: "#F5F0E8" }}>
        {project.title}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
          style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
        >
          {project.category === "graphic-design" ? "Graphic Design" : "Web Dev"}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
          style={{
            backgroundColor: project.published ? "#22C55E20" : "#F59E0B20",
            color: project.published ? "#22C55E" : "#F59E0B",
          }}
        >
          {project.published ? "Published" : "Draft"}
        </span>
      </td>
      <td
        className="px-4 py-3 text-sm font-body"
        style={{ color: "#F5F0E8", opacity: 0.6 }}
      >
        {project.featured ? "★ Yes" : "—"}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={`/admin/projects/${project._id}/edit`}
            className="p-1.5 rounded transition-colors hover:bg-white/10"
            style={{ color: "#F5F0E8", opacity: 0.6 }}
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded transition-colors hover:bg-danger/20"
            style={{ color: "#EF4444" }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
