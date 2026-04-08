import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { revalidatePath } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project?.slug}`);
  return NextResponse.json(project);
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id);
  await Project.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/projects");
  if (project?.slug) revalidatePath(`/projects/${project.slug}`);
  return NextResponse.json({ success: true });
}
