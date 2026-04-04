"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IBlogPost } from "@/types";
import { ImageUpload } from "./ImageUpload";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(10, "Content is required"),
  tags: z.string().optional(),
  readTime: z.number().optional(),
  published: z.boolean(),
  coverImage: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";
const inputClass =
  "w-full px-3 py-2.5 rounded-md text-sm font-body border outline-none transition-colors bg-white text-obsidian border-rule focus:border-amber";

export function BlogForm({ post }: { post?: IBlogPost }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: post
      ? {
          ...post,
          tags: post.tags?.join(", ") ?? "",
          published: post.published ?? false,
          coverImage: post.coverImage ?? "",
        }
      : { published: false, coverImage: "" },
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
    const url = post ? `/api/blog/${post._id}` : "/api/blog";
    const method = post ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/admin/blog");
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
      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Title
        </label>
        <input
          className={inputClass}
          placeholder="Post title"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-danger">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Excerpt
        </label>
        <textarea
          className={inputClass}
          rows={2}
          placeholder="Short preview shown in listings"
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className="mt-1 text-xs text-danger">{errors.excerpt.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Content
        </label>
        <textarea
          className={inputClass}
          rows={12}
          placeholder="Full post content (HTML or Markdown)"
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-danger">{errors.content.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Tags <span style={{ opacity: 0.5 }}>(comma-separated)</span>
          </label>
          <input
            className={inputClass}
            placeholder="Design, CSS, Branding"
            {...register("tags")}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Read time (minutes)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="5"
            {...register("readTime", { valueAsNumber: true })}
          />
        </div>
      </div>

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

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 rounded-md text-sm font-display font-semibold disabled:opacity-50 transition-colors"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        {saving ? "Saving…" : post ? "Update post" : "Create post"}
      </button>
    </form>
  );
}
