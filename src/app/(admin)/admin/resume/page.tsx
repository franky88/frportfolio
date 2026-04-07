import { connectDB } from "@/lib/mongodb";
import { Resume } from "@/models/Resume";
import { ResumeForm } from "@/components/admin/ResumeForm";
import type { IResume } from "@/types";

export default async function AdminResumePage() {
  await connectDB();
  const raw = await Resume.findOne().lean();
  const resume = raw ? (JSON.parse(JSON.stringify(raw)) as IResume) : undefined;

  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        Resume
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        ATS-structured resume data. Displayed on the public /resume page.
      </p>
      <ResumeForm resume={resume} />
    </div>
  );
}
