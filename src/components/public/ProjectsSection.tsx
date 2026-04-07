"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import { stagger, fadeUp } from "./animations";
import type { IProject } from "@/types";

export function ProjectsSection({ projects }: { projects: IProject[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="py-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p
                className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#7C3AED" }}
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
              className="text-sm font-display font-semibold hidden md:block transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              All projects →
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project._id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
