import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        New project
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        Fill in the details below and hit create.
      </p>
      <ProjectForm />
    </div>
  );
}
