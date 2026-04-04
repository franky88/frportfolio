import { connectDB } from "@/lib/mongodb";
import { About } from "@/models/About";
import { AboutForm } from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
  await connectDB();
  const about = await About.findOne().lean();

  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        About
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        This content populates the Hero and About sections on the public site.
      </p>
      <AboutForm
        about={about ? JSON.parse(JSON.stringify(about)) : undefined}
      />
    </div>
  );
}
