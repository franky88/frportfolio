import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Resume } from "@/models/Resume";

export async function GET() {
  await connectDB();
  const resume = await Resume.findOne();
  return NextResponse.json(resume);
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const resume = await Resume.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(resume);
}
