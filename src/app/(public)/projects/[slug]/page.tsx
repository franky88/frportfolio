import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, GitBranch } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const project = await Project.findOne({ slug, published: true }).lean();
  if (!project) notFound();

  const p = JSON.parse(JSON.stringify(project));

  return (
    <div
      className="pt-24 pb-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container">
        <Link
          href="/projects"
          className="text-xs font-display font-semibold uppercase tracking-widest mb-8 inline-block transition-colors hover:text-amber"
          style={{ color: "var(--color-text-primary)", opacity: 0.5 }}
        >
          ← Back to projects
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p
            className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8A020" }}
          >
            {p.category === "graphic-design"
              ? "Graphic Design"
              : "Web Development"}
          </p>
          <h1
            className="font-display font-bold text-4xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            {p.title}
          </h1>
          <p
            className="font-body text-md leading-relaxed mb-6"
            style={{ color: "var(--color-text-primary)", opacity: 0.6 }}
          >
            {p.description}
          </p>

          {/* Links */}
          <div className="flex gap-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-semibold transition-colors"
                style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
              >
                <ExternalLink size={14} />
                View live
              </a>
            )}
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-semibold border transition-colors"
                style={{ borderColor: "#F5F0E840", color: "#F5F0E8" }}
              >
                <GitBranch size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {p.coverImage && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
            <Image
              src={p.coverImage}
              alt={p.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {p.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-display font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        {p.content && (
          <div
            className="prose max-w-3xl font-body"
            style={{ color: "var(--color-text-primary)", opacity: 0.85 }}
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        )}
      </div>
    </div>
  );
}
