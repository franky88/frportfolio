import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { BlogForm } from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id).lean();
  if (!post) notFound();

  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        Edit post
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        Changes are saved on submit.
      </p>
      <BlogForm post={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}
