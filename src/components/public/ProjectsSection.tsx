import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import type { IProject } from "@/types";

export function ProjectsSection({ projects }: { projects: IProject[] }) {
  return (
    <section
      id="projects"
      className="py-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#E8A020" }}
            >
              Work
            </p>
            <h2
              className="font-display font-bold text-4xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              Projects & work
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-display font-semibold transition-colors hover:text-amber hidden md:block"
            style={{ color: "var(--color-text-primary)", opacity: 0.6 }}
          >
            All projects →
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p
            className="text-sm font-body"
            style={{ color: "#F5F0E8", opacity: 0.4 }}
          >
            No projects published yet.
          </p>
        )}
      </div>
    </section>
  );
}
