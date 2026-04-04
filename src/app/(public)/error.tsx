"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <h1
        className="font-display font-bold text-2xl mb-3"
        style={{ color: "#F5F0E8" }}
      >
        Something went wrong
      </h1>
      <p
        className="font-body text-sm mb-8"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        An unexpected error occurred. Try again or come back later.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-md text-sm font-display font-semibold"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        Try again
      </button>
    </div>
  );
}
