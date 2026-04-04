import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { MarkReadButton } from "@/components/admin/MarkReadButton";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function MessageDetailPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const message = await Message.findById(id).lean();
  if (!message) notFound();

  const m = JSON.parse(JSON.stringify(message));

  return (
    <div>
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-widest mb-8 transition-colors hover:text-amber"
        style={{ color: "#F5F0E8", opacity: 0.5 }}
      >
        <ArrowLeft size={12} />
        Back to messages
      </Link>

      <div
        className="rounded-lg border border-white/10 p-8 max-w-content"
        style={{ backgroundColor: "#2C2C3A" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/10">
          <div>
            <h1
              className="font-display font-bold text-2xl mb-1"
              style={{ color: "#F5F0E8" }}
            >
              {m.subject || "No subject"}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span
                className="text-xs font-display font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
                style={{
                  backgroundColor: m.read ? "#22C55E20" : "#F59E0B20",
                  color: m.read ? "#22C55E" : "#F59E0B",
                }}
              >
                {m.read ? "Read" : "Unread"}
              </span>
              <span
                className="text-xs font-body"
                style={{ color: "#F5F0E8", opacity: 0.4 }}
              >
                {format(new Date(m.createdAt), "dd MMMM yyyy · HH:mm")}
              </span>
            </div>
          </div>

          {!m.read && <MarkReadButton id={m._id} />}
        </div>

        {/* Sender */}
        <div className="mb-8">
          <p
            className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8A020" }}
          >
            From
          </p>
          <p
            className="font-body font-semibold text-sm"
            style={{ color: "#F5F0E8" }}
          >
            {m.name}
          </p>
          <a
            href={`mailto:${m.email}`}
            className="font-body text-sm transition-colors hover:text-amber"
            style={{ color: "#F5F0E8", opacity: 0.6 }}
          >
            {m.email}
          </a>
        </div>

        {/* Message body */}
        <div>
          <p
            className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8A020" }}
          >
            Message
          </p>
          <p
            className="font-body text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: "#F5F0E8", opacity: 0.85 }}
          >
            {m.message}
          </p>
        </div>

        {/* Reply button */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <a
            href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your message")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-display font-semibold transition-colors"
            style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
          >
            Reply via email →
          </a>
        </div>
      </div>
    </div>
  );
}
