"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IProject } from "@/types";
import { ImageUpload } from "./ImageUpload";
import { RichTextEditor } from "./RichTextEditor";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["graphic-design", "web-development"]),
  content: z.string().optional(),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverImage: z.string().optional(),
  tags: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";
const inputClass =
  "w-full px-3 py-2.5 rounded-md text-sm font-body border outline-none transition-colors bg-white text-obsidian border-rule focus:border-amber";
const errorClass = "mt-1 text-xs font-body text-danger";

export function ProjectForm({ project }: { project?: IProject }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: project
      ? {
          ...project,
          tags: project.tags?.join(", ") ?? "",
          coverImage: project.coverImage ?? "",
        }
      : { featured: false, published: false, coverImage: "" },
  });

  const coverImage = watch("coverImage");

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const payload = {
      ...data,
      tags: data.tags
        ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };
    const url = project ? `/api/projects/${project._id}` : "/api/projects";
    const method = project ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-content">
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Cover image
        </label>
        <ImageUpload
          value={coverImage}
          onChange={(url) => setValue("coverImage", url)}
          onClear={() => setValue("coverImage", "")}
        />
      </div>
      {/* Title */}
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Title
        </label>
        <input
          className={inputClass}
          placeholder="Project title"
          {...register("title")}
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Category
        </label>
        <select className={inputClass} {...register("category")}>
          <option value="graphic-design">Graphic Design</option>
          <option value="web-development">Web Development</option>
        </select>
        {errors.category && (
          <p className={errorClass}>{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Description
        </label>
        <textarea
          className={inputClass}
          rows={3}
          placeholder="Short summary shown on project cards"
          {...register("description")}
        />
        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Content{" "}
          <span style={{ opacity: 0.5 }}>(optional — full case study)</span>
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder="Write your content here…"
            />
          )}
        />
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Tags <span style={{ opacity: 0.5 }}>(comma-separated)</span>
        </label>
        <input
          className={inputClass}
          placeholder="React, Figma, TypeScript"
          {...register("tags")}
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Live URL
          </label>
          <input
            className={inputClass}
            placeholder="https://"
            {...register("liveUrl")}
          />
          {errors.liveUrl && (
            <p className={errorClass}>{errors.liveUrl.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            GitHub URL
          </label>
          <input
            className={inputClass}
            placeholder="https://github.com/"
            {...register("githubUrl")}
          />
          {errors.githubUrl && (
            <p className={errorClass}>{errors.githubUrl.message}</p>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-amber"
            {...register("featured")}
          />
          <span className="text-sm font-body" style={{ color: "#F5F0E8" }}>
            Featured on homepage
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-amber"
            {...register("published")}
          />
          <span className="text-sm font-body" style={{ color: "#F5F0E8" }}>
            Published
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 rounded-md text-sm font-display font-semibold transition-colors disabled:opacity-50"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        {saving ? "Saving…" : project ? "Update project" : "Create project"}
      </button>
    </form>
  );
}
