"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { MailOpen } from "lucide-react";
import type { IMessage } from "@/types";
import Link from "next/link";

export function MessageRow({
  message,
  alt,
}: {
  message: IMessage;
  alt: boolean;
}) {
  const router = useRouter();

  const markRead = async () => {
    if (message.read) return;
    await fetch(`/api/messages/${message._id}`, {
      method: "PUT",
      body: JSON.stringify({ read: true }),
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
  };

  return (
    <tr
      style={{
        backgroundColor: alt ? "#F5F0E808" : "#0A0A0A",
        opacity: message.read ? 0.6 : 1,
      }}
    >
      <td className="px-4 py-3 font-body">
        <Link href={`/admin/messages/${message._id}`}>
          <div
            className="font-semibold hover:text-amber transition-colors"
            style={{ color: "#F5F0E8" }}
          >
            {message.name}
          </div>
          <div className="text-xs" style={{ color: "#F5F0E8", opacity: 0.5 }}>
            {message.email}
          </div>
        </Link>
      </td>
      <td
        className="px-4 py-3 font-body max-w-xs truncate"
        style={{ color: "#F5F0E8" }}
      >
        {message.subject || message.message.slice(0, 60)}
      </td>
      <td
        className="px-4 py-3 text-xs font-body"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        {format(new Date(message.createdAt), "dd MMM yyyy")}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
          style={{
            backgroundColor: message.read ? "#22C55E20" : "#F59E0B20",
            color: message.read ? "#22C55E" : "#F59E0B",
          }}
        >
          {message.read ? "Read" : "Unread"}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        {!message.read && (
          <button
            onClick={markRead}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            style={{ color: "#E8A020" }}
            title="Mark as read"
          >
            <MailOpen size={14} />
          </button>
        )}
      </td>
    </tr>
  );
}
