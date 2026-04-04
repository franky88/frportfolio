import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["design", "development", "tools"],
    },
    proficiency: { type: Number, min: 1, max: 100 },
    icon: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Skill = models.Skill || model("Skill", SkillSchema);
