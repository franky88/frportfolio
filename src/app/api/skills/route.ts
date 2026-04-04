import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skill";

export async function GET() {
  await connectDB();
  const skills = await Skill.find().sort({ order: 1 });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const skill = await Skill.create(body);
  return NextResponse.json(skill, { status: 201 });
}
