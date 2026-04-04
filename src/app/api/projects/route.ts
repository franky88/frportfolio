import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const filter: Record<string, unknown> = { published: true };
  if (category) filter.category = category;
  if (featured) filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const slug = slugify(body.title, { lower: true, strict: true });
  const project = await Project.create({ ...body, slug });
  return NextResponse.json(project, { status: 201 });
}
