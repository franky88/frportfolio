"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ISkill } from "@/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["design", "development", "tools"]),
  proficiency: z.number().min(1).max(100).optional(),
  order: z.number(),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";
const inputClass =
  "w-full px-3 py-2.5 rounded-md text-sm font-body border outline-none transition-colors bg-white text-obsidian border-rule focus:border-amber";

export function SkillForm({ skill }: { skill?: ISkill }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: skill ?? { order: 0, category: "design" as const },
  });

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const url = skill ? `/api/skills/${skill._id}` : "/api/skills";
    const method = skill ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!skill) reset();
    router.refresh();
    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 rounded-lg border border-white/10 space-y-4 max-w-content"
      style={{ backgroundColor: "#2C2C3A" }}
    >
      <h2
        className="text-sm font-display font-semibold uppercase tracking-widest"
        style={{ color: "#E8A020" }}
      >
        {skill ? "Edit skill" : "Add skill"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className={labelClass}
            style={{ color: "#F5F0E8", opacity: 0.7 }}
          >
            Name
          </label>
          <input
            className={inputClass}
            placeholder="Figma"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-danger">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            className={labelClass}
            style={{ color: "#F5F0E8", opacity: 0.7 }}
          >
            Category
          </label>
          <select className={inputClass} {...register("category")}>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="tools">Tools</option>
          </select>
        </div>

        <div>
          <label
            className={labelClass}
            style={{ color: "#F5F0E8", opacity: 0.7 }}
          >
            Proficiency (1–100)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="85"
            {...register("proficiency", { valueAsNumber: true })}
          />
        </div>

        <div>
          <label
            className={labelClass}
            style={{ color: "#F5F0E8", opacity: 0.7 }}
          >
            Order
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="0"
            {...register("order", { valueAsNumber: true })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2.5 rounded-md text-sm font-display font-semibold disabled:opacity-50 transition-colors"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        {saving ? "Saving…" : skill ? "Update skill" : "Add skill"}
      </button>
    </form>
  );
}
