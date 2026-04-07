import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { ProjectCard } from "@/components/public/ProjectCard";

export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();

  console.log("projects", projects);

  return (
    <div
      className="pt-24 pb-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container">
        <p
          className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#7C3AED" }}
        >
          Work
        </p>
        <h1
          className="font-display font-bold text-4xl mb-12"
          style={{ color: "var(--color-text-primary)" }}
        >
          All projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JSON.parse(JSON.stringify(projects)).map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
