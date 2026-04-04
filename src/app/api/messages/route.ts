import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function GET() {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}
