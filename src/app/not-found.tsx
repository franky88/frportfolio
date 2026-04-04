import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <span
        className="font-display font-bold text-8xl mb-4"
        style={{ color: "#E8A020" }}
      >
        404
      </span>
      <h1
        className="font-display font-bold text-2xl mb-3"
        style={{ color: "#F5F0E8" }}
      >
        Page not found
      </h1>
      <p
        className="font-body text-sm mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md text-sm font-display font-semibold"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        Back to home
      </Link>
    </div>
  );
}
