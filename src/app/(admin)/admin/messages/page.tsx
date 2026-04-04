import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import { MessageRow } from "@/components/admin/MessageRow";
import { format } from "date-fns";

export default async function AdminMessagesPage() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-display font-bold"
          style={{ color: "#F5F0E8" }}
        >
          Messages
        </h1>
        <p
          className="text-sm font-body mt-1"
          style={{ color: "#F5F0E8", opacity: 0.5 }}
        >
          {unread} unread · {messages.length} total
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-white/10">
        <table className="w-full text-sm font-body">
          <thead>
            <tr style={{ backgroundColor: "#2C2C3A" }}>
              {["From", "Subject", "Received", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-display font-semibold text-xs uppercase tracking-widest"
                  style={{ color: "#F5F0E8", opacity: 0.6 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.map((message, i) => (
              <MessageRow
                key={String(message._id)}
                message={JSON.parse(JSON.stringify(message))}
                alt={i % 2 === 1}
              />
            ))}
            {messages.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm"
                  style={{
                    color: "#F5F0E8",
                    opacity: 0.4,
                    backgroundColor: "#0A0A0A",
                  }}
                >
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
