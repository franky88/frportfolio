import type { ISkill } from "@/types";

const categoryLabels: Record<string, string> = {
  design: "Design",
  development: "Development",
  tools: "Tools",
};

export function SkillsSection({ skills }: { skills: ISkill[] }) {
  const grouped = skills.reduce<Record<string, ISkill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="py-20"
      style={{ backgroundColor: "var(--color-skills-bg)" }}
    >
      <div className="site-container">
        <p
          className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#E8A020" }}
        >
          Expertise
        </p>
        <h2
          className="font-display font-bold text-4xl mb-12"
          style={{ color: "var(--color-text-primary)" }}
        >
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3
                className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
                style={{ color: "#E8A020" }}
              >
                {categoryLabels[category] ?? category}
              </h3>
              <div className="flex flex-col gap-4">
                {items.map((skill) => (
                  <div key={skill._id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-sm font-body font-medium"
                        style={{
                          color: "var(--color-text-primary)",
                          opacity: 0.6,
                        }}
                      >
                        {skill.name}
                      </span>
                      {skill.proficiency && (
                        <span
                          className="text-xs font-body"
                          style={{ color: "#E8A020" }}
                        >
                          {skill.proficiency}%
                        </span>
                      )}
                    </div>
                    {skill.proficiency && (
                      <div
                        className="h-1 rounded-full w-full"
                        style={{ backgroundColor: "#F5F0E820" }}
                      >
                        <div
                          className="h-1 rounded-full transition-all"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: "#E8A020",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
