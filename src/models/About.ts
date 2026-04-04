import mongoose, { Schema, model, models } from "mongoose";

const AboutSchema = new Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    bio: { type: String, required: true },
    avatar: { type: String },
    location: { type: String },
    email: { type: String },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      dribbble: { type: String },
    },
    resumeUrl: { type: String },
    heroHeadline: { type: String },
    heroSubtitle: { type: String },
  },
  { timestamps: true },
);

export const About = models.About || model("About", AboutSchema);
