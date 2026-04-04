"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  User,
  BookOpen,
  Mail,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Cpu },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 min-h-screen flex flex-col py-6 px-4 gap-1 border-r border-white/10"
      style={{ backgroundColor: "#2C2C3A" }}
    >
      {/* Logo */}
      <div className="px-3 mb-8">
        <span
          className="font-display font-bold text-2xl tracking-tight"
          style={{ color: "#E8A020" }}
        >
          FR
        </span>
        <span
          className="text-xs font-body ml-2"
          style={{ color: "#F5F0E8", opacity: 0.5 }}
        >
          Admin Panel
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body transition-colors"
              style={{
                backgroundColor: isActive ? "#E8A020" + "20" : "transparent",
                color: isActive ? "#E8A020" : "#F5F0E8CC",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <Icon size={16} />
              {label}
              {isActive && (
                <span
                  className="ml-auto w-1 h-4 rounded-full"
                  style={{ backgroundColor: "#E8A020" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pt-4 border-t border-white/10 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <span
          className="text-xs font-body"
          style={{ color: "#F5F0E8", opacity: 0.5 }}
        >
          Signed in
        </span>
      </div>
    </aside>
  );
}
