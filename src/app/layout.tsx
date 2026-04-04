import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "FR — Graphic Designer & Web Developer",
  description: "Crafting visuals that think, and code that feels.",
  openGraph: {
    title: "FR — Graphic Designer & Web Developer",
    description: "Crafting visuals that think, and code that feels.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "FR Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
