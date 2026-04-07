import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String }, // leave empty = "Present"
    current: { type: Boolean, default: false },
    bullets: [{ type: String }],
  },
  { _id: false },
);

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: String, required: true },
  },
  { _id: false },
);

const ResumeSectionSchema = new Schema(
  {
    label: { type: String, required: true }, // e.g. "Tools", "Soft Skills"
    items: [{ type: String }],
  },
  { _id: false },
);

const ResumeSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    linkedin: { type: String },
    summary: { type: String, required: true },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [ResumeSectionSchema],
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Resume = models.Resume || model("Resume", ResumeSchema);
