"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IAbout } from "@/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  bio: z.string().min(10, "Bio is required"),
  location: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  heroHeadline: z.string().optional(),
  heroSubtitle: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  dribbble: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";
const inputClass =
  "w-full px-3 py-2.5 rounded-md text-sm font-body border outline-none transition-colors bg-white text-obsidian border-rule focus:border-amber";

export function AboutForm({ about }: { about?: IAbout }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: about
      ? {
          ...about,
          github: about.socialLinks?.github ?? "",
          linkedin: about.socialLinks?.linkedin ?? "",
          twitter: about.socialLinks?.twitter ?? "",
          dribbble: about.socialLinks?.dribbble ?? "",
        }
      : {},
  });

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const { github, linkedin, twitter, dribbble, ...rest } = data;
    const payload = {
      ...rest,
      socialLinks: { github, linkedin, twitter, dribbble },
    };

    await fetch("/api/about", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    router.refresh();
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Name
          </label>
          <input className={inputClass} {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-danger">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Tagline
          </label>
          <input
            className={inputClass}
            placeholder="Graphic Designer & Web Developer"
            {...register("tagline")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ color: "#5A5A6A" }}>
          Bio
        </label>
        <textarea className={inputClass} rows={5} {...register("bio")} />
        {errors.bio && (
          <p className="mt-1 text-xs text-danger">{errors.bio.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Hero Headline
          </label>
          <input
            className={inputClass}
            placeholder="Crafting visuals that think, and code that feels."
            {...register("heroHeadline")}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Hero Subtitle
          </label>
          <input className={inputClass} {...register("heroSubtitle")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Location
          </label>
          <input
            className={inputClass}
            placeholder="City, Country"
            {...register("location")}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#5A5A6A" }}>
            Email
          </label>
          <input
            className={inputClass}
            placeholder="hello@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div
        className="p-4 rounded-lg border border-white/10 space-y-4"
        style={{ backgroundColor: "#2C2C3A" }}
      >
        <h3
          className="text-xs font-display font-semibold uppercase tracking-widest"
          style={{ color: "#E8A020" }}
        >
          Social Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["github", "linkedin", "twitter", "dribbble"] as const).map(
            (platform) => (
              <div key={platform}>
                <label
                  className={labelClass}
                  style={{ color: "#F5F0E8", opacity: 0.7 }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
                <input
                  className={inputClass}
                  placeholder={`https://${platform}.com/`}
                  {...register(platform)}
                />
              </div>
            ),
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 rounded-md text-sm font-display font-semibold disabled:opacity-50 transition-colors"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
