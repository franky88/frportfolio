import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <span className="font-display font-bold text-8xl mb-4 text-gradient">
        404
      </span>
      <h1
        className="font-display font-bold text-2xl mb-3"
        style={{ color: "var(--color-text-primary)" }}
      >
        Page not found
      </h1>
      <p
        className="font-body text-sm mb-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md text-sm font-display font-semibold btn-gradient"
      >
        Back to home
      </Link>
    </div>
  );
}
