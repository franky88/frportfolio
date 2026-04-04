import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1
        className="text-3xl font-display font-bold mb-2"
        style={{ color: "#F5F0E8" }}
      >
        New post
      </h1>
      <p
        className="text-sm font-body mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        Write and publish a new blog article.
      </p>
      <BlogForm />
    </div>
  );
}
