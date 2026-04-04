import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { BlogPost } from "@/models/BlogPost";
import { Message } from "@/models/Message";
import { FolderKanban, BookOpen, Mail } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent?: boolean;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div
      className="rounded-lg p-6 flex items-start justify-between"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div>
        <p
          className="text-sm font-display font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#5A5A6A" }}
        >
          {label}
        </p>
        <p
          className="text-5xl font-display font-bold"
          style={{ color: accent ? "#E8A020" : "#0A0A0A" }}
        >
          {value}
        </p>
      </div>
      <div
        className="p-3 rounded-md"
        style={{ backgroundColor: accent ? "#E8A02020" : "#0A0A0A10" }}
      >
        {icon}
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  await connectDB();

  const [projectCount, blogCount, unreadCount] = await Promise.all([
    Project.countDocuments(),
    BlogPost.countDocuments(),
    Message.countDocuments({ read: false }),
  ]);

  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        Dashboard
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        Overview of your portfolio content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Projects"
          value={projectCount}
          icon={<FolderKanban size={20} color="#0A0A0A" />}
        />
        <StatCard
          label="Blog Posts"
          value={blogCount}
          icon={<BookOpen size={20} color="#0A0A0A" />}
        />
        <StatCard
          label="Unread Messages"
          value={unreadCount}
          icon={<Mail size={20} color="#E8A020" />}
          accent
        />
      </div>
    </div>
  );
}
