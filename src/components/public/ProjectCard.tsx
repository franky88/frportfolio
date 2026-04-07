"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { IProject } from "@/types";

export function ProjectCard({ project }: { project: IProject }) {
  const categoryLabel =
    project.category === "graphic-design"
      ? "Graphic Design"
      : "Web Development";

  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-xl overflow-hidden border border-theme"
      style={{ backgroundColor: "var(--color-bg-card)" }}
    >
      <div className="relative aspect-video overflow-hidden">
        {project.coverImage ? (
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
          >
            <span
              className="font-display font-bold text-3xl"
              style={{ color: "#7C3AED" }}
            >
              FR
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <p
          className="text-xs font-display font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#7C3AED" }}
        >
          {categoryLabel}
        </p>
        <h3
          className="font-display font-bold text-lg mb-2 leading-snug"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="font-body text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          {project.description}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-display font-semibold transition-colors group-hover:underline"
          style={{ color: "#7C3AED" }}
        >
          View case study →
        </Link>
      </div>
    </motion.article>
  );
}
