import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id).lean();
  if (!project) notFound();

  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        Edit project
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        Changes are saved immediately on submit.
      </p>
      <ProjectForm project={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
