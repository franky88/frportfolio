import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { revalidatePath } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const body = await req.json();

  // Set publishedAt when flipping to published for the first time
  const existing = await BlogPost.findById(id);
  if (body.published && !existing?.publishedAt) {
    body.publishedAt = new Date();
  }

  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post?.slug}`);

  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  await BlogPost.findByIdAndDelete(id);

  revalidatePath("/");
  revalidatePath("/blog");
  if (post?.slug) revalidatePath(`/blog/${post.slug}`);

  return NextResponse.json({ success: true });
}
