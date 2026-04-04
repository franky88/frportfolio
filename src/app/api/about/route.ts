import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { About } from "@/models/About";

export async function GET() {
  await connectDB();
  const about = await About.findOne();
  return NextResponse.json(about);
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const about = await About.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(about);
}
