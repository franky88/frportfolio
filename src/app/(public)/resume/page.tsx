import { connectDB } from "@/lib/mongodb";
import { Resume } from "@/models/Resume";
import { notFound } from "next/navigation";
import type { IResume } from "@/types";
import { ResumeDownload } from "@/components/public/ResumeDownload";

export default async function ResumePage() {
  await connectDB();
  const resume = await Resume.findOne({ published: true }).lean();
  if (!resume) notFound();

  const r: IResume = JSON.parse(JSON.stringify(resume));

  console.log("resume", r);

  return (
    <div
      className="pt-24 pb-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10 pb-8 border-b border-theme">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1
                  className="font-display font-bold text-4xl mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {r.name}
                </h1>
                <p
                  className="font-display font-semibold text-lg mb-4"
                  style={{ color: "#7C3AED" }}
                >
                  {r.title}
                </p>
              </div>
              <ResumeDownload name={r.name} />
            </div>
            <div
              className="flex flex-wrap gap-3 text-xs font-body"
              style={{ color: "var(--color-text-muted)" }}
            >
              {r.email && <a href={`mailto: ${r.email}`}>{r.email}</a>}
              {r.phone && <a href={`tel:${r.phone}`}>{r.phone}</a>}
              {r.location && <span>{r.location}</span>}
              {r.website && (
                <a href={r.website} target="_blank">
                  {r.website.split("https://")}
                </a>
              )}
              {r.linkedin && (
                <a href={r.linkedin} target="_blank">
                  {r.linkedin.split("https://")}
                </a>
              )}
            </div>
          </div>

          {/* Summary */}
          <section className="mb-10">
            <h2
              className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#7C3AED" }}
            >
              Profile
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {r.summary}
            </p>
          </section>

          {/* Experience */}
          {r.experience?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
                style={{ color: "#7C3AED" }}
              >
                Experience
              </h2>
              <div className="space-y-8">
                {r.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p
                          className="font-display font-bold text-base"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {exp.company}
                        </p>
                        <p
                          className="font-display font-semibold text-sm"
                          style={{ color: "#7C3AED" }}
                        >
                          {exp.role}
                        </p>
                      </div>
                      <span
                        className="text-xs font-body whitespace-nowrap mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {exp.startDate} —{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.bullets?.length > 0 && (
                      <ul className="mt-3 space-y-1.5 pl-4">
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="text-sm font-body leading-relaxed list-disc"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {r.education?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
                style={{ color: "#7C3AED" }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {r.education.map((edu, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div>
                      <p
                        className="font-display font-bold text-sm"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {edu.institution}
                      </p>
                      <p
                        className="font-body text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {edu.degree}
                      </p>
                    </div>
                    <span
                      className="text-xs font-body"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {r.skills?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
                style={{ color: "#7C3AED" }}
              >
                Skills
              </h2>
              <div className="space-y-4">
                {r.skills.map((section, i) => (
                  <div key={i}>
                    <p
                      className="text-xs font-display font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {section.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item, j) => (
                        <span
                          key={j}
                          className="text-xs font-body px-3 py-1 rounded-full border border-theme"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
