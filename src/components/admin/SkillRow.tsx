"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { ISkill } from "@/types";

export function SkillRow({ skill, alt }: { skill: ISkill; alt: boolean }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete "${skill.name}"?`)) return;
    await fetch(`/api/skills/${skill._id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <tr style={{ backgroundColor: alt ? "#F5F0E808" : "#0A0A0A" }}>
      <td className="px-4 py-3 font-body" style={{ color: "#F5F0E8" }}>
        {skill.name}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
          style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
        >
          {skill.category}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/10 max-w-32">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${skill.proficiency ?? 0}%`,
                backgroundColor: "#E8A020",
              }}
            />
          </div>
          <span
            className="text-xs font-body"
            style={{ color: "#F5F0E8", opacity: 0.6 }}
          >
            {skill.proficiency ?? 0}%
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={handleDelete}
          className="p-1.5 rounded hover:bg-danger/20 transition-colors"
          style={{ color: "#EF4444" }}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}
