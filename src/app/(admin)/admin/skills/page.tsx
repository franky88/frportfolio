import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
import { SkillForm } from "@/components/admin/SkillForm";
import { SkillRow } from "@/components/admin/SkillRow";

export default async function AdminSkillsPage() {
  await connectDB();
  const skills = await Skill.find().sort({ order: 1 }).lean();

  return (
    <div className="space-y-10">
      <div>
        <h1
          className="text-3xl font-display font-bold mb-2"
          style={{ color: "#F5F0E8" }}
        >
          Skills
        </h1>
        <p
          className="text-sm font-body"
          style={{ color: "#F5F0E8", opacity: 0.5 }}
        >
          {skills.length} skills · displayed as progress bars on the public
          site.
        </p>
      </div>

      <SkillForm />

      <div className="rounded-lg overflow-hidden border border-white/10">
        <table className="w-full text-sm font-body">
          <thead>
            <tr style={{ backgroundColor: "#2C2C3A" }}>
              {["Name", "Category", "Proficiency", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                  style={{ color: "#F5F0E8", opacity: 0.6 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, i) => (
              <SkillRow
                key={String(skill._id)}
                skill={JSON.parse(JSON.stringify(skill))}
                alt={i % 2 === 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
