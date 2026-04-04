import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();

  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }

  return userId;
}

export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  return userId === process.env.ADMIN_USER_ID;
}
