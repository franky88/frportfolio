import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { Plus } from "lucide-react";
import { ProjectRow } from "@/components/admin/ProjectRow";

export default async function AdminProjectsPage() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-display font-bold"
            style={{ color: "#F5F0E8" }}
          >
            Projects
          </h1>
          <p
            className="text-sm font-body mt-1"
            style={{ color: "#F5F0E8", opacity: 0.5 }}
          >
            {projects.length} total
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-display font-semibold transition-colors"
          style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
        >
          <Plus size={16} />
          New project
        </Link>
      </div>

      <div className="rounded-lg overflow-hidden border border-white/10">
        <table className="w-full text-sm font-body">
          <thead>
            <tr style={{ backgroundColor: "#2C2C3A" }}>
              <th
                className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                style={{ color: "#F5F0E8", opacity: 0.6 }}
              >
                Title
              </th>
              <th
                className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                style={{ color: "#F5F0E8", opacity: 0.6 }}
              >
                Category
              </th>
              <th
                className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                style={{ color: "#F5F0E8", opacity: 0.6 }}
              >
                Status
              </th>
              <th
                className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                style={{ color: "#F5F0E8", opacity: 0.6 }}
              >
                Featured
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <ProjectRow
                key={String(project._id)}
                project={JSON.parse(JSON.stringify(project))}
                alt={i % 2 === 1}
              />
            ))}
            {projects.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm"
                  style={{
                    color: "#F5F0E8",
                    opacity: 0.4,
                    backgroundColor: "#0A0A0A",
                  }}
                >
                  No projects yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
