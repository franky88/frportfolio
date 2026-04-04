"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MailOpen } from "lucide-react";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ read: true }),
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-semibold border transition-colors disabled:opacity-50"
      style={{ borderColor: "#E8A02060", color: "#E8A020" }}
    >
      <MailOpen size={14} />
      {loading ? "Marking…" : "Mark as read"}
    </button>
  );
}
