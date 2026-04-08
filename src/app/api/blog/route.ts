import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function GET() {
  await connectDB();
  const posts = await BlogPost.find({ published: true }).sort({
    publishedAt: -1,
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const slug = slugify(body.title, { lower: true, strict: true });
  const publishedAt = body.published ? new Date() : undefined;
  const post = await BlogPost.create({ ...body, slug, publishedAt });

  revalidatePath("/");
  revalidatePath("/blog");

  return NextResponse.json(post, { status: 201 });
}
