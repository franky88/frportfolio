"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  IResume,
  IResumeExperience,
  IResumeEducation,
  IResumeSection,
} from "@/types";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";
const inputClass =
  "w-full px-3 py-2.5 rounded-md text-sm font-body border outline-none transition-colors bg-white text-obsidian border-rule focus:border-amber";

const emptyExp = (): IResumeExperience => ({
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
});

const emptyEdu = (): IResumeEducation => ({
  institution: "",
  degree: "",
  year: "",
});

const emptySection = (): IResumeSection => ({
  label: "",
  items: [""],
});

export function ResumeForm({ resume }: { resume?: IResume }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(resume?.name ?? "");
  const [title, setTitle] = useState(resume?.title ?? "");
  const [email, setEmail] = useState(resume?.email ?? "");
  const [phone, setPhone] = useState(resume?.phone ?? "");
  const [location, setLocation] = useState(resume?.location ?? "");
  const [website, setWebsite] = useState(resume?.website ?? "");
  const [linkedin, setLinkedin] = useState(resume?.linkedin ?? "");
  const [summary, setSummary] = useState(resume?.summary ?? "");
  const [published, setPublished] = useState(resume?.published ?? false);
  const [experience, setExperience] = useState<IResumeExperience[]>(
    resume?.experience?.length ? resume.experience : [emptyExp()],
  );
  const [education, setEducation] = useState<IResumeEducation[]>(
    resume?.education?.length ? resume.education : [emptyEdu()],
  );
  const [skills, setSkills] = useState<IResumeSection[]>(
    resume?.skills?.length ? resume.skills : [emptySection()],
  );

  // ── Experience helpers ──────────────────────────────────────
  const updateExp = (i: number, field: keyof IResumeExperience, val: any) =>
    setExperience((prev) =>
      prev.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)),
    );

  const updateBullet = (ei: number, bi: number, val: string) =>
    setExperience((prev) =>
      prev.map((e, idx) =>
        idx === ei
          ? { ...e, bullets: e.bullets.map((b, j) => (j === bi ? val : b)) }
          : e,
      ),
    );

  const addBullet = (ei: number) =>
    setExperience((prev) =>
      prev.map((e, idx) =>
        idx === ei ? { ...e, bullets: [...e.bullets, ""] } : e,
      ),
    );

  const removeBullet = (ei: number, bi: number) =>
    setExperience((prev) =>
      prev.map((e, idx) =>
        idx === ei
          ? { ...e, bullets: e.bullets.filter((_, j) => j !== bi) }
          : e,
      ),
    );

  // ── Skills helpers ──────────────────────────────────────────
  const updateSection = (i: number, field: keyof IResumeSection, val: any) =>
    setSkills((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)),
    );

  const updateItem = (si: number, ii: number, val: string) =>
    setSkills((prev) =>
      prev.map((s, idx) =>
        idx === si
          ? { ...s, items: s.items.map((item, j) => (j === ii ? val : item)) }
          : s,
      ),
    );

  const addItem = (si: number) =>
    setSkills((prev) =>
      prev.map((s, idx) =>
        idx === si ? { ...s, items: [...s.items, ""] } : s,
      ),
    );

  const removeItem = (si: number, ii: number) =>
    setSkills((prev) =>
      prev.map((s, idx) =>
        idx === si ? { ...s, items: s.items.filter((_, j) => j !== ii) } : s,
      ),
    );

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSaving(true);
    const payload = {
      name,
      title,
      email,
      phone,
      location,
      website,
      linkedin,
      summary,
      published,
      experience: experience.map((e) => ({
        ...e,
        bullets: e.bullets.filter(Boolean),
        endDate: e.current ? "" : e.endDate,
      })),
      education,
      skills: skills.map((s) => ({ ...s, items: s.items.filter(Boolean) })),
    };

    await fetch("/api/resume", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    router.refresh();
    setSaving(false);
  };

  return (
    <div className="space-y-10 max-w-content">
      {/* ── Personal info ── */}
      <section
        className="space-y-4 p-5 rounded-lg border border-white/10"
        style={{ backgroundColor: "#2C2C3A" }}
      >
        <h2
          className="text-xs font-display font-semibold uppercase tracking-widest"
          style={{ color: "#E8A020" }}
        >
          Personal info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full name", value: name, set: setName },
            { label: "Job title", value: title, set: setTitle },
            { label: "Email", value: email, set: setEmail },
            { label: "Phone", value: phone, set: setPhone },
            { label: "Location", value: location, set: setLocation },
            { label: "Website", value: website, set: setWebsite },
            { label: "Linkedin", value: linkedin, set: setLinkedin },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label
                className={labelClass}
                style={{ color: "#F5F0E8", opacity: 0.7 }}
              >
                {label}
              </label>
              <input
                className={inputClass}
                value={value}
                onChange={(e) => set(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <label
            className={labelClass}
            style={{ color: "#F5F0E8", opacity: 0.7 }}
          >
            Professional summary
          </label>
          <textarea
            className={inputClass}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xs font-display font-semibold uppercase tracking-widest"
            style={{ color: "#E8A020" }}
          >
            Experience
          </h2>
          <button
            onClick={() => setExperience((p) => [...p, emptyExp()])}
            className="flex items-center gap-1 text-xs font-display font-semibold px-3 py-1.5 rounded-md"
            style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
          >
            <Plus size={12} /> Add
          </button>
        </div>

        {experience.map((exp, ei) => (
          <div
            key={ei}
            className="p-5 rounded-lg border border-white/10 space-y-4"
            style={{ backgroundColor: "#2C2C3A" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-display font-semibold"
                style={{ color: "#F5F0E8" }}
              >
                {exp.company || `Experience ${ei + 1}`}
              </span>
              <button
                onClick={() =>
                  setExperience((p) => p.filter((_, i) => i !== ei))
                }
                style={{ color: "#EF4444" }}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={labelClass}
                  style={{ color: "#F5F0E8", opacity: 0.7 }}
                >
                  Company
                </label>
                <input
                  className={inputClass}
                  value={exp.company}
                  onChange={(e) => updateExp(ei, "company", e.target.value)}
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "#F5F0E8", opacity: 0.7 }}
                >
                  Role / Title
                </label>
                <input
                  className={inputClass}
                  value={exp.role}
                  onChange={(e) => updateExp(ei, "role", e.target.value)}
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "#F5F0E8", opacity: 0.7 }}
                >
                  Start date
                </label>
                <input
                  className={inputClass}
                  placeholder="Nov 2025"
                  value={exp.startDate}
                  onChange={(e) => updateExp(ei, "startDate", e.target.value)}
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "#F5F0E8", opacity: 0.7 }}
                >
                  End date
                </label>
                <input
                  className={inputClass}
                  placeholder="Present"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExp(ei, "endDate", e.target.value)}
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExp(ei, "current", e.target.checked)}
                    className="accent-amber"
                  />
                  <span
                    className="text-xs font-body"
                    style={{ color: "#F5F0E8", opacity: 0.6 }}
                  >
                    Currently working here
                  </span>
                </label>
              </div>
            </div>

            {/* Bullets */}
            <div>
              <label
                className={labelClass}
                style={{ color: "#F5F0E8", opacity: 0.7 }}
              >
                Responsibilities / achievements
              </label>
              <div className="space-y-2">
                {exp.bullets.map((bullet, bi) => (
                  <div key={bi} className="flex gap-2 items-center">
                    <input
                      className={inputClass}
                      placeholder="Start with an action verb — e.g. Built, Designed, Led…"
                      value={bullet}
                      onChange={(e) => updateBullet(ei, bi, e.target.value)}
                    />
                    <button
                      onClick={() => removeBullet(ei, bi)}
                      style={{ color: "#EF4444" }}
                      className="shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addBullet(ei)}
                  className="text-xs font-display font-semibold flex items-center gap-1"
                  style={{ color: "#E8A020" }}
                >
                  <Plus size={12} /> Add bullet
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Education ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xs font-display font-semibold uppercase tracking-widest"
            style={{ color: "#E8A020" }}
          >
            Education
          </h2>
          <button
            onClick={() => setEducation((p) => [...p, emptyEdu()])}
            className="flex items-center gap-1 text-xs font-display font-semibold px-3 py-1.5 rounded-md"
            style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
          >
            <Plus size={12} /> Add
          </button>
        </div>

        {education.map((edu, ei) => (
          <div
            key={ei}
            className="p-5 rounded-lg border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4"
            style={{ backgroundColor: "#2C2C3A" }}
          >
            <div>
              <label
                className={labelClass}
                style={{ color: "#F5F0E8", opacity: 0.7 }}
              >
                Institution
              </label>
              <input
                className={inputClass}
                value={edu.institution}
                onChange={(e) =>
                  setEducation((p) =>
                    p.map((d, i) =>
                      i === ei ? { ...d, institution: e.target.value } : d,
                    ),
                  )
                }
              />
            </div>
            <div>
              <label
                className={labelClass}
                style={{ color: "#F5F0E8", opacity: 0.7 }}
              >
                Degree
              </label>
              <input
                className={inputClass}
                value={edu.degree}
                onChange={(e) =>
                  setEducation((p) =>
                    p.map((d, i) =>
                      i === ei ? { ...d, degree: e.target.value } : d,
                    ),
                  )
                }
              />
            </div>
            <div>
              <label
                className={labelClass}
                style={{ color: "#F5F0E8", opacity: 0.7 }}
              >
                Year
              </label>
              <div className="flex gap-2 items-center">
                <input
                  className={inputClass}
                  value={edu.year}
                  onChange={(e) =>
                    setEducation((p) =>
                      p.map((d, i) =>
                        i === ei ? { ...d, year: e.target.value } : d,
                      ),
                    )
                  }
                />
                <button
                  onClick={() =>
                    setEducation((p) => p.filter((_, i) => i !== ei))
                  }
                  style={{ color: "#EF4444" }}
                  className="shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Skills ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xs font-display font-semibold uppercase tracking-widest"
            style={{ color: "#E8A020" }}
          >
            Skills
          </h2>
          <button
            onClick={() => setSkills((p) => [...p, emptySection()])}
            className="flex items-center gap-1 text-xs font-display font-semibold px-3 py-1.5 rounded-md"
            style={{ backgroundColor: "#E8A02020", color: "#E8A020" }}
          >
            <Plus size={12} /> Add section
          </button>
        </div>

        {skills.map((section, si) => (
          <div
            key={si}
            className="p-5 rounded-lg border border-white/10 space-y-3"
            style={{ backgroundColor: "#2C2C3A" }}
          >
            <div className="flex items-center gap-3">
              <input
                className={inputClass}
                placeholder="Section label — e.g. Tools, Soft Skills, Languages"
                value={section.label}
                onChange={(e) => updateSection(si, "label", e.target.value)}
              />
              <button
                onClick={() => setSkills((p) => p.filter((_, i) => i !== si))}
                style={{ color: "#EF4444" }}
                className="shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-1">
                  <input
                    className="px-3 py-1.5 rounded-full text-xs font-body border outline-none bg-white text-obsidian border-rule"
                    style={{ width: `${Math.max(item.length, 8)}ch` }}
                    value={item}
                    onChange={(e) => updateItem(si, ii, e.target.value)}
                  />
                  <button
                    onClick={() => removeItem(si, ii)}
                    style={{ color: "#EF4444" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem(si)}
                className="px-3 py-1.5 rounded-full text-xs font-display font-semibold border"
                style={{ borderColor: "#E8A02060", color: "#E8A020" }}
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ── Publish + Save ── */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/10">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-amber"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span className="text-sm font-body" style={{ color: "#F5F0E8" }}>
            Publish to /resume
          </span>
        </label>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-md text-sm font-display font-semibold disabled:opacity-50 transition-colors"
          style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
        >
          {saving ? "Saving…" : "Save resume"}
        </button>
      </div>
    </div>
  );
}
