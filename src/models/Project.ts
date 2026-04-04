import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String },
    coverImage: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["graphic-design", "web-development"],
    },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Project = models.Project || model("Project", ProjectSchema);
