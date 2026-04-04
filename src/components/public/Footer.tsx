import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-theme py-12"
      style={{ backgroundColor: "var(--color-footer-bg)" }}
    >
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="font-display font-bold text-xl"
          style={{ color: "#E8A020" }}
        >
          FR
        </span>
        <p
          className="text-xs font-body"
          style={{ color: "var(--color-text-primary)", opacity: 0.4 }}
        >
          © {new Date().getFullYear()} FR. All rights reserved.
        </p>
        <div className="flex gap-6">
          {[
            { href: "/#projects", label: "Projects" },
            { href: "/blog", label: "Blog" },
            { href: "/#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-body transition-colors hover:text-amber"
              style={{ color: "var(--color-text-primary)", opacity: 0.5 }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
