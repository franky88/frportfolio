import Image from "next/image";
import Link from "next/link";
import type { IProject } from "@/types";

export function ProjectCard({ project }: { project: IProject }) {
  const categoryLabel =
    project.category === "graphic-design"
      ? "Graphic Design"
      : "Web Development";

  return (
    <article
      className="group rounded-xl overflow-hidden border border-white/10 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--color-bg-card)" }}
    >
      {/* Cover image */}
      <div className="relative aspect-video bg-slate overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "#2C2C3A" }}
          >
            <span
              className="font-display font-bold text-3xl"
              style={{ color: "#E8A020" }}
            >
              FR
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <p
          className="text-xs font-display font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#E8A020" }}
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
          style={{ color: "#E8A020" }}
        >
          View case study →
        </Link>
      </div>
    </article>
  );
}
