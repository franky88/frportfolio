import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
import { revalidatePath } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
  revalidatePath("/");
  revalidatePath("/#skills");
  return NextResponse.json(skill);
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  await Skill.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/#skills");
  return NextResponse.json({ success: true });
}
